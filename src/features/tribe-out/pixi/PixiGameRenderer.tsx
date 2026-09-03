import { useEffect, useRef, useState } from "react";
import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import type { IsoBoardLayout } from "../isometric";
import { projectIsoPoint, projectIsoEntity } from "../isometric";
import { getTexture, isGameAtlasesLoaded, loadGameAtlases } from "../assets/atlas";
import type { TribeOutEntity, Direction } from "../types";

interface Props {
  layout: IsoBoardLayout;
  boardRows: number;
  boardCols: number;
  entities: readonly TribeOutEntity[];
  bumpingId: string | null;
  bumpNonce: number;
  hintedId?: string | null;
  onTap: (id: string) => void;
}

const BUMP_OFFSETS: Record<Direction, { x: number; y: number }> = {
  right: { x: 14, y: 0 },
  left: { x: -14, y: 0 },
  down: { x: 0, y: 14 },
  up: { x: 0, y: -14 },
};

const ESCAPE_OFFSETS: Record<Direction, { x: number; y: number }> = {
  right: { x: 220, y: 0 },
  left: { x: -220, y: 0 },
  down: { x: 0, y: 220 },
  up: { x: 0, y: -220 },
};

function drawDirectionArrow(g: Graphics, dir: Direction, nativeSize: number) {
  g.clear();
  const r = Math.max(16, nativeSize * 0.14);
  const cy = nativeSize * 0.36;

  // Background circle
  g.circle(0, cy, r)
    .fill({ color: 0xffffff, alpha: 0.95 })
    .stroke({ color: 0x2a2418, width: Math.max(2, r * 0.15) });

  const angleMap: Record<Direction, number> = {
    down: 0,
    left: Math.PI / 2,
    up: Math.PI,
    right: -Math.PI / 2,
  };
  const angle = angleMap[dir] ?? 0;
  const tipLen = r * 0.58;
  const baseLen = r * 0.45;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rot = (x: number, y: number) => ({
    x: cos * x - sin * (y - cy),
    y: cy + sin * x + cos * (y - cy),
  });

  const p1 = rot(0, cy + tipLen);
  const p2 = rot(-baseLen, cy - baseLen * 0.4);
  const p3 = rot(baseLen, cy - baseLen * 0.4);

  g.poly([p1.x, p1.y, p2.x, p2.y, p3.x, p3.y]).fill({ color: 0x2a2418 });
}

function drawObstacleGraphic(g: Graphics, size: number) {
  g.clear();
  g.ellipse(0, size * 0.35, size * 0.38, size * 0.12).fill({ color: 0x102f22, alpha: 0.3 });
  g.roundRect(-size * 0.4, -size * 0.35, size * 0.8, size * 0.7, size * 0.2)
    .fill({ color: 0x8a7f72 })
    .stroke({ color: 0x5e5449, width: Math.max(2, size * 0.05) });
  g.roundRect(-size * 0.28, -size * 0.25, size * 0.45, size * 0.2, size * 0.08)
    .fill({ color: 0xa89d90, alpha: 0.7 });
}

