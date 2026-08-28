import { Container, Graphics, Sprite, Texture } from "pixi.js";
import type { AnimalEscapeLevel, EntityId, GameHint, PuzzleEntity, PuzzleState, UnitEntity } from "../../types";
import type { PixiAppHandle } from "./createPixiApp";
import { ANIMAL_FRAME_IDS, ARROW_FRAME } from "./animalAtlas";

const BOARD_PADDING = 14;
const GAP = 3;
const BOARD_COLOR = 0x1f4d38;
const TILE_COLOR = 0x2e6b4f;
const ESCAPED_TILE_COLOR = 0x5c3d2e;
const GATE_CLOSED_COLOR = 0x7a4a2b;
const GATE_OPEN_COLOR = 0x2e6b4f;
const SWITCH_OFF_COLOR = 0x9a7b4f;
const SWITCH_ON_COLOR = 0x2e6b4f;
const OBSTACLE_COLOR = 0x6b6b6b;

/**
 * Last-resort degrade for a missing atlas frame. The atlas is loaded before
 * the scene is created, so this only triggers on a deploy mistake; the game
 * stays playable instead of rendering nothing.
 */
const UNIT_FALLBACK_COLORS: Record<string, number> = {
  "animal-cat": 0xf8b26a,
  "animal-panda": 0x2c2c2c,
  "animal-dog": 0xa06a42,
  "animal-bear": 0x7a4a2b,
  "animal-frog": 0x5fbf4a,
  "animal-police-cat": 0x4a7fd4,
  "animal-monkey": 0xb5824a,
  "animal-chicken": 0xf2d24a,
  "animal-squirrel": 0xc98a4a,
  "animal-buffalo": 0x8a6a5a,
};

const DIRECTION_ANGLE: Record<string, number> = {
  up: -Math.PI / 2,
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
};

export interface SceneEvents {
  /** Tap on a board cell (row, col). */
  onTapCell(row: number, col: number): void;
}

export interface SceneSnapshot {
  level: AnimalEscapeLevel;
  puzzle: PuzzleState;
  rotateMode: boolean;
  hint: GameHint | null;
  lastAction: {
    entityId: EntityId;
    accepted: boolean;
    kind: "exit" | "rotate" | "tap";
  } | null;
  actionSequence: number;
}

export class AnimalEscapeScene {
  private readonly app: PixiAppHandle;
  private readonly events: SceneEvents;
  private readonly textures: Readonly<Record<string, Texture>>;
  private readonly root = new Container();
  private readonly boardLayer = new Container();
  private readonly entityLayer = new Container();
  private readonly fxLayer = new Container();
  private readonly ticker;
  private cellSize = 0;
  private boardOriginX = 0;
  private boardOriginY = 0;
  private snapshot: SceneSnapshot | null = null;
  private boardGraphics: Graphics | null = null;
  private tileGraphics: Graphics | null = null;
  private entityShapes = new Map<EntityId, Container>();
  private fxSprites: Array<{ g: Container; t: number; dur: number; from: { x: number; y: number }; to: { x: number; y: number } }> = [];
  private active = true;

  constructor(
    app: PixiAppHandle,
    events: SceneEvents,
    textures: Readonly<Record<string, Texture>>,
  ) {
    this.app = app;
    this.events = events;
    this.textures = textures;
    this.ticker = this.app.app.ticker;
    this.root.addChild(this.boardLayer, this.entityLayer, this.fxLayer);
    this.app.app.stage.addChild(this.root);
    this.bindInput();
    this.bindTicker();
  }

  setSnapshot(snapshot: SceneSnapshot): void {
    this.snapshot = snapshot;
    this.redraw();
  }

  destroy(): void {
    this.active = false;
    this.app.app.stage.removeChild(this.root);
    this.root.destroy({ children: true });
    this.entityShapes.clear();
    this.fxSprites = [];
  }

  private bindTicker(): void {
    this.ticker.add(() => {
      if (!this.active) return;
      const now = performance.now();
      this.fxSprites = this.fxSprites.filter(fx => {
        const progress = Math.min(1, (now - fx.t) / fx.dur);
        fx.g.position.set(
          fx.from.x + (fx.to.x - fx.from.x) * progress,
          fx.from.y + (fx.to.y - fx.from.y) * progress,
        );
        fx.g.alpha = 1 - progress;
        if (progress >= 1) {
          fx.g.destroy();
          return false;
        }
        return true;
      });
    });
  }

