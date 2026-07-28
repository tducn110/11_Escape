import type { TribeOutEntity } from "./types";

export interface IsoBoardLayout {
  cellSize: number;
  tileWidth: number;
  tileHeight: number;
  stepX: number;
  stepY: number;
  paddingX: number;
  paddingY: number;
  stageWidth: number;
  stageHeight: number;
  originX: number;
  originY: number;
}

const MIN_CELL_SIZE = 16;
const MAX_CELL_SIZE = 112;
const MAX_STAGE_WIDTH = 1000;
const BOARD_GUTTER = 8;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function getIsoBoardLayout(
  boardRows: number,
  boardCols: number,
  availableWidth: number,
  availableHeight: number
): IsoBoardLayout {
  const span = boardRows + boardCols;
  const widthFactor = span * 0.76 + 1.16;
  const heightFactor = Math.max(0, span - 2) * 0.38 + 2.65;
  const fallbackCellSize = 44;

  const safeWidth =
    availableWidth > 0
      ? Math.max(0, Math.min(availableWidth, MAX_STAGE_WIDTH + BOARD_GUTTER) - BOARD_GUTTER)
      : widthFactor * fallbackCellSize;
  const safeHeight =
    availableHeight > 0
      ? Math.max(0, availableHeight - BOARD_GUTTER)
      : heightFactor * fallbackCellSize;
  const byWidth = Math.floor(safeWidth / widthFactor);
  const byHeight = Math.floor(safeHeight / heightFactor);
  const cellSize = clamp(
    Math.min(byWidth || fallbackCellSize, byHeight || fallbackCellSize, MAX_CELL_SIZE),
    MIN_CELL_SIZE,
    MAX_CELL_SIZE
  );

  const tileWidth = Math.round(cellSize * 1.52);
  const tileHeight = Math.round(cellSize * 0.76);
  const stepX = tileWidth / 2;
  const stepY = tileHeight / 2;
  const paddingX = Math.round(cellSize * 0.58);
  const paddingY = Math.round(cellSize * 0.5);
  const stageWidth = Math.round(span * stepX + paddingX * 2);
  const stageHeight = Math.round(Math.max(0, span - 2) * stepY + cellSize * 2.65);

  return {
    cellSize,
    tileWidth,
    tileHeight,
    stepX,
    stepY,
    paddingX,
    paddingY,
    stageWidth,
    stageHeight,
    originX: paddingX + boardRows * stepX,
    originY: paddingY + cellSize * 1.15,
  };
}

export function projectIsoPoint(layout: IsoBoardLayout, row: number, col: number) {
  return {
    x: layout.originX + (col - row) * layout.stepX,
    y: layout.originY + (col + row) * layout.stepY,
  };
}

export function projectIsoEntity(layout: IsoBoardLayout, entity: TribeOutEntity) {
  const centerRow = entity.row + (entity.height - 1) / 2;
  const centerCol = entity.col + (entity.width - 1) / 2;
  const point = projectIsoPoint(layout, centerRow, centerCol);
  
  // Z-index should be based on the furthest bottom tile (max row + max col)
  const lowestPoint = projectIsoPoint(layout, entity.row + entity.height - 1, entity.col + entity.width - 1);

  const footprint = Math.max(entity.width, entity.height);
  const baseSize = footprint * layout.cellSize;
  const visualSize = entity.type === "obstacle" ? baseSize * 0.88 : baseSize * 1.08;

  return {
    x: point.x,
    y: point.y,
    zIndex: 100 + Math.round(lowestPoint.y),
    size: visualSize,
  };
}
