import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { analyzeLevel } from "../analyzer";
import { generateLevels } from "../catalog";
import { generateManifests, GENERATOR_VERSION } from "../catalog/manifests";
import { writeDifficultyReports, writeManifestReport, writeSolutionsReport, writeValidationReport } from "../reports";
import { solveLevel } from "../solver";
import { validateCatalog, validateManifestCatalog } from "../validator";

function serializeLevels(levels: readonly ReturnType<typeof generateLevels>[number][]): string {
  return [
    'import type { TribeOutLevel } from "./types";',
    "",
    `export const LEVELS: readonly TribeOutLevel[] = ${JSON.stringify(levels, null, 2)};`,
    "",
    "export const LEVEL_SET_VERSION = 2;",
    'export const LEVEL_BY_ID: ReadonlyMap<TribeOutLevel["id"], TribeOutLevel> = new Map(LEVELS.map(level => [level.id, level] as const));',
    'export const LEVEL_INDEX_BY_ID: ReadonlyMap<TribeOutLevel["id"], number> = new Map(LEVELS.map((level, index) => [level.id, index] as const));',
    "",
  ].join("\n");
}

const repoRoot = process.cwd();
const tempRoot = mkdtempSync(join(repoRoot, ".levels-generate-"));
const tempReportsDir = join(tempRoot, "reports", "levels");
mkdirSync(tempReportsDir, { recursive: true });

const levels = generateLevels();
const manifests = generateManifests(levels);
const validationIssues = [
  ...validateCatalog(levels),
  ...validateManifestCatalog(levels, manifests),
];
const solveResults = levels.map(level => solveLevel(level));
const difficultyReports = levels.map((level, index) => analyzeLevel(level, solveResults[index], {
  phase: manifests[index].phase,
  sampleCount: 32,
  seed: `${level.id}:${GENERATOR_VERSION}:generate`,
}));

const unsolved = solveResults.filter(result => result.status !== "SOLVABLE");
const outOfBand = difficultyReports.filter(report => report.phaseTargetStatus === "OUT_OF_BAND");
const levelsTempPath = join(tempRoot, "levels.ts.tmp");
writeFileSync(levelsTempPath, serializeLevels(levels));
writeValidationReport(validationIssues, tempReportsDir);
writeSolutionsReport(solveResults, tempReportsDir);
writeDifficultyReports(difficultyReports, tempReportsDir);
writeManifestReport({
  generatorVersion: GENERATOR_VERSION,
  manifests,
}, tempReportsDir);

const payload = {
  attemptedWrite: levelsTempPath,
  levelCount: levels.length,
  validationIssues: validationIssues.length,
  unsolved: unsolved.length,
  outOfBand: outOfBand.length,
};

if (validationIssues.length > 0 || unsolved.length > 0 || outOfBand.length > 0) {
  console.error(JSON.stringify(payload, null, 2));
  process.exitCode = 1;
  rmSync(tempRoot, { recursive: true, force: true });
} else {
  const runtimeLevelsPath = resolve(repoRoot, "src/features/tribe-out/levels.ts");
  const reportDir = resolve(repoRoot, "reports/levels");
  mkdirSync(resolve(repoRoot, "src/features/tribe-out"), { recursive: true });
  mkdirSync(reportDir, { recursive: true });

  renameSync(levelsTempPath, `${runtimeLevelsPath}.tmp`);
  renameSync(`${runtimeLevelsPath}.tmp`, runtimeLevelsPath);

  for (const filename of ["validation.json", "solutions.json", "solutions.md", "difficulty.json", "difficulty.csv", "difficulty.md", "manifests.json"]) {
    renameSync(join(tempReportsDir, filename), join(reportDir, filename));
  }

  console.log(JSON.stringify({
    ...payload,
    wrote: runtimeLevelsPath,
    reports: reportDir,
  }, null, 2));
  rmSync(tempRoot, { recursive: true, force: true });
}
