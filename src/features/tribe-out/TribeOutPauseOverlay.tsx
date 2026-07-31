import { useId, useState } from "react";
import { CroppedAsset } from "./CroppedAsset";
import { tribeOutAudio } from "./audio/tribeOutAudio";
import { PauseRoundImageButton } from "./PauseRoundImageButton";
import "./tribeOutOverlay.css";

interface TribeOutPauseOverlayProps {
  onResume: () => void;
  onRestart: () => void;
}

const PAUSE_CROPS = {
  resumeButton: { x: 201, y: 310, width: 1132, height: 364 },
  againButton: { x: 439, y: 189, width: 662, height: 657 },
  musicButton: { x: 454, y: 193, width: 619, height: 633 },
  sfxButton: { x: 437, y: 180, width: 656, height: 627 },
  sfxMutedButton: { x: 141, y: 150, width: 736, height: 703, canvasWidth: 1024, canvasHeight: 1024 },
  musicMutedButton: { x: 95, y: 110, width: 835, height: 854, canvasWidth: 1024, canvasHeight: 1024 },
} as const;

export function TribeOutPauseOverlay({
  onResume,
  onRestart,
}: TribeOutPauseOverlayProps) {
  const titleId = useId();
  const [sfxEnabled, setSfxEnabled] = useState(() => tribeOutAudio.isSfxEnabled());
  const [musicEnabled, setMusicEnabled] = useState(() => tribeOutAudio.isMusicEnabled());

  const toggleSfx = () => {
    const newState = !sfxEnabled;
    tribeOutAudio.setSfxEnabled(newState);
    setSfxEnabled(newState);
  };

  const toggleMusic = () => {
    const newState = !musicEnabled;
    tribeOutAudio.setMusicEnabled(newState);
    setMusicEnabled(newState);
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[rgba(18,32,12,0.72)] p-3 backdrop-blur-[5px] overlay-pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <section
        className="
          relative flex w-[min(420px,calc(100%-24px))] min-h-[240px] flex-col items-center justify-center
          gap-5 rounded-[28px] border-4 border-[#bc7924] bg-gradient-to-b from-[#fde8b0] via-[#f5d48a] via-40% to-[#e6c06e]
          px-7 pb-7 pt-8 shadow-[inset_0_4px_0_rgba(255,245,200,0.7),0_8px_0_rgba(78,43,6,0.75),0_24px_54px_rgba(42,36,24,0.42)]
          max-sm:min-h-[200px] max-sm:w-[min(340px,calc(100%-16px))] max-sm:gap-4 max-sm:rounded-[22px] max-sm:px-[18px] max-sm:pb-5 max-sm:pt-6
          landscape:max-h-[600px]:min-h-[180px] landscape:max-h-[600px]:w-[min(360px,calc(100%-16px))] landscape:max-h-[600px]:gap-3.5 landscape:max-h-[600px]:rounded-[20px] landscape:max-h-[600px]:px-4 landscape:max-h-[600px]:pb-4 landscape:max-h-[600px]:pt-5
        "
      >
        <h2
          id={titleId}
          className="
            m-0 text-center text-[clamp(26px,5vw,36px)] font-black uppercase leading-none tracking-[0.03em] text-[#5d2b0a]
            [text-shadow:0_2px_0_rgba(255,220,150,0.5),0_4px_6px_rgba(80,30,0,0.18)]
            max-sm:text-[clamp(22px,6vw,30px)]
            landscape:max-h-[600px]:text-[clamp(20px,4vw,28px)]
          "
        >
          TẠM DỪNG
        </h2>

        <div className="flex w-full items-center justify-center mt-2 max-sm:mt-1 landscape:max-h-[600px]:mt-1">
          <PauseAction
            label="CHƠI TIẾP"
            ariaLabel="Chơi tiếp"
            src="/EndGameScreen/continue.png"
            crop={PAUSE_CROPS.resumeButton}
            onClick={onResume}
            labelClass="text-[#ffffff] [text-shadow:0_2px_0_rgba(30,90,30,0.9),0_4px_8px_rgba(15,60,15,0.35)]"
          />
        </div>

        <div className="grid grid-cols-3 place-items-center gap-[clamp(14px,2vw,18px)] mt-1 max-sm:mt-1 landscape:max-h-[600px]:mt-1">
          <PauseRoundImageButton
            label="Chơi lại"
            onClick={onRestart}
            assetSrc="/ buttons/again.png"
            crop={PAUSE_CROPS.againButton}
          />

          <PauseRoundImageButton
            label={sfxEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            onClick={toggleSfx}
            assetSrc={sfxEnabled ? "/ buttons/sfx.png" : "/ buttons/nosfx.png"}
            crop={sfxEnabled ? PAUSE_CROPS.sfxButton : PAUSE_CROPS.sfxMutedButton}
          />

          <PauseRoundImageButton
            label={musicEnabled ? "Tắt nhạc" : "Bật nhạc"}
            onClick={toggleMusic}
            assetSrc={musicEnabled ? "/ buttons/music.png" : "/ buttons/nomusic.png"}
            crop={musicEnabled ? PAUSE_CROPS.musicButton : PAUSE_CROPS.musicMutedButton}
          />
        </div>
      </section>
    </div>
  );
}

interface PauseActionProps {
  label: string;
  ariaLabel: string;
  src: string;
  crop: { x: number; y: number; width: number; height: number };
  onClick: () => void;
  labelClass?: string;
}

function PauseAction({ label, ariaLabel, src, crop, onClick, labelClass = "" }: PauseActionProps) {
  return (
    <button
      type="button"
      className="
        relative grid w-[min(210px,72vw)] place-items-center
        border-0 bg-transparent p-0
        transition-[transform,filter] duration-[120ms] ease-out
        hover:-translate-y-[2px] hover:scale-[1.04] hover:brightness-[1.08]
        active:translate-y-[2px] active:scale-[0.97] active:brightness-[0.96]
        focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white
      "
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <CroppedAsset
        src={src}
        crop={crop}
        className="pointer-events-none block h-auto w-full rounded-lg"
      />
      <span
        className={`
          absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-[55%]
          whitespace-nowrap leading-none
          text-[clamp(16px,4vw,22px)] font-black tracking-[0.02em]
          max-sm:text-[clamp(14px,5vw,18px)]
          landscape:max-h-[600px]:text-[clamp(13px,3vw,17px)]
          ${labelClass}
        `}
      >
        {label}
      </span>
    </button>
  );
}
