import { useId, type CSSProperties } from "react";
import { Button } from "../../components/shared/Button";
import { GameOverlayFrame } from "../../components/game/GameOverlayFrame";

interface WinProps {
  level: number;
  escapedCount: number;
  stars: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

interface LoseProps {
  onRestart: () => void;
}

const overlayBase: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(42,36,24,0.55)",
  zIndex: 20,
  borderRadius: 26,
  backdropFilter: "blur(3px)",
};

export function WinOverlay({ level, escapedCount, stars, isLastLevel, onNextLevel, onReplay }: WinProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div style={overlayBase} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "16px" }}>
        <div className="tribe-overlay-card">
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>🎉</div>
        <div id={titleId} style={{ display: "none" }}>Màn {level} Hoàn Thành!</div>
        <div id={descriptionId} style={{ display: "none" }}>Thoát {escapedCount} nhân vật</div>
        <GameOverlayFrame
          title={`Màn ${level} Hoàn Thành!`}
          description={`Thoát ${escapedCount} nhân vật`}
          badge={
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ 
                color: "#ffc107", 
                fontSize: 52, 
                letterSpacing: 8,
                WebkitTextStroke: "2px #b05c00",
                textShadow: "0 5px 0 #b05c00, 0 10px 14px rgba(0,0,0,0.35)",
                lineHeight: 1
              }}>
                {"★".repeat(stars)}{"☆".repeat(3 - stars)}
              </span>
            </div>
          }
          actions={
            <div className="flex flex-col gap-3 w-full">
              {!isLastLevel ? (
                <Button
                  aria-label="Sang màn tiếp theo"
                  variant="primary"
                  size="lg"
                  style={{ width: "100%", fontSize: 18, padding: "16px 20px", minHeight: 56 }}
                  onClick={onNextLevel}
                >
                  Màn Tiếp ➔
                </Button>
              ) : (
                <Button
                  aria-label="Chơi lại từ đầu"
                  variant="primary"
                  size="lg"
                  style={{ width: "100%", fontSize: 18, padding: "16px 20px", minHeight: 56 }}
                  onClick={onNextLevel}
                >
                  Chơi Lại Từ Đầu 🔄
                </Button>
              )}
              <Button
                aria-label="Chơi lại màn hiện tại"
                variant="secondary"
                size="lg"
                style={{ width: "100%", fontSize: 18, padding: "16px 20px", minHeight: 56 }}
                onClick={onReplay}
              >
                Chơi Lại Màn Này ↺
              </Button>
            </div>
          }
        />
        </div>
      </div>
    </div>
  );
}

export function LoseOverlay({ onRestart }: LoseProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div style={overlayBase} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "16px" }}>
        <div className="tribe-overlay-card">
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>💔</div>
        <div id={titleId} style={{ display: "none" }}>Hết Mạng!</div>
        <div id={descriptionId} style={{ display: "none" }}>Bộ lạc cần bạn thử lại!</div>
        <GameOverlayFrame
          title="Hết Mạng!"
          description="Bộ lạc cần bạn thử lại!"
          tone="danger"
          actions={
            <Button
              aria-label="Chơi lại màn hiện tại"
              variant="danger"
              size="lg"
              style={{ width: "100%", fontSize: 18, padding: "16px 20px", minHeight: 56 }}
              onClick={onRestart}
            >
              Thử Lại ↺
            </Button>
          }
        />
        </div>
      </div>
    </div>
  );
}
