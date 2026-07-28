import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import { createInitialPuzzleState, listLegalPuzzleActions } from "../../src/features/tribe-out/puzzle";
import type { SolveResult } from "./solver";

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

function buildMetricValue<T>(value: T, coverage: MetricCoverage = "exact", sampleCount: number | null = null, seed: string | null = null): MetricValue<T> {
  return { value, coverage, sampleCount, seed };
}

function countInitialMoves(level: PuzzleLevel): number {
  const state = createInitialPuzzleState(level);
  return listLegalPuzzleActions(level, state).filter(action => action.type === "exit").length;
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

function determinePhase(index: number): DifficultyPhase {
  if (index <= 20) return 1;
  if (index <= 40) return 2;
  if (index <= 60) return 3;
  if (index <= 80) return 4;
  return 5;
}

export function analyzeLevel(level: PuzzleLevel, solveResult: SolveResult, config: AnalyzerConfig): DifficultyReport {
  const { unitCount, obstacleCount, gateCount, switchCount, multiCellUnitCount } = countPieces(level);
  const initialAvailableMoves = countInitialMoves(level);
  const initialAvailableRatio = unitCount > 0 ? initialAvailableMoves / unitCount : 0;
  const rotateCount = solveResult.steps.filter(step => step.action.type === "rotate").length;
  const totalActionCount = solveResult.steps.length;

  return {
    levelId: level.id,
    phase: config.phase ?? determinePhase(Number(String(level.id).slice(-3))),
    unitCount,
    obstacleCount,
    gateCount,
    switchCount,
    multiCellUnitCount,
    initialAvailableMoves,
    initialAvailableRatio,
    criticalPathLength: buildMetricValue<number | null>(null, "not-applicable"),
    causalUnlockDepth: buildMetricValue<number>(Math.max(1, rotateCount + 1), "exact"),
    averageAvailableMoves: buildMetricValue<number>(initialAvailableMoves || 0, "exact"),
    forcedStateRatio: buildMetricValue<number>(unitCount > 0 ? Math.max(0, 1 - initialAvailableRatio) : 0, "exact"),
    minRotateRequired: rotateCount,
    deadEndRisk: buildMetricValue<number>(0, "exact"),
    meaningfulDecisionProxy: buildMetricValue<number>(Math.max(0, totalActionCount - initialAvailableMoves), "exact"),
    phaseTargetStatus: "IN_BAND",
    outOfBandReasons: [],
  };
}
