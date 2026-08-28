import { Pause, RotateCw, RotateCcw, Lightbulb } from "lucide-react";
import type { GamePhase } from "../types";

export interface AnimalEscapeHudProps {
  levelIndex: number;
  phase: GamePhase;
  timeRemaining: number;
  lives: number;
  maxLives: number;
  rotateChargesRemaining: number;
  rotateMode: boolean;
  hintsUsed: number;
  maxHints: number;
  timeDanger: boolean;
  onToggleRotateMode(): void;
  onUseHint(): void;
  onPause(): void;
}

export function AnimalEscapeHud({
  levelIndex,
  phase,
  timeRemaining,
  lives,
  maxLives,
  rotateChargesRemaining,
  rotateMode,
  hintsUsed,
  maxHints,
  timeDanger,
  onToggleRotateMode,
  onUseHint,
  onPause,
}: AnimalEscapeHudProps) {
  const playing = phase === "playing";

  return (
    <header className="animal-escape-hud">
      <div className="animal-escape-hud__left">
        <div className="animal-escape-hud__badge">
          <span className="animal-escape-hud__level-label">Màn</span>
          <span className="animal-escape-hud__level-number">{levelIndex + 1}</span>
        </div>
        <div className="animal-escape-hud__hearts" aria-label="Mạng">
          {Array.from({ length: maxLives }, (_, i) => (
            <span key={i} className={i < lives ? "is-alive" : ""}>❤️</span>
          ))}
        </div>
      </div>

      <div
        className={`animal-escape-hud__time${timeDanger ? " animal-escape-hud__time--danger" : ""}`}
        aria-label="Thời gian"
      >
        {timeRemaining}s
      </div>

      <div className="animal-escape-hud__right">
        <button
          type="button"
          className={`animal-escape-hud__button${rotateMode ? " animal-escape-hud__button--active" : ""}`}
          disabled={!playing || rotateChargesRemaining <= 0}
          onClick={onToggleRotateMode}
          aria-label="Xoay"
          title="Xoay hướng chạy"
        >
          {rotateMode ? <RotateCw /> : <RotateCcw />}
          <span>{rotateChargesRemaining}</span>
        </button>
        <button
          type="button"
          className="animal-escape-hud__button"
          disabled={!playing || hintsUsed >= maxHints}
          onClick={onUseHint}
          aria-label="Gợi ý"
          title="Gợi ý"
        >
          <Lightbulb />
          <span>{maxHints - hintsUsed}</span>
        </button>
        <button
          type="button"
          className="animal-escape-hud__button"
          disabled={!playing}
          onClick={onPause}
          aria-label="Tạm dừng"
          title="Tạm dừng"
        >
          <Pause />
        </button>
      </div>
    </header>
  );
}