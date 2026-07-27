import { useId, type CSSProperties } from "react";
import { Button } from "../../components/shared/Button";
import { GameOverlayFrame } from "../../components/game/GameOverlayFrame";

interface WinProps {
  level: number;
  escapedCount: number;
  coinsEarned: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

interface LoseProps {
  onRestart: () => void;
  reason: "lives" | "time";
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

export function WinOverlay({ level, escapedCount, coinsEarned, isLastLevel, onNextLevel, onReplay }: WinProps) {
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
          badge={<span className="tribe-overlay-coins">🪙 +{coinsEarned}</span>}
          actions={
            <div className="flex flex-col gap-2.5 w-full">
              {!isLastLevel ? (
                <Button
                  aria-label="Sang màn tiếp theo"
                  variant="primary"
                  size="md"
                  style={{ width: "100%" }}
                  onClick={onNextLevel}
                >
                  Màn Tiếp →
                </Button>
              ) : (
                <Button
                  aria-label="Chơi lại từ đầu"
                  variant="primary"
                  size="md"
                  style={{ width: "100%" }}
                  onClick={onNextLevel}
                >
                  Chơi Lại Từ Đầu 🔄
                </Button>
              )}
              <Button
                aria-label="Chơi lại màn hiện tại"
                variant="ghost"
                size="md"
                style={{ width: "100%" }}
                onClick={onReplay}
              >
                Chơi Lại Màn Này
              </Button>
            </div>
          }
        />
        </div>
      </div>
    </div>
  );
}

export function LoseOverlay({ onRestart, reason }: LoseProps) {
  const titleId = useId();
  const descriptionId = useId();

  const title = reason === "time" ? "Hết Giờ!" : "Hết Mạng!";
  const description = reason === "time" ? "Bạn đã không kịp giải cứu bộ lạc!" : "Bộ lạc cần bạn thử lại!";

  return (
    <div style={overlayBase} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "16px" }}>
        <div className="tribe-overlay-card">
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{reason === "time" ? "⏱️" : "💔"}</div>
        <div id={titleId} style={{ display: "none" }}>{title}</div>
        <div id={descriptionId} style={{ display: "none" }}>{description}</div>
        <GameOverlayFrame
          title={title}
          description={description}
          tone="danger"
          actions={
            <Button
              aria-label="Chơi lại màn hiện tại"
              variant="danger"
              size="md"
              style={{ width: "100%" }}
              onClick={onRestart}
            >
              Thử Lại 🔄
            </Button>
          }
        />
        </div>
      </div>
    </div>
  );
}
