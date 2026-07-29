import { LEVELS } from "../domain";
import { generateManifests } from "../catalog/manifests";
import { validateCatalog, validateManifestCatalog } from "../validator";
import { writeValidationReport } from "../reports";

const manifests = generateManifests(LEVELS);
const issues = [
  ...validateCatalog(LEVELS),
  ...validateManifestCatalog(LEVELS, manifests),
];
writeValidationReport(issues);
if (issues.length > 0) {
  console.error(JSON.stringify({ valid: false, issues }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ valid: true, levels: LEVELS.length }, null, 2));
}
