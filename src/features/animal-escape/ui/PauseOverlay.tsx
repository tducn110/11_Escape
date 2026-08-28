import { useTranslation } from "react-i18next";

export interface PauseOverlayProps {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic(): void;
  onToggleSfx(): void;
  onResume(): void;
  onRestart(): void;
}

export function PauseOverlay({
  musicEnabled,
  sfxEnabled,
  onToggleMusic,
  onToggleSfx,
  onResume,
  onRestart,
}: PauseOverlayProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage?.startsWith("en") ? "en" : "vi";
  const nextLanguage = currentLanguage === "vi" ? "en" : "vi";

  return (
    <div className="animal-escape-overlay">
      <div className="animal-escape-overlay__card">
        <h2 className="animal-escape-overlay__title">{t("common.pause")}</h2>
        <p className="animal-escape-overlay__text">{currentLanguage === "vi" ? "Trò chơi đang dừng. Bình tĩnh, các con vật chờ được!" : "The game is paused. Take a breath; the animals are waiting!"}</p>

        <button
          type="button"
          className="animal-escape-button animal-escape-button--ghost"
          onClick={() => void i18n.changeLanguage(nextLanguage)}
        >
          {t("settings.language")}: {nextLanguage.toUpperCase()}
        </button>

        <div className="animal-escape-toggle-row">
          <span>{t("settings.music")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={musicEnabled}
            className={`animal-escape-toggle${musicEnabled ? " is-on" : ""}`}
            onClick={onToggleMusic}
          />
        </div>
        <div className="animal-escape-toggle-row">
          <span>{t("settings.sfx")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={sfxEnabled}
            className={`animal-escape-toggle${sfxEnabled ? " is-on" : ""}`}
            onClick={onToggleSfx}
          />
        </div>

        <hr className="animal-escape-divider" />

        <div className="animal-escape-overlay__actions">
          <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onResume}>
            {t("common.resume")}
          </button>
          <button type="button" className="animal-escape-button animal-escape-button--ghost" onClick={onRestart}>
            {t("common.retry")}
          </button>
        </div>
      </div>
    </div>
  );
}
