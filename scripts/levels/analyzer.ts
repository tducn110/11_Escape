import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import {
  applyPuzzleAction,
  createInitialPuzzleState,
  listLegalExitActions,
  listLegalRotateActions,
} from "../../src/features/tribe-out/puzzle";
import { solveFromState, type SolveResult } from "./solver";

export type MetricCoverage = "exact" | "sampled" | "not-applicable";

export interface MetricValue<T> {
  value: T;
  coverage: MetricCoverage;
  sampleCount: number | null;
  seed: string | null;
}

export type DifficultyPhase = 1 | 2 | 3 | 4 | 5;

export interface DifficultyReport {
  levelId: PuzzleLevel["id"];
  phase: DifficultyPhase;
  unitCount: number;
  obstacleCount: number;
  gateCount: number;
  switchCount: number;
  multiCellUnitCount: number;
  initialAvailableMoves: number;
  initialAvailableRatio: number;
  criticalPathLength: MetricValue<number | null>;
  causalUnlockDepth: MetricValue<number>;
  averageAvailableMoves: MetricValue<number>;
  forcedStateRatio: MetricValue<number>;
  minRotateRequired: number;
  deadEndRisk: MetricValue<number>;
  meaningfulDecisionProxy: MetricValue<number>;
  structuralSignature: string;
  normalizedTransformSignature: string;
  phaseTargetStatus: "IN_BAND" | "OUT_OF_BAND" | "APPROVED_EXCEPTION";
  outOfBandReasons: string[];
}

export interface AnalyzerConfig {
  phase: DifficultyPhase;
  sampleCount: number;
  seed: string;
}

import { getProfileForLevel } from "./catalog/profiles";
function buildMetricValue<T>(value: T, coverage: MetricCoverage = "exact", sampleCount: number | null = null, seed: string | null = null): MetricValue<T> {
  return { value, coverage, sampleCount, seed };
}

function countPieces(level: PuzzleLevel) {
  let obstacleCount = 0;
  let gateCount = 0;
  let switchCount = 0;
  let multiCellUnitCount = 0;
  let unitCount = 0;

  for (const entity of level.entities) {
    if (entity.type === "unit") {
      unitCount += 1;
      if (entity.width > 1 || entity.height > 1) multiCellUnitCount += 1;
    } else if (entity.type === "obstacle") {
      obstacleCount += 1;
    } else if (entity.type === "gate") {
      gateCount += 1;
    } else if (entity.type === "switch") {
      switchCount += 1;
    }
  }

  return { unitCount, obstacleCount, gateCount, switchCount, multiCellUnitCount };
}

function countInitialMoves(level: PuzzleLevel): number {
  return listLegalExitActions(level, createInitialPuzzleState(level)).length;
}

function computeMonotonicWaveDepth(level: PuzzleLevel): number | null {
  let state = createInitialPuzzleState(level);
  let depth = 0;

  while (true) {
    const exits = listLegalExitActions(level, state);
    if (exits.length === 0) {
      return state.entities.every(entity => entity.type !== "unit" || entity.escaped) ? depth : null;
    }

    depth += 1;
    for (const action of exits) {
      const result = applyPuzzleAction(level, state, action);
      if (!result.accepted) {
        return null;
      }
      state = result.nextState;
    }
  }
}

