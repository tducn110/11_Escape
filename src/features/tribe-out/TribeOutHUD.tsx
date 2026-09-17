import { Clock3, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  level: number;
  lives: number;
  maxLives: number;
  escapedCount: number;
  totalUnits: number;
  timeRemaining?: number;
}

export function TribeOutHUD({
  level,
  lives,
  maxLives,
  escapedCount,
  totalUnits,
  timeRemaining,
}: Props) {
  const { t } = useTranslation();
  const progress = totalUnits > 0 ? Math.min(100, (escapedCount / totalUnits) * 100) : 0;

  return (
    <div
      className="tribe-game-hud"
      aria-label={t("game.hudAria", {
        level,
        lives,
        escaped: escapedCount,
        total: totalUnits,
        defaultValue: `Level ${level}, ${lives} lives left, escaped ${escapedCount} of ${totalUnits}`,
      })}
    >
      <div
        className="tribe-game-hud__lives"
        aria-label={t("game.livesAria", {
          lives,
          max: maxLives,
          defaultValue: `${lives} of ${maxLives} lives`,
        })}
      >
        <div className="tribe-game-hud__hearts">
          {Array.from({ length: maxLives }).map((_, index) => {
            const full = index < lives;
            return (
              <Heart
                key={index}
                className="tribe-game-hud__heart"
                size={24}
                strokeWidth={2.4}
                fill={full ? "#ff5367" : "rgba(255,255,255,0.2)"}
                color={full ? "#e83f55" : "rgba(25,91,60,0.34)"}
              />
            );
          })}
        </div>
      </div>

      <div className="tribe-game-hud__progress">
        <div
          className="tribe-game-hud__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalUnits}
          aria-valuenow={escapedCount}
        >
          <span
            className="tribe-game-hud__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <strong className="tribe-game-hud__progress-value">
          {escapedCount}/{totalUnits}
        </strong>
      </div>

      {timeRemaining !== undefined ? (
        <span
          className="tribe-game-hud__metric"
          data-danger={timeRemaining <= 5 ? "true" : undefined}
        >
          <Clock3 size={22} aria-hidden="true" />
          <strong>{timeRemaining}s</strong>
        </span>
      ) : null}
    </div>
  );
}
