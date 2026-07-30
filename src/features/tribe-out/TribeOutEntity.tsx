import { useState, useEffect, useRef, memo } from "react";
import type { Direction, TribeOutEntity } from "./types";
import { GameSprite } from "./assets/GameSprite";
import type { IsoBoardLayout } from "./isometric";
import { projectIsoEntity } from "./isometric";

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

interface TribeOutEntityProps {
  entity: TribeOutEntity;
  layout: IsoBoardLayout;
  isBumping: boolean;
  bumpNonce?: number;
  isHinted?: boolean;
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
  if (entity.type === "gate") {
    return `Cổng ${entity.open ? "đang mở" : "đang đóng"} kích thước ${entity.width}x${entity.height}`;
  }
  if (entity.type === "switch") {
    return `Công tắc ${entity.activated ? "đã kích hoạt" : "chưa kích hoạt"} kích thước ${entity.width}x${entity.height}`;
  }
  const direction = entity.type === "unit" ? entity.direction : "right";
  return `Nhân vật đi ${DIRECTION_LABELS[direction]}, kích thước ${entity.width}x${entity.height}`;
}

export const TribeOutEntityComponent = memo(function TribeOutEntityComponent({
  entity,
  layout,
  isBumping,
  bumpNonce = 0,
  isHinted,
  onTap,
}: TribeOutEntityProps) {
  const [animState, setAnimState] = useState<"idle" | "bump" | "escape">("idle");
  const isUnitType = entity.type === "unit";
  const escaped = isUnitType ? Boolean(entity.escaped) : false;
  const [hidden, setHidden] = useState(escaped);
  
  const prevBumpingRef = useRef(isBumping);
  const prevEscapedRef = useRef(escaped);
  const prevBumpNonceRef = useRef(bumpNonce);
  const innerRef = useRef<HTMLDivElement>(null);

  // Detect escape transition and level-reset (escaped → not escaped)
  useEffect(() => {
    if (escaped && !prevEscapedRef.current) {
      setAnimState("escape");
      prevEscapedRef.current = true;
      const t = setTimeout(() => setHidden(true), 580);
      return () => clearTimeout(t);
    } else if (!escaped && prevEscapedRef.current) {
      setHidden(false);
      setAnimState("idle");
      prevEscapedRef.current = false;
    }
  }, [escaped]);

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

  const isUnit = isUnitType && !escaped;
  const isObstacle = entity.type === "obstacle";
  const isGate = entity.type === "gate";
  const isSwitch = entity.type === "switch";
  const blocksPointer = isObstacle || isGate || isSwitch;
  const isInteractive = isUnit;
  
  const dir = entity.type === "unit" ? entity.direction : undefined;
  const projected = projectIsoEntity(layout, entity);
  const width = Math.max(32, Math.round(projected.width));
  const height = Math.max(32, Math.round(projected.height));
  const left = Math.round(projected.x - width / 2);
  const top = Math.round(projected.y - height / 2);
  const spriteOffsetX = isUnit && entity.width > 1 ? -((entity.width - 1) * layout.stepX) / 2 : 0;

  let animation = "";
  if (animState === "escape" && dir) {
    animation = ESCAPE_ANIM[dir];
  } else if (animState === "bump" && dir) {
    animation = BUMP_ANIM[dir];
  } else if (isUnit) {
    animation = "tribeBreath 2.8s ease-in-out infinite";
  }

  const spriteSize = Math.max(24, Math.round(Math.min(width, height) * 0.92));
  const ariaLabel = getEntityAriaLabel(entity);

  const handleActivate = () => {
    if (isInteractive) {
      onTap(entity.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  let assetKey = entity.assetKey;
  if (isGate) assetKey = entity.open ? "gate-open" : "gate-closed";
  if (isSwitch) assetKey = entity.activated ? "switch-active" : "switch-inactive";

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        zIndex: isSwitch ? projected.zIndex - 10 : projected.zIndex,
        pointerEvents: blocksPointer ? "none" : "auto",
      }}
    >
      <div
        ref={innerRef}
        onClick={isInteractive ? handleActivate : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={isInteractive ? "button" : "img"}
        aria-label={ariaLabel}
        tabIndex={isInteractive ? 0 : -1}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isInteractive ? "pointer" : "default",
          userSelect: "none",
          WebkitUserSelect: "none",
          animation,
          filter: isHinted ? "drop-shadow(0 0 12px #fff) brightness(1.2)" : "none",
          touchAction: "manipulation",
          outlineOffset: 4,
          transform: "translateZ(0)",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          transform: spriteOffsetX === 0 ? "none" : `translateX(${spriteOffsetX}px)`,
          transformOrigin: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {!(entity.type === "gate" && entity.open) && (
            <GameSprite
              assetKey={assetKey}
              isObstacle={blocksPointer}
              isSwitch={isSwitch}
              direction={dir}
              size={spriteSize}
            />
          )}
        </div>
      </div>
    </div>
  );
});
