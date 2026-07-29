import { LEVELS } from "../domain";
import { solveLevel } from "../solver";
import { writeSolutionsReport } from "../reports";

const results = LEVELS.map(level => solveLevel(level));
writeSolutionsReport(results);

const solved = results.filter(result => result.status === "SOLVABLE").length;
const unsolved = results.filter(result => result.status === "UNSOLVABLE").length;
const inconclusive = results.filter(result => result.status === "INCONCLUSIVE").length;

if (unsolved > 0 || inconclusive > 0) {
  process.exitCode = 1;
}

console.log(JSON.stringify({
  total: LEVELS.length,
  solved,
  unsolved,
  inconclusive,
  results,
}, null, 2));
