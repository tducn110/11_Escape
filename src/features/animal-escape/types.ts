export type Direction = "up" | "right" | "down" | "left";
export type EntityId = string;
export type LevelId = `level-${string}`;
export type StarRating = 0 | 1 | 2 | 3;
export type DifficultyPhase = 1 | 2 | 3 | 4 | 5;

export type EntityType = "unit" | "obstacle" | "gate" | "switch";

/**
 * Visual identity of every animal used by authored levels.
 *
 * Levels must reference an existing visual id explicitly. There is no
 * silent fallback: unknown ids fail validation, and development builds
 * surface a visible error instead of substituting an arbitrary sprite.
 */
export type AnimalVisualId =
  | "animal-cat"
  | "animal-panda"
  | "animal-dog"
  | "animal-bear"
  | "animal-frog"
  | "animal-police-cat"
  | "animal-monkey"
  | "animal-chicken"
  | "animal-squirrel"
  | "animal-buffalo";

export interface PuzzleBaseEntity {
  id: EntityId;
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface UnitEntity extends PuzzleBaseEntity {
  type: "unit";
  visualId: AnimalVisualId;
  direction: Direction;
  escaped?: boolean;
}

export interface ObstacleEntity extends PuzzleBaseEntity {
  type: "obstacle";
}

export interface GateEntity extends PuzzleBaseEntity {
  type: "gate";
  open: boolean;
}

export interface SwitchEntity extends PuzzleBaseEntity {
  type: "switch";
  targetId: EntityId;
  activated: boolean;
}

export type PuzzleEntity = UnitEntity | ObstacleEntity | GateEntity | SwitchEntity;

/**
 * Rotate semantics: a rotate action turns the animal's facing direction
 * clockwise (up -> right -> down -> left). The physical footprint never
 * changes — only the direction the animal will run.
 */
export interface AnimalEscapeLevel {
  id: LevelId;
  phase: DifficultyPhase;
  boardRows: number;
  boardCols: number;
  lives: number;
  timeLimit: number;
  tutorialText?: string;
  rotateCharges: number;
  entities: PuzzleEntity[];
}

export interface PuzzleState {
  entities: readonly PuzzleEntity[];
  rotateChargesRemaining: number;
}

export type PuzzleAction =
  | { type: "exit"; entityId: EntityId }
  | { type: "rotate"; entityId: EntityId };

export type PuzzleActionOutcome =
  | "accepted"
  | "blocked_path"
  | "invalid_target"
  | "no_charges"
  | "already_complete";

export interface PuzzleTransitionDetails {
  activatedSwitchIds: EntityId[];
  openedGateIds: EntityId[];
  consumedRotateCharge: boolean;
  completedPuzzle: boolean;
}

export interface PuzzleActionResult {
  action: PuzzleAction;
  nextState: PuzzleState;
  outcome: PuzzleActionOutcome;
  accepted: boolean;
  details: PuzzleTransitionDetails;
}

export type GamePhase = "loading" | "playing" | "paused" | "won" | "lost";
export type LossReason = "timeout" | "lives";

export interface GameHint {
  action: "exit" | "rotate";
  entityId: EntityId;
}

export interface GameState {
  currentLevelId: LevelId;
  phase: GamePhase;
  lossReason: LossReason | null;
  lives: number;
  maxLives: number;
  escapedCount: number;
  totalUnits: number;
  puzzle: PuzzleState;
  timeRemaining: number;
  timeLimit: number;
  hintsUsed: number;
  mistakes: number;
  stars: StarRating;
  score: number;
}

export interface ProgressSnapshot {
  schemaVersion: number;
  levelSetVersion: number;
  unlockedLevelIds: LevelId[];
  currentLevelId: LevelId;
  starsByLevelId: Partial<Record<LevelId, StarRating>>;
  tutorialSeenLevelIds: LevelId[];
}

export interface TapOutcome {
  nextState: GameState;
  progressSnapshot: ProgressSnapshot | null;
}
