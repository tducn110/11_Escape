import { useId, useEffect, useState } from "react";
import { CroppedAsset } from "./CroppedAsset";
import "./tribeOutOverlay.css";

/* ─── Asset bounding boxes (alpha > 128 on 1536×1024 canvas) ───────────────
   EndGameScreen/khung.png   (139,200)→(1387,826)  1249×627
   EndGameScreen/bangten.png (143,337)→(1385,639)  1243×303
   EndGameScreen/sao.png     (523,225)→(1004,690)   482×466
   EndGameScreen/continue.png(201,310)→(1332,673)  1132×364
   EndGameScreen/again.png   (259,351)→(1278,633)  1020×283
   EndGameScreen/decorate.png(378,115)→(1039,816)   662×702
   EndGameScreen/decorate2.png(320,197)→(1201,752)  882×556

   loseGamescreen/khung.png  (299,210)→(1237,814)   938×604
   loseGamescreen/Endgame.png — full title art, render without crop
   loseGamescreen/decorate1.png — full art, render without crop
   loseGamescreen/again.png  (259,351)→(1278,633)  1020×283
   ─────────────────────────────────────────────────────────────────────────── */

const WIN_CROPS = {
  frame:        { x: 139,  y: 200, width: 1249, height: 627 },
  banner:       { x: 143,  y: 337, width: 1243, height: 303 },
  confetti:     { x: 320,  y: 197, width: 882,  height: 556 },
  vine:         { x: 378,  y: 115, width: 662,  height: 702 },
  star:         { x: 523,  y: 225, width: 482,  height: 466 },
  nextButton:   { x: 201,  y: 310, width: 1132, height: 364 },
  replayButton: { x: 259,  y: 351, width: 1020, height: 283 },
} as const;

