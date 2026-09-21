import type { ImgHTMLAttributes } from "react";
import { resolveAssetUrl } from "./assets/assetRegistry";

export interface AssetCropRect {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

interface CroppedAssetProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  crop?: AssetCropRect;
  canvasWidth?: number;
  canvasHeight?: number;
  preserveAspectRatio?: string;
  focusable?: any;
}

export function CroppedAsset({
  src,
  crop: _crop,
  canvasWidth: _canvasWidth,
  canvasHeight: _canvasHeight,
  preserveAspectRatio = "xMidYMid meet",
  className = "",
  style,
  alt = "",
  ...imgProps
}: CroppedAssetProps) {
  const resolvedSrc = resolveAssetUrl(src);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{
        display: "block",
        objectFit: preserveAspectRatio === "none" ? "fill" : "contain",
        ...style,
      }}
      {...imgProps}
    />
  );
}

