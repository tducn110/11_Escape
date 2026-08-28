import { getPathCells, getLiveUnitById, isPuzzleComplete } from "./selectors";
import { getOccupiedCells } from "./geometry";
import type { PuzzleAction, PuzzleActionResult, PuzzleEntity, AnimalEscapeLevel, PuzzleState, UnitEntity } from "../types";
import { cellKey, buildOccupancyMap } from "./occupancy";

function cloneEntity(entity: PuzzleEntity): PuzzleEntity {
  return { ...entity } as PuzzleEntity;
}

export function rotateClockwise(direction: UnitEntity["direction"]): UnitEntity["direction"] {
  switch (direction) {
    case "up": return "right";
    case "right": return "down";
    case "down": return "left";
    case "left": return "up";
  }
}

export function createInitialPuzzleState(level: AnimalEscapeLevel): PuzzleState {
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
    rotateChargesRemaining: level.rotateCharges,
  };
}

function applyExit(level: AnimalEscapeLevel, state: PuzzleState, unit: UnitEntity): PuzzleActionResult {
  const occupancyMap = buildOccupancyMap(state.entities);
  const pathCells = getPathCells(unit, level);
  for (const cell of pathCells) {
    const occupantId = occupancyMap.get(cellKey(cell.row, cell.col));
    if (occupantId && occupantId !== unit.id) {
      return {
        action: { type: "exit", entityId: unit.id },
        nextState: state,
        outcome: "blocked_path",
        accepted: false,
        details: {
          activatedSwitchIds: [],
          openedGateIds: [],
          consumedRotateCharge: false,
          completedPuzzle: false,
        },
      };
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
    action: { type: "exit", entityId: unit.id },
    nextState: { ...state, entities: nextEntities },
    outcome: "accepted",
    accepted: true,
    details: {
      activatedSwitchIds: [...activatedSwitchIds].sort(),
      openedGateIds: [...openGateIds].sort(),
      consumedRotateCharge: false,
      completedPuzzle: isPuzzleComplete({ ...state, entities: nextEntities }),
    },
  };
}

function applyRotate(state: PuzzleState, unit: UnitEntity): PuzzleActionResult {
  if (state.rotateChargesRemaining <= 0) {
    return {
      action: { type: "rotate", entityId: unit.id },
      nextState: state,
      outcome: "no_charges",
      accepted: false,
      details: {
        activatedSwitchIds: [],
        openedGateIds: [],
        consumedRotateCharge: false,
        completedPuzzle: false,
      },
    };
  }

  const nextEntities = state.entities.map(entity => {
    if (entity.id !== unit.id || entity.type !== "unit" || entity.escaped) {
      return entity;
    }
    return { ...entity, direction: rotateClockwise(entity.direction) };
  });

  return {
    action: { type: "rotate", entityId: unit.id },
    nextState: {
      ...state,
      entities: nextEntities,
      rotateChargesRemaining: state.rotateChargesRemaining - 1,
    },
    outcome: "accepted",
    accepted: true,
    details: {
      activatedSwitchIds: [],
      openedGateIds: [],
      consumedRotateCharge: true,
      completedPuzzle: false,
    },
  };
}

export function applyPuzzleAction(level: AnimalEscapeLevel, state: PuzzleState, action: PuzzleAction): PuzzleActionResult {
  if (isPuzzleComplete(state)) {
    return {
      action,
      nextState: state,
      outcome: "already_complete",
      accepted: false,
      details: {
        activatedSwitchIds: [],
        openedGateIds: [],
        consumedRotateCharge: false,
        completedPuzzle: true,
      },
    };
  }

  if (action.type === "exit") {
    const unit = getLiveUnitById(state, action.entityId);
    if (!unit) {
      return {
        action,
        nextState: state,
        outcome: "invalid_target",
        accepted: false,
        details: {
          activatedSwitchIds: [],
          openedGateIds: [],
          consumedRotateCharge: false,
          completedPuzzle: false,
        },
      };
    }
    return applyExit(level, state, unit);
  }

  const unit = getLiveUnitById(state, action.entityId);
  if (!unit) {
    return {
      action,
      nextState: state,
      outcome: "invalid_target",
      accepted: false,
      details: {
        activatedSwitchIds: [],
        openedGateIds: [],
        consumedRotateCharge: false,
        completedPuzzle: false,
      },
    };
  }
  return applyRotate(state, unit);
}

export { isPuzzleComplete };