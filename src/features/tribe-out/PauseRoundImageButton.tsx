import { CroppedAsset } from "./CroppedAsset";

interface PauseRoundImageButtonProps {
  assetSrc: string;
  crop: { x: number; y: number; width: number; height: number; canvasWidth?: number; canvasHeight?: number };
  label: string;
  onClick: () => void;
  className?: string;
}

export function PauseRoundImageButton({
  assetSrc,
  crop,
  label,
  onClick,
  className = "",
}: PauseRoundImageButtonProps) {
  return (
    <button
      type="button"
      className={`
        relative grid pause-round-image-button
        size-[clamp(58px,16vw,68px)] sm:size-[68px] lg:size-[72px]
        shrink-0 place-items-center
        border-0 bg-transparent p-0
        transition-transform duration-150
        hover:-translate-y-0.5 hover:scale-[1.04]
        active:translate-y-0.5 active:scale-[0.96]
        focus-visible:rounded-full
        focus-visible:outline
        focus-visible:outline-[3px]
        focus-visible:outline-offset-2
        focus-visible:outline-white
        ${className}
      `}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <CroppedAsset
        src={assetSrc}
        crop={crop}
        canvasWidth={crop.canvasWidth}
        canvasHeight={crop.canvasHeight}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
    </button>
  );
}
