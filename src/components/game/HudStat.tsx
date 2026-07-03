import type { CSSProperties, ReactNode } from "react";

interface HudStatProps {
  label: ReactNode;
  value: ReactNode;
  align?: "start" | "center" | "end";
  valueStyle?: CSSProperties;
}

export function HudStat({ label, value, align = "center", valueStyle }: HudStatProps) {
  const alignItems =
    align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center";

  return (
    <div className="game-hud-stat" style={{ alignItems }}>
      <span className="game-hud-stat__label">{label}</span>
      <span className="game-hud-stat__value" style={valueStyle}>
        {value}
      </span>
    </div>
  );
}