function computeTraceMetrics(level: PuzzleLevel, solveResult: SolveResult): {
  averageAvailableMoves: number;
  forcedStateRatio: number;
  meaningfulDecisionProxy: number;
  causalUnlockDepth: number;
  deadEndRisk: number;
} {
  let state = createInitialPuzzleState(level);
  let totalAvailableExits = 0;
  let observedStates = 0;
  let forcedExitStates = 0;
  let meaningfulDecisionStates = 0;
  let causalDepth = 0;
  let currentWaveKind: "rotate" | "exit" | null = null;
  let deadEndRotateChoices = 0;
  let totalWinningReachableRotateChoices = 0;

  for (const step of solveResult.actions) {
    const exits = listLegalExitActions(level, state);
    const rotates = listLegalRotateActions(state);
    totalAvailableExits += exits.length;
    observedStates += 1;
    if (exits.length === 1) {
      forcedExitStates += 1;
    }
    if (rotates.length >= 2) {
      const distinctOutcomes = new Set<string>();
      let branchChoices = 0;
      for (const rotateAction of rotates) {
        const result = applyPuzzleAction(level, state, rotateAction);
        if (!result.accepted) continue;
        branchChoices += 1;
        const branchSolution = solveFromState(level, result.nextState, {
          stateBudget: 40_000,
          timeBudgetMs: 1_500,
        });
        if (branchSolution.status !== "SOLVABLE") {
          console.log(`Branch status for rotate on ${rotateAction.entityId}: ${branchSolution.status} (reason=${branchSolution.reason}, states=${branchSolution.diagnostics?.exploredStates})`);
          deadEndRotateChoices += 1;
        }
        distinctOutcomes.add(`${branchSolution.status}:${branchSolution.cost?.totalActionCount ?? -1}`);
      }
      if (branchChoices >= 2 && distinctOutcomes.size >= 2) {
        meaningfulDecisionStates += 1;
      }
      if (distinctOutcomes.size > 0) {
        console.log(`State outcomes:`, Array.from(distinctOutcomes));
      }
      totalWinningReachableRotateChoices += branchChoices;
    }

    if (step.action.type !== currentWaveKind) {
      causalDepth += 1;
      currentWaveKind = step.action.type;
    } else if (step.action.type === "rotate") {
      causalDepth += 1;
    }

    const result = applyPuzzleAction(level, state, step.action);
    if (!result.accepted) {
      return {
        averageAvailableMoves: 0,
        forcedStateRatio: 0,
        meaningfulDecisionProxy: 0,
        causalUnlockDepth: 0,
        deadEndRisk: 0,
      };
    }
    state = result.nextState;
  }

  return {
    averageAvailableMoves: observedStates > 0 ? totalAvailableExits / observedStates : countInitialMoves(level),
    forcedStateRatio: observedStates > 0 ? forcedExitStates / observedStates : 0,
    meaningfulDecisionProxy: meaningfulDecisionStates,
    causalUnlockDepth: Math.max(causalDepth, computeMonotonicWaveDepth(level) ?? 0, solveResult.actions.length > 0 ? 1 : 0),
    deadEndRisk: totalWinningReachableRotateChoices > 0 ? deadEndRotateChoices / totalWinningReachableRotateChoices : 0,
  };
}



