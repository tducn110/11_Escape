export type Direction = "up" | "down" | "left" | "right";
export type EntityType = "unit" | "obstacle";

export interface TribeOutEntity {
  id: string;
  type: EntityType;
  assetKey: string;
  row: number;
  col: number;
  width: number;
  height: number;
  direction?: Direction;
  escaped?: boolean;
}

export interface TribeOutLevel {
  id: number;
  boardRows: number;
  boardCols: number;
  lives: number;
  timeLimit?: number;
  tutorialText?: string;
  entities: TribeOutEntity[];
}

export interface GameState {
  currentLevelIndex: number;
  lives: number;
  coins: number;
  escapedCount: number;
  totalUnits: number;
  status: "playing" | "won" | "lost";
  entities: TribeOutEntity[];
  lastBumpedEntityId: string | null;
  lastEscapedEntityId: string | null;
  coinsEarnedThisLevel: number;
  timeRemaining?: number;
}

export interface TribeOutProgressSnapshot {
  coins: number;
  highestUnlockedLevel: number;
  currentLevelIndex?: number;
}

export interface TribeOutTapResult {
  nextState: GameState;
  progressSnapshot: TribeOutProgressSnapshot | null;
}