const LOSE_CROPS = {
  frame:       { x: 299, y: 210, width: 938,  height: 604 },
  title:       { x: 0,   y: 0,   width: 1536, height: 1024 },  // full canvas
  heart:       { x: 458, y: 190, width: 625,  height: 546 },
  retryButton: { x: 259, y: 351, width: 1020, height: 283 },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   WinOverlay
   ═══════════════════════════════════════════════════════════════════════════ */

interface WinProps {
  level: number;
  escapedCount: number;
  stars: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

export function WinOverlay({
  level,
  escapedCount,
  stars,
  isLastLevel,
  onNextLevel,
  onReplay,
}: WinProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [starVisible, setStarVisible] = useState([false, false, false]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 3; i++) {
      timers.push(
        setTimeout(() => {
          setStarVisible(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 350 + i * 200)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[rgba(18,32,12,0.72)] p-3 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Accessible labels */}
      <h2 id={titleId} className="sr-only">
        Màn {level} Hoàn Thành!
      </h2>
      <p id={descriptionId} className="sr-only">
        Thoát {escapedCount} nhân vật
      </p>

      {/* Stage — sized by CSS geometry class */}
      <section className="eg-win-stage overlay-pop relative isolate">
        {/* Confetti behind everything */}
        <CroppedAsset
          src="/EndGameScreen/decorate2.png"
          crop={WIN_CROPS.confetti}
          className="eg-win-confetti"
        />

        {/* Bamboo frame */}
        <div className="eg-win-frame relative z-10 w-full">
          <CroppedAsset
            src="/EndGameScreen/khung.png"
            crop={WIN_CROPS.frame}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Content inside frame — Tailwind layout */}
          <div
            className="
              absolute inset-x-[12%] bottom-[10%] top-[20%]
              z-[2] grid content-center justify-items-center
              gap-[clamp(2px,0.7vw,8px)]
            "
          >
            <h2
              aria-hidden="true"
              className="
                m-0 whitespace-nowrap text-center
                text-[clamp(20px,4.3vw,38px)]
                font-black leading-none text-[#704011]
                [text-shadow:0_2px_0_rgba(255,226,163,0.72),0_4px_7px_rgba(86,41,4,0.2)]
              "
            >
              HOÀN THÀNH!
            </h2>

            <p
              className="
                m-0 text-center
                text-[clamp(11px,2.4vw,16px)]
                font-bold text-[#7a4a1a]
                [text-shadow:0_1px_0_rgba(255,220,150,0.4)]
              "
            >
              Thoát {escapedCount} nhân vật
            </p>

            {/* Stars row */}
            <div
              className="flex items-center justify-center gap-[clamp(2px,1.2vw,8px)]"
              aria-label={`${stars} sao`}
            >
              {[0, 1, 2].map(i => (
                <CroppedAsset
                  key={i}
                  src="/EndGameScreen/sao.png"
                  crop={WIN_CROPS.star}
                  className={[
                    "h-[clamp(38px,8vw,68px)] w-[clamp(38px,8vw,68px)] flex-shrink-0 transition-none",
                    i < stars ? "" : "opacity-30 grayscale",
                    starVisible[i] ? "eg-win-star--visible" : "opacity-0",
                  ].join(" ")}
                  aria-label={i < stars ? "Sao đầy" : "Sao rỗng"}
                  aria-hidden={undefined}
                  focusable={undefined}
                />
              ))}
            </div>

            {/* Action buttons row */}
            <div className="flex w-full items-center justify-center gap-[clamp(4px,1.8vw,12px)]">
              <WinAction
                label={isLastLevel ? "TỪ ĐẦU" : "MÀN TIẾP"}
                ariaLabel={isLastLevel ? "Chơi lại từ đầu" : "Sang màn tiếp theo"}
                src="/EndGameScreen/continue.png"
                crop={WIN_CROPS.nextButton}
                onClick={onNextLevel}
              />
              <WinAction
                label="CHƠI LẠI"
                ariaLabel="Chơi lại màn hiện tại"
                src="/EndGameScreen/again.png"
                crop={WIN_CROPS.replayButton}
                onClick={onReplay}
              />
            </div>
          </div>
        </div>

        {/* Banner on top of frame */}
        <CroppedAsset
          src="/EndGameScreen/bangten.png"
          crop={WIN_CROPS.banner}
          className="eg-win-banner"
        />
        <span
          className="
            pointer-events-none absolute left-1/2 top-[-3%] z-[40]
            -translate-x-1/2 whitespace-nowrap
            text-[clamp(14px,2.8vw,22px)] font-black
            tracking-[0.04em] text-white
            [text-shadow:0_2px_0_rgba(25,80,25,0.9),0_4px_8px_rgba(10,50,10,0.4)]
          "
          aria-hidden="true"
        >
          MÀN {level}
        </span>

        {/* Vine decorations */}
        <CroppedAsset
          src="/EndGameScreen/decorate.png"
          crop={WIN_CROPS.vine}
          className="eg-win-vine eg-win-vine--top"
        />
        <CroppedAsset
          src="/EndGameScreen/decorate.png"
          crop={WIN_CROPS.vine}
          className="eg-win-vine eg-win-vine--bottom"
        />
      </section>
    </div>
  );
}

interface WinActionProps {
  label: string;
  ariaLabel: string;
  src: string;
  crop: { x: number; y: number; width: number; height: number };
  onClick: () => void;
}

function WinAction({ label, ariaLabel, src, crop, onClick }: WinActionProps) {
  return (
    <button
      type="button"
      className="
        relative grid h-[clamp(40px,7vw,58px)]
        min-h-10 w-[min(46%,200px)] place-items-center
        border-0 bg-transparent p-0
        transition-transform duration-150
        hover:-translate-y-0.5 hover:scale-[1.02]
        active:translate-y-0.5 active:scale-[0.98]
        focus-visible:rounded-xl focus-visible:outline
        focus-visible:outline-4 focus-visible:outline-offset-2
        focus-visible:outline-white
      "
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <CroppedAsset
        src={src}
        crop={crop}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <span
        className="
          relative z-[1] whitespace-nowrap
          text-[clamp(10px,2.2vw,16px)]
          font-black leading-none text-white
          [text-shadow:0_2px_0_rgba(40,20,2,0.8),0_3px_5px_rgba(30,15,0,0.35)]
        "
      >
        {label}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LoseOverlay — only onRestart, no Home button
   ═══════════════════════════════════════════════════════════════════════════ */

interface LoseProps {
  onRestart: () => void;
}

export function LoseOverlay({ onRestart }: LoseProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div
      className="
        fixed inset-0 z-[100] grid place-items-center overflow-hidden
        bg-[rgba(36,20,9,0.72)] p-3 backdrop-blur-[5px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <section className="eg-lose-stage overlay-pop relative isolate">
        <h2 id={titleId} className="sr-only">
          Hết mạng
        </h2>

        {/* Frame */}
        <div className="eg-lose-frame relative z-10 w-full">
          <CroppedAsset
            src="/loseGamescreen/khung.png"
            crop={LOSE_CROPS.frame}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Content inside frame — Tailwind layout */}
          <div
            className="
              absolute inset-x-[13%] bottom-[12%] top-[27%]
              z-[2] flex flex-col items-center justify-center gap-4
            "
          >
            <p
              id={descriptionId}
              className="
                m-0 text-center text-[clamp(12px,2.8vw,17px)]
                font-extrabold text-[#f8ddb0]
                [text-shadow:0_2px_0_rgba(71,26,4,0.85)]
              "
            >
              Bộ lạc cần bạn thử lại!
            </p>

            <button
              type="button"
              className="
                relative grid h-[clamp(46px,8vw,60px)]
                min-h-11 w-[min(80%,285px)] place-items-center
                border-0 bg-transparent p-0
                transition-transform hover:scale-[1.02]
                active:scale-[0.98]
                focus-visible:rounded-xl focus-visible:outline
                focus-visible:outline-4 focus-visible:outline-white
              "
              onClick={onRestart}
              aria-label="Thử lại màn hiện tại"
            >
              <CroppedAsset
                src="/loseGamescreen/again.png"
                crop={LOSE_CROPS.retryButton}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            </button>
          </div>
        </div>

        {/* Title art floats above frame */}
        <CroppedAsset
          src="/loseGamescreen/Endgame.png"
          crop={LOSE_CROPS.title}
          className="eg-lose-title-art"
        />

        {/* Heart decoration – single centred instance */}
        <div className="eg-lose-heart-wrap" aria-hidden="true">
          <CroppedAsset
            src="/loseGamescreen/decorate1.png"
            crop={LOSE_CROPS.heart}
            className="eg-lose-heart-art"
          />
        </div>
      </section>
    </div>
  );
}
