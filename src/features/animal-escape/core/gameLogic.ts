import type {
  AnimalEscapeLevel,
  EntityId,
  GameHint,
  GameState,
  LevelId,
  ProgressSnapshot,
  PuzzleState,
  StarRating,
  TapOutcome,
} from "../types";
import { LEVELS, LEVEL_BY_ID, LEVEL_INDEX_BY_ID, LEVEL_SET_VERSION } from "../levels";
import {
  applyPuzzleAction,
  createInitialPuzzleState,
  isPuzzleComplete,
} from "./engine";
import {
  listLegalExitActions,
  listLegalRotateActions,
} from "./selectors";
import { getStateKey } from "./stateKey";
import { calculateStars, scoreForWin } from "./scoring";

export const HINT_CHARGES_PER_LEVEL = 3;

export function getLevel(levelId: LevelId): AnimalEscapeLevel {
  return LEVEL_BY_ID.get(levelId) ?? LEVELS[0];
}

export function getLevelIndex(levelId: LevelId): number {
  return LEVEL_INDEX_BY_ID.get(levelId) ?? 0;
}

export function getNextLevelId(levelId: LevelId): LevelId | null {
  const index = getLevelIndex(levelId);
  const next = LEVELS[index + 1];
  return next ? next.id : null;
}

export function buildInitialGameState(levelId: LevelId): GameState {
  return buildGameState(getLevel(levelId));
}

export function buildGameState(level: AnimalEscapeLevel): GameState {
  const totalUnits = level.entities.filter(entity => entity.type === "unit").length;
  return {
    currentLevelId: level.id,
    phase: "playing",
    lossReason: null,
    lives: level.lives,
    maxLives: level.lives,
    escapedCount: 0,
    totalUnits,
    puzzle: createInitialPuzzleState(level),
    timeRemaining: level.timeLimit,
    timeLimit: level.timeLimit,
    hintsUsed: 0,
    mistakes: 0,
    stars: 0,
    score: 0,
  };
}

/** Restart the current level from scratch (no progression changes). */
export function resetLevel(state: GameState): GameState {
  return buildGameState(getLevel(state.currentLevelId));
}

/**
 * Advance to the next level. Returns null when the player is already on the
 * last level — callers must not attempt level 21.
 */
export function buildNextLevelState(state: GameState): GameState | null {
  const nextId = getNextLevelId(state.currentLevelId);
  if (!nextId) return null;
  return buildGameState(getLevel(nextId));
}

export function canPause(state: GameState): boolean {
  return state.phase === "playing";
}

export function pauseGame(state: GameState): GameState {
  if (!canPause(state)) return state;
  return { ...state, phase: "paused" };
}

export function resumeGame(state: GameState): GameState {
  if (state.phase !== "paused") return state;
  return { ...state, phase: "playing" };
}

/**
 * Decrement the timer by one second. When it hits zero while playing, the
 * level is lost with reason "timeout" — exactly once (any later tick on a
 * non-playing state is a no-op).
 */
export function tickTimer(state: GameState): GameState {
  if (state.phase !== "playing") return state;

  const timeRemaining = Math.max(0, state.timeRemaining - 1);
  if (timeRemaining <= 0) {
    return { ...state, timeRemaining: 0, phase: "lost", lossReason: "timeout" };
  }
  return { ...state, timeRemaining };
}

/**
 * Tap a unit: attempts an exit action.
 *
 *  - blocked path  → lives - 1, records a mistake; lost (reason "lives") at 0
 *  - accepted      → unit escapes; puzzle won when every unit escaped
 *  - invalid id    → no-op
 */
