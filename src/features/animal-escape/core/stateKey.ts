import { buildOccupancyMap } from "./occupancy";
import { getOccupiedCells } from "./geometry";
import type { PuzzleState } from "../types";

/**
 * Deterministic canonical key of a puzzle state.
 *
 * Entities are sorted by id so equivalent states (same entities, same
 * escapes/flags) collapse to the same key regardless of array order.
 */
export function getStateKey(state: PuzzleState): string {
  const parts = state.entities
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(entity => {
      const base = `${entity.id}:${entity.type}:${entity.row},${entity.col}:${entity.width}x${entity.height}`;
      switch (entity.type) {
        case "unit":
          return `${base}:${entity.direction}:${entity.escaped ? "out" : "in"}`;
        case "gate":
          return `${base}:${entity.open ? "open" : "closed"}`;
        case "switch":
          return `${base}:${entity.activated ? "on" : "off"}`;
        default:
          return base;
      }
    });
  return `${state.rotateChargesRemaining}|${parts.join("|")}`;
}

/** Serialized JSON form of a puzzle state (used by reports/evidence). */
export function serializePuzzleState(state: PuzzleState): string {
  return JSON.stringify({ ...state, entities: state.entities.map(entity => ({ ...entity })) });
}

export function occupancyReport(state: PuzzleState): Record<string, string> {
  const map = buildOccupancyMap(state.entities);
  const report: Record<string, string> = {};
  for (const [key, id] of map) {
    report[key] = id;
  }
  return report;
}

export { getOccupiedCells };