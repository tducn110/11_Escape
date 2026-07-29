import { useState } from "react";
import { AnimalSprite } from "../AnimalSprite";
import { IMAGE_ASSETS } from "./assetRegistry";
import type { Direction } from "../types";


interface GameSpriteProps {
  assetKey: string;
  isObstacle?: boolean;
  isSwitch?: boolean;
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
          }}>
             <svg width={size} height={size} viewBox="0 0 100 100">
                <g transform={`rotate(${{ down: 0, left: 90, up: 180, right: 270 }[direction]} 50 50) translate(50 85)`}>
                  <circle r="10" fill="#fff" stroke="#2a2418" strokeWidth="2" />
                  <path d="M0 4.5 L-4.5 -3 L4.5 -3 Z" fill="#2a2418" />
                </g>
             </svg>
          </div>
        )}
      </div>
    );
  }

  // Fallback to SVG implementation
  if (assetKey === "gate-open") return <GateSprite size={size} open={true} />;
  if (assetKey === "gate-closed") return <GateSprite size={size} open={false} />;
  if (assetKey === "switch-active") return <SwitchSprite size={size} active={true} />;
  if (assetKey === "switch-inactive") return <SwitchSprite size={size} active={false} />;
  
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

function GateSprite({ size, open }: { size: number; open: boolean }) {
  const color = open ? "#8bc34a" : "#f44336";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      <ellipse cx="50" cy="82" rx="30" ry="8" fill="rgba(42,36,24,0.18)" />
      {/* Posts */}
      <rect x="20" y="20" width="10" height="60" fill="#795548" rx="2" />
      <rect x="70" y="20" width="10" height="60" fill="#795548" rx="2" />
      {/* Gate bars */}
      <g transform={open ? "translate(0, -60)" : "translate(0, 0)"} style={{ transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        <rect x="25" y="35" width="50" height="8" fill={color} />
        <rect x="25" y="55" width="50" height="8" fill={color} />
        {/* Spikes */}
        <path d="M30 35 L33 25 L36 35 Z" fill="#9e9e9e" />
        <path d="M50 35 L53 25 L56 35 Z" fill="#9e9e9e" />
        <path d="M70 35 L73 25 L76 35 Z" fill="#9e9e9e" />
      </g>
    </svg>
  );
}

function SwitchSprite({ size, active }: { size: number; active: boolean }) {
  const color = active ? "#4caf50" : "#ff9800";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      <ellipse cx="50" cy="80" rx="40" ry="15" fill="#424242" />
      <ellipse cx="50" cy={active ? 78 : 74} rx="30" ry="10" fill={color} style={{ transition: "cy 0.2s" }} />
    </svg>
  );
}
