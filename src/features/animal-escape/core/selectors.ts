import { buildOccupancyMap } from "./occupancy";
import { getForwardCellsUntilExit, getOccupiedCells } from "./geometry";
import type { EntityId, PuzzleAction, AnimalEscapeLevel, PuzzleEntity, PuzzleState, UnitEntity } from "../types";

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

export function canExitUnit(level: Pick<AnimalEscapeLevel, "boardRows" | "boardCols">, state: PuzzleState, unit: UnitEntity): boolean {
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

function compareByEntityId<T extends { entityId: EntityId }>(left: T, right: T): number {
  return left.entityId.localeCompare(right.entityId);
}

export function listLegalExitActions(
  level: Pick<AnimalEscapeLevel, "boardRows" | "boardCols">,
  state: PuzzleState,
): Array<{ type: "exit"; entityId: EntityId }> {
  const actions: Array<{ type: "exit"; entityId: EntityId }> = [];
  for (const entity of state.entities) {
    if (entity.type !== "unit" || entity.escaped) continue;
    if (canExitUnit(level, state, entity)) {
      actions.push({ type: "exit", entityId: entity.id });
    }
  }
  return actions.sort(compareByEntityId);
}

export function listLegalRotateActions(state: PuzzleState): Array<{ type: "rotate"; entityId: EntityId }> {
  if (state.rotateChargesRemaining <= 0) {
    return [];
  }

  return state.entities
    .filter((entity): entity is UnitEntity => entity.type === "unit" && !entity.escaped)
    .map(entity => ({ type: "rotate" as const, entityId: entity.id }))
    .sort(compareByEntityId);
}

export function listLegalPuzzleActions(level: Pick<AnimalEscapeLevel, "boardRows" | "boardCols">, state: PuzzleState): PuzzleAction[] {
  return [
    ...listLegalExitActions(level, state),
    ...listLegalRotateActions(state),
  ];
}

export function isPuzzleComplete(state: PuzzleState): boolean {
  return state.entities.filter(entity => entity.type === "unit").every(entity => entity.escaped);
}

export function getPathCells(unit: UnitEntity, level: Pick<AnimalEscapeLevel, "boardRows" | "boardCols">): { row: number; col: number }[] {
  return [...getOccupiedCells(unit), ...getForwardCellsUntilExit(unit, level.boardRows, level.boardCols)];
}
