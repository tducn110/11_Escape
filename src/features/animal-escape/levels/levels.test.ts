import { describe, expect, it } from "vitest";
import { LEVELS } from "./index";
import { applyPuzzleAction, createInitialPuzzleState, isPuzzleComplete } from "../core/engine";
import { listLegalExitActions, listLegalRotateActions } from "../core/selectors";
import { getStateKey } from "../core/stateKey";
import type { PuzzleState } from "../types";

function solveBfs(level: (typeof LEVELS)[number]): PuzzleState | null {
  const initial = createInitialPuzzleState(level);
  const frontier: Array<{ puzzle: PuzzleState; cost: number }> = [{ puzzle: initial, cost: 0 }];
  const visited = new Set<string>([getStateKey(initial)]);
  const maxCost = 60;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.cost - b.cost);
    const current = frontier.shift()!;
    if (isPuzzleComplete(current.puzzle)) {
      return current.puzzle;
    }
    if (current.cost >= maxCost) {
      continue;
    }

    const actions = [
      ...listLegalExitActions(level, current.puzzle),
      ...listLegalRotateActions(current.puzzle),
    ];
    for (const action of actions) {
      const result = applyPuzzleAction(level, current.puzzle, action);
      if (!result.accepted) continue;
      const key = getStateKey(result.nextState);
      if (visited.has(key)) continue;
      visited.add(key);
      frontier.push({ puzzle: result.nextState, cost: current.cost + 1 });
    }
  }

  return null;
}

describe("animal-escape level catalog", () => {
  it("contains exactly 20 levels with contiguous ids", () => {
    expect(LEVELS).toHaveLength(20);
    LEVELS.forEach((level, index) => {
      expect(level.id).toBe(`level-${String(index + 1).padStart(3, "0")}`);
    });
  });

  it("levels are ordered by phase (4 levels per phase)", () => {
    LEVELS.forEach((level, index) => {
      expect(level.phase).toBe(Math.ceil((index + 1) / 4));
    });
  });

  it("time limits are monotonic and generous for the entity count", () => {
    for (let i = 1; i < LEVELS.length; i += 1) {
      const prev = LEVELS[i - 1];
      const curr = LEVELS[i];
      expect(curr.timeLimit, `${curr.id} time limit must not shrink`).toBeGreaterThanOrEqual(
        prev.timeLimit,
      );
    }
    for (const level of LEVELS) {
      expect(level.timeLimit).toBeGreaterThanOrEqual(level.entities.length * 3);
    }
  });

  it("every level is solvable within the rotate charge budget", () => {
    for (const level of LEVELS) {
      const solved = solveBfs(level);
      expect(solved, `${level.id} must be solvable`).not.toBeNull();
    }
  });

  it("no level has a trivial no-rotate win: solutions consume at least one charge when rotates are available", () => {
    for (const level of LEVELS) {
      if (level.rotateCharges === 0) continue;
      const solved = solveBfs(level);
      expect(solved, `${level.id} must be solvable`).not.toBeNull();
      expect(solved!.rotateChargesRemaining, `${level.id} must consume at least one charge`).toBeLessThan(
        level.rotateCharges,
      );
    }
  });
});