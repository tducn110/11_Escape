import { Application } from "pixi.js";

export interface PixiAppHandle {
  app: Application;
  canvas: HTMLCanvasElement;
  /** Recompute the canvas size to match its container. */
  resizeToContainer(): void;
  destroy(): void;
}

/**
 * Create the PixiJS v8 application that renders the game board.
 *
 * The canvas fills its container. The renderer runs at the device pixel
 * ratio (capped at 2x) and `autoDensity` maps CSS pixels back to screen
 * pixels, so the board stays crisp on high-density phones without wasting
 * fill-rate on 3x+ panels.
 */
export async function createPixiApp(
  container: HTMLElement,
  onResize?: () => void,
  backgroundColor = 0x123a2b,
): Promise<PixiAppHandle> {
  const canvas = document.createElement("canvas");

  const app = new Application();
  const maxDpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  await app.init({
    canvas,
    background: backgroundColor,
    antialias: true,
    resolution: maxDpr,
    autoDensity: true,
    resizeTo: container,
    eventMode: "passive",
  });

  container.appendChild(canvas);
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.touchAction = "none";

  // Layout changes (rotate, split-screen, window resize) must re-layout the
  // board, not just stretch the canvas: observers re-compute and redraw.
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          app.resize();
          onResize?.();
        })
      : null;
  resizeObserver?.observe(container);

  return {
    app,
    canvas,
    resizeToContainer() {
      app.resize();
      onResize?.();
    },
    destroy() {
      resizeObserver?.disconnect();
      app.destroy(true, { children: true, texture: true, textureSource: true });
      canvas.remove();
    },
  };
}