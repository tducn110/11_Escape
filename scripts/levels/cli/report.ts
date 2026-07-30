import { LEVELS } from "../domain";
import { buildCatalogReport } from "../report";
import { solveLevel } from "../solver";
import { analyzeLevel } from "../analyzer";
import { writeDifficultyReports } from "../reports";

const { report, issues } = buildCatalogReport();
const solveResults = LEVELS.map(level => solveLevel(level));
const difficultyReports = LEVELS.map((level, index) => analyzeLevel(level, solveResults[index], {
  phase: index < 20 ? 1 : index < 40 ? 2 : index < 60 ? 3 : index < 80 ? 4 : 5,
  sampleCount: 32,
  seed: "static",
}));
writeDifficultyReports(difficultyReports);

const outOfBand = difficultyReports.filter(result => result.phaseTargetStatus === "OUT_OF_BAND").length;
if (issues.length > 0 || outOfBand > 0 || solveResults.some(result => result.status !== "SOLVABLE")) {
  process.exitCode = 1;
}

console.log(JSON.stringify({
  report,
  issues,
  outOfBand,
}, null, 2));
