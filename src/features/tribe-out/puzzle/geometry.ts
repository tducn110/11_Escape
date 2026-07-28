import type { Direction, PuzzleEntity } from "./types";

export interface Cell {
  row: number;
  col: number;
}

interface OrientedEntity {
  row: number;
  col: number;
  width: number;
  height: number;
  direction: Direction;
}

export function getOccupiedCells(entity: Pick<PuzzleEntity, "row" | "col" | "width" | "height">): Cell[] {
  const cells: Cell[] = [];
  for (let row = entity.row; row < entity.row + entity.height; row += 1) {
    for (let col = entity.col; col < entity.col + entity.width; col += 1) {
      cells.push({ row, col });
    }
  }
  return cells;
}

export function isInsideBoard(row: number, col: number, boardRows: number, boardCols: number): boolean {
  return row >= 0 && row < boardRows && col >= 0 && col < boardCols;
}

export function getForwardCellsUntilExit(
  unit: OrientedEntity,
  boardRows: number,
  boardCols: number,
): Cell[] {
  const cells: Cell[] = [];

  if (unit.direction === "up") {
    for (let row = unit.row - 1; row >= 0; row -= 1) {
      for (let col = unit.col; col < unit.col + unit.width; col += 1) {
        cells.push({ row, col });
      }
    }
  } else if (unit.direction === "down") {
    for (let row = unit.row + unit.height; row < boardRows; row += 1) {
      for (let col = unit.col; col < unit.col + unit.width; col += 1) {
        cells.push({ row, col });
      }
    }
  } else if (unit.direction === "left") {
    for (let col = unit.col - 1; col >= 0; col -= 1) {
      for (let row = unit.row; row < unit.row + unit.height; row += 1) {
        cells.push({ row, col });
      }
    }
  } else if (unit.direction === "right") {
    for (let col = unit.col + unit.width; col < boardCols; col += 1) {
      for (let row = unit.row; row < unit.row + unit.height; row += 1) {
        cells.push({ row, col });
      }
    }
  }

  return cells;
}
