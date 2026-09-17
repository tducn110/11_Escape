import type { ImgHTMLAttributes } from "react";

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
  // Normalize path if pointing to legacy space-prefixed folder
  const normalizedSrc = src.replace("/ buttons/", "/buttons/");
  const resolvedSrc = normalizedSrc.startsWith("/")
    ? import.meta.env.BASE_URL + normalizedSrc.slice(1)
    : normalizedSrc;

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

