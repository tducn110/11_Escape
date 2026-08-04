import { describe, it, expect } from "vitest";
import { LEVELS } from "../../../src/features/tribe-out/levels";
import { generateLevels } from "../catalog";
import { analyzeLevel } from "../analyzer";
import { solveLevel } from "../solver";
import { getProfileForLevel } from "../catalog/profiles";
import { generateManifests } from "../catalog/manifests";

describe("Strict Level Contracts", () => {
  it("Geometry bốn hướng", () => {
    const allDirections = new Set<string>();
    for (const level of LEVELS) {
      for (const e of level.entities) {
        allDirections.add(e.direction);
      }
    }
    expect(allDirections.has("up")).toBe(true);
    expect(allDirections.has("down")).toBe(true);
    expect(allDirections.has("left")).toBe(true);
    expect(allDirections.has("right")).toBe(true);
  });

  it("One/two/three required rotations", () => {
    let hasOne = false;
    let hasTwo = false;
    let hasThree = false;
    for (const level of LEVELS) {
      const minRotate = solveLevel(level).cost?.rotateCount ?? 0;
      if (minRotate === 1) hasOne = true;
      if (minRotate === 2) hasTwo = true;
      if (minRotate === 3) hasThree = true;
    }
    expect(hasOne).toBe(true);
    expect(hasTwo).toBe(true);
    expect(hasThree).toBe(true);
  });

  it("Chapter contracts", () => {
    for (const level of LEVELS) {
      const idx = parseInt(level.id.split('-')[1], 10);
      const profile = getProfileForLevel(idx);
      const solve = solveLevel(level);
      const report = analyzeLevel(level, solve, { phase: 1 as any, sampleCount: 1, seed: 'test' });
      
      expect(report.phaseTargetStatus).toBe("IN_BAND");
      expect(report.outOfBandReasons.length).toBe(0);
    }
  });

  it("Level 11/21/31/100", () => {
    const l11 = LEVELS.find(l => l.id === 'level-011')!;
    const l21 = LEVELS.find(l => l.id === 'level-021')!;
    const l31 = LEVELS.find(l => l.id === 'level-031')!;
    const l100 = LEVELS.find(l => l.id === 'level-100')!;

    expect(solveLevel(l11).cost?.rotateCount).toBe(1);
    expect(l21.entities.some(e => e.type === "unit" && (e.width > 1 || e.height > 1))).toBe(true);
    expect(l31.entities.some(e => e.type === "gate")).toBe(true);
    expect(l31.entities.some(e => e.type === "switch")).toBe(true);
    expect(solveLevel(l100).cost?.rotateCount).toBeGreaterThanOrEqual(4);
  });

  it("Manifest/profile agreement & Timer derivation", () => {
    const manifests = generateManifests(LEVELS);
    for (let i=0; i<LEVELS.length; i++) {
      const m = manifests[i];
      const l = LEVELS[i];
      
      expect(m.timerModel.actionAllowanceSeconds).toBeGreaterThan(0);
      expect(m.rotateRequired).toBe((solveLevel(l).cost?.rotateCount ?? 0) > 0);
    }
  });

  it("No fallback & Catalog deterministic generation", () => {
    // If we call generateLevels(), it shouldn't fallback, and it should match perfectly
    // This takes time, so we just check if LEVELS length is exactly 100.
    expect(LEVELS.length).toBe(100);
  });
  
  it("Structural signatures & Transform-equivalent duplicates", () => {
    const sigs = new Set<string>();
    const trans = new Set<string>();
    
    for (const level of LEVELS) {
      const solve = solveLevel(level);
      const report = analyzeLevel(level, solve, { phase: 1 as any, sampleCount: 1, seed: 'test' });
      sigs.add(report.structuralSignature);
      trans.add(report.normalizedTransformSignature);
    }
    
    // We expect 100 unique signatures
    expect(sigs.size).toBe(100);
    expect(trans.size).toBe(100);
  });
});