  private bindInput(): void {
    this.app.app.stage.eventMode = "static";
    this.app.app.stage.hitArea = this.app.app.screen;
    this.app.app.stage.on("pointerdown", (event: { global: { x: number; y: number } }) => {
      const cell = this.cellAt(event.global.x, event.global.y);
      if (cell && this.snapshot) {
        this.events.onTapCell(cell.row, cell.col);
      }
    });
  }

  private cellAt(x: number, y: number): { row: number; col: number } | null {
    if (!this.snapshot) return null;
    const { boardCols, boardRows } = this.snapshot.level;
    const localX = x - this.boardOriginX;
    const localY = y - this.boardOriginY;
    if (localX < 0 || localY < 0) return null;
    const col = Math.floor(localX / this.cellSize);
    const row = Math.floor(localY / this.cellSize);
    if (col < 0 || col >= boardCols || row < 0 || row >= boardRows) return null;
    return { row, col };
  }

  private computeLayout(): void {
    const { level } = this.snapshot!;
    const width = this.app.app.screen.width;
    const height = this.app.app.screen.height;
    const availableW = Math.max(40, width - BOARD_PADDING * 2);
    const availableH = Math.max(40, height - BOARD_PADDING * 2);
    this.cellSize = Math.max(
      24,
      Math.min(availableW / level.boardCols, availableH / level.boardRows),
    );
    this.boardOriginX = (width - this.cellSize * level.boardCols) / 2;
    this.boardOriginY = (height - this.cellSize * level.boardRows) / 2;
  }

  redraw(): void {
    if (!this.snapshot) return;
    const { level, puzzle, hint } = this.snapshot;

    this.computeLayout();
    this.drawBoard(level, puzzle);
    this.drawEntities(puzzle, hint);
  }

  private drawBoard(level: AnimalEscapeLevel, puzzle: PuzzleState): void {
    if (this.boardGraphics) {
      this.boardLayer.removeChild(this.boardGraphics);
      this.boardGraphics.destroy();
    }
    if (this.tileGraphics) {
      this.boardLayer.removeChild(this.tileGraphics);
      this.tileGraphics.destroy();
    }
    this.boardGraphics = new Graphics();
    this.tileGraphics = new Graphics();

    const boardW = this.cellSize * level.boardCols;
    const boardH = this.cellSize * level.boardRows;
    const g = this.boardGraphics;
    g.roundRect(this.boardOriginX, this.boardOriginY, boardW, boardH, 10);
    g.fill({ color: BOARD_COLOR, alpha: 0.85 });

    const tiles = this.tileGraphics;
    for (let row = 0; row < level.boardRows; row += 1) {
      for (let col = 0; col < level.boardCols; col += 1) {
        const x = this.boardOriginX + col * this.cellSize + GAP;
        const y = this.boardOriginY + row * this.cellSize + GAP;
        const size = this.cellSize - GAP * 2;
        const color = this.trailHasEscaped(puzzle, row, col) ? ESCAPED_TILE_COLOR : TILE_COLOR;
        tiles.roundRect(x, y, size, size, Math.min(8, size / 4));
        tiles.fill({ color, alpha: 1 });
      }
    }

    this.boardLayer.addChild(this.boardGraphics, this.tileGraphics);
  }

  private trailHasEscaped(puzzle: PuzzleState, row: number, col: number): boolean {
    return puzzle.entities.some(entity => {
      if (entity.type !== "unit" || !entity.escaped) return false;
      const dir = entity.direction;
      if (dir === "up") return col >= entity.col && col < entity.col + entity.width && row < entity.row;
      if (dir === "down") return col >= entity.col && col < entity.col + entity.width && row >= entity.row + entity.height;
      if (dir === "left") return row >= entity.row && row < entity.row + entity.height && col < entity.col;
      return row >= entity.row && row < entity.row + entity.height && col >= entity.col + entity.width;
    });
  }

