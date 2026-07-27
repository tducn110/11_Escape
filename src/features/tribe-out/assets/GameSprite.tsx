import { useState } from "react";
import { AnimalSprite } from "../AnimalSprite";
import { IMAGE_ASSETS } from "./assetRegistry";
import type { Direction } from "../types";

const ARROW_ROT: Record<Direction, number> = { up: 0, right: 90, down: 180, left: 270 };

interface GameSpriteProps {
  assetKey: string;
  isObstacle?: boolean;
  direction?: Direction;
  size: number;
}

export function GameSprite({ assetKey, isObstacle, direction, size }: GameSpriteProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = IMAGE_ASSETS[assetKey];

  if (imageUrl && !imageError) {
    return (
      <div style={{ width: size, height: size, position: "relative" }}>
        <img 
          src={imageUrl} 
          alt={assetKey}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          onError={() => setImageError(true)}
          draggable={false}
        />
        {direction && (
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            transform: `rotate(${ARROW_ROT[direction]}deg)`
          }}>
             <svg width={size} height={size} viewBox="0 0 100 100">
                <g transform="translate(50 12)">
                  <circle r="10" fill="#fff" stroke="#2a2418" strokeWidth="2" />
                  <path d="M0 -4.5 L4.5 3 L-4.5 3 Z" fill="#2a2418" />
                </g>
             </svg>
          </div>
        )}
      </div>
    );
  }

  // Fallback to SVG implementation
  if (isObstacle) {
    return <ObstacleSprite size={size} />;
  }
  return <AnimalSprite assetKey={assetKey} direction={direction} size={size} />;
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
