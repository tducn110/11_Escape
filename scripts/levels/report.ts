import { LEVELS } from "./domain";
import { validateCatalog } from "./validator";
import { solveLevel } from "./solver";

export interface CatalogReport {
  totalLevels: number;
  validLevels: number;
  solvedLevels: number;
  issues: number;
}

export function buildCatalogReport() {
  const issues = validateCatalog(LEVELS);
  const solveResults = LEVELS.map(level => solveLevel(level));
  const solvedLevels = solveResults.reduce((count, result) => count + (result.status === "SOLVABLE" ? 1 : 0), 0);
  const validLevelCount = LEVELS.filter(level => issues.every(issue => issue.levelId !== level.id)).length;

  const report: CatalogReport = {
    totalLevels: LEVELS.length,
    validLevels: validLevelCount,
    solvedLevels,
    issues: issues.length,
  };

  return { report, issues };
}