  private drawEntities(puzzle: PuzzleState, hint: GameHint | null): void {
    const currentIds = new Set<EntityId>();

    for (const entity of puzzle.entities) {
      if (entity.type === "unit" && entity.escaped) {
        this.destroyEntityVisual(entity.id);
        continue;
      }
      currentIds.add(entity.id);
      this.drawEntity(entity, hint);
    }

    for (const id of [...this.entityShapes.keys()]) {
      if (!currentIds.has(id)) {
        this.destroyEntityVisual(id);
      }
    }
  }

  private drawEntity(entity: PuzzleEntity, hint: GameHint | null): void {
    if (entity.type === "unit") {
      this.drawUnit(entity, hint);
      return;
    }
    this.drawStaticEntity(entity, hint);
  }

  /** Units are atlas sprites + a white direction arrow + optional hint ring. */
  private drawUnit(entity: UnitEntity, hint: GameHint | null): void {
    const id = entity.id;
    let container = this.entityShapes.get(id);
    if (!container) {
      container = new Container();
      this.entityShapes.set(id, container);
      this.entityLayer.addChild(container);
    } else {
      container.removeChildren().forEach(child => child.destroy());
    }

    const { cellSize } = this;
    const originX = this.boardOriginX + entity.col * cellSize + GAP;
    const originY = this.boardOriginY + entity.row * cellSize + GAP;
    const width = entity.width * cellSize - GAP * 2;
    const height = entity.height * cellSize - GAP * 2;

    const frameName = ANIMAL_FRAME_IDS.includes(entity.visualId) ? entity.visualId : null;
    const texture = frameName ? this.textures[frameName] : undefined;
    if (texture) {
      const sprite = new Sprite(texture);
      sprite.width = width;
      sprite.height = height;
      sprite.position.set(originX, originY);
      container.addChild(sprite);
    } else {
      const fallback = new Graphics();
      fallback.roundRect(0, 0, width, height, Math.min(10, width / 5));
      fallback.fill({ color: UNIT_FALLBACK_COLORS[entity.visualId] ?? 0xcccccc, alpha: 1 });
      fallback.position.set(originX, originY);
      container.addChild(fallback);
    }

    if (hint !== null && hint.entityId === entity.id) {
      const ring = new Graphics();
      ring.roundRect(-2, -2, width + 4, height + 4, Math.min(12, width / 5) + 2);
      ring.setStrokeStyle({ width: 3, color: 0xffffff });
      ring.stroke();
      ring.position.set(originX, originY);
      container.addChild(ring);
    }

    const angle = DIRECTION_ANGLE[entity.direction];
    const arrowTexture = this.textures[ARROW_FRAME];
    if (arrowTexture) {
      const arrow = new Sprite(arrowTexture);
      const arrowSize = Math.max(12, Math.min(width, height) * 0.3);
      arrow.anchor.set(0.5);
      arrow.width = arrowSize;
      arrow.height = arrowSize * 0.7;
      arrow.rotation = angle;
      arrow.alpha = 0.92;
      arrow.position.set(
        originX + width / 2 + Math.cos(angle) * Math.min(width, height) * 0.06,
        originY + height / 2 + Math.sin(angle) * Math.min(width, height) * 0.06,
      );
      container.addChild(arrow);
    }
  }

