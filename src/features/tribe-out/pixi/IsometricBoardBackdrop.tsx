import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Assets, Texture, NineSliceSprite } from "pixi.js";
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
  const tilePoolRef = useRef<(Graphics | NineSliceSprite)[]>([]);
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

      // Render shadow/background rect
      let shadow = scene.getChildByLabel('boardShadow') as import('pixi.js').Graphics | null;
      if (!shadow) {
        shadow = new Graphics();
        shadow.label = 'boardShadow';
        shadow.zIndex = 0;
        scene.addChild(shadow);
      }
      shadow.clear();
      
      shadow.rect(
        currentLayout.originX,
        currentLayout.originY,
        currentLayout.stepX * currentCols,
        currentLayout.stepY * currentRows
      ).fill({ color: 0x1f7b45, alpha: 0.24 });

      // Ensure we have enough tiles and of correct type
      while (tilePoolRef.current.length < totalTiles) {
        tilePoolRef.current.push(new Graphics());
      }
      
      for (let i = 0; i < totalTiles; i++) {
        let tile = tilePoolRef.current[i];
        if (textureRef.current && tile instanceof Graphics) {
          const sprite = new NineSliceSprite({
            texture: textureRef.current,
            leftWidth: 32,
            topHeight: 32,
            rightWidth: 32,
            bottomHeight: 32,
            width: currentLayout.cellSize - 8,
            height: currentLayout.cellSize - 8,
          });
          scene.addChild(sprite);
          scene.removeChild(tile);
          tile.destroy();
          tilePoolRef.current[i] = sprite;
        } else if (!textureRef.current && tile instanceof NineSliceSprite) {
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
            
            tile.rect(-halfW, -halfH, currentLayout.tileWidth, currentLayout.tileHeight)
                .fill({ color: 0x2e8f59, alpha: 0.8 })
                .stroke({ color: 0x1f7b45, width: 2 });
            tile.position.set(point.x, point.y);
          } else if (tile instanceof NineSliceSprite) {
            tile.width = currentLayout.cellSize - 8;
            tile.height = currentLayout.cellSize - 8;
            tile.position.set(point.x - tile.width / 2, point.y - tile.height / 2);
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
        const tex = await Assets.load('/ Ground/ground1.png');
        textureRef.current = tex;
      } catch (err) {
        console.warn('Could not load ground1.png', err);
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
