import type {
  EntityId,
  GameState,
  PuzzleLevel,
  PuzzleState,
  StarRating,
  TribeOutLevel,
  TribeOutProgressSnapshot,
  TribeOutTapResult,
} from "./types";
import { LEVELS, LEVEL_BY_ID, LEVEL_INDEX_BY_ID, LEVEL_SET_VERSION } from "./levels";
import {
  applyPuzzleAction,
  canExitUnit,
  createInitialPuzzleState,
  getForwardCellsUntilExit,
  getOccupiedCells,
  isInsideBoard,
  isPuzzleComplete,
  listLegalExitActions,
  listLegalRotateActions,
  getEntityById,
  getStateKey,
} from "./puzzle";

function getLevel(levelId: TribeOutLevel["id"]): TribeOutLevel {
  return LEVEL_BY_ID.get(levelId) ?? LEVELS[0];
}

function clonePuzzleState(level: PuzzleLevel): PuzzleState {
  return createInitialPuzzleState(level);
}

function buildGameState(level: TribeOutLevel, puzzleState = clonePuzzleState(level), overrides: Partial<GameState> = {}): GameState {
  const totalUnits = level.entities.filter(entity => entity.type === "unit").length;

  return {
    currentLevelId: level.id,
    lives: level.lives,
    escapedCount: 0,
    totalUnits,
    status: "playing",
    puzzle: puzzleState,
    lastBumpedEntityId: null,
    lastEscapedEntityId: null,
    timeRemaining: level.timeLimit,
    hintsUsed: 0,
    stars: 0,
    selectedTool: "none",
    ...overrides,
  };
}

export function getAvailableUnits(state: GameState, boardRows: number, boardCols: number): EntityId[] {
  return listLegalExitActions({ boardRows, boardCols }, state.puzzle)
    .map(action => action.entityId)
    .filter(entityId => {
      const entity = getEntityById(state.puzzle, entityId);
      return Boolean(entity && entity.type === "unit" && !entity.escaped && canExitUnit({ boardRows, boardCols }, state.puzzle, entity));
    });
}

function applyExitClosure(level: TribeOutLevel, puzzle: PuzzleState) {
  let state = puzzle;
  const actions: { type: "exit"; entityId: EntityId }[] = [];

  while (!isPuzzleComplete(state)) {
    const exits = listLegalExitActions(level, state);
    if (exits.length === 0) {
      break;
    }
    const action = exits[0];
    const result = applyPuzzleAction(level, state, action);
    if (!result.accepted) {
      break;
    }
    state = result.nextState;
    actions.push(action);
  }

  return { state, actions };
}

export function getRepresentativeHintAction(level: TribeOutLevel, puzzle: PuzzleState): EntityId | null {
  const initialClosure = applyExitClosure(level, puzzle);
  if (initialClosure.actions.length > 0) {
    return initialClosure.actions[0].entityId;
  }
  if (initialClosure.state.rotateChargesRemaining <= 0) {
    return null;
  }

  const frontier: Array<{
    puzzle: PuzzleState;
    actionTrail: EntityId[];
    rotateCount: number;
    totalActionCount: number;
  }> = [{
    puzzle: initialClosure.state,
    actionTrail: [],
    rotateCount: 0,
    totalActionCount: 0,
  }];
  const bestByState = new Map<string, { rotateCount: number; totalActionCount: number }>([
    [getStateKey(initialClosure.state), { rotateCount: 0, totalActionCount: 0 }],
  ]);

  while (frontier.length > 0) {
    frontier.sort((left, right) => {
      if (left.rotateCount !== right.rotateCount) return left.rotateCount - right.rotateCount;
      if (left.totalActionCount !== right.totalActionCount) return left.totalActionCount - right.totalActionCount;
      return getStateKey(left.puzzle).localeCompare(getStateKey(right.puzzle));
    });

    const current = frontier.shift()!;
    if (isPuzzleComplete(current.puzzle)) {
      return current.actionTrail[0] ?? null;
    }

    for (const action of listLegalRotateActions(current.puzzle)) {
      const rotated = applyPuzzleAction(level, current.puzzle, action);
      if (!rotated.accepted) continue;

      const closure = applyExitClosure(level, rotated.nextState);
      const nextPuzzle = closure.state;
      const nextTrail = [...current.actionTrail, action.entityId];
      const nextCost = {
        rotateCount: current.rotateCount + 1,
        totalActionCount: current.totalActionCount + 1 + closure.actions.length,
      };
      const stateKey = getStateKey(nextPuzzle);
      const best = bestByState.get(stateKey);
      if (
        best &&
        (best.rotateCount < nextCost.rotateCount ||
          (best.rotateCount === nextCost.rotateCount && best.totalActionCount <= nextCost.totalActionCount))
      ) {
        continue;
      }

      bestByState.set(stateKey, nextCost);
      frontier.push({
        puzzle: nextPuzzle,
        actionTrail: nextTrail,
        rotateCount: nextCost.rotateCount,
        totalActionCount: nextCost.totalActionCount,
      });
    }
  }

  return null;
}

