import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import { analyzeLevel } from "./analyzer";
import { solveLevel } from "./solver";
import { buildCandidate } from "./catalog/builder";
import { getProfileForLevel } from "./catalog/profiles";
import { GENERATOR_VERSION } from "./catalog/version";

export function levelId(index: number): PuzzleLevel["id"] {
  return `level-${String(index).padStart(3, "0")}` as PuzzleLevel["id"];
}

function createLevel(index: number, level: Omit<PuzzleLevel, "id" | "phase">): PuzzleLevel {
  const phase = Math.ceil(index / 20);
  return { id: levelId(index), phase: phase as any, ...level };
}

const MAX_LANES = 2000;

export function generateLevels(): readonly PuzzleLevel[] {
  const levels: PuzzleLevel[] = [];
  let acceptedCount = 0;

  const existingSignatures = new Set<string>();

  for (let index = 1; index <= 100; index += 1) {
    const profile = getProfileForLevel(index);
    let accepted: PuzzleLevel | null = null;
    const rejections: string[] = [];

    for (let lane = 0; lane < MAX_LANES && !accepted; lane += 1) {
      const candidate = buildCandidate(index, lane);
      if (!candidate) continue;
      const level = createLevel(index, candidate);
      const solve = solveLevel(level);
      if (solve.status !== "SOLVABLE") {
        rejections.push(`lane ${lane}: NOT_SOLVABLE`);
        continue;
      }
      
      const report = analyzeLevel(level, solve, { phase: 1 as any, sampleCount: 16, seed: `${level.id}:${GENERATOR_VERSION}:gen` });
      
      if (report.phaseTargetStatus === "IN_BAND") {
        if (!existingSignatures.has(report.structuralSignature) && !existingSignatures.has(report.normalizedTransformSignature)) {
          accepted = level;
          existingSignatures.add(report.structuralSignature);
          existingSignatures.add(report.normalizedTransformSignature);
          acceptedCount += 1;
          break;
        } else {
          rejections.push(`lane ${lane}: IN_BAND but DUPLICATE SIGNATURE`);
        }
      } else {
        rejections.push(`lane ${lane}: OUT_OF_BAND: ${report.outOfBandReasons.join(", ")}`);
      }
    }

    if (!accepted) {
      console.error(`\n[catalog] FATAL: Exhausted ${MAX_LANES} lanes for level ${index}. Rejection summary:`);
      for (const r of rejections.slice(-5)) console.error(`  - ${r}`); // print last 5 rejections
      throw new Error(`[catalog] Failed to generate in-band level for index ${index}`);
    }

    levels.push(accepted);
  }

  if (process.env.LEVELS_LOG === "1") {
    for (let index = 1; index <= 100; index += 1) {
      const lvl = levels[index - 1];
      const solve = solveLevel(lvl);
      const rep = analyzeLevel(lvl, solve, { phase: 1 as any, sampleCount: 32, seed: "log" });
      console.log(
        `${lvl.id} units=${rep.unitCount} depth=${rep.causalUnlockDepth.value} ` +
        `rot=${rep.minRotateRequired} init=${rep.initialAvailableMoves} avg=${rep.averageAvailableMoves.value?.toFixed(2)} ` +
        `md=${rep.meaningfulDecisionProxy.value} dead=${rep.deadEndRisk.value?.toFixed(3)}`,
      );
    }
  }

  console.log(`[catalog] accepted ${acceptedCount}/100 levels matching strict profile`);
  return levels;
}
