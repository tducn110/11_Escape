export type Direction = "up" | "right" | "down" | "left";
export type EntityId = string;
export type LevelId = `level-${string}`;
export type DifficultyPhase = 1 | 2 | 3 | 4 | 5;
export type StarRating = 0 | 1 | 2 | 3;

export type EntityType = "unit" | "obstacle" | "gate" | "switch";

export interface PuzzleBaseEntity {
  id: EntityId;
  assetKey: string;
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface UnitEntity extends PuzzleBaseEntity {
  type: "unit";
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

export interface TribeOutLevel {
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

export type PuzzleLevel = TribeOutLevel;

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
