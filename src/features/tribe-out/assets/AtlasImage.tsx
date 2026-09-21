import { useEffect, useRef, useState } from "react";
import { getTexture, isGameAtlasesLoaded, loadGameAtlases } from "./atlas";
import { resolveAssetUrl } from "./assetRegistry";

export function AtlasImage({ frameName, style }: { frameName: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [atlasReady, setAtlasReady] = useState(isGameAtlasesLoaded());
  const [useFallbackImg, setUseFallbackImg] = useState(false);

  useEffect(() => {
    let active = true;
    if (!atlasReady) {
      loadGameAtlases()
        .then(() => {
          if (active) setAtlasReady(true);
        })
        .catch(() => {
          if (active) setUseFallbackImg(true);
        });
    }
    return () => {
      active = false;
    };
  }, [atlasReady]);

  useEffect(() => {
    if (useFallbackImg) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const texture = getTexture(frameName);
    if (!texture) {
      if (atlasReady) setUseFallbackImg(true);
      return;
    }

    // Pixi v8 TextureSource resource handling
    const sourceObj = texture.source as any;
    const rawResource = sourceObj?.resource ?? sourceObj?.source ?? sourceObj;
    let image: CanvasImageSource | null = null;

    if (
      (typeof HTMLImageElement !== "undefined" && rawResource instanceof HTMLImageElement) ||
      (typeof ImageBitmap !== "undefined" && rawResource instanceof ImageBitmap) ||
      (typeof HTMLCanvasElement !== "undefined" && rawResource instanceof HTMLCanvasElement)
    ) {
      image = rawResource;
    } else if (rawResource?.source) {
      const inner = rawResource.source;
      if (
        (typeof HTMLImageElement !== "undefined" && inner instanceof HTMLImageElement) ||
        (typeof ImageBitmap !== "undefined" && inner instanceof ImageBitmap) ||
        (typeof HTMLCanvasElement !== "undefined" && inner instanceof HTMLCanvasElement)
      ) {
        image = inner;
      }
    } else if (rawResource?.image) {
      image = rawResource.image;
    }

    if (!image) {
      if (atlasReady) setUseFallbackImg(true);
      return;
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      const frame = texture.frame;
      const trim = texture.trim;
      const orig = texture.orig;

      const targetW = orig ? orig.width : (trim ? trim.width : frame.width);
      const targetH = orig ? orig.height : (trim ? trim.height : frame.height);

      canvas.width = targetW;
      canvas.height = targetH;

      ctx.clearRect(0, 0, targetW, targetH);
      const dx = trim ? trim.x : 0;
      const dy = trim ? trim.y : 0;

      try {
        ctx.drawImage(
          image!,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
          dx,
          dy,
          frame.width,
          frame.height
        );
      } catch (e) {
        console.error("[AtlasImage] Failed to draw frame:", frameName, e);
        setUseFallbackImg(true);
      }
    };

    if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement && !image.complete) {
      image.addEventListener("load", draw, { once: true });
    } else {
      draw();
    }
  }, [frameName, atlasReady, useFallbackImg]);

  if (useFallbackImg) {
    const fallbackPath = `assets/${frameName}`;
    return (
      <img
        src={resolveAssetUrl(fallbackPath)}
        alt=""
        aria-hidden="true"
        style={{
          display: "block",
          objectFit: "contain",
          ...style,
        }}
      />
    );
  }

  return <canvas ref={canvasRef} style={style} />;
}


