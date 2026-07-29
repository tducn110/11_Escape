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
  const fallbackCellSize = 44;

  const safeWidth =
    availableWidth > 0
      ? Math.max(0, Math.min(availableWidth, MAX_STAGE_WIDTH + BOARD_GUTTER) - BOARD_GUTTER * 2)
      : boardCols * fallbackCellSize;
  const safeHeight =
    availableHeight > 0
      ? Math.max(0, availableHeight - BOARD_GUTTER * 2)
      : boardRows * fallbackCellSize;
      
  const byWidth = Math.floor(safeWidth / (boardCols + 1));
  const byHeight = Math.floor(safeHeight / (boardRows + 1));
  const cellSize = clamp(
    Math.min(byWidth || fallbackCellSize, byHeight || fallbackCellSize, MAX_CELL_SIZE),
    MIN_CELL_SIZE,
    MAX_CELL_SIZE
  );

  const tileWidth = cellSize;
  const tileHeight = cellSize;
  const stepX = cellSize;
  const stepY = cellSize;
  const paddingX = cellSize * 0.5;
  const paddingY = cellSize * 0.5;
  const stageWidth = Math.round(boardCols * stepX + paddingX * 2);
  const stageHeight = Math.round(boardRows * stepY + paddingY * 2);

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
    originX: paddingX,
    originY: paddingY,
  };
}

export function projectIsoPoint(layout: IsoBoardLayout, row: number, col: number) {
  return {
    x: layout.originX + col * layout.stepX + layout.stepX / 2,
    y: layout.originY + row * layout.stepY + layout.stepY / 2,
  };
}

export function projectIsoEntity(layout: IsoBoardLayout, entity: TribeOutEntity) {
  const centerRow = entity.row + (entity.height - 1) / 2;
  const centerCol = entity.col + (entity.width - 1) / 2;
  const point = projectIsoPoint(layout, centerRow, centerCol);
  
  // Z-index should be based on the row in 2D
  const lowestPoint = projectIsoPoint(layout, entity.row + entity.height - 1, entity.col + entity.width - 1);

  const scale = entity.type === "obstacle" ? 0.88 : 1.08;
  const visualWidth = entity.width * layout.cellSize * scale;
  const visualHeight = entity.height * layout.cellSize * scale;

  return {
    x: point.x,
    y: point.y,
    zIndex: 100 + Math.round(lowestPoint.y),
    width: visualWidth,
    height: visualHeight,
  };
}
