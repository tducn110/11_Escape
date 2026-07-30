import type { LevelId, PuzzleAction, PuzzleLevel, PuzzleState } from "../../src/features/tribe-out/types";
import {
  applyPuzzleAction,
  createInitialPuzzleState,
  getStateKey,
  isPuzzleComplete,
  listLegalExitActions,
  listLegalRotateActions,
} from "./domain";

export type SolveStatus = "SOLVABLE" | "UNSOLVABLE" | "INCONCLUSIVE";
export type SolverPath = "FAST_EXIT_CLOSURE" | "STATEFUL_ROTATE_SEARCH";

export interface SolveCost {
  rotateCount: number;
  totalActionCount: number;
}

export interface SolverDiagnostics {
  exploredStates: number;
  generatedStates: number;
  prunedDominatedStates: number;
  collapsedExitActions: number;
  frontierPeak: number;
  elapsedMs: number;
  stateBudget: number;
  timeBudgetMs: number;
}

export interface SolveStep {
  action: PuzzleAction;
  stateKey: string;
}

export interface SolveResult {
  levelId: LevelId;
  status: SolveStatus;
  solverPath: SolverPath;
  cost: SolveCost | null;
  actions: SolveStep[];
  finalStateKey: string | null;
  diagnostics: SolverDiagnostics;
  reason: string | null;
}

export interface SolverBudget {
  stateBudget: number;
  timeBudgetMs: number;
}

export const DEFAULT_SOLVER_BUDGET: SolverBudget = {
  stateBudget: 250_000,
  timeBudgetMs: 5_000,
};

interface ExitClosureResult {
  state: PuzzleState;
  steps: SolveStep[];
}

interface SearchNode {
  state: PuzzleState;
  stateKey: string;
  rotateCount: number;
  totalActionCount: number;
  actions: SolveStep[];
}

function compareNode(left: SearchNode, right: SearchNode): number {
  if (left.rotateCount !== right.rotateCount) {
    return left.rotateCount - right.rotateCount;
  }
  if (left.totalActionCount !== right.totalActionCount) {
    return left.totalActionCount - right.totalActionCount;
  }
  return left.stateKey.localeCompare(right.stateKey);
}

function compareCost(left: SolveCost, right: SolveCost): number {
  if (left.rotateCount !== right.rotateCount) {
    return left.rotateCount - right.rotateCount;
  }
  return left.totalActionCount - right.totalActionCount;
}

export function applyDeterministicExitClosure(level: PuzzleLevel, initialState: PuzzleState): ExitClosureResult {
  let state = initialState;
  const steps: SolveStep[] = [];

  while (!isPuzzleComplete(state)) {
    const exits = listLegalExitActions(level, state);
    if (exits.length === 0) {
      break;
    }

    const action = exits[0];
    const result = applyPuzzleAction(level, state, action);
    if (!result.accepted) {
      break;
    }

    state = result.nextState;
    steps.push({
      action,
      stateKey: getStateKey(state),
    });
  }

  return { state, steps };
}

function verifyReplay(level: PuzzleLevel, steps: SolveStep[], expectedFinalStateKey: string): boolean {
  let state = createInitialPuzzleState(level);

  for (const step of steps) {
    const result = applyPuzzleAction(level, state, step.action);
    if (!result.accepted) {
      return false;
    }
    state = result.nextState;
  }

  return isPuzzleComplete(state) && getStateKey(state) === expectedFinalStateKey;
}

function buildSolveResult(
  level: PuzzleLevel,
  status: SolveStatus,
  solverPath: SolverPath,
  actions: SolveStep[],
  diagnostics: SolverDiagnostics,
  reason: string | null,
): SolveResult {
  const finalStateKey = actions.at(-1)?.stateKey ?? getStateKey(createInitialPuzzleState(level));
  const rotateCount = actions.filter(step => step.action.type === "rotate").length;
  const cost = status === "SOLVABLE"
    ? {
        rotateCount,
        totalActionCount: actions.length,
      }
    : null;

  return {
    levelId: level.id,
    status,
    solverPath,
    cost,
    actions,
    finalStateKey: status === "SOLVABLE" ? finalStateKey : null,
    diagnostics,
    reason,
  };
}

