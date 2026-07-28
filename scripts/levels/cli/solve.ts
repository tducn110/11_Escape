import { LEVELS } from "../domain";
import { solveLevel } from "../solver";
import { writeSolutionsReport } from "../reports";

const solvedResults = LEVELS.map(level => {
  const result = solveLevel(level);
  const status: "SOLVABLE" | "UNSOLVABLE" = result.solved ? "SOLVABLE" : "UNSOLVABLE";
  return {
    levelId: level.id,
    status,
    solverPath: "FAST_EXIT_CLOSURE" as const,
    cost: null,
    actions: result.steps,
    finalStateKey: result.steps.at(-1)?.stateKey ?? null,
    diagnostics: {
      exploredStates: result.visitedCount,
      generatedStates: result.visitedCount,
      prunedDominatedStates: 0,
      collapsedExitActions: 0,
      frontierPeak: 0,
      elapsedMs: 0,
      stateBudget: 0,
      timeBudgetMs: 0,
    },
    reason: result.solved ? null : "solver-scaffold-incomplete",
    solved: result.solved,
  };
});

const solved = solvedResults.filter(result => result.solved).length;
writeSolutionsReport(solvedResults.map(({ solved, ...result }) => result));
console.log(JSON.stringify({ total: LEVELS.length, solved, results: solvedResults.map(({ solved, ...result }) => result) }, null, 2));
