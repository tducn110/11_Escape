import type { Direction, EntityId, PuzzleEntity } from "../../../src/features/tribe-out/types";

export type Ledger = Set<string>;
export function key(row: number, col: number): string {
  return `${row},${col}`;
}

/** Deterministic PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string into a 32-bit seed. */
export function strSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rotateClockwise(direction: Direction): Direction {
  switch (direction) {
    case "up": return "right";
    case "right": return "down";
    case "down": return "left";
    case "left": return "up";
  }
}

export function rotateCounterClockwise(direction: Direction): Direction {
  switch (direction) {
    case "up": return "left";
    case "left": return "down";
    case "down": return "right";
    case "right": return "up";
  }
}

export const ALL_DIRECTIONS: Direction[] = ["up", "right", "down", "left"];

export function moveForward(row: number, col: number, direction: Direction, distance = 1): [number, number] {
  switch (direction) {
    case "up": return [row - distance, col];
    case "right": return [row, col + distance];
    case "down": return [row + distance, col];
    case "left": return [row, col - distance];
  }
}

let assetCounter = 0;

export function unit(
  id: EntityId,
  row: number,
  col: number,
  direction: Direction,
  width = 1,
  height = 1,
  assetKey = `villager-${((assetCounter++ % 7) + 1)}`,
): PuzzleEntity {
  return { id, type: "unit", assetKey, row, col, width, height, direction, escaped: false };
}

export function obstacle(id: EntityId, row: number, col: number, width = 1, height = 1): PuzzleEntity {
  return { id, type: "obstacle", assetKey: "rock", row, col, width, height };
}

export function gate(id: EntityId, row: number, col: number, open = false): PuzzleEntity {
  return { id, type: "gate", assetKey: open ? "gate-open" : "gate-closed", row, col, width: 1, height: 1, open };
}

export function switchEntity(
  id: EntityId,
  row: number,
  col: number,
  targetId: EntityId,
  activated = false,
): PuzzleEntity {
  return {
    id,
    type: "switch",
    assetKey: activated ? "switch-active" : "switch-inactive",
    row,
    col,
    width: 1,
    height: 1,
    targetId,
    activated,
  };
}

/** Check the forward path from a 1x1 unit at (row,col) in `dir` is clear to the edge. */
export function directionClear(
  ledger: Ledger,
  row: number,
  col: number,
  dir: Direction,
  boardRows: number,
  boardCols: number,
): boolean {
  if (dir === "right") {
    for (let c = col + 1; c < boardCols; c += 1) if (ledger.has(key(row, c))) return false;
  } else if (dir === "left") {
    for (let c = col - 1; c >= 0; c -= 1) if (ledger.has(key(row, c))) return false;
  } else if (dir === "down") {
    for (let r = row + 1; r < boardRows; r += 1) if (ledger.has(key(r, col))) return false;
  } else {
    for (let r = row - 1; r >= 0; r -= 1) if (ledger.has(key(r, col))) return false;
  }
  return true;
}