export function PixiGameRenderer({
  layout,
  boardRows,
  boardCols,
  entities,
  bumpingId,
  bumpNonce,
  hintedId,
  onTap,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const [atlasReady, setAtlasReady] = useState(isGameAtlasesLoaded());
  const [rendererReady, setRendererReady] = useState(false);

  // Containers
  const boardRef = useRef<Container | null>(null);
  const entitiesRef = useRef<Container | null>(null);

  // State refs
  const spritesRef = useRef<Map<string, Sprite>>(new Map());
  const prevBumpNonceRef = useRef(bumpNonce);

  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const onTapRef = useRef(onTap);
  onTapRef.current = onTap;

  const renderBackdrop = (scene: Container) => {
    try {
      const currentLayout = layoutRef.current;
      const currentRows = boardRows;
      const currentCols = boardCols;

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
          Math.max(5, radius - frameInset)
        )
        .fill({ color: 0x183f29, alpha: 0.82 })
        .stroke({ color: 0x6f9d48, width: Math.max(1, currentLayout.cellSize * 0.03), alpha: 0.8 });

      // Clean old tiles
      scene.children.filter((c) => c.label === "tile").forEach((c) => c.destroy());

      const tex = getTexture("tribe-out/board/leaf-tile.png");

      for (let row = 0; row < currentRows; row += 1) {
        for (let col = 0; col < currentCols; col += 1) {
          const point = projectIsoPoint(currentLayout, row, col);

          if (tex) {
            const sprite = new Sprite(tex);
            sprite.label = "tile";
            sprite.anchor.set(0.5);
            const tileSize = Math.max(18, currentLayout.cellSize - Math.max(3, currentLayout.cellSize * 0.08));
            sprite.width = tileSize;
            sprite.height = tileSize;
            sprite.position.set(point.x, point.y);
            sprite.zIndex = 10 + row + col;
            scene.addChild(sprite);
          } else {
            const tile = new Graphics();
            tile.label = "tile";
            const halfW = currentLayout.tileWidth / 2;
            const halfH = currentLayout.tileHeight / 2;
            tile
              .roundRect(
                -halfW + 2,
                -halfH + 2,
                currentLayout.tileWidth - 4,
                currentLayout.tileHeight - 4,
                Math.max(4, currentLayout.cellSize * 0.16)
              )
              .fill({ color: 0x6eaf3b, alpha: 0.96 })
              .stroke({ color: 0x284a2e, width: 2 });
            tile.position.set(point.x, point.y);
            tile.zIndex = 10 + row + col;
            scene.addChild(tile);
          }
        }
      }
    } catch (err) {
      console.error("Failed to render 2D board", err);
    }
  };

  // Mount Application
  useEffect(() => {
    let disposed = false;
    let initCompleted = false;
    const host = hostRef.current;
    if (!host) return;

    const app = new Application();
    appRef.current = app;

    const mount = async () => {
      await loadGameAtlases();
      if (disposed) return;
      setAtlasReady(true);

      await app.init({
        width: layoutRef.current.stageWidth,
        height: layoutRef.current.stageHeight,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        preference: "webgl",
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
      app.canvas.style.display = "block";

      const boardContainer = new Container();
      boardContainer.sortableChildren = true;
      boardRef.current = boardContainer;

      const entityContainer = new Container();
      entityContainer.sortableChildren = true;
      entitiesRef.current = entityContainer;
      app.stage.addChild(boardContainer);
      app.stage.addChild(entityContainer);

      renderBackdrop(boardContainer);
      setRendererReady(true);
    };

    void mount();

    return () => {
      disposed = true;
      boardRef.current = null;
      entitiesRef.current = null;
      if (initCompleted && appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true }
        );
        appRef.current = null;
      }
    };
  }, []); // Only once

  // Re-render backdrop on layout change or atlas ready
  useEffect(() => {
    if (appRef.current?.renderer && boardRef.current) {
      appRef.current.renderer.resize(layout.stageWidth, layout.stageHeight);
      renderBackdrop(boardRef.current);
    }
  }, [layout, boardCols, boardRows, atlasReady]);

  // Sync Entities
  useEffect(() => {
    const container = entitiesRef.current;
    if (!container || !atlasReady) return;

    const currentSprites = spritesRef.current;
    const seenIds = new Set<string>();

    for (const entity of entities) {
      seenIds.add(entity.id);

      const isUnit = entity.type === "unit";
      const isObstacle = entity.type === "obstacle";
      const escaped = isUnit ? Boolean(entity.escaped) : false;

      const projected = projectIsoEntity(layout, entity);

      let assetKey = isUnit ? entity.assetKey : "";
      if (entity.type === "gate") assetKey = entity.open ? "gate-open" : "gate-closed";
      if (entity.type === "switch") assetKey = entity.activated ? "switch-active" : "switch-inactive";
      if (entity.type === "obstacle") assetKey = "rock";

      let sprite = currentSprites.get(entity.id);
      let tex = getTexture(assetKey);
      if (!tex) tex = Texture.EMPTY;

      // If we don't have it, create it
      if (!sprite) {
        // Just ignore if it was already escaped before it even got mounted
        if (escaped) continue;

        sprite = new Sprite(tex);
        sprite.anchor.set(0.5);

        // Interaction setup
        sprite.eventMode = "static";
        sprite.cursor = isUnit ? "pointer" : "default";
        if (isUnit) {
          sprite.on("pointerdown", () => {
            onTapRef.current(entity.id);
          });
        }

        // Add a breather animation if it's a unit
        if (isUnit) {
          sprite.scale.set(1);
          gsap.to(sprite.scale, {
            x: 1.05,
            y: 1.05,
            yoyo: true,
            repeat: -1,
            duration: 1.4,
            ease: "power1.inOut",
          });
        }

        container.addChild(sprite);
        currentSprites.set(entity.id, sprite);
      }

      // Update texture if state changed (e.g., gate open/close or newly loaded)
      if (tex !== Texture.EMPTY && sprite.texture !== tex) {
        sprite.texture = tex;
      }

      const targetSize = Math.max(24, Math.round(Math.min(projected.width, projected.height) * 0.92));

      // Draw obstacle fallback graphic if obstacle has no texture
      if (isObstacle) {
        let obs = sprite.getChildByLabel("obstacleG") as Graphics | null;
        if (!obs) {
          obs = new Graphics();
          obs.label = "obstacleG";
          sprite.addChild(obs);
        }
        drawObstacleGraphic(obs, targetSize);
      }

      // Add directional arrow indicator on units
      if (isUnit) {
        let arrow = sprite.getChildByLabel("arrowG") as Graphics | null;
        if (!arrow) {
          arrow = new Graphics();
          arrow.label = "arrowG";
          sprite.addChild(arrow);
        }
        const nativeSize = Math.max(sprite.texture.width, sprite.texture.height) || targetSize;
        drawDirectionArrow(arrow, entity.direction, nativeSize);
      }

      // Scale sprite to target size
      if (!gsap.isTweening(sprite.scale) && sprite.texture && sprite.texture !== Texture.EMPTY) {
        const scale = targetSize / Math.max(sprite.texture.width, sprite.texture.height);
        sprite.scale.set(scale);
      }

      // Handle position
      const spriteOffsetX = isUnit && entity.width > 1 ? -((entity.width - 1) * layout.stepX) / 2 : 0;
      const targetX = projected.x + spriteOffsetX;
      const targetY = projected.y;

      // Only set position if not bumping or escaping
      if (!gsap.isTweening(sprite.position)) {
        sprite.position.set(targetX, targetY);
      }

      sprite.zIndex = entity.type === "switch" ? projected.zIndex - 10 : projected.zIndex;

      // Handle hint tint
      sprite.tint = (hintedId === entity.id) ? 0xffffaa : 0xffffff;

      // Trigger Escape Animation
      if (escaped && !sprite.destroyed) {
        if (!sprite.label || sprite.label !== "escaping") {
          sprite.label = "escaping";
          const dir = isUnit ? entity.direction : "right";
          const offset = ESCAPE_OFFSETS[dir];
          // gsap escape
          gsap.killTweensOf(sprite.position);
          gsap.to(sprite.position, {
            x: sprite.position.x + offset.x,
            y: sprite.position.y + offset.y,
            duration: 0.55,
            ease: "power2.out",
            onComplete: () => {
              sprite?.destroy();
              currentSprites.delete(entity.id);
            },
          });
          gsap.to(sprite, {
            alpha: 0,
            duration: 0.55,
            delay: 0.2,
          });
        }
      }
    }

    // Remove any sprites that are no longer in entities
    for (const [id, sprite] of currentSprites.entries()) {
      if (!seenIds.has(id)) {
        gsap.killTweensOf(sprite);
        gsap.killTweensOf(sprite.position);
        gsap.killTweensOf(sprite.scale);
        sprite.destroy();
        currentSprites.delete(id);
      }
    }
  }, [atlasReady, rendererReady, entities, layout, hintedId]);


  // Handle bump
  useEffect(() => {
    if (bumpingId && bumpNonce !== prevBumpNonceRef.current) {
      const sprite = spritesRef.current.get(bumpingId);
      const entity = entities.find(e => e.id === bumpingId);
      if (sprite && entity && entity.type === "unit" && !entity.escaped) {
        const dir = entity.direction;
        const offset = BUMP_OFFSETS[dir];
        const startX = sprite.position.x;
        const startY = sprite.position.y;
        
        gsap.killTweensOf(sprite.position);
        
        const tl = gsap.timeline();
        tl.to(sprite.position, {
          x: startX + offset.x,
          y: startY + offset.y,
          duration: 0.14,
          ease: "power1.out"
        }).to(sprite.position, {
          x: startX - offset.x * 0.35,
          y: startY - offset.y * 0.35,
          duration: 0.16,
          ease: "power1.inOut"
        }).to(sprite.position, {
          x: startX,
          y: startY,
          duration: 0.18,
          ease: "power1.in"
        });
      }
      prevBumpNonceRef.current = bumpNonce;
    }
  }, [bumpingId, bumpNonce, entities]);

  return (
    <div
      ref={hostRef}
      className="tribe-pixi-renderer"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        zIndex: 0,
      }}
    />
  );
}
