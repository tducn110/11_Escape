import type { TribeOutLevel } from "./types";

// ──────────────────────────────────────────────────────────────────────────────
// All 10 levels have been manually verified to be solvable.
// Solution order is documented per level.
// ──────────────────────────────────────────────────────────────────────────────

export const LEVELS: TribeOutLevel[] = [
  // ── LEVEL 1 ── 5×5 · 3 units · all free · tutorial ────────────────────────
  // Solution: any order (u1, u2, u3 all independent)
  {
    id: 1,
    boardRows: 5,
    boardCols: 5,
    lives: 3,
    tutorialText: "Chạm vào nhân vật để họ chạy thoát!",
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 1, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 0, col: 3, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 3, col: 4, width: 1, height: 1, direction: "left" },
    ],
  },

  // ── LEVEL 2 ── 5×5 · 4 units · two blocker chains ─────────────────────────
  // Solution: tap u2 → u1 (row 2); tap u4 → u3 (col 1)
  {
    id: 2,
    boardRows: 5,
    boardCols: 5,
    lives: 3,
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 2, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 2, col: 3, width: 1, height: 1, direction: "right" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 0, col: 1, width: 1, height: 1, direction: "down" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 3, col: 1, width: 1, height: 1, direction: "down" },
    ],
  },

  // ── LEVEL 3 ── 5×5 · 4 units · 1 obstacle · u1 blocks u4 ─────────────────
  // Solution: u2 (free), u3 (free), u1 (free) → u4 (free after u1)
  {
    id: 3,
    boardRows: 5,
    boardCols: 5,
    lives: 3,
    entities: [
      { id: "obs1", type: "obstacle", assetKey: "rock", row: 2, col: 2, width: 1, height: 1 },
      { id: "u1", type: "unit", assetKey: "villager-1", row: 0, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 3, col: 4, width: 1, height: 1, direction: "left" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 1, col: 3, width: 1, height: 1, direction: "up" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 4, col: 0, width: 1, height: 1, direction: "up" },
    ],
  },

  // ── LEVEL 4 ── 6×6 · 5 units · multi-direction · u2 blocks u1 ─────────────
  // Solution: u2 → u1; u3, u4, u5 independent
  {
    id: 4,
    boardRows: 6,
    boardCols: 6,
    lives: 3,
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 0, col: 2, width: 1, height: 1, direction: "down" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 3, col: 2, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 5, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 2, col: 5, width: 1, height: 1, direction: "left" },
      { id: "u5", type: "unit", assetKey: "villager-5", row: 4, col: 4, width: 1, height: 1, direction: "up" },
    ],
  },

  // ── LEVEL 5 ── 6×6 · 5 units · introduces 2×1 wide unit ──────────────────
  // Solution: u2 (free) → u_wide (free) → u3 (free); u4, u5 independent
  {
    id: 5,
    boardRows: 6,
    boardCols: 6,
    lives: 3,
    entities: [
      { id: "u_wide", type: "unit", assetKey: "villager-3", row: 2, col: 0, width: 2, height: 1, direction: "right" },
      { id: "u2",     type: "unit", assetKey: "villager-2", row: 2, col: 3, width: 1, height: 1, direction: "down" },
      { id: "u3",     type: "unit", assetKey: "villager-1", row: 0, col: 1, width: 1, height: 1, direction: "down" },
      { id: "u4",     type: "unit", assetKey: "villager-4", row: 5, col: 5, width: 1, height: 1, direction: "up" },
      { id: "u5",     type: "unit", assetKey: "villager-5", row: 4, col: 4, width: 1, height: 1, direction: "left" },
    ],
  },

  // ── LEVEL 6 ── 6×6 · 6 units · two chains ─────────────────────────────────
  // Chain A: u3 (free) → u2 → u1
  // Chain B: u5 (free) → u4
  // u6: free
  {
    id: 6,
    boardRows: 6,
    boardCols: 6,
    lives: 3,
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 0, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 0, col: 3, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 3, col: 3, width: 1, height: 1, direction: "right" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 5, col: 2, width: 1, height: 1, direction: "up" },
      { id: "u5", type: "unit", assetKey: "villager-5", row: 2, col: 2, width: 1, height: 1, direction: "right" },
      { id: "u6", type: "unit", assetKey: "villager-6", row: 4, col: 0, width: 1, height: 1, direction: "right" },
    ],
  },

  // ── LEVEL 7 ── 6×6 · 6 units · must tap u3 first ─────────────────────────
  // u3 (free) unlocks u1 and u2; u4 (free) → u5; u6 free
  {
    id: 7,
    boardRows: 6,
    boardCols: 6,
    lives: 3,
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 3, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 0, col: 3, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 3, col: 3, width: 1, height: 1, direction: "right" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 5, col: 5, width: 1, height: 1, direction: "left" },
      { id: "u5", type: "unit", assetKey: "villager-5", row: 1, col: 5, width: 1, height: 1, direction: "down" },
      { id: "u6", type: "unit", assetKey: "villager-6", row: 4, col: 1, width: 1, height: 1, direction: "up" },
    ],
  },

  // ── LEVEL 8 ── 6×6 · 6 units · 2 obstacles · long chain ──────────────────
  // Obstacles at corners (0,0) and (5,5)
  // Chain: u5 (free) → u2 → u3 → u1 and u6; u4 (free)
  {
    id: 8,
    boardRows: 6,
    boardCols: 6,
    lives: 3,
    entities: [
      { id: "obs1", type: "obstacle", assetKey: "rock", row: 0, col: 0, width: 1, height: 1 },
      { id: "obs2", type: "obstacle", assetKey: "rock", row: 5, col: 5, width: 1, height: 1 },
      { id: "u1", type: "unit", assetKey: "villager-1", row: 1, col: 1, width: 1, height: 1, direction: "right" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 1, col: 4, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 1, col: 3, width: 1, height: 1, direction: "right" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 5, col: 2, width: 1, height: 1, direction: "up" },
      { id: "u5", type: "unit", assetKey: "villager-5", row: 4, col: 4, width: 1, height: 1, direction: "left" },
      { id: "u6", type: "unit", assetKey: "villager-6", row: 0, col: 3, width: 1, height: 1, direction: "down" },
    ],
  },

  // ── LEVEL 9 ── 7×7 · 7 units · bigger board ──────────────────────────────
  // u2 → u1; u4 → u6; u7 → u5; u3 independent
  {
    id: 9,
    boardRows: 7,
    boardCols: 7,
    lives: 3,
    entities: [
      { id: "u1", type: "unit", assetKey: "villager-1", row: 0, col: 2, width: 1, height: 1, direction: "down" },
      { id: "u2", type: "unit", assetKey: "villager-2", row: 4, col: 2, width: 1, height: 1, direction: "down" },
      { id: "u3", type: "unit", assetKey: "villager-3", row: 3, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u4", type: "unit", assetKey: "villager-4", row: 6, col: 5, width: 1, height: 1, direction: "up" },
      { id: "u5", type: "unit", assetKey: "villager-5", row: 5, col: 6, width: 1, height: 1, direction: "up" },
      { id: "u6", type: "unit", assetKey: "villager-6", row: 6, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u7", type: "unit", assetKey: "villager-7", row: 2, col: 6, width: 1, height: 1, direction: "left" },
    ],
  },

  // ── LEVEL 10 ── 7×7 · 8 units · 2×1 unit · long chain ────────────────────
  // u2 (free) → u_wide → u3, u6; u6 → u5 → u8; u4 after u2; u7 free
  {
    id: 10,
    boardRows: 7,
    boardCols: 7,
    lives: 3,
    entities: [
      { id: "u_wide", type: "unit", assetKey: "villager-5", row: 3, col: 2, width: 2, height: 1, direction: "right" },
      { id: "u2",     type: "unit", assetKey: "villager-2", row: 3, col: 4, width: 1, height: 1, direction: "right" },
      { id: "u3",     type: "unit", assetKey: "villager-1", row: 0, col: 2, width: 1, height: 1, direction: "down" },
      { id: "u4",     type: "unit", assetKey: "villager-4", row: 0, col: 4, width: 1, height: 1, direction: "down" },
      { id: "u5",     type: "unit", assetKey: "villager-3", row: 6, col: 1, width: 1, height: 1, direction: "right" },
      { id: "u6",     type: "unit", assetKey: "villager-6", row: 6, col: 3, width: 1, height: 1, direction: "up" },
      { id: "u7",     type: "unit", assetKey: "villager-7", row: 2, col: 0, width: 1, height: 1, direction: "right" },
      { id: "u8",     type: "unit", assetKey: "villager-1", row: 1, col: 1, width: 1, height: 1, direction: "down" },
    ],
  },
];
