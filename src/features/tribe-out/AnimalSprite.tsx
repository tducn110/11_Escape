import type { Direction } from "./types";

// Cute 2D top-down animal characters drawn with SVG.
// Each maps to an assetKey used in levels.ts.

interface AnimalDef {
  body: string;      // main fur color
  bodyDark: string;  // shadow / stripes
  ear: string;
  belly: string;
  label: string;
}

const ANIMALS: Record<string, AnimalDef> = {
  "villager-1": { body: "#f5a04a", bodyDark: "#d97a24", ear: "#e88a34", belly: "#fbe3c6", label: "Hổ" },   // tiger
  "villager-2": { body: "#f4efe6", bodyDark: "#2a2418", ear: "#2a2418", belly: "#ffffff", label: "Gấu trúc" }, // panda
  "villager-3": { body: "#e87432", bodyDark: "#b85a22", ear: "#c85f22", belly: "#f8d9bc", label: "Cáo" },   // fox
  "villager-4": { body: "#8e6a44", bodyDark: "#6b4e30", ear: "#7a5a3a", belly: "#d9c3a5", label: "Nâu" },   // brown
  "villager-5": { body: "#6b8e3d", bodyDark: "#4c6630", ear: "#5a7a32", belly: "#c8d68a", label: "Ếch" },   // frog/green
  "villager-6": { body: "#5aa6b8", bodyDark: "#3d7f8f", ear: "#4a94a5", belly: "#c4e5ec", label: "Xanh" },  // teal
  "villager-7": { body: "#9b7bc4", bodyDark: "#7355a0", ear: "#8868b2", belly: "#e0d3f0", label: "Tím" },   // purple
};

const ARROW_ROT: Record<Direction, number> = { up: 0, right: 90, down: 180, left: 270 };

export function AnimalSprite({ assetKey, direction, size }: { assetKey: string; direction?: Direction; size: number }) {
  const a = ANIMALS[assetKey] ?? ANIMALS["villager-1"];
  const isPanda = assetKey === "villager-2";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      {/* soft ground shadow */}
      <ellipse cx="50" cy="88" rx="30" ry="7" fill="rgba(42,36,24,0.18)" />

      {/* ears */}
      <circle cx="30" cy="30" r="13" fill={a.ear} stroke={a.bodyDark} strokeWidth="2.5" />
      <circle cx="70" cy="30" r="13" fill={a.ear} stroke={a.bodyDark} strokeWidth="2.5" />
      <circle cx="30" cy="30" r="6" fill={a.belly} opacity="0.7" />
      <circle cx="70" cy="30" r="6" fill={a.belly} opacity="0.7" />

      {/* head/body */}
      <circle cx="50" cy="54" r="32" fill={a.body} stroke={a.bodyDark} strokeWidth="3" />

      {/* belly/face patch */}
      <ellipse cx="50" cy="62" rx="20" ry="17" fill={a.belly} opacity="0.85" />

      {/* tiger stripes */}
      {assetKey === "villager-1" && (
        <>
          <path d="M40 32 Q44 40 40 46" stroke={a.bodyDark} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M60 32 Q56 40 60 46" stroke={a.bodyDark} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50 30 L50 40" stroke={a.bodyDark} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* panda eye patches */}
      {isPanda && (
        <>
          <ellipse cx="38" cy="50" rx="8" ry="10" fill="#2a2418" transform="rotate(-18 38 50)" />
          <ellipse cx="62" cy="50" rx="8" ry="10" fill="#2a2418" transform="rotate(18 62 50)" />
        </>
      )}

      {/* eyes */}
      <circle cx="40" cy="52" r="5" fill="#2a2418" />
      <circle cx="60" cy="52" r="5" fill="#2a2418" />
      <circle cx="41.5" cy="50.5" r="1.7" fill="#fff" />
      <circle cx="61.5" cy="50.5" r="1.7" fill="#fff" />

      {/* nose + smile */}
      <ellipse cx="50" cy="62" rx="3.5" ry="2.6" fill={a.bodyDark} />
      <path d="M44 68 Q50 73 56 68" stroke={a.bodyDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* cheeks */}
      <circle cx="32" cy="63" r="4" fill="#ff9a8a" opacity="0.45" />
      <circle cx="68" cy="63" r="4" fill="#ff9a8a" opacity="0.45" />

      {/* direction arrow badge */}
      {direction && (
        <g transform={`rotate(${ARROW_ROT[direction]} 50 50)`}>
          <g transform="translate(50 12)">
            <circle r="10" fill="#fff" stroke={a.bodyDark} strokeWidth="2" />
            <path d="M0 -4.5 L4.5 3 L-4.5 3 Z" fill={a.bodyDark} />
          </g>
        </g>
      )}
    </svg>
  );
}
