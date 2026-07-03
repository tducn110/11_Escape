import { useId, type CSSProperties } from "react";
import { GameButton } from "../../components/game/GameButton";
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
            <>
              {!isLastLevel ? (
                <GameButton
                  aria-label="Sang màn tiếp theo"
                  variant="primary"
                  fullWidth
                  onClick={onNextLevel}
                >
                  Màn Tiếp →
                </GameButton>
              ) : (
                <GameButton
                  aria-label="Chơi lại từ đầu"
                  variant="primary"
                  fullWidth
                  onClick={onNextLevel}
                >
                  Chơi Lại Từ Đầu 🔄
                </GameButton>
              )}
              <GameButton
                aria-label="Chơi lại màn hiện tại"
                variant="ghost"
                fullWidth
                onClick={onReplay}
              >
                Chơi Lại Màn Này
              </GameButton>
            </>
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
            <GameButton
              aria-label="Chơi lại màn hiện tại"
              variant="primary"
              fullWidth
              onClick={onRestart}
            >
              Thử Lại 🔄
            </GameButton>
          }
        />
        </div>
      </div>
    </div>
  );
}
