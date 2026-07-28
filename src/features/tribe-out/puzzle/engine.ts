import { getPathCells, getLiveUnitById, isPuzzleComplete } from "./selectors";
import { getOccupiedCells } from "./geometry";
import type { PuzzleAction, PuzzleActionResult, PuzzleEntity, PuzzleLevel, PuzzleState, UnitEntity } from "./types";
import { cellKey, buildOccupancyMap } from "./occupancy";

function cloneEntity(entity: PuzzleEntity): PuzzleEntity {
  return { ...entity } as PuzzleEntity;
}

function rotateClockwise(direction: UnitEntity["direction"]): UnitEntity["direction"] {
  switch (direction) {
    case "up": return "right";
    case "right": return "down";
    case "down": return "left";
    case "left": return "up";
  }
}

export function createInitialPuzzleState(level: PuzzleLevel): PuzzleState {
  return {
    entities: level.entities.map(entity => {
      if (entity.type === "unit") {
        return { ...entity, escaped: false };
      }
      if (entity.type === "gate") {
        return { ...entity, open: Boolean(entity.open) };
      }
      if (entity.type === "switch") {
        return { ...entity, activated: Boolean(entity.activated) };
      }
      return cloneEntity(entity);
    }),
    rotateChargesRemaining: level.rotateCharges ?? 1,
  };
}

function applyExit(level: PuzzleLevel, state: PuzzleState, unit: UnitEntity): PuzzleActionResult {
  const occupancyMap = buildOccupancyMap(state.entities);
  const pathCells = getPathCells(unit, level);
  for (const cell of pathCells) {
    const occupantId = occupancyMap.get(cellKey(cell.row, cell.col));
    if (occupantId && occupantId !== unit.id) {
      return { nextState: state, outcome: "blocked_path" };
    }
  }

  const activatedSwitchIds = new Set<string>();
  for (const entity of state.entities) {
    if (entity.type !== "switch" || entity.activated) continue;
    const switchCells = getOccupiedCells(entity);
    if (switchCells.some(cell => pathCells.some(pathCell => pathCell.row === cell.row && pathCell.col === cell.col))) {
      activatedSwitchIds.add(entity.id);
    }
  }

  const openGateIds = new Set<string>();
  for (const entity of state.entities) {
    if (entity.type !== "switch" || !activatedSwitchIds.has(entity.id)) continue;
    if (entity.targetId) {
      openGateIds.add(entity.targetId);
    }
  }

  const nextEntities = state.entities.map((entity: PuzzleEntity) => {
    if (entity.id === unit.id && entity.type === "unit") {
      return { ...entity, escaped: true };
    }
    if (entity.type === "switch" && activatedSwitchIds.has(entity.id)) {
      return { ...entity, activated: true };
    }
    if (entity.type === "gate" && openGateIds.has(entity.id)) {
      return { ...entity, open: true };
    }
    return entity;
  });

  return {
    nextState: { ...state, entities: nextEntities },
    outcome: "accepted",
  };
}

function applyRotate(state: PuzzleState, unit: UnitEntity): PuzzleActionResult {
  if (state.rotateChargesRemaining <= 0) {
    return { nextState: state, outcome: "no_charges" };
  }

  const nextEntities = state.entities.map(entity => {
    if (entity.id !== unit.id || entity.type !== "unit" || entity.escaped) {
      return entity;
    }
    return { ...entity, direction: rotateClockwise(entity.direction) };
  });

  return {
    nextState: {
      ...state,
      entities: nextEntities,
      rotateChargesRemaining: state.rotateChargesRemaining - 1,
    },
    outcome: "accepted",
  };
}

export function applyPuzzleAction(level: PuzzleLevel, state: PuzzleState, action: PuzzleAction): PuzzleActionResult {
  if (action.type === "exit") {
    const unit = getLiveUnitById(state, action.entityId);
    if (!unit) {
      return { nextState: state, outcome: "invalid_target" };
    }
    return applyExit(level, state, unit);
  }

  const unit = getLiveUnitById(state, action.entityId);
  if (!unit) {
    return { nextState: state, outcome: "invalid_target" };
  }
  return applyRotate(state, unit);
}

export { isPuzzleComplete };
