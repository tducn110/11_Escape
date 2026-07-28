import { LEVELS } from "../domain";
import { validateCatalog } from "../validator";
import { writeValidationReport } from "../reports";

const issues = validateCatalog(LEVELS);
writeValidationReport(issues);
if (issues.length > 0) {
  console.error(JSON.stringify({ valid: false, issues }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ valid: true, levels: LEVELS.length }, null, 2));
}
