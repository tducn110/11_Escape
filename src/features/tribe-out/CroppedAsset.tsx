import type { SVGProps } from "react";

export interface AssetCropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CroppedAssetProps
  extends Omit<SVGProps<SVGSVGElement>, "viewBox"> {
  src: string;
  crop: AssetCropRect;
  canvasWidth?: number;
  canvasHeight?: number;
}

export function CroppedAsset({
  src,
  crop,
  canvasWidth = 1536,
  canvasHeight = 1024,
  preserveAspectRatio = "xMidYMid meet",
  ...svgProps
}: CroppedAssetProps) {
  const resolvedSrc = src.startsWith("/") 
    ? import.meta.env.BASE_URL + src.slice(1)
    : src;

  return (
    <svg
      {...svgProps}
      viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
    >
      <image
        href={resolvedSrc}
        width={canvasWidth}
        height={canvasHeight}
      />
    </svg>
  );
}
