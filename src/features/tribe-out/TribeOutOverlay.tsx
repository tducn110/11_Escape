import type { CSSProperties } from "react";

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

const cardStyle: CSSProperties = {
  background: "#fdf6ea",
  border: "2.5px solid #2a2418",
  borderRadius: 24,
  padding: "28px 32px",
  textAlign: "center",
  maxWidth: 300,
  width: "90%",
  animation: "tribeOverlayIn 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards",
  boxShadow: "0 14px 40px rgba(42,36,24,0.22)",
};

export function WinOverlay({ level, escapedCount, coinsEarned, isLastLevel, onNextLevel, onReplay }: WinProps) {
  return (
    <div style={overlayBase}>
      <div style={cardStyle}>
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>🎉</div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#2a2418",
            margin: "0 0 4px",
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
        >
          Màn {level} Hoàn Thành!
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#8a7d65",
            margin: "0 0 14px",
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
        >
          Thoát {escapedCount} nhân vật
        </p>

        <div
          style={{
            background: "rgba(232,116,50,0.1)",
            border: "1.5px solid rgba(232,116,50,0.35)",
            borderRadius: 14,
            padding: "10px 18px",
            marginBottom: 20,
            display: "inline-block",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#d99820",
              fontFamily: "Be Vietnam Pro, sans-serif",
            }}
          >
            🪙 +{coinsEarned}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {!isLastLevel ? (
            <button
              className="tribe-btn-primary"
              onClick={onNextLevel}
              style={{ padding: "13px 28px", fontSize: 16 }}
            >
              Màn Tiếp →
            </button>
          ) : (
            <button
              className="tribe-btn-primary"
              onClick={onNextLevel}
              style={{ padding: "13px 28px", fontSize: 16 }}
            >
              Chơi Lại Từ Đầu 🔄
            </button>
          )}
          <button
            className="tribe-btn-ghost"
            onClick={onReplay}
            style={{ padding: "11px 28px", fontSize: 15 }}
          >
            Chơi Lại Màn Này
          </button>
        </div>
      </div>
    </div>
  );
}

export function LoseOverlay({ onRestart }: LoseProps) {
  return (
    <div style={overlayBase}>
      <div style={cardStyle}>
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>💔</div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#d4183d",
            margin: "0 0 8px",
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
        >
          Hết Mạng!
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#8a7d65",
            margin: "0 0 20px",
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
        >
          Bộ lạc cần bạn thử lại!
        </p>
        <button
          className="tribe-btn-primary"
          onClick={onRestart}
          style={{ padding: "13px 32px", fontSize: 16, width: "100%" }}
        >
          Thử Lại 🔄
        </button>
      </div>
    </div>
  );
}
