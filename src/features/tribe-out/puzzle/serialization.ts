import type { PuzzleAction, PuzzleState } from "./types";

export function getActionKey(action: PuzzleAction): string {
  return `${action.type}:${action.entityId}`;
}

export function getStateKey(state: PuzzleState): string {
  const entities = [...state.entities].map(entity => {
    if (entity.type === "unit") {
      return `u:${entity.id}:${entity.escaped ? 1 : 0}:${entity.direction}`;
    }
    if (entity.type === "gate") {
      return `g:${entity.id}:${entity.open ? 1 : 0}`;
    }
    if (entity.type === "switch") {
      return `s:${entity.id}:${entity.activated ? 1 : 0}:${entity.targetId}`;
    }
    return `o:${entity.id}`;
  }).sort();

  return `r:${state.rotateChargesRemaining}|${entities.join("|")}`;
}
