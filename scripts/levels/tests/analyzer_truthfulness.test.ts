import { describe, expect, it } from "vitest";
import { LEVELS } from "../../../src/features/animal-escape/levels";
import type { AnimalEscapeLevel, AnimalVisualId, Direction } from "../../../src/features/animal-escape/types";
import { analyzeLevel } from "../analyzer";
import { solveLevel } from "../solver";
import { validateCatalog } from "../validator";

/** Independent 90°-clockwise layout transform — used to cross-check the analyzer. */
function rotateLevelClockwise(level: AnimalEscapeLevel): AnimalEscapeLevel {
  const rows = level.boardCols;
  const cols = level.boardRows;
  const directionMap: Record<Direction, Direction> = {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  };
  return {
    ...level,
    boardRows: rows,
    boardCols: cols,
    entities: level.entities.map((entity: AnimalEscapeLevel["entities"][number]) => {
      const base = {
        ...entity,
        row: entity.col,
        col: level.boardRows - 1 - entity.row,
        width: entity.height,
        height: entity.width,
      };
      return entity.type === "unit"
        ? { ...base, direction: directionMap[entity.direction] }
        : base;
    }),
  };
}

describe("Analyzer truthfulness", () => {
  it("canonical transform signature is invariant under a 90° rotation of the whole layout", () => {
    for (const level of LEVELS) {
      const solveResult = solveLevel(level);
      const rotated = rotateLevelClockwise(level);
      const report = analyzeLevel(level, solveResult, { phase: level.phase, sampleCount: 0, seed: "x" });
      const rotatedReport = analyzeLevel(rotated, solveLevel(rotated), {
        phase: rotated.phase,
        sampleCount: 0,
        seed: "x",
      });
      expect(rotatedReport.normalizedTransformSignature, level.id).toBe(
        report.normalizedTransformSignature,
      );
    }
  });

  it("canonical transform signature is not the identity signature (real normalization)", () => {
    for (const level of LEVELS) {
      const solveResult = solveLevel(level);
      const report = analyzeLevel(level, solveResult, { phase: level.phase, sampleCount: 0, seed: "x" });
      expect(report.normalizedTransformSignature, level.id).toContain("|");
    }
  });

  it("dead-end risk is a deterministic sampled metric in [0,1]", () => {
    for (const level of LEVELS) {
      const solveResult = solveLevel(level);
      const report = analyzeLevel(level, solveResult, { phase: level.phase, sampleCount: 64, seed: "audit" });
      expect(report.deadEndRisk.coverage, level.id).toBe("sampled");
      expect(report.deadEndRisk.sampleCount, level.id).toBe(64);
      expect(report.deadEndRisk.value, level.id).toBeGreaterThanOrEqual(0);
      expect(report.deadEndRisk.value, level.id).toBeLessThanOrEqual(1);
      const again = analyzeLevel(level, solveResult, { phase: level.phase, sampleCount: 64, seed: "audit" });
      expect(again.deadEndRisk.value, level.id).toBe(report.deadEndRisk.value);
    }
  });

  it("validator rejects duplicate entity ids", () => {
    const level = LEVELS[0];
    const duplicated = {
      ...level,
      entities: [...level.entities, { ...level.entities[0], col: 5, row: 5 }],
    };
    const issues = validateCatalog([duplicated]);
    expect(issues.some(issue => issue.message.includes("duplicate entity id"))).toBe(true);
  });

  it("validator rejects a unit whose visualId has no atlas frame", () => {
    const level = LEVELS[0];
    const mutated = {
      ...level,
      entities: level.entities.map((entity, index) =>
        index === 0 ? { ...entity, visualId: "animal-nonexistent" as AnimalVisualId } : entity,
      ),
    };
    const issues = validateCatalog([mutated]);
    expect(
      issues.some(issue => issue.message.includes("no frame in the gameplay atlas")),
    ).toBe(true);
  });
});
