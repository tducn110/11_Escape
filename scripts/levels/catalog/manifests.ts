import type { PuzzleAction, PuzzleLevel } from "../../../src/features/tribe-out/types";
import { createInitialPuzzleState, listLegalExitActions } from "../domain";
import type { DifficultyPhase } from "../analyzer";

export interface NumericRange {
  min: number;
  max: number;
}

export interface DifficultyTargetBand {
  boardRows: NumericRange;
  boardCols: NumericRange;
  unitCount: NumericRange;
  initialAvailableMoves: NumericRange;
  initialAvailableRatio: NumericRange;
  causalDepth: NumericRange;
  averageAvailableMoves: NumericRange;
  minRotateRequired: NumericRange;
  meaningfulDecisionProxy: NumericRange;
  deadEndRisk: NumericRange;
}

export interface ApprovedMetricException {
  metric: string;
  actualValue: number | string;
  targetDescription: string;
  reason: string;
  manualEvidenceRequired: string;
}

export interface LevelAuthoringManifest {
  levelId: PuzzleLevel["id"];
  phase: DifficultyPhase;
  sourceKind: "authored" | "generated" | "generated-with-override";
  generatorVersion: string;
  seed: string | null;
  templateId: string;
  concepts: string[];
  intendedOpening: PuzzleAction[];
  rotateRequired: boolean;
  intentionalDeadEnd: boolean;
  deadEndSignal: string | null;
  timerModel: {
    observationAllowanceSeconds: number;
    actionAllowanceSeconds: number;
    mobileBufferSeconds: number;
  };
  targetBand: DifficultyTargetBand;
  approvedExceptions: ApprovedMetricException[];
}

export const GENERATOR_VERSION = "recovery-v1";

export const PHASE_TARGET_BANDS: Record<DifficultyPhase, DifficultyTargetBand> = {
  1: {
    boardRows: { min: 3, max: 5 },
    boardCols: { min: 3, max: 5 },
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
    boardRows: { min: 5, max: 7 },
    boardCols: { min: 5, max: 7 },
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
    boardRows: { min: 5, max: 7 },
    boardCols: { min: 5, max: 7 },
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
    boardRows: { min: 6, max: 8 },
    boardCols: { min: 6, max: 8 },
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
    boardRows: { min: 6, max: 8 },
    boardCols: { min: 6, max: 8 },
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

export function phaseForLevelIndex(index: number): DifficultyPhase {
  if (index <= 20) return 1;
  if (index <= 40) return 2;
  if (index <= 60) return 3;
  if (index <= 80) return 4;
  return 5;
}

function templateIdForPhase(phase: DifficultyPhase): string {
  switch (phase) {
    case 1:
      return "phase1-authored-recovery";
    case 2:
      return "phase2-structured-dependency";
    case 3:
      return "phase3-stateful-chain";
    case 4:
      return "phase4-strategic-combination";
    case 5:
      return "phase5-expert-causal-planning";
  }
}

function conceptsForLevel(level: PuzzleLevel, phase: DifficultyPhase): string[] {
  const concepts = new Set<string>();
  if (level.rotateCharges > 0) concepts.add("rotate");
  if (level.entities.some(entity => entity.type === "gate")) concepts.add("gate");
  if (level.entities.some(entity => entity.type === "switch")) concepts.add("switch");
  if (level.entities.some(entity => entity.type === "obstacle")) concepts.add("obstacle");
  if (level.entities.some(entity => entity.type === "unit" && (entity.width > 1 || entity.height > 1))) concepts.add("multi-cell");
  concepts.add(`phase-${phase}`);
  return [...concepts];
}

function intendedOpening(level: PuzzleLevel): PuzzleAction[] {
  return listLegalExitActions(level, createInitialPuzzleState(level)).slice(0, 3);
}

export function generateManifests(levels: readonly PuzzleLevel[]): readonly LevelAuthoringManifest[] {
  return levels.map((level, index) => {
    const phase = level.phase ?? phaseForLevelIndex(index + 1);
    return {
      levelId: level.id,
      phase,
      sourceKind: phase === 1 ? "authored" : "generated",
      generatorVersion: GENERATOR_VERSION,
      seed: phase === 1 ? null : `${level.id}:${GENERATOR_VERSION}:0`,
      templateId: templateIdForPhase(phase),
      concepts: conceptsForLevel(level, phase),
      intendedOpening: intendedOpening(level),
      rotateRequired: level.rotateCharges > 0,
      intentionalDeadEnd: false,
      deadEndSignal: null,
      timerModel: {
        observationAllowanceSeconds: 8,
        actionAllowanceSeconds: Math.max(1, Math.ceil(level.timeLimit / Math.max(level.entities.length, 1))),
        mobileBufferSeconds: 4,
      },
      targetBand: PHASE_TARGET_BANDS[phase],
      approvedExceptions: [],
    };
  });
}
