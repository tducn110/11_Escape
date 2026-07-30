import { Music, RotateCcw, Settings as SettingsIcon, Volume2 } from "lucide-react";
import { Button } from "../../../components/shared/Button";

interface SettingsProps {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onMusicChange: (enabled: boolean) => void;
  onSfxChange: (enabled: boolean) => void;
  onBack: () => void;
}

export function SettingsScreen({ musicEnabled, sfxEnabled, onMusicChange, onSfxChange, onBack }: SettingsProps) {
  return (
    <section className="tribe-settings" aria-labelledby="tribe-settings-title">
      <header className="tribe-settings__brand">
        <div className="tribe-settings__game-title">Thoát Khỏi Rừng</div>
        <div className="tribe-settings__title-plaque">
          <SettingsIcon size={28} aria-hidden="true" />
          <h1 id="tribe-settings-title">Cài đặt</h1>
        </div>
      </header>

      <div className="tribe-settings__panel">
        <div className="tribe-settings__badge" aria-hidden="true">
          <SettingsIcon size={48} strokeWidth={2.3} />
        </div>
        <div className="tribe-settings__rows">
          <div className="tribe-settings__row">
            <div className="tribe-settings__label">
              <Music size={42} strokeWidth={2.25} aria-hidden="true" />
              <span>Âm nhạc</span>
            </div>
            <button
              type="button"
              className={`tribe-settings-toggle${musicEnabled ? "" : " is-off"}`}
              role="switch"
              aria-checked={musicEnabled}
              aria-label="Bật hoặc tắt âm nhạc"
              onClick={() => onMusicChange(!musicEnabled)}
            >
              <span>{musicEnabled ? "Bật" : "Tắt"}</span>
              <i aria-hidden="true" />
            </button>
          </div>

          <div className="tribe-settings__row">
            <div className="tribe-settings__label">
              <Volume2 size={42} strokeWidth={2.25} aria-hidden="true" />
              <span>Hiệu ứng</span>
            </div>
            <button
              type="button"
              className={`tribe-settings-toggle${sfxEnabled ? "" : " is-off"}`}
              role="switch"
              aria-checked={sfxEnabled}
              aria-label="Bật hoặc tắt hiệu ứng âm thanh"
              onClick={() => onSfxChange(!sfxEnabled)}
            >
              <span>{sfxEnabled ? "Bật" : "Tắt"}</span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>

        <Button onClick={onBack} size="lg" variant="primary" className="tribe-settings__back">
          <RotateCcw size={28} strokeWidth={2.7} aria-hidden="true" />
          Quay về
        </Button>
      </div>
    </section>
  );
}
