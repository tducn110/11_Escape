import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./countrysideBackdrop.css";

interface CountrysideBackdropProps {
  scenery?: "normal" | "boom";
}

function RoundTree() {
  return (
    <svg viewBox="0 0 120 160" role="presentation">
      <ellipse cx="61" cy="145" rx="35" ry="9" fill="#257b43" opacity="0.28" />
      <path d="M51 91 L70 91 L75 142 L48 142 Z" fill="#f18a43" />
      <path d="M58 91 L70 91 L68 142 L58 142 Z" fill="#d96a32" opacity="0.55" />
      <path d="M60 10 C91 10 108 34 104 61 C101 88 83 105 59 105 C27 105 10 85 14 57 C18 29 35 10 60 10 Z" fill="#16b96e" />
      <path d="M58 14 C81 13 101 31 101 54 C94 44 82 38 70 38 C65 58 51 73 30 79 C18 69 15 57 19 43 C26 24 39 15 58 14 Z" fill="#31d98a" />
      <path d="M57 103 C79 103 96 91 103 73 C94 88 77 88 66 82 C55 96 41 101 25 94 C34 101 44 104 57 103 Z" fill="#0b8f5a" opacity="0.72" />
      <circle cx="38" cy="44" r="7" fill="#66e6a4" opacity="0.42" />
    </svg>
  );
}

function PineTree() {
  return (
    <svg viewBox="0 0 110 170" role="presentation">
      <ellipse cx="55" cy="155" rx="31" ry="8" fill="#257b43" opacity="0.25" />
      <path d="M47 111 L63 111 L67 153 L44 153 Z" fill="#f08b44" />
      <path d="M55 7 L91 72 L74 72 L101 119 L9 119 L36 72 L20 72 Z" fill="#0ea866" />
      <path d="M55 7 L55 119 L9 119 L36 72 L20 72 Z" fill="#2bd782" />
      <path d="M42 46 L55 22 L55 49 Z" fill="#6ce6a7" opacity="0.45" />
    </svg>
  );
}

function RockCluster() {
  return (
    <svg viewBox="0 0 140 90" role="presentation">
      <ellipse cx="70" cy="76" rx="55" ry="10" fill="#267b42" opacity="0.23" />
      <path d="M13 70 L25 35 L51 24 L70 47 L66 72 Z" fill="#607174" />
      <path d="M25 35 L51 24 L43 53 L13 70 Z" fill="#829092" />
      <path d="M57 73 L76 28 L111 20 L131 54 L119 73 Z" fill="#556a70" />
      <path d="M76 28 L111 20 L101 49 L57 73 Z" fill="#91a0a0" />
    </svg>
  );
}

function FlowerPatch() {
  return (
    <svg viewBox="0 0 120 90" role="presentation">
      <ellipse cx="59" cy="79" rx="43" ry="7" fill="#267b42" opacity="0.2" />
      {[24, 48, 73, 96].map((x, index) => (
        <g key={x}>
          <path d={`M${x} 76 Q${x - 4} 56 ${x + (index % 2 ? 3 : -2)} 38`} stroke="#158f55" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx={x + (index % 2 ? 3 : -2)} cy="35" r="8" fill={index % 2 ? "#ff8755" : "#ffd24a"} />
          <circle cx={x + (index % 2 ? 3 : -2)} cy="35" r="3" fill="#fff0b3" />
        </g>
      ))}
    </svg>
  );
}

function Branch() {
  return (
    <svg viewBox="0 0 170 100" role="presentation">
      <ellipse cx="90" cy="85" rx="65" ry="8" fill="#267b42" opacity="0.2" />
      <path d="M20 78 C51 65 84 58 145 25" stroke="#a8582f" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M73 61 L54 31 M111 44 L126 18" stroke="#a8582f" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M21 77 C52 64 83 57 143 27" stroke="#d5763c" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}

export function CountrysideBackdrop({ scenery = "normal" }: CountrysideBackdropProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boomLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || !boomLayerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(boomLayerRef.current, { opacity: scenery === "boom" ? 1 : 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (scenery === "boom") {
        const sparks = boomLayerRef.current?.querySelectorAll("[data-boom-spark]") ?? [];
        const timeline = gsap.timeline();
        timeline.fromTo(
          boomLayerRef.current,
          { opacity: 0 },
          { opacity: 0.72, duration: 0.18, ease: "power2.out" }
        );
        timeline.fromTo(
          Array.from(sparks),
          { opacity: 0, scale: 0.4, y: 12 },
          { opacity: 0.9, scale: 1, y: 0, duration: 0.5, stagger: 0.035, ease: "back.out(2)" },
          0.04
        );
        timeline.to(boomLayerRef.current, { opacity: 0, duration: 1.1, ease: "power2.out" }, 0.85);
      } else {
        gsap.set(boomLayerRef.current, { opacity: 0 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [scenery]);

  return (
    <div ref={rootRef} className="countryside-backdrop" aria-hidden="true">
      <div className="countryside-backdrop__field" />
      <div className="countryside-backdrop__haze" />
      <div className="countryside-backdrop__ground-lines" />

      <div className="scenery-prop scenery-prop--far-left"><RoundTree /></div>
      <div className="scenery-prop scenery-prop--far-right"><RoundTree /></div>
      <div className="scenery-prop scenery-prop--tree-right"><RoundTree /></div>
      <div className="scenery-prop scenery-prop--pine-left"><PineTree /></div>
      <div className="scenery-prop scenery-prop--pine-bottom"><PineTree /></div>
      <div className="scenery-prop scenery-prop--rocks-left"><RockCluster /></div>
      <div className="scenery-prop scenery-prop--rocks-right"><RockCluster /></div>
      <div className="scenery-prop scenery-prop--flowers"><FlowerPatch /></div>
      <div className="scenery-prop scenery-prop--branch"><Branch /></div>

      <div className="scenery-prop scenery-prop--foreground scenery-prop--foreground-left"><PineTree /></div>
      <div className="scenery-prop scenery-prop--foreground scenery-prop--foreground-right"><RoundTree /></div>

      <div ref={boomLayerRef} className="countryside-backdrop__boom">
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            data-boom-spark
            className="countryside-backdrop__spark"
            style={{
              left: `${12 + ((index * 19) % 76)}%`,
              top: `${12 + ((index * 23) % 66)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
