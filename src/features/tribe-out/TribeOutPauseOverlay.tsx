import { Play, Undo2 } from "lucide-react";
import { IconButton } from "../../components/shared/IconButton";

interface TribeOutPauseOverlayProps {
  onResume: () => void;
}

export function TribeOutPauseOverlay({ onResume }: TribeOutPauseOverlayProps) {
  return (
    <div className="tribe-pause-overlay" role="dialog" aria-modal="true" aria-labelledby="tribe-pause-title">
      <section className="tribe-pause-panel">
        <div className="tribe-pause-panel__sign">
          <h2 id="tribe-pause-title">Tạm dừng</h2>
        </div>
        <div className="tribe-pause-panel__actions">
          <IconButton label="Chơi tiếp" onClick={onResume} size={160} className="tribe-pause-action tribe-pause-action--resume">
            <Play size={54} fill="currentColor" aria-hidden="true" />
            <span>Chơi tiếp</span>
          </IconButton>
          <IconButton label="Quay lại" onClick={onResume} size={160} className="tribe-pause-action tribe-pause-action--exit">
            <Undo2 size={54} aria-hidden="true" />
            <span>Quay lại</span>
          </IconButton>
        </div>
      </section>
    </div>
  );
}