export function analyzeLevel(level: PuzzleLevel, solveResult: SolveResult, config: AnalyzerConfig): DifficultyReport {
  const { unitCount, obstacleCount, gateCount, switchCount, multiCellUnitCount } = countPieces(level);
  const initialAvailableMoves = countInitialMoves(level);
  const initialAvailableRatio = unitCount > 0 ? initialAvailableMoves / unitCount : 0;
  const minRotateRequired = solveResult.cost?.rotateCount ?? 0;
  const traceMetrics = computeTraceMetrics(level, solveResult);
  const phaseTargets = getProfileForLevel(parseInt(level.id.split('-')[1], 10));
  const outOfBandReasons: string[] = [];

  if (minRotateRequired < phaseTargets.minRotateRequired) {
    outOfBandReasons.push(`minRotateRequired=${minRotateRequired} < target ${phaseTargets.minRotateRequired}`);
  }
  if (minRotateRequired > phaseTargets.maxRotateRequired) {
    outOfBandReasons.push(`minRotateRequired=${minRotateRequired} > target ${phaseTargets.maxRotateRequired}`);
  }
  if (traceMetrics.meaningfulDecisionProxy < phaseTargets.meaningfulDecisionProxy && phaseTargets.meaningfulDecisionProxy > 0) {
    outOfBandReasons.push(`meaningfulDecisionProxy=${traceMetrics.meaningfulDecisionProxy} < target ${phaseTargets.meaningfulDecisionProxy}`);
  }
  if (initialAvailableMoves > phaseTargets.maxInitialExits) {
    outOfBandReasons.push(`initialAvailableMoves=${initialAvailableMoves} > target ${phaseTargets.maxInitialExits}`);
  }
  if (initialAvailableRatio > phaseTargets.maxInitialAvailableRatio) {
    outOfBandReasons.push(`initialAvailableRatio=${initialAvailableRatio} > target ${phaseTargets.maxInitialAvailableRatio}`);
  }
  if (initialAvailableRatio < phaseTargets.minInitialAvailableRatio) {
    outOfBandReasons.push(`initialAvailableRatio=${initialAvailableRatio} < target ${phaseTargets.minInitialAvailableRatio}`);
  }
  if (traceMetrics.deadEndRisk > phaseTargets.maxDeadEndRisk) {
    outOfBandReasons.push(`deadEndRisk=${traceMetrics.deadEndRisk} > max ${phaseTargets.maxDeadEndRisk}`);
  }
  if (traceMetrics.deadEndRisk < phaseTargets.minDeadEndRisk && phaseTargets.minDeadEndRisk > 0) {
    outOfBandReasons.push(`deadEndRisk=${traceMetrics.deadEndRisk} < min ${phaseTargets.minDeadEndRisk}`);
  }
  const boardS = Math.max(level.boardRows, level.boardCols);
  if (boardS > phaseTargets.maxBoardSize) {
    outOfBandReasons.push(`Board size ${boardS} exceeds max ${phaseTargets.maxBoardSize}`);
  }
  if (boardS < phaseTargets.minBoardSize) {
    outOfBandReasons.push(`Board size ${boardS} is below min ${phaseTargets.minBoardSize}`);
  }
  if (level.entities.length > phaseTargets.maxEntities) {
    outOfBandReasons.push(`Entities count ${level.entities.length} exceeds allowed ${phaseTargets.maxEntities}`);
  }
  if (level.entities.length < phaseTargets.minEntities) {
    outOfBandReasons.push(`Entities count ${level.entities.length} is below min ${phaseTargets.minEntities}`);
  }
  if (phaseTargets.allowedMechanics.gates && gateCount < 1 && parseInt(level.id.split('-')[1], 10) > 40) {
    outOfBandReasons.push(`Phase requires gates but none found`);
  }
  if (phaseTargets.allowedMechanics.switches && switchCount < 1 && parseInt(level.id.split('-')[1], 10) > 40) {
    outOfBandReasons.push(`Phase requires switches but none found`);
  }

  return {
    levelId: level.id,
    phase: config.phase,
    unitCount,
    obstacleCount,
    gateCount,
    switchCount,
    multiCellUnitCount,
    initialAvailableMoves,
    initialAvailableRatio,
    criticalPathLength: buildMetricValue<number | null>(computeMonotonicWaveDepth(level), computeMonotonicWaveDepth(level) === null ? "not-applicable" : "exact"),
    causalUnlockDepth: buildMetricValue<number>(traceMetrics.causalUnlockDepth, "exact"),
    averageAvailableMoves: buildMetricValue<number>(traceMetrics.averageAvailableMoves, "exact"),
    forcedStateRatio: buildMetricValue<number>(traceMetrics.forcedStateRatio, "exact"),
    minRotateRequired,
    deadEndRisk: buildMetricValue<number>(traceMetrics.deadEndRisk, "exact"),
    meaningfulDecisionProxy: buildMetricValue<number>(traceMetrics.meaningfulDecisionProxy, "exact"),
    structuralSignature: generateSignature(level, false),
    normalizedTransformSignature: generateSignature(level, true),
    phaseTargetStatus: outOfBandReasons.length === 0 ? "IN_BAND" : "OUT_OF_BAND",
    outOfBandReasons,
  };
}

export function generateSignature(level: PuzzleLevel, normalizeTransform: boolean): string {
  // Simple structural signature: sort entities and join
  // For normalizeTransform: we'd ideally rotate to canonical. 
  // Let's implement a very basic translation-invariant signature for now:
  let minC = 999, minR = 999;
  for (const e of level.entities) {
    if (e.col < minC) minC = e.col;
    if (e.row < minR) minR = e.row;
  }
  
  const entities = level.entities.map(e => {
    // If we normalize transform, we pretend everything starts at (0,0) and maybe ignore exact directions if we fully transform.
    // Let's just translation-normalize for both to avoid false negatives.
    return `${e.type}:${e.width}x${e.height}@${e.col - minC},${e.row - minR}:${normalizeTransform ? 'any' : e.direction}`;
  });
  
  entities.sort();
  return entities.join('|');
}
