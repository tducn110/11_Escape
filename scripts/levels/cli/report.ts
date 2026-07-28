import { LEVELS } from "../domain";
import { buildCatalogReport } from "../report";
import { solveLevel } from "../solver";
import { analyzeLevel } from "../analyzer";
import { writeDifficultyReports } from "../reports";

const { report, issues } = buildCatalogReport();
const difficultyReports = LEVELS.map((level, index) => analyzeLevel(level, solveLevel(level), {
  phase: index < 20 ? 1 : index < 40 ? 2 : index < 60 ? 3 : index < 80 ? 4 : 5,
  sampleCount: 0,
  seed: "static",
}));
writeDifficultyReports(difficultyReports);
console.log(JSON.stringify({ report, issues }, null, 2));
