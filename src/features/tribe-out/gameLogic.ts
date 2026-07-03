import type { TribeOutEntity, GameState, TribeOutProgressSnapshot, TribeOutTapResult } from "./types";
import { LEVELS } from "./levels";

export function getOccupiedCells(entity: TribeOutEntity): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  for (let r = entity.row; r < entity.row + entity.height; r++) {
    for (let c = entity.col; c < entity.col + entity.width; c++) {
      cells.push({ row: r, col: c });
    }
  }
  return cells;
}

export function isInsideBoard(row: number, col: number, boardRows: number, boardCols: number): boolean {
  return row >= 0 && row < boardRows && col >= 0 && col < boardCols;
}

// Returns a map from "row,col" → entityId for all non-escaped entities.
export function buildOccupancyMap(entities: TribeOutEntity[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const entity of entities) {
    if (entity.type === "unit" && entity.escaped) continue;
    for (const cell of getOccupiedCells(entity)) {
      map.set(`${cell.row},${cell.col}`, entity.id);
    }
  }
  return map;
}

// Returns every cell in front of the unit's leading edge until the board boundary.
export function getForwardCellsUntilExit(
  unit: TribeOutEntity,
  boardRows: number,
  boardCols: number
): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  const { direction, row, col, width, height } = unit;

  if (direction === "up") {
    for (let r = row - 1; r >= 0; r--) {
      for (let c = col; c < col + width; c++) cells.push({ row: r, col: c });
    }
  } else if (direction === "down") {
    for (let r = row + height; r < boardRows; r++) {
      for (let c = col; c < col + width; c++) cells.push({ row: r, col: c });
    }
  } else if (direction === "left") {
    for (let c = col - 1; c >= 0; c--) {
      for (let r = row; r < row + height; r++) cells.push({ row: r, col: c });
    }
  } else if (direction === "right") {
    for (let c = col + width; c < boardCols; c++) {
      for (let r = row; r < row + height; r++) cells.push({ row: r, col: c });
    }
  }

  return cells;
}

export function canExit(
  unit: TribeOutEntity,
  entities: TribeOutEntity[],
  boardRows: number,
  boardCols: number
): boolean {
  if (!unit.direction) return false;
  const occupancyMap = buildOccupancyMap(entities);
  const forwardCells = getForwardCellsUntilExit(unit, boardRows, boardCols);
  for (const cell of forwardCells) {
    const occupantId = occupancyMap.get(`${cell.row},${cell.col}`);
    if (occupantId && occupantId !== unit.id) return false;
  }
  return true;
}

function sanitizeCoins(savedCoins: number): number {
  return Number.isFinite(savedCoins) ? savedCoins : 0;
}

export function buildInitialGameState(levelIndex: number, savedCoins = 0): GameState {
  const level = LEVELS[levelIndex];
  const entities = level.entities.map(e => ({ ...e, escaped: false }));
  const totalUnits = entities.filter(e => e.type === "unit").length;
  return {
    currentLevelIndex: levelIndex,
    lives: level.lives,
    coins: sanitizeCoins(savedCoins),
    escapedCount: 0,
    totalUnits,
    status: "playing",
    entities,
    lastBumpedEntityId: null,
    lastEscapedEntityId: null,
    coinsEarnedThisLevel: 0,
  };
}

export function buildNextLevelState(currentState: GameState, nextLevelIndex: number): GameState {
  const level = LEVELS[nextLevelIndex];
  const entities = level.entities.map(e => ({ ...e, escaped: false }));
  const totalUnits = entities.filter(e => e.type === "unit").length;
  return {
    currentLevelIndex: nextLevelIndex,
    lives: level.lives,
    coins: currentState.coins,
    escapedCount: 0,
    totalUnits,
    status: "playing",
    entities,
    lastBumpedEntityId: null,
    lastEscapedEntityId: null,
    coinsEarnedThisLevel: 0,
  };
}

export function resetLevel(state: GameState): GameState {
  const level = LEVELS[state.currentLevelIndex];
  const entities = level.entities.map(e => ({ ...e, escaped: false }));
  const totalUnits = entities.filter(e => e.type === "unit").length;
  return {
    currentLevelIndex: state.currentLevelIndex,
    lives: level.lives,
    coins: state.coins,
    escapedCount: 0,
    totalUnits,
    status: "playing",
    entities,
    lastBumpedEntityId: null,
    lastEscapedEntityId: null,
    coinsEarnedThisLevel: 0,
  };
}

function buildWinProgressSnapshot(
  state: GameState,
  nextCoins: number,
  savedProgress: TribeOutProgressSnapshot
): TribeOutProgressSnapshot {
  return {
    coins: nextCoins,
    highestUnlockedLevel: Math.max(savedProgress.highestUnlockedLevel, state.currentLevelIndex + 1),
  };
}

export function applyTapUnit(
  unitId: string,
  state: GameState,
  savedProgress: TribeOutProgressSnapshot
): TribeOutTapResult {
  if (state.status !== "playing") {
    return { nextState: state, progressSnapshot: null };
  }

  const entity = state.entities.find(e => e.id === unitId);
  if (!entity || entity.type === "obstacle" || entity.escaped) {
    return { nextState: state, progressSnapshot: null };
  }

  const level = LEVELS[state.currentLevelIndex];

  if (canExit(entity, state.entities, level.boardRows, level.boardCols)) {
    const newEntities = state.entities.map(e =>
      e.id === unitId ? { ...e, escaped: true } : e
    );
    const newEscapedCount = state.escapedCount + 1;
    const allEscaped = newEntities.filter(e => e.type === "unit").every(e => e.escaped);

    let bonusCoins = 0;
    let newStatus: GameState["status"] = "playing";
    let progressSnapshot: TribeOutProgressSnapshot | null = null;

    if (allEscaped) {
      newStatus = "won";
      bonusCoins = 50 + state.lives * 20;
      const totalCoins = state.coins + 10 + bonusCoins;
      progressSnapshot = buildWinProgressSnapshot(state, totalCoins, savedProgress);
    }

    return {
      nextState: {
        ...state,
        entities: newEntities,
        escapedCount: newEscapedCount,
        coins: state.coins + 10 + bonusCoins,
        coinsEarnedThisLevel: state.coinsEarnedThisLevel + 10 + bonusCoins,
        status: newStatus,
        lastEscapedEntityId: unitId,
        lastBumpedEntityId: null,
      },
      progressSnapshot,
    };
  } else {
    const newLives = state.lives - 1;
    return {
      nextState: {
        ...state,
        lives: newLives,
        status: newLives <= 0 ? "lost" : "playing",
        lastBumpedEntityId: unitId,
        lastEscapedEntityId: null,
      },
      progressSnapshot: null,
    };
  }
}
