import { useRef, useEffect, useState } from "react";
import { HudStat } from "../../components/game/HudStat";

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
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <HudStat
        align="start"
        label="Mạng"
        value={(
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart key={i} full={i < lives} />
          ))}
          </div>
        )}
      />
      <HudStat label="Màn" value={level} />
      <HudStat
        label="Thoát"
        value={`${escapedCount}/${totalUnits}`}
        valueStyle={{ color: escapedCount > 0 ? "#e87432" : "#2a2418" }}
      />
      <HudStat
        align="end"
        label="Xu"
        value={`🪙${coins}`}
        valueStyle={{
          color: "#d99820",
          animation: coinPopping ? "tribeScorePop 0.4s ease-out" : "none",
        }}
      />
    </div>
  );
}
