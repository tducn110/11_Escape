import { describe, expect, it } from "vitest";
import { LEVELS } from "../levels";
import type { ProgressSnapshot, StarRating } from "../types";
import {
  HINT_CHARGES_PER_LEVEL,
  applyRotateUnit,
  applyTapUnit,
  buildInitialGameState,
  buildNextLevelState,
  buildWinProgressSnapshot,
  getLevel,
  getNextLevelId,
  hasSeenTutorial,
  markTutorialSeen,
  pauseGame,
  resetLevel,
  resumeGame,
  tickTimer,
  useHint,
} from "./gameLogic";
import { calculateScore, calculateStars } from "./scoring";

const FIRST_LEVEL = LEVELS[0];
const SECOND_LEVEL = LEVELS[1];

function freshProgress(): ProgressSnapshot {
  return {
    schemaVersion: 3,
    levelSetVersion: 4,
    unlockedLevelIds: [FIRST_LEVEL.id],
    currentLevelId: FIRST_LEVEL.id,
    starsByLevelId: {},
    tutorialSeenLevelIds: [],
  };
}

describe("tickTimer", () => {
  it("decrements time while playing", () => {
    const state = buildInitialGameState(FIRST_LEVEL.id);
    const next = tickTimer(state);
    expect(next.timeRemaining).toBe(FIRST_LEVEL.timeLimit - 1);
    expect(next.phase).toBe("playing");
  });

  it("loses with reason timeout exactly at zero, once", () => {
    let state = buildInitialGameState(FIRST_LEVEL.id);
    state = { ...state, timeRemaining: 1 };
    const lost = tickTimer(state);
    expect(lost.phase).toBe("lost");
    expect(lost.lossReason).toBe("timeout");
    expect(lost.timeRemaining).toBe(0);
    expect(tickTimer(lost)).toBe(lost);
  });

  it("does not tick while paused, won or lost", () => {
    let state = buildInitialGameState(FIRST_LEVEL.id);
    state = pauseGame(state);
    expect(tickTimer(state).timeRemaining).toBe(state.timeRemaining);
    const won = { ...state, phase: "won" as const };
    expect(tickTimer(won).timeRemaining).toBe(won.timeRemaining);
  });
});

describe("pause/resume", () => {
  it("pauses only while playing and resumes only from paused", () => {
    const state = buildInitialGameState(FIRST_LEVEL.id);
    const paused = pauseGame(state);
    expect(paused.phase).toBe("paused");
    expect(resumeGame(paused).phase).toBe("playing");
    expect(pauseGame(paused)).toBe(paused);
  });
});

describe("applyTapUnit", () => {
  it("escapes a free unit and completes the first level", () => {
    const state = buildInitialGameState(FIRST_LEVEL.id);
    const progress = freshProgress();
    const outcome = applyTapUnit("u1", state, progress);
    expect(outcome.nextState.phase).toBe("won");
    expect(outcome.nextState.escapedCount).toBe(1);
    expect(outcome.nextState.stars).toBeGreaterThanOrEqual(1);
    expect(outcome.progressSnapshot?.unlockedLevelIds).toContain(SECOND_LEVEL.id);
    expect(outcome.progressSnapshot?.starsByLevelId[FIRST_LEVEL.id]).toBeGreaterThanOrEqual(1);
  });

  it("loses a life on a blocked exit and records a mistake", () => {
    let state = buildInitialGameState(getLevel("level-004").id);
    const progress = freshProgress();
    const blocked = applyTapUnit("u1", state, progress);
    expect(blocked.nextState.lives).toBe(state.lives - 1);
    expect(blocked.nextState.mistakes).toBe(1);
    expect(blocked.nextState.phase).toBe("playing");
  });

  it("loses the level when lives reach zero", () => {
    let state = buildInitialGameState(getLevel("level-004").id);
    const progress = freshProgress();
    const initialLives = state.lives;
    for (let i = 0; i < initialLives; i += 1) {
      state = applyTapUnit("u1", state, progress).nextState;
    }
    expect(state.phase).toBe("lost");
    expect(state.lossReason).toBe("lives");
    expect(state.lives).toBe(0);
  });

  it("is a no-op after the level is won or lost", () => {
    const won = { ...buildInitialGameState(FIRST_LEVEL.id), phase: "won" as const };
    const progress = freshProgress();
    expect(applyTapUnit("u1", won, progress).nextState).toBe(won);
  });
});

