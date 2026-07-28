import type { PuzzleAction, PuzzleLevel, PuzzleState } from "../../src/features/tribe-out/types";
import { applyPuzzleAction, createInitialPuzzleState, getStateKey, isPuzzleComplete, listLegalPuzzleActions } from "./domain";

export interface SolveStep {
  action: PuzzleAction;
  stateKey: string;
}

export interface SolveResult {
  solved: boolean;
  steps: SolveStep[];
  visitedCount: number;
}

export function solveLevel(level: PuzzleLevel, maxVisited = 2000): SolveResult {
  const initialState = createInitialPuzzleState(level);
  const queue: Array<{ state: PuzzleState; steps: SolveStep[] }> = [{ state: initialState, steps: [] }];
  const seen = new Set<string>([getStateKey(initialState)]);
  let index = 0;

  while (index < queue.length && seen.size <= maxVisited) {
    const current = queue[index++];
    if (isPuzzleComplete(current.state)) {
      return { solved: true, steps: current.steps, visitedCount: seen.size };
    }

    for (const action of listLegalPuzzleActions(level, current.state)) {
      const result = applyPuzzleAction(level, current.state, action);
      if (result.outcome !== "accepted") continue;

      const nextKey = getStateKey(result.nextState);
      if (seen.has(nextKey)) continue;
      seen.add(nextKey);
      queue.push({
        state: result.nextState,
        steps: [...current.steps, { action, stateKey: nextKey }],
      });
    }
  }

  return { solved: false, steps: [], visitedCount: seen.size };
}
