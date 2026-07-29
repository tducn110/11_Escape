import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ValidationIssue } from "./validator";
import type { DifficultyReport } from "./analyzer";
import type { SolveCost, SolverDiagnostics, SolverPath, SolveStatus } from "./solver";
import type { LevelAuthoringManifest } from "./catalog/manifests";

export interface SolutionReport {
  levelId: string;
  status: SolveStatus;
  solverPath: SolverPath;
  cost: SolveCost | null;
  actions: unknown[];
  finalStateKey: string | null;
  diagnostics: SolverDiagnostics;
  reason: string | null;
}

export interface ManifestReport {
  generatorVersion: string;
  manifests: readonly LevelAuthoringManifest[];
}

function ensureReportDir(reportDir: string) {
  mkdirSync(reportDir, { recursive: true });
}

function reportPath(reportDir: string, filename: string): string {
  return resolve(reportDir, filename);
}

export function writeValidationReport(issues: ValidationIssue[], reportDir = resolve(process.cwd(), "reports/levels")) {
  ensureReportDir(reportDir);
  writeFileSync(reportPath(reportDir, "validation.json"), `${JSON.stringify({ valid: issues.length === 0, issues }, null, 2)}\n`);
}

export function writeSolutionsReport(results: SolutionReport[], reportDir = resolve(process.cwd(), "reports/levels")) {
  ensureReportDir(reportDir);
  const payload = {
    totalLevels: results.length,
    solvedLevels: results.filter(result => result.status === "SOLVABLE").length,
    inconclusiveLevels: results.filter(result => result.status === "INCONCLUSIVE").length,
    unsolvedLevels: results.filter(result => result.status === "UNSOLVABLE").length,
    results,
  };
  writeFileSync(reportPath(reportDir, "solutions.json"), `${JSON.stringify(payload, null, 2)}\n`);
  writeFileSync(
    reportPath(reportDir, "solutions.md"),
    [
      "# Level Solutions",
      "",
      `- total: ${payload.totalLevels}`,
      `- solved: ${payload.solvedLevels}`,
      `- unsolved: ${payload.unsolvedLevels}`,
      `- inconclusive: ${payload.inconclusiveLevels}`,
      "",
    ].join("\n"),
  );
}

export function writeDifficultyReports(reports: DifficultyReport[], reportDir = resolve(process.cwd(), "reports/levels")) {
  ensureReportDir(reportDir);
  const json = {
    totalLevels: reports.length,
    reports,
  };
  writeFileSync(reportPath(reportDir, "difficulty.json"), `${JSON.stringify(json, null, 2)}\n`);
  writeFileSync(
    reportPath(reportDir, "difficulty.csv"),
    [
      "levelId,phase,unitCount,obstacleCount,gateCount,switchCount,multiCellUnitCount,initialAvailableMoves,minRotateRequired",
      ...reports.map(report => [
        report.levelId,
        report.phase,
        report.unitCount,
        report.obstacleCount,
        report.gateCount,
        report.switchCount,
        report.multiCellUnitCount,
        report.initialAvailableMoves,
        report.minRotateRequired,
      ].join(",")),
      "",
    ].join("\n"),
  );
  writeFileSync(
    reportPath(reportDir, "difficulty.md"),
    [
      "# Difficulty Reports",
      "",
      `- total: ${reports.length}`,
      `- phases: ${[1, 2, 3, 4, 5].join(", ")}`,
      "",
    ].join("\n"),
  );
}

export function writeManifestReport(report: ManifestReport, reportDir = resolve(process.cwd(), "reports/levels")) {
  ensureReportDir(reportDir);
  writeFileSync(reportPath(reportDir, "manifests.json"), `${JSON.stringify(report, null, 2)}\n`);
}
