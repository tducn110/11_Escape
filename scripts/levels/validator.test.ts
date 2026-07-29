import { describe, expect, it } from "vitest";
import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import { validateCatalog, validateLevel } from "./validator";

function buildLevel(overrides: Partial<PuzzleLevel> = {}): PuzzleLevel {
  return {
    id: "level-001",
    phase: 1,
    boardRows: 3,
    boardCols: 3,
    lives: 3,
    timeLimit: 30,
    rotateCharges: 0,
    entities: [
      { id: "u0", type: "unit", assetKey: "villager-1", row: 1, col: 1, width: 1, height: 1, direction: "right" },
    ],
    ...overrides,
  };
}

describe("validateLevel", () => {
  it("rejects invalid switch targets and negative rotate charges", () => {
    const issues = validateLevel(buildLevel({
      rotateCharges: -1,
      entities: [
        { id: "s0", type: "switch", assetKey: "switch-inactive", row: 0, col: 0, width: 1, height: 1, targetId: "missing", activated: false },
      ],
    }));

    expect(issues.some(issue => issue.code === "invalid-rotate-charges")).toBe(true);
    expect(issues.some(issue => issue.code === "switch-target-not-gate")).toBe(true);
  });

  it("rejects non-contiguous catalog IDs and wrong level count", () => {
    const issues = validateCatalog([buildLevel({ id: "level-002" })]);
    expect(issues.some(issue => issue.code === "invalid-level-count")).toBe(true);
    expect(issues.some(issue => issue.code === "unexpected-level-order")).toBe(true);
  });
});
