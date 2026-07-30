import { useEffect, useRef } from "react";
import { Application, Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import type { IsoBoardLayout } from "../isometric";
import { projectIsoPoint } from "../isometric";

interface Props {
  layout: IsoBoardLayout;
  boardRows: number;
  boardCols: number;
}

export function IsometricBoardBackdrop({ layout, boardRows, boardCols }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const sceneRef = useRef<Container | null>(null);
  const tilePoolRef = useRef<(Graphics | Sprite)[]>([]);
  const textureRef = useRef<Texture | null>(null);

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

    try {
      const currentLayout = layoutRef.current;
      const currentRows = boardRowsRef.current;
      const currentCols = boardColsRef.current;

      const totalTiles = currentRows * currentCols;

      // Hide all tiles in the pool
      for (const tile of tilePoolRef.current) {
        tile.visible = false;
      }

      // The opaque panel keeps the board readable against the bright jungle scene.
      let boardPanel = scene.getChildByLabel("boardPanel") as Graphics | null;
      if (!boardPanel) {
        boardPanel = new Graphics();
        boardPanel.label = "boardPanel";
        boardPanel.zIndex = 0;
        scene.addChild(boardPanel);
      }
      const frameInset = Math.max(2, currentLayout.cellSize * 0.1);
      const frameX = frameInset;
      const frameY = frameInset;
      const frameWidth = currentLayout.stageWidth - frameInset * 2;
      const frameHeight = currentLayout.stageHeight - frameInset * 2;
      const radius = Math.max(8, currentLayout.cellSize * 0.3);

      boardPanel.clear();
      boardPanel
        .roundRect(frameX, frameY + Math.max(2, currentLayout.cellSize * 0.08), frameWidth, frameHeight, radius)
        .fill({ color: 0x102f22, alpha: 0.36 });
      boardPanel
        .roundRect(frameX, frameY, frameWidth, frameHeight, radius)
        .fill({ color: 0x315f36, alpha: 0.98 })
        .stroke({ color: 0xb9d36a, width: Math.max(2, currentLayout.cellSize * 0.055), alpha: 0.88 });
      boardPanel
        .roundRect(
          frameX + frameInset,
          frameY + frameInset,
          frameWidth - frameInset * 2,
          frameHeight - frameInset * 2,
          Math.max(5, radius - frameInset),
        )
        .fill({ color: 0x183f29, alpha: 0.82 })
        .stroke({ color: 0x6f9d48, width: Math.max(1, currentLayout.cellSize * 0.03), alpha: 0.8 });

      // Keep each generated tile proportional so its leaf relief is never stretched.
      while (tilePoolRef.current.length < totalTiles) {
        tilePoolRef.current.push(new Graphics());
      }
      
      for (let i = 0; i < totalTiles; i++) {
        let tile = tilePoolRef.current[i];
        if (textureRef.current && tile instanceof Graphics) {
          const sprite = new Sprite(textureRef.current);
          sprite.anchor.set(0.5);
          scene.addChild(sprite);
          scene.removeChild(tile);
          tile.destroy();
          tilePoolRef.current[i] = sprite;
        } else if (!textureRef.current && tile instanceof Sprite) {
          const gfx = new Graphics();
          scene.addChild(gfx);
          scene.removeChild(tile);
          tile.destroy();
          tilePoolRef.current[i] = gfx;
        } else if (!tile.parent) {
          scene.addChild(tile);
        }
      }

      // Generate grid and sort by depth
      const grid: Array<{ row: number; col: number }> = [];
      for (let row = 0; row < currentRows; row += 1) {
        for (let col = 0; col < currentCols; col += 1) {
          grid.push({ row, col });
        }
      }

      grid
        .sort((a, b) => a.row + a.col - (b.row + b.col) || a.row - b.row || a.col - b.col)
        .forEach(({ row, col }, index) => {
          const point = projectIsoPoint(currentLayout, row, col);
          const tile = tilePoolRef.current[index];

          if (tile instanceof Graphics) {
            tile.clear();
            const halfW = currentLayout.tileWidth / 2;
            const halfH = currentLayout.tileHeight / 2;
            tile
              .roundRect(-halfW + 2, -halfH + 2, currentLayout.tileWidth - 4, currentLayout.tileHeight - 4, Math.max(4, currentLayout.cellSize * 0.16))
              .fill({ color: 0x6eaf3b, alpha: 0.96 })
              .stroke({ color: 0x284a2e, width: 2 });
            tile.position.set(point.x, point.y);
          } else if (tile instanceof Sprite) {
            const tileSize = Math.max(18, currentLayout.cellSize - Math.max(3, currentLayout.cellSize * 0.08));
            tile.width = tileSize;
            tile.height = tileSize;
            tile.position.set(point.x, point.y);
          }

          tile.zIndex = 10 + row + col;
          tile.visible = true;
        });

      app.render();
    } catch (err) {
      console.error("Failed to render 2D board", err);
    }
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
      
      try {
        const tex = await Assets.load("/assets/tribe-out/board/leaf-tile.png");
        textureRef.current = tex;
      } catch (err) {
        console.warn("Could not load the leaf tile texture", err);
      }
      
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
