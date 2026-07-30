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
  phaseTargetStatus: "IN_BAND" | "OUT_OF_BAND" | "APPROVED_EXCEPTION";
  outOfBandReasons: string[];
}

export interface AnalyzerConfig {
  phase: DifficultyPhase;
  sampleCount: number;
  seed: string;
}

interface NumericRange {
  min: number;
  max: number;
}

interface DifficultyTargetBand {
  unitCount: NumericRange;
  initialAvailableMoves: NumericRange;
  initialAvailableRatio: NumericRange;
  causalDepth: NumericRange;
  averageAvailableMoves: NumericRange;
  minRotateRequired: NumericRange;
  meaningfulDecisionProxy: NumericRange;
  deadEndRisk: NumericRange;
}

const PHASE_TARGETS: Record<DifficultyPhase, DifficultyTargetBand> = {
  1: {
    unitCount: { min: 1, max: 7 },
    initialAvailableMoves: { min: 1, max: 3 },
    initialAvailableRatio: { min: 0, max: 0.65 },
    causalDepth: { min: 1, max: 4 },
    averageAvailableMoves: { min: 1, max: 3.5 },
    minRotateRequired: { min: 0, max: 1 },
    meaningfulDecisionProxy: { min: 0, max: 1 },
    deadEndRisk: { min: 0, max: 0 },
  },
  2: {
    unitCount: { min: 6, max: 10 },
    initialAvailableMoves: { min: 1, max: 3 },
    initialAvailableRatio: { min: 0.2, max: 0.45 },
    causalDepth: { min: 4, max: 7 },
    averageAvailableMoves: { min: 1.5, max: 3.5 },
    minRotateRequired: { min: 0, max: 1 },
    meaningfulDecisionProxy: { min: 1, max: 2 },
    deadEndRisk: { min: 0, max: 0.05 },
  },
  3: {
    unitCount: { min: 7, max: 11 },
    initialAvailableMoves: { min: 1, max: 3 },
    initialAvailableRatio: { min: 0.15, max: 0.4 },
    causalDepth: { min: 5, max: 9 },
    averageAvailableMoves: { min: 1, max: 3 },
    minRotateRequired: { min: 0, max: 1 },
    meaningfulDecisionProxy: { min: 1, max: 3 },
    deadEndRisk: { min: 0, max: 0.12 },
  },
  4: {
    unitCount: { min: 8, max: 12 },
    initialAvailableMoves: { min: 1, max: 2 },
    initialAvailableRatio: { min: 0.1, max: 0.3 },
    causalDepth: { min: 7, max: 11 },
    averageAvailableMoves: { min: 1, max: 2.8 },
    minRotateRequired: { min: 1, max: 1 },
    meaningfulDecisionProxy: { min: 2, max: 4 },
    deadEndRisk: { min: 0.05, max: 0.25 },
  },
  5: {
    unitCount: { min: 9, max: 14 },
    initialAvailableMoves: { min: 1, max: 3 },
    initialAvailableRatio: { min: 0.08, max: 0.25 },
    causalDepth: { min: 9, max: 14 },
    averageAvailableMoves: { min: 1, max: 2.5 },
    minRotateRequired: { min: 1, max: 2 },
    meaningfulDecisionProxy: { min: 3, max: 6 },
    deadEndRisk: { min: 0.08, max: 0.3 },
  },
};

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
          deadEndRotateChoices += 1;
        }
        distinctOutcomes.add(branchSolution.finalStateKey ?? `${branchSolution.status}:${rotateAction.entityId}`);
      }
      if (branchChoices >= 2 && distinctOutcomes.size >= 2) {
        meaningfulDecisionStates += 1;
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

function evaluateRange(name: string, value: number, range: NumericRange, reasons: string[]): void {
  if (value < range.min || value > range.max) {
    reasons.push(`${name}=${value} outside [${range.min}, ${range.max}]`);
  }
}

export function analyzeLevel(level: PuzzleLevel, solveResult: SolveResult, config: AnalyzerConfig): DifficultyReport {
  const { unitCount, obstacleCount, gateCount, switchCount, multiCellUnitCount } = countPieces(level);
  const initialAvailableMoves = countInitialMoves(level);
  const initialAvailableRatio = unitCount > 0 ? initialAvailableMoves / unitCount : 0;
  const minRotateRequired = solveResult.cost?.rotateCount ?? 0;
  const traceMetrics = computeTraceMetrics(level, solveResult);
  const phaseTargets = PHASE_TARGETS[config.phase];
  const outOfBandReasons: string[] = [];

  evaluateRange("unitCount", unitCount, phaseTargets.unitCount, outOfBandReasons);
  evaluateRange("initialAvailableMoves", initialAvailableMoves, phaseTargets.initialAvailableMoves, outOfBandReasons);
  evaluateRange("initialAvailableRatio", Number(initialAvailableRatio.toFixed(4)), phaseTargets.initialAvailableRatio, outOfBandReasons);
  evaluateRange("causalUnlockDepth", traceMetrics.causalUnlockDepth, phaseTargets.causalDepth, outOfBandReasons);
  evaluateRange("averageAvailableMoves", Number(traceMetrics.averageAvailableMoves.toFixed(4)), phaseTargets.averageAvailableMoves, outOfBandReasons);
  evaluateRange("minRotateRequired", minRotateRequired, phaseTargets.minRotateRequired, outOfBandReasons);
  evaluateRange("meaningfulDecisionProxy", traceMetrics.meaningfulDecisionProxy, phaseTargets.meaningfulDecisionProxy, outOfBandReasons);
  evaluateRange("deadEndRisk", Number(traceMetrics.deadEndRisk.toFixed(4)), phaseTargets.deadEndRisk, outOfBandReasons);

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
    phaseTargetStatus: outOfBandReasons.length === 0 ? "IN_BAND" : "OUT_OF_BAND",
    outOfBandReasons,
  };
}
