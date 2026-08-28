import type { AnimalEscapeLevel, GameState, StarRating } from "../types";

/**
 * Star rating — deterministic, derived only from committed game state.
 *
 *  1 star  = puzzle solved
 *  2 stars = solved without losing a life (mistakes = 0)
 *  3 stars = solved without losing a life, without hints, and with at least
 *            one quarter of the time limit remaining
 */
export function calculateStars(
  stateBeforeWin: Pick<GameState, "lives" | "hintsUsed" | "timeRemaining">,
  level: AnimalEscapeLevel,
): StarRating {
  let stars: StarRating = 1;
  if (stateBeforeWin.lives === level.lives) {
    stars = 2;
  }
  if (
    stars >= 2 &&
    stateBeforeWin.hintsUsed === 0 &&
    (stateBeforeWin.timeRemaining ?? 0) >= Math.ceil(level.timeLimit * 0.25)
  ) {
    stars = 3;
  }
  return stars;
}

/**
 * Final score model — integer, non-negative, deterministic.
 *
 *   base        = (levelIndex + 1) * 1000
 *   + stars     * 200
 *   + timeLeft  * 10
 *   - mistakes  * 15
 *   - hints     * 25
 *
 * A solved level always scores at least its base + 200, so the value is never
 * negative even after maximum mistake/hint penalties.
 */
export function calculateScore(
  levelIndex: number,
  stars: StarRating,
  timeRemaining: number,
  mistakes: number,
  hintsUsed: number,
): number {
  return Math.max(
    0,
    (levelIndex + 1) * 1000 +
      stars * 200 +
      Math.max(0, timeRemaining) * 10 -
      Math.max(0, mistakes) * 15 -
      Math.max(0, hintsUsed) * 25,
  );
}

export function scoreForWin(
  stateBeforeWin: Pick<GameState, "timeRemaining" | "mistakes" | "hintsUsed">,
  levelIndex: number,
  stars: StarRating,
): number {
  return calculateScore(
    levelIndex,
    stars,
    stateBeforeWin.timeRemaining,
    stateBeforeWin.mistakes,
    stateBeforeWin.hintsUsed,
  );
}