function solveFromInitialState(
  level: PuzzleLevel,
  initialState: PuzzleState,
  budget: Partial<SolverBudget> = {},
): SolveResult {
  const stateBudget = budget.stateBudget ?? DEFAULT_SOLVER_BUDGET.stateBudget;
  const timeBudgetMs = budget.timeBudgetMs ?? DEFAULT_SOLVER_BUDGET.timeBudgetMs;
  const startedAt = Date.now();

  let exploredStates = 0;
  let generatedStates = 0;
  let prunedDominatedStates = 0;
  let collapsedExitActions = 0;
  let frontierPeak = 0;

  const initialClosure = applyDeterministicExitClosure(level, initialState);
  collapsedExitActions += initialClosure.steps.length;
  exploredStates += 1;

  const baseDiagnostics = (): SolverDiagnostics => ({
    exploredStates,
    generatedStates,
    prunedDominatedStates,
    collapsedExitActions,
    frontierPeak,
    elapsedMs: Date.now() - startedAt,
    stateBudget,
    timeBudgetMs,
  });

  if (isPuzzleComplete(initialClosure.state)) {
    const result = buildSolveResult(level, "SOLVABLE", "FAST_EXIT_CLOSURE", initialClosure.steps, baseDiagnostics(), null);
    if (!result.finalStateKey || !verifyReplay(level, result.actions, result.finalStateKey)) {
      return buildSolveResult(level, "INCONCLUSIVE", "FAST_EXIT_CLOSURE", [], baseDiagnostics(), "replay-verification-failed");
    }
    return result;
  }

  if (initialClosure.state.rotateChargesRemaining <= 0) {
    return buildSolveResult(level, "UNSOLVABLE", "FAST_EXIT_CLOSURE", [], baseDiagnostics(), "no-rotate-solution");
  }

  const initialKey = getStateKey(initialClosure.state);
  const frontier: SearchNode[] = [{
    state: initialClosure.state,
    stateKey: initialKey,
    rotateCount: 0,
    totalActionCount: initialClosure.steps.length,
    actions: initialClosure.steps,
  }];
  const bestByState = new Map<string, SolveCost>([
    [initialKey, { rotateCount: 0, totalActionCount: initialClosure.steps.length }],
  ]);

  while (frontier.length > 0) {
    frontier.sort(compareNode);
    frontierPeak = Math.max(frontierPeak, frontier.length);

    if (exploredStates >= stateBudget) {
      return buildSolveResult(level, "INCONCLUSIVE", "STATEFUL_ROTATE_SEARCH", [], baseDiagnostics(), "state-budget-exhausted");
    }
    if (Date.now() - startedAt > timeBudgetMs) {
      return buildSolveResult(level, "INCONCLUSIVE", "STATEFUL_ROTATE_SEARCH", [], baseDiagnostics(), "time-budget-exhausted");
    }

    const current = frontier.shift()!;
    exploredStates += 1;

    if (isPuzzleComplete(current.state)) {
      const result = buildSolveResult(level, "SOLVABLE", "STATEFUL_ROTATE_SEARCH", current.actions, baseDiagnostics(), null);
      if (!result.finalStateKey || !verifyReplay(level, result.actions, result.finalStateKey)) {
        return buildSolveResult(level, "INCONCLUSIVE", "STATEFUL_ROTATE_SEARCH", [], baseDiagnostics(), "replay-verification-failed");
      }
      return result;
    }

    for (const action of listLegalRotateActions(current.state)) {
      const rotateResult = applyPuzzleAction(level, current.state, action);
      generatedStates += 1;
      if (!rotateResult.accepted) {
        continue;
      }

      const closure = applyDeterministicExitClosure(level, rotateResult.nextState);
      collapsedExitActions += closure.steps.length;
      const nextState = closure.state;
      const nextStateKey = getStateKey(nextState);
      const nextActions = [
        ...current.actions,
        { action, stateKey: getStateKey(rotateResult.nextState) },
        ...closure.steps,
      ];
      const nextCost: SolveCost = {
        rotateCount: current.rotateCount + 1,
        totalActionCount: nextActions.length,
      };
      const bestKnown = bestByState.get(nextStateKey);

      if (bestKnown && compareCost(bestKnown, nextCost) <= 0) {
        prunedDominatedStates += 1;
        continue;
      }

      bestByState.set(nextStateKey, nextCost);
      frontier.push({
        state: nextState,
        stateKey: nextStateKey,
        rotateCount: nextCost.rotateCount,
        totalActionCount: nextCost.totalActionCount,
        actions: nextActions,
      });
    }
  }

  return buildSolveResult(level, "UNSOLVABLE", "STATEFUL_ROTATE_SEARCH", [], baseDiagnostics(), "search-exhausted");
}

export function solveLevel(level: PuzzleLevel, budget: Partial<SolverBudget> = {}): SolveResult {
  return solveFromInitialState(level, createInitialPuzzleState(level), budget);
}

export function solveFromState(
  level: PuzzleLevel,
  initialState: PuzzleState,
  budget: Partial<SolverBudget> = {},
): SolveResult {
  return solveFromInitialState(level, initialState, budget);
}
