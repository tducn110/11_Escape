export type {
  Direction,
  EntityId,
  EntityType,
  LevelId,
  PuzzleAction,
  PuzzleActionOutcome,
  PuzzleActionResult,
  PuzzleEntity,
  PuzzleState,
  StarRating,
  TribeOutLevel,
  UnitEntity,
} from "./puzzle";

import type { PuzzleState, StarRating, LevelId, EntityId, PuzzleEntity, PuzzleLevel as DomainPuzzleLevel } from "./puzzle";

export type TribeOutEntity = PuzzleEntity;
export type PuzzleLevel = DomainPuzzleLevel;

export interface GameState {
  currentLevelId: LevelId;
  lives: number;
  escapedCount: number;
  totalUnits: number;
  status: "playing" | "won" | "lost";
  puzzle: PuzzleState;
  lastBumpedEntityId: EntityId | null;
  lastEscapedEntityId: EntityId | null;
  timeRemaining?: number;
  hintsUsed: number;
  stars: StarRating;
  selectedTool: "none" | "rotate";
}

export interface TribeOutProgressSnapshot {
  schemaVersion: number;
  levelSetVersion: number;
  unlockedLevelIds: LevelId[];
  currentLevelId: LevelId;
  starsByLevelId: Partial<Record<LevelId, StarRating>>;
}

export interface TribeOutTapResult {
  nextState: GameState;
  progressSnapshot: TribeOutProgressSnapshot | null;
}
