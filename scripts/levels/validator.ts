import type { Direction, PuzzleEntity, PuzzleLevel } from "../../src/features/tribe-out/types";
import { getOccupiedCells, isInsideBoard } from "../../src/features/tribe-out/puzzle";
import type { LevelAuthoringManifest } from "./catalog/manifests";

export interface ValidationIssue {
  levelId: PuzzleLevel["id"];
  code: string;
  message: string;
  entityId?: string;
}

const DIRECTIONS: readonly Direction[] = ["up", "right", "down", "left"];
const LEVEL_ID_PATTERN = /^level-\d{3}$/;

function pushIssue(
  issues: ValidationIssue[],
  levelId: PuzzleLevel["id"],
  code: string,
  message: string,
  entityId?: string,
): void {
  issues.push({ levelId, code, message, entityId });
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function validateLevelHeader(level: PuzzleLevel): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!LEVEL_ID_PATTERN.test(level.id)) {
    pushIssue(issues, level.id, "invalid-level-id", `Level id ${level.id} must match level-NNN`);
  }
  if (!isInteger(level.boardRows) || level.boardRows <= 0) {
    pushIssue(issues, level.id, "invalid-board-rows", `Level ${level.id} boardRows must be a positive integer`);
  }
  if (!isInteger(level.boardCols) || level.boardCols <= 0) {
    pushIssue(issues, level.id, "invalid-board-cols", `Level ${level.id} boardCols must be a positive integer`);
  }
  if (!isInteger(level.lives) || level.lives <= 0) {
    pushIssue(issues, level.id, "invalid-lives", `Level ${level.id} lives must be a positive integer`);
  }
  if (!isInteger(level.timeLimit) || level.timeLimit <= 0) {
    pushIssue(issues, level.id, "invalid-time-limit", `Level ${level.id} timeLimit must be a positive integer`);
  }
  if (![1, 2, 3, 4, 5].includes(level.phase)) {
    pushIssue(issues, level.id, "invalid-phase", `Level ${level.id} phase must be 1-5`);
  }
  if (!isInteger(level.rotateCharges) || level.rotateCharges < 0) {
    pushIssue(issues, level.id, "invalid-rotate-charges", `Level ${level.id} rotateCharges must be a non-negative integer`);
  }
  if (!Array.isArray(level.entities) || level.entities.length === 0) {
    pushIssue(issues, level.id, "missing-entities", `Level ${level.id} must contain at least one entity`);
  }

  return issues;
}

function validateEntityShape(level: PuzzleLevel, entity: PuzzleEntity, gateIds: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!isInteger(entity.row)) {
    pushIssue(issues, level.id, "invalid-row", `Entity ${entity.id} row must be an integer`, entity.id);
  }
  if (!isInteger(entity.col)) {
    pushIssue(issues, level.id, "invalid-col", `Entity ${entity.id} col must be an integer`, entity.id);
  }
  if (!isInteger(entity.width) || entity.width <= 0) {
    pushIssue(issues, level.id, "invalid-width", `Entity ${entity.id} width must be a positive integer`, entity.id);
  }
  if (!isInteger(entity.height) || entity.height <= 0) {
    pushIssue(issues, level.id, "invalid-height", `Entity ${entity.id} height must be a positive integer`, entity.id);
  }

  if (entity.type === "unit") {
    if (!DIRECTIONS.includes(entity.direction)) {
      pushIssue(issues, level.id, "invalid-direction", `Unit ${entity.id} has invalid direction`, entity.id);
    }
  }

  if (entity.type === "gate" && typeof entity.open !== "boolean") {
    pushIssue(issues, level.id, "invalid-gate-open", `Gate ${entity.id} open must be boolean`, entity.id);
  }

  if (entity.type === "switch") {
    if (typeof entity.activated !== "boolean") {
      pushIssue(issues, level.id, "invalid-switch-activated", `Switch ${entity.id} activated must be boolean`, entity.id);
    }
    if (!entity.targetId) {
      pushIssue(issues, level.id, "switch-missing-target", `Switch ${entity.id} has no gate target`, entity.id);
    } else if (!gateIds.has(entity.targetId)) {
      pushIssue(issues, level.id, "switch-target-not-gate", `Switch ${entity.id} targets missing gate ${entity.targetId}`, entity.id);
    }
  }

  return issues;
}