export function buildInitialGameState(levelId: TribeOutLevel["id"]): GameState {
  const level = getLevel(levelId);
  return buildGameState(level, clonePuzzleState(level));
}

export function buildNextLevelState(_currentState: GameState, nextLevelId: TribeOutLevel["id"]): GameState {
  const level = getLevel(nextLevelId);
  return buildGameState(level, clonePuzzleState(level), {
    currentLevelId: level.id,
  });
}

export function resetLevel(state: GameState): GameState {
  const level = getLevel(state.currentLevelId);
  return buildGameState(level, clonePuzzleState(level), {
    currentLevelId: level.id,
  });
}

function calculateAvailableStars(stateBeforeWin: GameState, level: TribeOutLevel): StarRating {
  let stars = 1;
  if (stateBeforeWin.lives === level.lives) {
    stars += 1;
  }
  if (stateBeforeWin.hintsUsed === 0 && (stateBeforeWin.timeRemaining ?? 1) > 0) {
    stars += 1;
  }
  return Math.min(3, stars) as StarRating;
}

export function calculateStars(stateBeforeWin: GameState, level: TribeOutLevel): StarRating {
  return calculateAvailableStars(stateBeforeWin, level);
}

export function buildWinProgressSnapshot(
  progress: TribeOutProgressSnapshot,
  completedLevelId: TribeOutLevel["id"],
  stars: StarRating,
): TribeOutProgressSnapshot {
  const completedLevelIndex = LEVEL_INDEX_BY_ID.get(completedLevelId) ?? -1;
  const nextLevel = completedLevelIndex >= 0 ? LEVELS[completedLevelIndex + 1] : undefined;
  const unlockedLevelIds = new Set(progress.unlockedLevelIds);
  unlockedLevelIds.add(completedLevelId);
  if (nextLevel) {
    unlockedLevelIds.add(nextLevel.id);
  }

  return {
    schemaVersion: progress.schemaVersion,
    levelSetVersion: LEVEL_SET_VERSION,
    unlockedLevelIds: [...unlockedLevelIds],
    currentLevelId: completedLevelId,
    starsByLevelId: {
      ...progress.starsByLevelId,
      [completedLevelId]: Math.max(progress.starsByLevelId[completedLevelId] ?? 0, stars) as StarRating,
    },
  };
}

export function applyTapUnit(
  unitId: string,
  state: GameState,
  savedProgress: TribeOutProgressSnapshot,
): TribeOutTapResult {
  if (state.status !== "playing") {
    return { nextState: state, progressSnapshot: null };
  }

  const level = getLevel(state.currentLevelId);
  const actionResult = applyPuzzleAction(level, state.puzzle, { type: "exit", entityId: unitId });

  if (actionResult.outcome === "invalid_target") {
    return { nextState: state, progressSnapshot: null };
  }

  if (actionResult.outcome === "blocked_path") {
    const nextLives = state.lives - 1;
    return {
      nextState: {
        ...state,
        lives: nextLives,
        status: nextLives <= 0 ? "lost" : "playing",
        lastBumpedEntityId: unitId,
        lastEscapedEntityId: null,
      },
      progressSnapshot: null,
    };
  }

  const escapedCount = state.escapedCount + 1;
  const puzzle = actionResult.nextState;
  const completed = isPuzzleComplete(puzzle);
  const stars = completed ? calculateStars(state, level) : state.stars;
  const nextState: GameState = {
    ...state,
    puzzle,
    escapedCount,
    lastBumpedEntityId: null,
    lastEscapedEntityId: unitId,
    stars,
    status: completed ? "won" : "playing",
  };

  return {
    nextState,
    progressSnapshot: completed ? buildWinProgressSnapshot(savedProgress, level.id, stars) : null,
  };
}

export function applyRotateUnit(state: GameState, unitId: string): GameState {
  if (state.status !== "playing") return state;

  const level = getLevel(state.currentLevelId);
  const actionResult = applyPuzzleAction(level, state.puzzle, { type: "rotate", entityId: unitId });
  if (actionResult.outcome !== "accepted") {
    return state;
  }

  return {
    ...state,
    puzzle: actionResult.nextState,
    selectedTool: "none",
  };
}

export { getOccupiedCells, isInsideBoard, getForwardCellsUntilExit };
export { canExitUnit as canExit };
export { buildOccupancyMap } from "./puzzle";
