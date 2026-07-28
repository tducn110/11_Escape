import type { CSSProperties, ReactNode } from "react";

interface GameOverlayFrameProps {
  title: ReactNode;
  description?: ReactNode;
  tone?: "default" | "danger";
  badge?: ReactNode;
  actions: ReactNode;
}

export function GameOverlayFrame({
  title,
  description,
  tone = "default",
  badge,
  actions,
}: GameOverlayFrameProps) {
  const titleStyle: CSSProperties =
    tone === "danger"
      ? { color: "#d4183d" }
      : { color: "#2a2418" };

  return (
    <div className="game-overlay-frame">
      <h2 className="game-overlay-frame__title" style={titleStyle}>
        {title}
      </h2>
      {description ? <p className="game-overlay-frame__description">{description}</p> : null}
      {badge ? <div className="game-overlay-frame__badge">{badge}</div> : null}
      <div className="game-overlay-frame__actions">{actions}</div>
    </div>
  );
}
