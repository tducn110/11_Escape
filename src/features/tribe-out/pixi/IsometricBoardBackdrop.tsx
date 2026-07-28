import { useEffect, useRef } from "react";
import { Application, Container, Graphics } from "pixi.js";
import type { IsoBoardLayout } from "../isometric";
import { projectIsoPoint } from "../isometric";

interface Props {
  layout: IsoBoardLayout;
  boardRows: number;
  boardCols: number;
}

function createTile(layout: IsoBoardLayout, row: number, col: number) {
  const tile = new Graphics();
  const halfWidth = Math.max(6, layout.tileWidth * 0.47);
  const halfHeight = Math.max(4, layout.tileHeight * 0.46);
  const depth = Math.max(4, layout.cellSize * 0.2);
  const isLight = (row + col) % 2 === 0;

  tile
    .poly([
      -halfWidth, 0,
      0, halfHeight,
      0, halfHeight + depth,
      -halfWidth, depth,
    ])
    .fill({ color: isLight ? 0x219f62 : 0x1b9258 });

  tile
    .poly([
      halfWidth, 0,
      0, halfHeight,
      0, halfHeight + depth,
      halfWidth, depth,
    ])
    .fill({ color: isLight ? 0x168553 : 0x12794b });

  tile
    .poly([
      0, -halfHeight,
      halfWidth, 0,
      0, halfHeight,
      -halfWidth, 0,
    ])
    .fill({ color: isLight ? 0x46df88 : 0x36cf7a })
    .stroke({
      width: Math.max(1, layout.cellSize * 0.035),
      color: 0x168c55,
      alpha: 0.68,
      join: "round",
    });

  tile
    .moveTo(-halfWidth * 0.72, -halfHeight * 0.03)
    .lineTo(0, -halfHeight * 0.72)
    .lineTo(halfWidth * 0.72, -halfHeight * 0.03)
    .stroke({
      width: Math.max(1, layout.cellSize * 0.025),
      color: 0xb5f3c9,
      alpha: 0.38,
      cap: "round",
      join: "round",
    });

  if ((row * 5 + col * 3) % 11 === 0) {
    tile
      .circle(-halfWidth * 0.23, halfHeight * 0.12, Math.max(1.2, layout.cellSize * 0.035))
      .fill({ color: 0xffa64d, alpha: 0.68 });
  }

  return tile;
}

export function IsometricBoardBackdrop({ layout, boardRows, boardCols }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const sceneRef = useRef<Container | null>(null);
  const layoutRef = useRef(layout);
  const boardRowsRef = useRef(boardRows);
  const boardColsRef = useRef(boardCols);

  layoutRef.current = layout;
  boardRowsRef.current = boardRows;
  boardColsRef.current = boardCols;

  const renderBackdrop = () => {
    const scene = sceneRef.current;
    const app = appRef.current;
    if (!scene || !app?.renderer) return;

    const currentLayout = layoutRef.current;
    const currentRows = boardRowsRef.current;
    const currentCols = boardColsRef.current;
    const existingChildren = scene.removeChildren();
    existingChildren.forEach((child) => child.destroy());

    const lastPoint = projectIsoPoint(
      currentLayout,
      Math.max(0, currentRows - 1),
      Math.max(0, currentCols - 1)
    );
    const shadow = new Graphics()
      .ellipse(
        currentLayout.stageWidth / 2,
        lastPoint.y + currentLayout.cellSize * 0.58,
        currentLayout.stageWidth * 0.43,
        currentLayout.cellSize * 0.62
      )
      .fill({ color: 0x1f7b45, alpha: 0.24 });
    shadow.zIndex = 0;
    scene.addChild(shadow);

    const grid: Array<{ row: number; col: number }> = [];
    for (let row = 0; row < currentRows; row += 1) {
      for (let col = 0; col < currentCols; col += 1) {
        grid.push({ row, col });
      }
    }

    grid
      .sort((a, b) => a.row + a.col - (b.row + b.col) || a.row - b.row || a.col - b.col)
      .forEach(({ row, col }) => {
        const point = projectIsoPoint(currentLayout, row, col);
        const tile = createTile(currentLayout, row, col);
        tile.position.set(point.x, point.y);
        tile.zIndex = 10 + row + col;
        scene.addChild(tile);
      });

    app.render();
  };

  useEffect(() => {
    let disposed = false;
    let initCompleted = false;
    const host = hostRef.current;
    if (!host) return;

    const app = new Application();
    appRef.current = app;

    const mount = async () => {
      await app.init({
        width: layoutRef.current.stageWidth,
        height: layoutRef.current.stageHeight,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        preference: "webgl",
        autoStart: false,
      });
      initCompleted = true;

      if (disposed) {
        appRef.current = null;
        app.destroy({ removeView: true, releaseGlobalResources: true }, { children: true });
        return;
      }

      host.appendChild(app.canvas);
      app.canvas.style.position = "absolute";
      app.canvas.style.inset = "0";
      app.canvas.style.width = "100%";
      app.canvas.style.height = "100%";
      app.canvas.style.pointerEvents = "none";
      app.canvas.style.display = "block";

      const scene = new Container();
      scene.sortableChildren = true;
      sceneRef.current = scene;
      app.stage.addChild(scene);
      app.renderer.resize(
        layoutRef.current.stageWidth,
        layoutRef.current.stageHeight
      );
      renderBackdrop();
    };

    void mount();

    return () => {
      disposed = true;
      sceneRef.current = null;
      if (initCompleted && appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true }
        );
        appRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const app = appRef.current;
    if (!sceneRef.current || !app?.renderer) return;

    app.renderer.resize(layout.stageWidth, layout.stageHeight);
    renderBackdrop();
  }, [
    boardCols,
    boardRows,
    layout.cellSize,
    layout.originX,
    layout.originY,
    layout.stageHeight,
    layout.stageWidth,
    layout.stepX,
    layout.stepY,
    layout.tileHeight,
    layout.tileWidth,
  ]);

  return (
    <div
      ref={hostRef}
      className="tribe-isometric-backdrop"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
