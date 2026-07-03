import { describe, expect, it } from "vitest";
import {
  applyTapUnit,
  buildInitialGameState,
  buildOccupancyMap,
  canExit,
  getForwardCellsUntilExit,
  getOccupiedCells,
} from "./gameLogic";
import { LEVELS } from "./levels";
import type { TribeOutEntity, TribeOutProgressSnapshot } from "./types";

const EMPTY_PROGRESS: TribeOutProgressSnapshot = {
  coins: 0,
  highestUnlockedLevel: 0,
};

function buildUnit(partial: Partial<TribeOutEntity>): TribeOutEntity {
  return {
    id: partial.id ?? "unit",
    type: partial.type ?? "unit",
    assetKey: partial.assetKey ?? "villager-1",
    row: partial.row ?? 0,
    col: partial.col ?? 0,
    width: partial.width ?? 1,
    height: partial.height ?? 1,
    direction: partial.direction ?? "right",
    escaped: partial.escaped ?? false,
  };
}

function solveLevel(levelIndex: number, steps: string[]) {
  let state = buildInitialGameState(levelIndex, 0);

  for (const unitId of steps) {
    state = applyTapUnit(unitId, state, EMPTY_PROGRESS).nextState;
  }

  return state;
}

describe("getOccupiedCells", () => {
  it("supports 1x1, 2x1, 1x2, and 2x2 entities", () => {
    expect(getOccupiedCells(buildUnit({ row: 1, col: 2, width: 1, height: 1 }))).toEqual([
      { row: 1, col: 2 },
    ]);
    expect(getOccupiedCells(buildUnit({ row: 0, col: 0, width: 2, height: 1 }))).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ]);
    expect(getOccupiedCells(buildUnit({ row: 2, col: 3, width: 1, height: 2 }))).toEqual([
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ]);
    expect(getOccupiedCells(buildUnit({ row: 1, col: 1, width: 2, height: 2 }))).toEqual([
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ]);
  });
});

describe("buildOccupancyMap", () => {
  it("ignores escaped units", () => {
    const entities = [
      buildUnit({ id: "active", row: 0, col: 0 }),
      buildUnit({ id: "escaped", row: 0, col: 1, escaped: true }),
      buildUnit({ id: "rock", type: "obstacle", assetKey: "rock", row: 1, col: 1, direction: undefined }),
    ];

    const map = buildOccupancyMap(entities);

    expect(map.get("0,0")).toBe("active");
    expect(map.has("0,1")).toBe(false);
    expect(map.get("1,1")).toBe("rock");
  });
});

describe("getForwardCellsUntilExit", () => {
  it("collects the full leading edge for larger pieces", () => {
    const downBlock = buildUnit({ row: 1, col: 2, width: 2, height: 2, direction: "down" });
    const rightBlock = buildUnit({ row: 3, col: 1, width: 2, height: 1, direction: "right" });

    expect(getForwardCellsUntilExit(downBlock, 6, 6)).toEqual([
      { row: 3, col: 2 },
      { row: 3, col: 3 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 5, col: 2 },
      { row: 5, col: 3 },
    ]);
    expect(getForwardCellsUntilExit(rightBlock, 6, 6)).toEqual([
      { row: 3, col: 3 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },
    ]);
  });
});

describe("canExit", () => {
  it("returns false for obstacle and non-escaped blockers, but ignores escaped blockers", () => {
    const unit = buildUnit({ id: "runner", row: 2, col: 0, direction: "right" });
    const blocker = buildUnit({ id: "blocker", row: 2, col: 2 });
    const escapedBlocker = buildUnit({ id: "escaped", row: 2, col: 3, escaped: true });
    const obstacle = buildUnit({ id: "rock", type: "obstacle", assetKey: "rock", row: 2, col: 4, direction: undefined });

    expect(canExit(unit, [unit, blocker], 5, 5)).toBe(false);
    expect(canExit(unit, [unit, escapedBlocker], 5, 5)).toBe(true);
    expect(canExit(unit, [unit, obstacle], 5, 5)).toBe(false);
  });
});

describe("applyTapUnit", () => {
  it("marks a free unit as escaped and awards base coins", () => {
    const state = buildInitialGameState(0, 0);
    const result = applyTapUnit("u1", state, EMPTY_PROGRESS);

    expect(result.nextState.escapedCount).toBe(1);
    expect(result.nextState.coins).toBe(10);
    expect(result.nextState.status).toBe("playing");
    expect(result.nextState.lastEscapedEntityId).toBe("u1");
    expect(result.progressSnapshot).toBeNull();
  });

  it("bumps blocked units, removes one life, and loses when lives hit zero", () => {
    const blockedState = buildInitialGameState(1, 0);
    const bumped = applyTapUnit("u1", blockedState, EMPTY_PROGRESS);

    expect(bumped.nextState.lives).toBe(2);
    expect(bumped.nextState.status).toBe("playing");
    expect(bumped.nextState.lastBumpedEntityId).toBe("u1");

    const losingState = {
      ...blockedState,
      lives: 1,
    };
    const lost = applyTapUnit("u1", losingState, EMPTY_PROGRESS);

    expect(lost.nextState.lives).toBe(0);
    expect(lost.nextState.status).toBe("lost");
  });

  it("awards win bonus and returns progress for persistence on the final escape", () => {
    let state = buildInitialGameState(0, 30);

    state = applyTapUnit("u1", state, { coins: 30, highestUnlockedLevel: 1 }).nextState;
    state = applyTapUnit("u2", state, { coins: 40, highestUnlockedLevel: 1 }).nextState;
    const result = applyTapUnit("u3", state, { coins: 50, highestUnlockedLevel: 1 });

    expect(result.nextState.status).toBe("won");
    expect(result.nextState.coins).toBe(170);
    expect(result.nextState.coinsEarnedThisLevel).toBe(140);
    expect(result.progressSnapshot).toEqual({
      coins: 170,
      highestUnlockedLevel: 1,
    });
  });
});

describe("level solutions", () => {
  const solutions: Array<{ levelIndex: number; order: string[] }> = [
    { levelIndex: 0, order: ["u1", "u2", "u3"] },
    { levelIndex: 1, order: ["u2", "u1", "u4", "u3"] },
    { levelIndex: 2, order: ["u2", "u3", "u1", "u4"] },
    { levelIndex: 3, order: ["u2", "u1", "u3", "u4", "u5"] },
    { levelIndex: 4, order: ["u2", "u_wide", "u3", "u4", "u5"] },
    { levelIndex: 5, order: ["u3", "u2", "u1", "u5", "u4", "u6"] },
    { levelIndex: 6, order: ["u3", "u1", "u2", "u4", "u5", "u6"] },
    { levelIndex: 7, order: ["u5", "u2", "u3", "u1", "u6", "u4"] },
    { levelIndex: 8, order: ["u2", "u1", "u4", "u6", "u7", "u5", "u3"] },
    { levelIndex: 9, order: ["u2", "u_wide", "u3", "u6", "u5", "u8", "u4", "u7"] },
  ];

  it("keeps all 10 levels solvable with the documented solution order", () => {
    for (const { levelIndex, order } of solutions) {
      const result = solveLevel(levelIndex, order);
      const totalUnits = LEVELS[levelIndex].entities.filter((entity) => entity.type === "unit").length;

      expect(result.status, `level ${levelIndex + 1}`).toBe("won");
      expect(result.escapedCount, `level ${levelIndex + 1}`).toBe(totalUnits);
    }
  });
});