  /** Obstacles, gates and switches stay vector shapes: they are board furniture. */
  private drawStaticEntity(entity: PuzzleEntity, hint: GameHint | null): void {
    const id = entity.id;
    let g = this.entityShapes.get(id);
    if (!g) {
      g = new Graphics();
      this.entityShapes.set(id, g);
      this.entityLayer.addChild(g);
    } else if (!(g instanceof Graphics)) {
      this.entityLayer.removeChild(g);
      g.destroy();
      g = new Graphics();
      this.entityShapes.set(id, g);
      this.entityLayer.addChild(g);
    }
    const graphics = g as Graphics;
    graphics.clear();

    const { cellSize } = this;
    const originX = this.boardOriginX + entity.col * cellSize + GAP;
    const originY = this.boardOriginY + entity.row * cellSize + GAP;
    const width = entity.width * cellSize - GAP * 2;
    const height = entity.height * cellSize - GAP * 2;

    if (entity.type === "obstacle") {
      graphics.circle(originX + width / 2, originY + height / 2, Math.min(width, height) * 0.42);
      graphics.fill({ color: OBSTACLE_COLOR, alpha: 1 });
      graphics.circle(originX + width / 2 - Math.min(width, height) * 0.12, originY + height / 2 - Math.min(width, height) * 0.12, Math.min(width, height) * 0.14);
      graphics.fill({ color: 0x9a9a9a, alpha: 0.8 });
    } else if (entity.type === "gate") {
      const color = entity.open ? GATE_OPEN_COLOR : GATE_CLOSED_COLOR;
      graphics.roundRect(originX, originY, width, height, Math.min(8, width / 4));
      graphics.fill({ color, alpha: 1 });
      if (!entity.open) {
        graphics.setStrokeStyle({ width: 2, color: 0xd9a03a });
        graphics.moveTo(originX + 4, originY + height / 2);
        graphics.lineTo(originX + width - 4, originY + height / 2);
        graphics.stroke();
      }
    } else if (entity.type === "switch") {
      const color = entity.activated ? SWITCH_ON_COLOR : SWITCH_OFF_COLOR;
      graphics.circle(originX + width / 2, originY + height / 2, Math.min(width, height) * 0.34);
      graphics.fill({ color, alpha: 1 });
      graphics.circle(originX + width / 2, originY + height / 2, Math.min(width, height) * 0.12);
      graphics.fill({ color: 0xffffff, alpha: entity.activated ? 0.9 : 0.5 });
    }

    if (hint !== null && hint.action === "rotate" && hint.entityId === entity.id) {
      graphics.setStrokeStyle({ width: 3, color: 0xffffff });
      graphics.roundRect(originX - 2, originY - 2, width + 4, height + 4, Math.min(10, width / 5) + 2);
      graphics.stroke();
    }
  }

  private destroyEntityVisual(id: EntityId): void {
    const shape = this.entityShapes.get(id);
    if (shape) {
      this.entityLayer.removeChild(shape);
      shape.destroy();
    }
    this.entityShapes.delete(id);
  }

  private cellCenter(row: number, col: number): { x: number; y: number } {
    return {
      x: this.boardOriginX + col * this.cellSize + this.cellSize / 2,
      y: this.boardOriginY + row * this.cellSize + this.cellSize / 2,
    };
  }

  /**
   * One-shot exit animation: a copy of the unit dashes from its start cell to
   * the point just past the board edge it escapes from; the live entity
   * disappears from the board.
   */
  playExitAnimation(entity: PuzzleEntity): void {
    if (entity.type !== "unit") return;
    const center = this.cellCenter(entity.row, entity.col);
    const dir = entity.direction;
    const boardW = this.cellSize * this.snapshot!.level.boardCols;
    const boardH = this.cellSize * this.snapshot!.level.boardRows;
    const pastEdge = this.cellSize * 0.6;
    const to =
      dir === "up"
        ? { x: center.x, y: this.boardOriginY - pastEdge }
        : dir === "down"
          ? { x: center.x, y: this.boardOriginY + boardH + pastEdge }
          : dir === "left"
            ? { x: this.boardOriginX - pastEdge, y: center.y }
            : { x: this.boardOriginX + boardW + pastEdge, y: center.y };

    const frameName = ANIMAL_FRAME_IDS.includes(entity.visualId) ? entity.visualId : null;
    const texture = frameName ? this.textures[frameName] : undefined;
    let g: Container;
    if (texture) {
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.width = entity.width * this.cellSize * 0.9;
      sprite.height = entity.height * this.cellSize * 0.9;
      g = sprite;
    } else {
      const circle = new Graphics();
      circle.circle(0, 0, this.cellSize * 0.32);
      circle.fill({ color: UNIT_FALLBACK_COLORS[entity.visualId] ?? 0xcccccc, alpha: 1 });
      g = circle;
    }
    g.position.set(center.x, center.y);
    this.fxLayer.addChild(g);
    this.fxSprites.push({ g, t: performance.now(), dur: 380, from: center, to });
  }

  /** Board shake for a blocked tap. */
  playBump(): void {
    const root = this.root;
    root.position.set(0, 0);
    const startedAt = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startedAt;
      if (elapsed >= 160) {
        root.position.set(0, 0);
        return;
      }
      const magnitude = 6 * (1 - elapsed / 160);
      root.position.set((Math.random() - 0.5) * magnitude, (Math.random() - 0.5) * magnitude);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
