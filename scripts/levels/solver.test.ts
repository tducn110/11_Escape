import { describe, expect, it } from "vitest";
import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import { applyPuzzleAction, createInitialPuzzleState, isPuzzleComplete } from "./domain";
import { DEFAULT_SOLVER_BUDGET, solveLevel } from "./solver";

function buildLevel(level: Partial<PuzzleLevel> & Pick<PuzzleLevel, "id" | "entities">): PuzzleLevel {
  return {
    phase: 1,
    boardRows: 4,
    boardCols: 4,
    lives: 3,
    timeLimit: 30,
    rotateCharges: 0,
    ...level,
  };
}

describe("solveLevel", () => {
  it("solves 40 independent units without subset explosion", () => {
    const level = buildLevel({
      id: "level-900",
      boardRows: 40,
      boardCols: 2,
      entities: Array.from({ length: 40 }, (_, index) => ({
        id: `u${String(index).padStart(2, "0")}`,
        type: "unit" as const,
        assetKey: "villager-1",
        row: index,
        col: 0,
        width: 1,
        height: 1,
        direction: "right" as const,
      })),
    });

    const result = solveLevel(level);
    expect(result.status).toBe("SOLVABLE");
    expect(result.solverPath).toBe("FAST_EXIT_CLOSURE");
    expect(result.cost).toEqual({ rotateCount: 0, totalActionCount: 40 });
  });

  it("prefers zero-rotate solution over fewer actions with a rotate", () => {
    const level = buildLevel({
      id: "level-901",
      boardRows: 2,
      boardCols: 4,
      rotateCharges: 1,
      entities: [
        { id: "u0", type: "unit", assetKey: "villager-1", row: 0, col: 0, width: 1, height: 1, direction: "right" as const },
        { id: "u1", type: "unit", assetKey: "villager-1", row: 1, col: 0, width: 1, height: 1, direction: "right" as const },
        { id: "u2", type: "unit", assetKey: "villager-1", row: 1, col: 1, width: 1, height: 1, direction: "right" as const },
      ],
    });

    const result = solveLevel(level);
    expect(result.status).toBe("SOLVABLE");
    expect(result.cost?.rotateCount).toBe(0);
  });

  it("returns INCONCLUSIVE when the state budget is too small", () => {
    const level = buildLevel({
      id: "level-902",
      boardRows: 2,
      boardCols: 2,
      rotateCharges: 1,
      entities: [
        { id: "u0", type: "unit", assetKey: "villager-1", row: 0, col: 0, width: 1, height: 1, direction: "down" as const },
        { id: "o0", type: "obstacle" as const, assetKey: "rock", row: 1, col: 0, width: 1, height: 1 },
      ],
    });

    const result = solveLevel(level, { ...DEFAULT_SOLVER_BUDGET, stateBudget: 0 });
    expect(result.status).toBe("INCONCLUSIVE");
  });

  it("reports replay-valid traces", () => {
    const level = buildLevel({
      id: "level-903",
      boardRows: 1,
      boardCols: 3,
      entities: [
        { id: "u0", type: "unit", assetKey: "villager-1", row: 0, col: 0, width: 1, height: 1, direction: "right" as const },
        { id: "u1", type: "unit", assetKey: "villager-1", row: 0, col: 1, width: 1, height: 1, direction: "right" as const },
      ],
    });

    const result = solveLevel(level);
    expect(result.status).toBe("SOLVABLE");

    let state = createInitialPuzzleState(level);
    for (const step of result.actions) {
      const applied = applyPuzzleAction(level, state, step.action);
      expect(applied.accepted).toBe(true);
      state = applied.nextState;
    }

    expect(isPuzzleComplete(state)).toBe(true);
  });
});
