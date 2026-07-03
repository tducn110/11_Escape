import { useState, useEffect, useRef } from "react";
import type { TribeOutEntity, Direction } from "./types";
import { AnimalSprite } from "./AnimalSprite";

const ESCAPE_ANIM: Record<Direction, string> = {
  right: "tribeEscapeRight 0.55s ease-out forwards",
  left:  "tribeEscapeLeft 0.55s ease-out forwards",
  up:    "tribeEscapeUp 0.55s ease-out forwards",
  down:  "tribeEscapeDown 0.55s ease-out forwards",
};

const BUMP_ANIM: Record<Direction, string> = {
  right: "tribeBumpRight 0.48s ease-out",
  left:  "tribeBumpLeft 0.48s ease-out",
  up:    "tribeBumpUp 0.48s ease-out",
  down:  "tribeBumpDown 0.48s ease-out",
};

const GAP = 4;

interface Props {
  entity: TribeOutEntity;
  cellSize: number;
  isBumping: boolean;
  onTap: (id: string) => void;
}

const DIRECTION_LABELS: Record<Direction, string> = {
  up: "lên trên",
  down: "xuống dưới",
  left: "sang trái",
  right: "sang phải",
};

function getEntityAriaLabel(entity: TribeOutEntity): string {
  if (entity.type === "obstacle") {
    return `Chướng ngại vật kích thước ${entity.width}x${entity.height}`;
  }

  return `Nhân vật đi ${DIRECTION_LABELS[entity.direction ?? "right"]}, kích thước ${entity.width}x${entity.height}`;
}

export function TribeOutEntityComponent({ entity, cellSize, isBumping, onTap }: Props) {
  const [animState, setAnimState] = useState<"idle" | "bump" | "escape">("idle");
  const [hidden, setHidden] = useState(false);
  const prevEscapedRef = useRef(entity.escaped ?? false);
  const prevBumpingRef = useRef(false);
  const innerRef = useRef<HTMLDivElement>(null);

  // Detect escape transition and level-reset (escaped → not escaped)
  useEffect(() => {
    if (entity.escaped && !prevEscapedRef.current) {
      setAnimState("escape");
      prevEscapedRef.current = true;
      const t = setTimeout(() => setHidden(true), 580);
      return () => clearTimeout(t);
    } else if (!entity.escaped && prevEscapedRef.current) {
      setHidden(false);
      setAnimState("idle");
      prevEscapedRef.current = false;
    }
  }, [entity.escaped]);

  // Detect bump
  useEffect(() => {
    if (isBumping && !prevBumpingRef.current) {
      if (innerRef.current) {
        innerRef.current.style.animation = "none";
        void innerRef.current.offsetHeight;
      }
      setAnimState("bump");
      const t = setTimeout(() => setAnimState("idle"), 600);
      prevBumpingRef.current = isBumping;
      return () => clearTimeout(t);
    }
    prevBumpingRef.current = isBumping;
  }, [isBumping]);

  if (hidden) return null;

  const isObstacle = entity.type === "obstacle";
  const dir = entity.direction;

  const top    = entity.row * cellSize + GAP;
  const left   = entity.col * cellSize + GAP;
  const width  = entity.width  * cellSize - GAP * 2;
  const height = entity.height * cellSize - GAP * 2;

  let animation = "";
  if (animState === "escape" && dir) {
    animation = ESCAPE_ANIM[dir];
  } else if (animState === "bump" && dir) {
    animation = BUMP_ANIM[dir];
  } else if (!isObstacle) {
    animation = "tribeBreath 2.8s ease-in-out infinite";
  }

  const spriteSize = Math.min(width, height);
  const ariaLabel = getEntityAriaLabel(entity);

  const handleActivate = () => {
    if (!isObstacle) {
      onTap(entity.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isObstacle) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        zIndex: isObstacle ? 1 : 2,
        pointerEvents: isObstacle ? "none" : "auto",
      }}
    >
      <div
        ref={innerRef}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        role={isObstacle ? "img" : "button"}
        aria-label={ariaLabel}
        tabIndex={isObstacle ? -1 : 0}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isObstacle ? "default" : "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          animation,
          minWidth: 44,
          minHeight: 44,
          touchAction: "manipulation",
          outlineOffset: 4,
        }}
      >
        {isObstacle ? (
          <ObstacleSprite size={spriteSize} />
        ) : (
          <AnimalSprite assetKey={entity.assetKey} direction={dir} size={spriteSize} />
        )}
      </div>
    </div>
  );
}

function ObstacleSprite({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      <ellipse cx="50" cy="82" rx="30" ry="8" fill="rgba(42,36,24,0.18)" />
      <path
        d="M22 72 Q16 46 34 34 Q46 24 62 30 Q84 38 82 60 Q80 76 60 78 Q38 82 22 72 Z"
        fill="#9e9282"
        stroke="#6b6154"
        strokeWidth="3"
      />
      <path d="M40 42 Q52 40 60 48" stroke="#6b6154" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M34 58 Q46 60 56 56" stroke="#6b6154" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