export function validateLevel(level: PuzzleLevel): ValidationIssue[] {
  const issues = validateLevelHeader(level);
  const seenEntityIds = new Set<string>();
  const occupied = new Map<string, string>();
  const gateIds = new Set(level.entities.filter(entity => entity.type === "gate").map(entity => entity.id));

  for (const entity of level.entities) {
    if (seenEntityIds.has(entity.id)) {
      pushIssue(issues, level.id, "duplicate-entity-id", `Duplicate entity id ${entity.id}`, entity.id);
    }
    seenEntityIds.add(entity.id);
    issues.push(...validateEntityShape(level, entity, gateIds));

    const cells = getOccupiedCells(entity);
    for (const cell of cells) {
      if (!isInsideBoard(cell.row, cell.col, level.boardRows, level.boardCols)) {
        pushIssue(
          issues,
          level.id,
          "out-of-bounds",
          `Entity ${entity.id} occupies ${cell.row},${cell.col} outside ${level.boardRows}x${level.boardCols}`,
          entity.id,
        );
      }

      const key = `${cell.row},${cell.col}`;
      const existing = occupied.get(key);
      if (existing && existing !== entity.id) {
        pushIssue(issues, level.id, "overlap", `Entity ${entity.id} overlaps ${existing} at ${key}`, entity.id);
      } else {
        occupied.set(key, entity.id);
      }
    }
  }

  return issues;
}

import { generateSignature } from "./analyzer";

export function validateCatalog(levels: readonly PuzzleLevel[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenLevelIds = new Set<PuzzleLevel["id"]>();
  const seenStructSigs = new Set<string>();
  const seenTransSigs = new Set<string>();

  if (levels.length !== 100) {
    issues.push({
      levelId: levels[0]?.id ?? "level-000",
      code: "invalid-level-count",
      message: `Catalog must contain exactly 100 levels, received ${levels.length}`,
    });
  }

  for (let index = 0; index < levels.length; index += 1) {
    const level = levels[index];
    const expectedId = `level-${String(index + 1).padStart(3, "0")}` as PuzzleLevel["id"];

    if (seenLevelIds.has(level.id)) {
      pushIssue(issues, level.id, "duplicate-level-id", `Duplicate level id ${String(level.id)}`);
    }
    seenLevelIds.add(level.id);

    if (level.id !== expectedId) {
      pushIssue(issues, level.id, "unexpected-level-order", `Expected ${expectedId} at catalog index ${index}, received ${level.id}`);
    }
    const expectedPhase = index < 20 ? 1 : index < 40 ? 2 : index < 60 ? 3 : index < 80 ? 4 : 5;
    if (level.phase !== expectedPhase) {
      pushIssue(issues, level.id, "phase-mismatch", `Expected phase ${expectedPhase} at catalog index ${index}, received ${level.phase}`);
    }

    const structSig = generateSignature(level, false);
    if (seenStructSigs.has(structSig)) {
      pushIssue(issues, level.id, "duplicate-structure", `Exact duplicate structure found`);
    }
    seenStructSigs.add(structSig);

    const transSig = generateSignature(level, true);
    if (seenTransSigs.has(transSig)) {
      pushIssue(issues, level.id, "duplicate-transform", `Transform duplicate structure found`);
    }
    seenTransSigs.add(transSig);

    issues.push(...validateLevel(level));
  }

  return issues;
}

export function validateManifestCatalog(
  levels: readonly PuzzleLevel[],
  manifests: readonly LevelAuthoringManifest[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const manifestByLevelId = new Map(manifests.map(manifest => [manifest.levelId, manifest] as const));

  if (manifests.length !== levels.length) {
    issues.push({
      levelId: levels[0]?.id ?? "level-000",
      code: "manifest-count-mismatch",
      message: `Expected ${levels.length} manifests, received ${manifests.length}`,
    });
  }

  for (let index = 0; index < levels.length; index += 1) {
    const level = levels[index];
    const manifest = manifestByLevelId.get(level.id);
    if (!manifest) {
      issues.push({
        levelId: level.id,
        code: "manifest-missing",
        message: `Missing manifest for ${level.id}`,
      });
      continue;
    }

    if (manifest.levelId !== level.id) {
      issues.push({
        levelId: level.id,
        code: "manifest-level-mismatch",
        message: `Manifest levelId ${manifest.levelId} does not match ${level.id}`,
      });
    }

    const expectedPhase = index < 20 ? 1 : index < 40 ? 2 : index < 60 ? 3 : index < 80 ? 4 : 5;
    if (manifest.phase !== expectedPhase) {
      issues.push({
        levelId: level.id,
        code: "manifest-phase-mismatch",
        message: `Manifest phase ${manifest.phase} does not match expected phase ${expectedPhase}`,
      });
    }

    for (const exception of manifest.approvedExceptions) {
      if (!exception.reason || !exception.manualEvidenceRequired) {
        issues.push({
          levelId: level.id,
          code: "manifest-exception-invalid",
          message: `Manifest exception for ${level.id} must include reason and manual evidence`,
        });
      }
    }
  }

  return issues;
}
