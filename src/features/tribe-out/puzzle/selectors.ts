import { buildOccupancyMap } from "./occupancy";
import { getForwardCellsUntilExit, getOccupiedCells } from "./geometry";
import type { EntityId, PuzzleAction, PuzzleEntity, PuzzleLevel, PuzzleState, UnitEntity } from "./types";

export function getEntityById(state: PuzzleState, entityId: EntityId): PuzzleEntity | undefined {
  return state.entities.find(entity => entity.id === entityId);
}

export function getLiveUnitById(state: PuzzleState, entityId: EntityId): UnitEntity | undefined {
  const entity = getEntityById(state, entityId);
  if (!entity || entity.type !== "unit" || entity.escaped) {
    return undefined;
  }
  return entity;
}

export function canExitUnit(level: Pick<PuzzleLevel, "boardRows" | "boardCols">, state: PuzzleState, unit: UnitEntity): boolean {
  const occupancyMap = buildOccupancyMap(state.entities);
  const forwardCells = getForwardCellsUntilExit(unit, level.boardRows, level.boardCols);

  for (const cell of forwardCells) {
    const occupantId = occupancyMap.get(`${cell.row},${cell.col}`);
    if (occupantId && occupantId !== unit.id) {
      return false;
    }
  }

  return true;
}

export function listLegalPuzzleActions(level: Pick<PuzzleLevel, "boardRows" | "boardCols">, state: PuzzleState): PuzzleAction[] {
  const actions: PuzzleAction[] = [];

  for (const entity of state.entities) {
    if (entity.type !== "unit" || entity.escaped) continue;

    actions.push({ type: "rotate", entityId: entity.id });
    if (canExitUnit(level, state, entity)) {
      actions.push({ type: "exit", entityId: entity.id });
    }
  }

  return actions;
}

export function isPuzzleComplete(state: PuzzleState): boolean {
  return state.entities.filter(entity => entity.type === "unit").every(entity => entity.escaped);
}

export function getPathCells(unit: UnitEntity, level: Pick<PuzzleLevel, "boardRows" | "boardCols">): { row: number; col: number }[] {
  return [...getOccupiedCells(unit), ...getForwardCellsUntilExit(unit, level.boardRows, level.boardCols)];
}
