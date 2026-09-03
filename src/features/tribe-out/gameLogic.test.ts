import { describe, it, expect } from "vitest";
import {
  applyRotateUnit,
  applyTapUnit,
  buildOccupancyMap,
  canExit,
  getForwardCellsUntilExit,
  getOccupiedCells,
} from "./gameLogic";
import type { GameState, TribeOutEntity, TribeOutProgressSnapshot } from "./types";

function buildState(entities: TribeOutEntity[], overrides: Partial<GameState> = {}): GameState {
  return {
    currentLevelId: "level-001",
    lives: 3,
    escapedCount: 0,
    totalUnits: entities.filter(entity => entity.type === "unit").length,
    status: "playing",
    puzzle: {
      entities,
      rotateChargesRemaining: 1,
    },
    lastBumpedEntityId: null,
    lastEscapedEntityId: null,
    timeRemaining: 10,
    hintsUsed: 0,
    stars: 0,
    selectedTool: "none",
    ...overrides,
  };
}

describe("gameLogic", () => {
  it("rotates a live unit clockwise and spends one charge", () => {
    const state = buildState([
      { id: "u1", type: "unit", direction: "up", row: 1, col: 1, width: 1, height: 1, assetKey: "villager-1" },
    ]);

    const nextState = applyRotateUnit(state, "u1");
    expect(nextState.puzzle.rotateChargesRemaining).toBe(0);
    expect(nextState.selectedTool).toBe("none");
    expect(nextState.puzzle.entities[0].type).toBe("unit");
    expect((nextState.puzzle.entities[0] as Extract<TribeOutEntity, { type: "unit" }>).direction).toBe("right");
  });

  it("invalid rotate targets are inert and do not consume charge", () => {
    const state = buildState([
      { id: "u1", type: "unit", direction: "up", row: 1, col: 1, width: 1, height: 1, assetKey: "villager-1" },
    ]);

    const nextState = applyRotateUnit(state, "missing");
    expect(nextState).toBe(state);
    expect(nextState.puzzle.rotateChargesRemaining).toBe(1);
  });

  it("gate open does not block, closed gate blocks", () => {
    const entities: TribeOutEntity[] = [
      { id: "u1", type: "unit", direction: "right", row: 0, col: 0, width: 1, height: 1, assetKey: "villager-1" },
      { id: "g1", type: "gate", row: 0, col: 1, width: 1, height: 1, open: false },
    ];
    const state = buildState(entities);

    expect(canExit({ boardRows: 1, boardCols: 3 }, state.puzzle, state.puzzle.entities[0] as Extract<TribeOutEntity, { type: "unit" }>)).toBe(false);

    const openState = buildState([
      entities[0],
      { ...(entities[1] as Extract<TribeOutEntity, { type: "gate" }>), open: true },
    ]);
    expect(canExit({ boardRows: 1, boardCols: 3 }, openState.puzzle, openState.puzzle.entities[0] as Extract<TribeOutEntity, { type: "unit" }>)).toBe(true);
  });

  it("switch activates only on a successful exit", () => {
    const state = buildState([
      { id: "u1", type: "unit", direction: "right", row: 0, col: 0, width: 1, height: 1, assetKey: "villager-1" },
      { id: "s1", type: "switch", row: 0, col: 1, width: 1, height: 1, targetId: "g1", activated: false },
      { id: "g1", type: "gate", row: 1, col: 1, width: 1, height: 1, open: false },
    ]);
    const progress: TribeOutProgressSnapshot = {
      schemaVersion: 2,
      levelSetVersion: 2,
      unlockedLevelIds: ["level-001"],
      currentLevelId: "level-001",
      starsByLevelId: {},
    };

    const res = applyTapUnit("u1", state, progress);
    expect((res.nextState.puzzle.entities.find(entity => entity.id === "u1" && entity.type === "unit") as Extract<TribeOutEntity, { type: "unit" }> | undefined)?.escaped).toBe(true);
    expect((res.nextState.puzzle.entities.find(entity => entity.id === "s1" && entity.type === "switch") as Extract<TribeOutEntity, { type: "switch" }> | undefined)?.activated).toBe(true);
    expect((res.nextState.puzzle.entities.find(entity => entity.id === "g1" && entity.type === "gate") as Extract<TribeOutEntity, { type: "gate" }> | undefined)?.open).toBe(true);
  });

  it("switch does not activate if the path is blocked", () => {
    const state = buildState([
      { id: "u1", type: "unit", direction: "right", row: 0, col: 0, width: 1, height: 1, assetKey: "villager-1" },
      { id: "s1", type: "switch", row: 0, col: 1, width: 1, height: 1, targetId: "g1", activated: false },
      { id: "o1", type: "obstacle", row: 0, col: 2, width: 1, height: 1 },
      { id: "g1", type: "gate", row: 1, col: 1, width: 1, height: 1, open: false },
    ]);
    const progress: TribeOutProgressSnapshot = {
      schemaVersion: 2,
      levelSetVersion: 2,
      unlockedLevelIds: ["level-001"],
      currentLevelId: "level-001",
      starsByLevelId: {},
    };

    const res = applyTapUnit("u1", state, progress);
    expect(res.nextState.status).toBe("playing");
    expect(res.nextState.lives).toBe(2);
    expect((res.nextState.puzzle.entities.find(entity => entity.id === "s1" && entity.type === "switch") as Extract<TribeOutEntity, { type: "switch" }> | undefined)?.activated).toBe(false);
    expect((res.nextState.puzzle.entities.find(entity => entity.id === "g1" && entity.type === "gate") as Extract<TribeOutEntity, { type: "gate" }> | undefined)?.open).toBe(false);
  });

  it("occupied cells and forward traversal stay deterministic", () => {
    const entity = { id: "u1", type: "unit", direction: "down", row: 1, col: 2, width: 2, height: 1, assetKey: "villager-1" } as const;
    expect(getOccupiedCells(entity)).toEqual([
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ]);
    expect(getForwardCellsUntilExit(entity, 4, 5)).toEqual([
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ]);
  });

  it("buildOccupancyMap ignores switches and open gates", () => {
    const map = buildOccupancyMap([
      { id: "u1", type: "unit", direction: "right", row: 0, col: 0, width: 1, height: 1, assetKey: "villager-1" },
      { id: "s1", type: "switch", row: 0, col: 1, width: 1, height: 1, targetId: "g1", activated: false },
      { id: "g1", type: "gate", row: 0, col: 2, width: 1, height: 1, open: true },
    ]);

    expect(map.has("0,1")).toBe(false);
    expect(map.has("0,2")).toBe(false);
  });
});
