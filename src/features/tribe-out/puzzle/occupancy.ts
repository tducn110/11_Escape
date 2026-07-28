import { getOccupiedCells } from "./geometry";
import type { EntityId, PuzzleEntity } from "./types";

export function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function buildOccupancyMap(entities: readonly PuzzleEntity[]): Map<string, EntityId> {
  const map = new Map<string, EntityId>();

  for (const entity of entities) {
    if (entity.type === "unit" && entity.escaped) continue;
    if (entity.type === "gate" && entity.open) continue;
    if (entity.type === "switch") continue;

    for (const cell of getOccupiedCells(entity)) {
      map.set(cellKey(cell.row, cell.col), entity.id);
    }
  }

  return map;
}
