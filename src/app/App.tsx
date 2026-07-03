import { TribeOutGame } from "../features/tribe-out/TribeOutGame";

function CountrysideBackdrop() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky */}
      <rect width="1440" height="900" fill="#f5ecd7" />

      {/* Distant mountains */}
      <path
        d="M0,520 C80,480 180,430 300,400 C420,370 500,410 600,390 C700,370 800,340 920,360 C1040,380 1140,430 1260,410 C1380,390 1440,420 1440,420 L1440,900 L0,900 Z"
        fill="#e6d8b2"
        opacity="0.55"
        stroke="#8a7d65"
        strokeWidth="1.2"
        strokeOpacity="0.3"
      />

      {/* Mid hills */}
      <path
        d="M0,620 C100,580 220,560 360,540 C500,520 600,580 740,560 C880,540 980,520 1100,540 C1220,560 1340,600 1440,590 L1440,900 L0,900 Z"
        fill="#c8d68a"
        opacity="0.5"
      />

      {/* Rice field waves */}
      <path
        d="M0,680 C60,670 120,660 180,668 C240,676 300,672 360,664 C420,656 480,660 540,668 C600,676 660,674 720,665 C780,656 840,658 900,666 C960,674 1020,672 1080,663 C1140,654 1200,658 1260,666 C1320,674 1380,672 1440,663"
        fill="none"
        stroke="#8a7d65"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M0,695 C80,685 160,678 240,686 C320,694 400,688 480,680 C560,672 640,676 720,684 C800,692 880,689 960,681 C1040,673 1120,677 1200,685 C1280,693 1360,690 1440,682"
        fill="none"
        stroke="#8a7d65"
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {/* Bamboo/trees left */}
      {[40, 65, 90, 115, 140].map((x, i) => (
        <line
          key={`bl-${i}`}
          x1={x} y1={780 - i * 8}
          x2={x + (i % 2 === 0 ? -5 : 5)} y2={560 - i * 12}
          stroke="#6b8e3d"
          strokeWidth={1.2 + (i % 2) * 0.3}
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
      ))}
      {/* Bamboo leaves left */}
      {[45, 70, 95, 120, 145].map((x, i) => (
        <ellipse
          key={`bll-${i}`}
          cx={x} cy={590 - i * 10}
          rx={14} ry={5}
          fill="#6b8e3d"
          opacity="0.30"
          transform={`rotate(${-20 + i * 10}, ${x}, ${590 - i * 10})`}
        />
      ))}

      {/* Bamboo/trees right */}
      {[1300, 1325, 1350, 1375, 1400].map((x, i) => (
        <line
          key={`br-${i}`}
          x1={x} y1={780 - i * 8}
          x2={x + (i % 2 === 0 ? 5 : -5)} y2={555 - i * 12}
          stroke="#6b8e3d"
          strokeWidth={1.2 + (i % 2) * 0.3}
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
      ))}
      {[1305, 1330, 1355, 1380, 1405].map((x, i) => (
        <ellipse
          key={`brl-${i}`}
          cx={x} cy={585 - i * 10}
          rx={14} ry={5}
          fill="#6b8e3d"
          opacity="0.30"
          transform={`rotate(${20 - i * 10}, ${x}, ${585 - i * 10})`}
        />
      ))}

      {/* Egrets / birds */}
      {[{x:420,y:220},{x:580,y:190},{x:700,y:235},{x:820,y:200},{x:1010,y:215}].map((b, i) => (
        <g key={`bird-${i}`} stroke="#8a7d65" strokeWidth="1.2" strokeOpacity="0.5" fill="none" strokeLinecap="round">
          <path d={`M${b.x},${b.y} Q${b.x+8},${b.y-6} ${b.x+16},${b.y}`} />
          <path d={`M${b.x},${b.y} Q${b.x-8},${b.y-6} ${b.x-16},${b.y}`} />
        </g>
      ))}

      {/* Kite */}
      <g opacity="0.45">
        <path d="M860,160 L880,190 L860,215 L840,190 Z" fill="#f0b840" stroke="#d99820" strokeWidth="1" strokeLinecap="round" />
        <path d="M860,215 Q858,240 852,260 Q848,275 855,285" fill="none" stroke="#8a7d65" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Foreground grass gradient */}
      <defs>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8d68a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4c6630" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <rect x="0" y="760" width="1440" height="140" fill="url(#grassGrad)" />

      {/* Grass tufts */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = i * 52 + 10;
        const y = 768 + (i % 3) * 6;
        return (
          <g key={`g-${i}`} stroke="#6b8e3d" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round">
            <line x1={x}    y1={y+8} x2={x-4}  y2={y} />
            <line x1={x+5}  y1={y+9} x2={x+5}  y2={y-2} />
            <line x1={x+10} y1={y+8} x2={x+14} y2={y} />
          </g>
        );
      })}
    </svg>
  );
}

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Be Vietnam Pro, sans-serif",
        boxSizing: "border-box",
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingRight: "max(12px, env(safe-area-inset-right))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        paddingLeft: "max(12px, env(safe-area-inset-left))",
      }}
    >
      <CountrysideBackdrop />
      <TribeOutGame />
    </div>
  );
}
