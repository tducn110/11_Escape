import { LEVELS } from "../domain";
import { analyzeLevel } from "../analyzer";
import { generateManifests } from "../catalog/manifests";
import { GENERATOR_VERSION } from "../catalog/version";
import { solveLevel } from "../solver";
import { validateCatalog, validateManifestCatalog } from "../validator";

const manifests = generateManifests(LEVELS);
const validationIssues = [
  ...validateCatalog(LEVELS),
  ...validateManifestCatalog(LEVELS, manifests),
];
const solveResults = LEVELS.map(level => solveLevel(level));
const difficultyReports = LEVELS.map((level, index) => analyzeLevel(level, solveResults[index], {
  phase: manifests[index].phase,
  sampleCount: 32,
  seed: `${level.id}:${GENERATOR_VERSION}:verify`,
}));

const unsolved = solveResults.filter(result => result.status !== "SOLVABLE");
const outOfBand = difficultyReports.filter(report => report.phaseTargetStatus === "OUT_OF_BAND");

const payload = {
  valid: validationIssues.length === 0,
  solved: unsolved.length === 0,
  outOfBand: outOfBand.length,
  validationIssues,
  unsolved: unsolved.map(result => ({
    levelId: result.levelId,
    status: result.status,
    reason: result.reason,
  })),
};

if (!payload.valid || !payload.solved || payload.outOfBand > 0) {
  console.error(JSON.stringify(payload, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(payload, null, 2));
}
