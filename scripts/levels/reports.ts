import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ValidationIssue } from "./validator";
import type { DifficultyReport } from "./analyzer";

const REPORT_DIR = resolve(process.cwd(), "reports/levels");

export interface SolutionReport {
  levelId: string;
  status: "SOLVABLE" | "UNSOLVABLE" | "INCONCLUSIVE";
  solverPath: "FAST_EXIT_CLOSURE" | "STATEFUL_ROTATE_SEARCH";
  cost: unknown;
  actions: unknown[];
  finalStateKey: string | null;
  diagnostics: {
    exploredStates: number;
    generatedStates: number;
    prunedDominatedStates: number;
    collapsedExitActions: number;
    frontierPeak: number;
    elapsedMs: number;
    stateBudget: number;
    timeBudgetMs: number;
  };
  reason: string | null;
}

function ensureReportDir() {
  mkdirSync(REPORT_DIR, { recursive: true });
}

export function writeValidationReport(issues: ValidationIssue[]) {
  ensureReportDir();
  writeFileSync(resolve(REPORT_DIR, "validation.json"), `${JSON.stringify({ valid: issues.length === 0, issues }, null, 2)}\n`);
}

export function writeSolutionsReport(results: SolutionReport[]) {
  ensureReportDir();
  const payload = {
    totalLevels: results.length,
    solvedLevels: results.filter(result => result.status === "SOLVABLE").length,
    inconclusiveLevels: results.filter(result => result.status === "INCONCLUSIVE").length,
    unsolvedLevels: results.filter(result => result.status === "UNSOLVABLE").length,
    results,
  };
  writeFileSync(resolve(REPORT_DIR, "solutions.json"), `${JSON.stringify(payload, null, 2)}\n`);
  writeFileSync(
    resolve(REPORT_DIR, "solutions.md"),
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

export function writeDifficultyReports(reports: DifficultyReport[]) {
  ensureReportDir();
  const json = {
    totalLevels: reports.length,
    reports,
  };
  writeFileSync(resolve(REPORT_DIR, "difficulty.json"), `${JSON.stringify(json, null, 2)}\n`);
  writeFileSync(
    resolve(REPORT_DIR, "difficulty.csv"),
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
    resolve(REPORT_DIR, "difficulty.md"),
    [
      "# Difficulty Reports",
      "",
      `- total: ${reports.length}`,
      `- phases: ${[1, 2, 3, 4, 5].join(", ")}`,
      "",
    ].join("\n"),
  );
}
