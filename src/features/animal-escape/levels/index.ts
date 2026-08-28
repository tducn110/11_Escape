import type { AnimalEscapeLevel, DifficultyPhase } from "../types";
import {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
  LEVEL_6,
  LEVEL_7,
  LEVEL_8,
  LEVEL_9,
  LEVEL_10,
  LEVEL_11,
  LEVEL_12,
  LEVEL_13,
  LEVEL_14,
  LEVEL_15,
  LEVEL_16,
  LEVEL_17,
  LEVEL_18,
  LEVEL_19,
  LEVEL_20,
} from "./catalog";

export const LEVEL_SET_VERSION = 4;

function authoredLevel(index: number, phase: DifficultyPhase, level: object): AnimalEscapeLevel {
  return {
    id: `level-${String(index).padStart(3, "0")}` as AnimalEscapeLevel["id"],
    phase,
    ...(level as Omit<AnimalEscapeLevel, "id" | "phase">),
  };
}

/**
 * The production catalog — exactly 20 authored levels.
 *
 * Progression intent:
 *  L01-03  basic tap / direction / free exits
 *  L04-06  collision + escape ordering
 *  L07-09  multi-cell footprint + ordering chains
 *  L10-12  rotate (turn facing direction) introduced, rock dodging
 *  L13-15  switch -> gate dependency
 *  L16-17  switch/gate chains with ordering
 *  L18-19  mixed mechanics
 *  L20    mastery
 *
 * `phase` mirrors the catalog position (1..5, 4 levels each) and is used by
 * the difficulty contracts; runtime progression derives everything from
 * LEVELS.length / index, never from hard-coded limits.
 */
export const LEVELS: readonly AnimalEscapeLevel[] = [
  authoredLevel(1, 1, LEVEL_1),
  authoredLevel(2, 1, LEVEL_2),
  authoredLevel(3, 1, LEVEL_3),
  authoredLevel(4, 1, LEVEL_4),
  authoredLevel(5, 2, LEVEL_5),
  authoredLevel(6, 2, LEVEL_6),
  authoredLevel(7, 2, LEVEL_7),
  authoredLevel(8, 2, LEVEL_8),
  authoredLevel(9, 3, LEVEL_9),
  authoredLevel(10, 3, LEVEL_10),
  authoredLevel(11, 3, LEVEL_11),
  authoredLevel(12, 3, LEVEL_12),
  authoredLevel(13, 4, LEVEL_13),
  authoredLevel(14, 4, LEVEL_14),
  authoredLevel(15, 4, LEVEL_15),
  authoredLevel(16, 4, LEVEL_16),
  authoredLevel(17, 5, LEVEL_17),
  authoredLevel(18, 5, LEVEL_18),
  authoredLevel(19, 5, LEVEL_19),
  authoredLevel(20, 5, LEVEL_20),
];

export const LEVEL_BY_ID: ReadonlyMap<AnimalEscapeLevel["id"], AnimalEscapeLevel> = new Map(
  LEVELS.map(level => [level.id, level] as const),
);

export const LEVEL_INDEX_BY_ID: ReadonlyMap<AnimalEscapeLevel["id"], number> = new Map(
  LEVELS.map((level, index) => [level.id, index] as const),
);