describe("applyRotateUnit", () => {
  it("rotates clockwise and consumes one charge", () => {
    const state = buildInitialGameState(getLevel("level-010").id);
    const next = applyRotateUnit(state, "u1");
    expect(next.puzzle.rotateChargesRemaining).toBe(state.puzzle.rotateChargesRemaining - 1);
    const unit = next.puzzle.entities.find(e => e.id === "u1");
    expect(unit && unit.type === "unit" ? unit.direction : null).toBe("down");
  });

  it("does nothing when no charges remain", () => {
    const state = buildInitialGameState(getLevel("level-010").id);
    const exhausted = applyRotateUnit(state, "u1");
    const again = applyRotateUnit(exhausted, "u1");
    const third = applyRotateUnit(again, "u1");
    expect(third.puzzle.rotateChargesRemaining).toBe(0);
    const unit = third.puzzle.entities.find(e => e.id === "u1");
    expect(unit && unit.type === "unit" ? unit.direction : null).toBe("left");
  });
});

describe("useHint", () => {
  it("returns an action hint and consumes one charge per use", () => {
    let state = buildInitialGameState(getLevel("level-010").id);
    const first = useHint(state);
    expect(first.hint).not.toBeNull();
    expect(first.state.hintsUsed).toBe(1);
    state = first.state;
    const second = useHint(state);
    expect(second.state.hintsUsed).toBe(2);
  });

  it("stops granting hints after the per-level budget", () => {
    let state = buildInitialGameState(getLevel("level-010").id);
    for (let i = 0; i < HINT_CHARGES_PER_LEVEL + 1; i += 1) {
      const next = useHint(state);
      state = next.state;
    }
    expect(state.hintsUsed).toBe(HINT_CHARGES_PER_LEVEL);
    expect(useHint(state).hint).toBeNull();
  });
});

describe("progression", () => {
  it("builds the next level and stops at the last level", () => {
    const state = buildInitialGameState(getLevel("level-019").id);
    expect(getNextLevelId(state.currentLevelId)).toBe("level-020");
    const last = buildInitialGameState(getLevel("level-020").id);
    expect(buildNextLevelState(last)).toBeNull();
  });

  it("resetLevel restarts the same level", () => {
    const state = buildInitialGameState(getLevel("level-010").id);
    const reset = resetLevel(state);
    expect(reset.currentLevelId).toBe(state.currentLevelId);
    expect(reset.puzzle.rotateChargesRemaining).toBe(getLevel("level-010").rotateCharges);
  });

  it("win snapshot keeps the best star rating and unlocks the next level", () => {
    let progress = freshProgress();
    progress = buildWinProgressSnapshot(progress, FIRST_LEVEL.id, 1 as StarRating);
    progress = buildWinProgressSnapshot(progress, FIRST_LEVEL.id, 3 as StarRating);
    expect(progress.starsByLevelId[FIRST_LEVEL.id]).toBe(3);
    expect(progress.unlockedLevelIds).toEqual([FIRST_LEVEL.id, SECOND_LEVEL.id]);
  });

  it("tutorial seen is persisted idempotently", () => {
    const progress = freshProgress();
    const marked = markTutorialSeen(progress, FIRST_LEVEL.id);
    expect(hasSeenTutorial(marked, FIRST_LEVEL.id)).toBe(true);
    expect(markTutorialSeen(marked, FIRST_LEVEL.id)).toBe(marked);
  });
});

describe("scoring", () => {
  it("star thresholds: 1 solved, 2 without mistakes, 3 without mistakes/hints and with time", () => {
    const level = FIRST_LEVEL;
    const base = { lives: level.lives, hintsUsed: 0, timeRemaining: level.timeLimit } as const;
    expect(calculateStars({ ...base, lives: 1 }, level)).toBe(1);
    expect(
      calculateStars({ ...base, timeRemaining: Math.ceil(level.timeLimit * 0.25) - 1 }, level),
    ).toBe(2);
    expect(calculateStars(base, level)).toBe(3);
    expect(calculateStars({ ...base, hintsUsed: 1 }, level)).toBe(2);
  });

  it("score is non-negative and deterministic", () => {
    expect(calculateScore(0, 1, 0, 0, 0)).toBe(1000 + 200);
    expect(calculateScore(19, 3, 10, 99, 3)).toBeGreaterThanOrEqual(0);
    const a = calculateScore(5, 2, 7, 1, 1);
    const b = calculateScore(5, 2, 7, 1, 1);
    expect(a).toBe(b);
    expect(Number.isInteger(a)).toBe(true);
  });
});