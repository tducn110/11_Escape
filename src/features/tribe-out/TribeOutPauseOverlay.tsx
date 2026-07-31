import { Music, Play, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "../../components/shared/Button";
import { IconButton } from "../../components/shared/IconButton";

interface TribeOutPauseOverlayProps {
  onResume: () => void;
  onRestart: () => void;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
}

export function TribeOutPauseOverlay({
  onResume,
  onRestart,
  musicEnabled,
  sfxEnabled,
  onToggleMusic,
  onToggleSfx,
}: TribeOutPauseOverlayProps) {
  return (
    <div className="tribe-pause-overlay" role="dialog" aria-modal="true" aria-labelledby="tribe-pause-title">
      <section className="tribe-pause-panel">
        <h2 id="tribe-pause-title" className="tribe-pause-panel__title">
          PAUSE
        </h2>

        <Button
          aria-label="Chơi tiếp"
          onClick={onResume}
          variant="primary"
          className="tribe-pause-resume"
          style={{
            width: 152,
            minWidth: 152,
            height: 74,
            minHeight: 74,
            padding: 0,
            borderRadius: 26,
            border: "2px solid #ff8a52",
            background: "linear-gradient(180deg, #ff8550 0%, #ff5d36 100%)",
            boxShadow:
              "inset 0 4px 0 rgba(255, 231, 179, 0.55), 0 8px 0 rgba(200, 83, 33, 0.92), 0 18px 28px rgba(162, 63, 22, 0.18)",
            color: "#fffaf3",
          }}
        >
          <Play size={34} fill="currentColor" strokeWidth={2.8} aria-hidden="true" />
        </Button>

        <div className="tribe-pause-panel__actions" aria-label="Tùy chọn tạm dừng">
          <IconButton
            label="Chơi lại"
            onClick={onRestart}
            size={68}
            className="tribe-pause-action"
            style={{
              background: "linear-gradient(180deg, #69b9ff 0%, #338cf5 100%)",
              border: "2px solid #5b9ae0",
              color: "#ffffff",
              boxShadow:
                "inset 0 3px 0 rgba(232, 247, 255, 0.6), 0 6px 0 rgba(38, 105, 185, 0.9), 0 12px 18px rgba(26, 72, 128, 0.16)",
            }}
          >
            <RotateCcw size={30} strokeWidth={2.6} aria-hidden="true" />
          </IconButton>

          <IconButton
            label={sfxEnabled ? "Tắt hiệu ứng" : "Bật hiệu ứng"}
            onClick={onToggleSfx}
            size={68}
            className={`tribe-pause-action${sfxEnabled ? " is-on" : " is-off"}`}
            style={{
              background: sfxEnabled
                ? "linear-gradient(180deg, #69b9ff 0%, #338cf5 100%)"
                : "linear-gradient(180deg, #b3d4f5 0%, #81aad1 100%)",
              border: sfxEnabled ? "2px solid #5b9ae0" : "2px solid #718fb0",
              color: "#ffffff",
              opacity: sfxEnabled ? 1 : 0.92,
              boxShadow: sfxEnabled
                ? "inset 0 3px 0 rgba(232, 247, 255, 0.6), 0 6px 0 rgba(38, 105, 185, 0.9), 0 12px 18px rgba(26, 72, 128, 0.16)"
                : "inset 0 3px 0 rgba(241, 247, 253, 0.62), 0 6px 0 rgba(97, 120, 151, 0.8), 0 12px 18px rgba(26, 72, 128, 0.12)",
            }}
          >
            <Volume2 size={30} strokeWidth={2.6} aria-hidden="true" />
          </IconButton>

          <IconButton
            label={musicEnabled ? "Tắt nhạc" : "Bật nhạc"}
            onClick={onToggleMusic}
            size={68}
            className={`tribe-pause-action${musicEnabled ? " is-on" : " is-off"}`}
            style={{
              background: musicEnabled
                ? "linear-gradient(180deg, #69b9ff 0%, #338cf5 100%)"
                : "linear-gradient(180deg, #b3d4f5 0%, #81aad1 100%)",
              border: musicEnabled ? "2px solid #5b9ae0" : "2px solid #718fb0",
              color: "#ffffff",
              opacity: musicEnabled ? 1 : 0.92,
              boxShadow: musicEnabled
                ? "inset 0 3px 0 rgba(232, 247, 255, 0.6), 0 6px 0 rgba(38, 105, 185, 0.9), 0 12px 18px rgba(26, 72, 128, 0.16)"
                : "inset 0 3px 0 rgba(241, 247, 253, 0.62), 0 6px 0 rgba(97, 120, 151, 0.8), 0 12px 18px rgba(26, 72, 128, 0.12)",
            }}
          >
            <Music size={30} strokeWidth={2.6} aria-hidden="true" />
          </IconButton>
        </div>
      </section>
    </div>
  );
}
