import { useRef, useEffect, useState } from "react";

interface Props {
  level: number;
  lives: number;
  maxLives: number;
  escapedCount: number;
  totalUnits: number;
  coins: number;
}

function Heart({ full }: { full: boolean }) {
  return (
    <span
      style={{
        fontSize: 20,
        lineHeight: 1,
        filter: full ? "none" : "grayscale(1) opacity(0.4)",
        transition: "filter 0.25s",
      }}
    >
      ❤️
    </span>
  );
}

export function TribeOutHUD({ level, lives, maxLives, escapedCount, totalUnits, coins }: Props) {
  const prevCoinsRef = useRef(coins);
  const [coinPopping, setCoinPopping] = useState(false);

  useEffect(() => {
    if (coins !== prevCoinsRef.current) {
      setCoinPopping(true);
      const t = setTimeout(() => setCoinPopping(false), 450);
      prevCoinsRef.current = coins;
      return () => clearTimeout(t);
    }
  }, [coins]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px 10px",
        borderBottom: "1.5px solid rgba(138,125,101,0.18)",
        background: "rgba(253,246,234,0.95)",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      {/* Lives */}
      <div className="tribe-hud-stat" style={{ alignItems: "flex-start" }}>
        <span className="tribe-hud-label">Mạng</span>
        <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart key={i} full={i < lives} />
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="tribe-hud-stat">
        <span className="tribe-hud-label">Màn</span>
        <span className="tribe-hud-value">{level}</span>
      </div>

      {/* Escaped progress */}
      <div className="tribe-hud-stat">
        <span className="tribe-hud-label">Thoát</span>
        <span
          className="tribe-hud-value"
          style={{ color: escapedCount > 0 ? "#e87432" : "#2a2418" }}
        >
          {escapedCount}/{totalUnits}
        </span>
      </div>

      {/* Coins */}
      <div className="tribe-hud-stat" style={{ alignItems: "flex-end" }}>
        <span className="tribe-hud-label">Xu</span>
        <span
          className="tribe-hud-value"
          style={{
            color: "#d99820",
            animation: coinPopping ? "tribeScorePop 0.4s ease-out" : "none",
          }}
        >
          🪙{coins}
        </span>
      </div>
    </div>
  );
}
