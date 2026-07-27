import { useState, useEffect, useRef, memo } from "react";
import type { TribeOutEntity, Direction } from "./types";
import { GameSprite } from "./assets/GameSprite";

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

interface TribeOutEntityProps {
  entity: TribeOutEntity;
  cellSize: number;
  isBumping: boolean;
  bumpNonce?: number;
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

export const TribeOutEntityComponent = memo(function TribeOutEntityComponent({
  entity,
  cellSize,
  isBumping,
  bumpNonce = 0,
  onTap,
}: TribeOutEntityProps) {
  const [animState, setAnimState] = useState<"idle" | "bump" | "escape">("idle");
  const [hidden, setHidden] = useState(entity.escaped);
  
  const prevBumpingRef = useRef(isBumping);
  const prevEscapedRef = useRef(entity.escaped);
  const prevBumpNonceRef = useRef(bumpNonce);
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

  // Detect bump transition
  useEffect(() => {
    const nonceChanged = bumpNonce > 0 && bumpNonce !== prevBumpNonceRef.current;
    if ((isBumping && !prevBumpingRef.current) || nonceChanged) {
      if (innerRef.current) {
        innerRef.current.style.animation = "none";
        void innerRef.current.offsetHeight;
      }
      setAnimState("bump");
      const t = setTimeout(() => setAnimState("idle"), 600);
      prevBumpingRef.current = isBumping;
      prevBumpNonceRef.current = bumpNonce;
      return () => clearTimeout(t);
    }
    prevBumpingRef.current = isBumping;
    prevBumpNonceRef.current = bumpNonce;
  }, [isBumping, bumpNonce]);

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
          touchAction: "manipulation",
          outlineOffset: 4,
        }}
      >
        <GameSprite 
          assetKey={isObstacle ? "rock" : entity.assetKey}
          isObstacle={isObstacle}
          direction={dir}
          size={spriteSize}
        />
      </div>
    </div>
  );
});