export function applyTapUnit(unitId: EntityId, state: GameState, progress: ProgressSnapshot): TapOutcome {
  if (state.phase !== "playing") {
    return { nextState: state, progressSnapshot: null };
  }

  const level = getLevel(state.currentLevelId);
  const result = applyPuzzleAction(level, state.puzzle, { type: "exit", entityId: unitId });

  if (result.outcome === "invalid_target") {
    return { nextState: state, progressSnapshot: null };
  }

  if (result.outcome === "blocked_path") {
    const lives = state.lives - 1;
    return {
      nextState: {
        ...state,
        lives,
        mistakes: state.mistakes + 1,
        phase: lives <= 0 ? "lost" : "playing",
        lossReason: lives <= 0 ? "lives" : state.lossReason,
      },
      progressSnapshot: null,
    };
  }

  const escapedCount = state.escapedCount + 1;
  const completed = isPuzzleComplete(result.nextState);
  let stars: StarRating = state.stars;
  let score = state.score;
  let nextPhase: GameState["phase"] = "playing";
  let progressSnapshot: ProgressSnapshot | null = null;

  if (completed) {
    stars = calculateStars(state, level);
    score = scoreForWin(state, getLevelIndex(level.id), stars);
    nextPhase = "won";
    progressSnapshot = buildWinProgressSnapshot(progress, level.id, stars);
  }

  return {
    nextState: {
      ...state,
      puzzle: result.nextState,
      escapedCount,
      stars,
      score,
      phase: nextPhase,
      lossReason: null,
    },
    progressSnapshot,
  };
}

/** Rotate a unit (change its facing direction clockwise). */
export function applyRotateUnit(state: GameState, unitId: EntityId): GameState {
  if (state.phase !== "playing") return state;

  const level = getLevel(state.currentLevelId);
  const result = applyPuzzleAction(level, state.puzzle, { type: "rotate", entityId: unitId });
  if (result.outcome !== "accepted") {
    return state;
  }

  return { ...state, puzzle: result.nextState };
}

/** Consume one hint charge and return the hinted action (or null when spent). */
export function useHint(state: GameState): { state: GameState; hint: GameHint | null } {
  if (state.phase !== "playing" || state.hintsUsed >= HINT_CHARGES_PER_LEVEL) {
    return { state, hint: null };
  }
  const hint = getRepresentativeHintAction(getLevel(state.currentLevelId), state.puzzle);
  if (!hint) {
    return { state, hint: null };
  }
  return { state: { ...state, hintsUsed: state.hintsUsed + 1 }, hint };
}

/** Returns a leading action (exit or rotate) that moves the puzzle toward a solution. */
export function getRepresentativeHintAction(level: AnimalEscapeLevel, puzzle: PuzzleState): GameHint | null {
  const initialClosure = applyExitClosure(level, puzzle);
  if (initialClosure.actions.length > 0) {
    return initialClosure.actions[0];
  }
  if (initialClosure.state.rotateChargesRemaining <= 0) {
    return null;
  }

  const frontier: Array<{
    puzzle: PuzzleState;
    actionTrail: GameHint[];
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
      const nextTrail = [...current.actionTrail, { action: action.type, entityId: action.entityId } as GameHint];
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

function applyExitClosure(level: AnimalEscapeLevel, puzzle: PuzzleState) {
  let state = puzzle;
  const actions: GameHint[] = [];

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
    actions.push({ action: action.type, entityId: action.entityId });
  }

  return { state, actions };
}

export function buildWinProgressSnapshot(
  progress: ProgressSnapshot,
  completedLevelId: LevelId,
  stars: StarRating,
): ProgressSnapshot {
  const completedLevelIndex = getLevelIndex(completedLevelId);
  const nextLevel = LEVELS[completedLevelIndex + 1];
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
    tutorialSeenLevelIds: progress.tutorialSeenLevelIds,
  };
}

export function markTutorialSeen(progress: ProgressSnapshot, levelId: LevelId): ProgressSnapshot {
  if (progress.tutorialSeenLevelIds.includes(levelId)) {
    return progress;
  }
  return {
    ...progress,
    tutorialSeenLevelIds: [...progress.tutorialSeenLevelIds, levelId],
  };
}

export function hasSeenTutorial(progress: ProgressSnapshot, levelId: LevelId): boolean {
  return progress.tutorialSeenLevelIds.includes(levelId);
}