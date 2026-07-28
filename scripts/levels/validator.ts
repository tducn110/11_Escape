import type { PuzzleLevel } from "../../src/features/tribe-out/types";
import { getOccupiedCells, isInsideBoard } from "../../src/features/tribe-out/puzzle";

export interface ValidationIssue {
  levelId: PuzzleLevel["id"];
  code: string;
  message: string;
  entityId?: string;
}

export function validateLevel(level: PuzzleLevel): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenEntityIds = new Set<string>();
  const occupied = new Map<string, string>();

  for (const entity of level.entities) {
    if (seenEntityIds.has(entity.id)) {
      issues.push({ levelId: level.id, code: "duplicate-entity-id", entityId: entity.id, message: `Duplicate entity id ${entity.id}` });
    }
    seenEntityIds.add(entity.id);

    if (entity.type === "switch" && !entity.targetId) {
      issues.push({ levelId: level.id, code: "switch-missing-target", entityId: entity.id, message: `Switch ${entity.id} has no gate target` });
    }

    const cells = getOccupiedCells(entity);
    for (const cell of cells) {
      if (!isInsideBoard(cell.row, cell.col, level.boardRows, level.boardCols)) {
        issues.push({
          levelId: level.id,
          code: "out-of-bounds",
          entityId: entity.id,
          message: `Entity ${entity.id} occupies ${cell.row},${cell.col} outside ${level.boardRows}x${level.boardCols}`,
        });
      }

      const key = `${cell.row},${cell.col}`;
      const existing = occupied.get(key);
      if (existing && existing !== entity.id) {
        issues.push({
          levelId: level.id,
          code: "overlap",
          entityId: entity.id,
          message: `Entity ${entity.id} overlaps ${existing} at ${key}`,
        });
      } else {
        occupied.set(key, entity.id);
      }
    }
  }

  return issues;
}

export function validateCatalog(levels: readonly PuzzleLevel[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenLevelIds = new Set<PuzzleLevel["id"]>();
  for (const level of levels) {
    if (seenLevelIds.has(level.id)) {
      issues.push({ levelId: level.id, code: "duplicate-level-id", message: `Duplicate level id ${String(level.id)}` });
    }
    seenLevelIds.add(level.id);
    issues.push(...validateLevel(level));
  }
  return issues;
}

