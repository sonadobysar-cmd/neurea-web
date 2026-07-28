"use client";

import type { FacadeId, LoftId, RoofId } from "@/data/configurator";

type Props = {
  length: number;
  width: number;
  roof: RoofId;
  facade: FacadeId;
  loft: LoftId;
  hasBathroom: boolean;
  hasKitchen: boolean;
};

const WALL: Record<FacadeId, string> = {
  smrk: "#C4A882",
  thermo: "#5C4033",
  modrin: "#B8956A",
  plech: "#6B7280",
  half: "#B8956A",
};

const WALL2: Record<FacadeId, string | null> = {
  smrk: null,
  thermo: null,
  modrin: null,
  plech: null,
  half: "#6B7280",
};

export function HousePreview({
  length,
  width,
  roof,
  facade,
  loft,
  hasBathroom,
  hasKitchen,
}: Props) {
  const wall = WALL[facade];
  const wallB = WALL2[facade];
  const hasLoft = loft !== "none";
  const bodyH = hasLoft ? 120 : 100;
  const bodyY = hasLoft ? 130 : 150;
  // Visual scale from dimensions
  const scaleX = 0.85 + ((length - 6) / 6) * 0.25;
  const scaleY = 0.92 + ((width - 2.5) / 1.5) * 0.12;

  const roofPath =
    roof === "plocha"
      ? `M118 ${bodyY + 8} H362 V${bodyY - 8} H118 Z`
      : roof === "kulata"
        ? `M118 ${bodyY + 10} Q240 ${bodyY - 70} 362 ${bodyY + 10} Z`
        : `M118 ${bodyY + 8} L240 ${bodyY - 70} L362 ${bodyY + 8} Z`;

  const roofFill =
    roof === "kulata" ? "#4A5560" : roof === "plocha" ? "#3D4654" : "#4A5560";

  return (
    <svg
      className="house-svg"
      viewBox="0 0 480 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Náhled Tiny House ${length} × ${width} m`}
      style={{ transform: `scale(${scaleX}, ${scaleY})` }}
    >
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4032" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a2620" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="halfWall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor={wall} />
          <stop offset="50%" stopColor={wallB ?? wall} />
        </linearGradient>
      </defs>

      <ellipse cx="240" cy="300" rx="180" ry="18" fill="#0a100c" opacity="0.45" />
      <rect x="0" y="280" width="480" height="60" fill="url(#ground)" />

      {/* Chassis */}
      <rect x="130" y="248" width="240" height="10" rx="2" fill="#1a1a1a" />
      <circle cx="165" cy="268" r="16" fill="#111" />
      <circle cx="165" cy="268" r="8" fill="#333" />
      <circle cx="335" cy="268" r="16" fill="#111" />
      <circle cx="335" cy="268" r="8" fill="#333" />
      <rect x="118" y="252" width="28" height="6" rx="1" fill="#2a2a2a" />

      {/* Body */}
      <rect
        className="wall"
        x="130"
        y={bodyY}
        width="240"
        height={bodyH}
        fill={wallB ? "url(#halfWall)" : wall}
      />
      <g opacity="0.12" stroke="#000" strokeWidth="0.8">
        <line x1="130" y1={bodyY + 25} x2="370" y2={bodyY + 25} />
        <line x1="130" y1={bodyY + 50} x2="370" y2={bodyY + 50} />
        <line x1="130" y1={bodyY + 75} x2="370" y2={bodyY + 75} />
      </g>

      {/* Roof */}
      <path className="roof" d={roofPath} fill={roofFill} />
      {roof === "ackova" && (
        <rect x="234" y={bodyY - 72} width="12" height="8" rx="1" fill="#222" opacity="0.5" />
      )}

      {/* Door */}
      <rect
        x="155"
        y={bodyY + bodyH - 75}
        width="42"
        height="75"
        rx="2"
        fill="#1a1512"
        opacity="0.85"
      />
      <circle cx="188" cy={bodyY + bodyH - 40} r="2.5" fill="#F5E6C8" opacity="0.7" />

      {/* Windows */}
      <g>
        <rect x="220" y={bodyY + 20} width="52" height={hasKitchen ? 44 : 40} rx="2" fill="#1a2220" />
        <rect
          x="224"
          y={bodyY + 24}
          width="44"
          height={hasKitchen ? 36 : 32}
          rx="1"
          fill="#FFF4D6"
          opacity="0.85"
        />
      </g>
      <g>
        <rect
          x="290"
          y={bodyY + 20}
          width="52"
          height={hasBathroom ? 44 : 40}
          rx="2"
          fill="#1a2220"
        />
        <rect
          x="294"
          y={bodyY + 24}
          width="44"
          height={hasBathroom ? 36 : 32}
          rx="1"
          fill="#E8F4FF"
          opacity={hasBathroom ? 0.8 : 0.55}
        />
      </g>

      {/* Loft windows */}
      {hasLoft && (
        <g>
          <rect x="210" y={bodyY + 4} width="28" height="18" rx="1" fill="#1a2220" />
          <rect x="213" y={bodyY + 7} width="22" height="12" fill="#FFF4D6" opacity="0.75" />
          {loft === "two" && (
            <>
              <rect x="262" y={bodyY + 4} width="28" height="18" rx="1" fill="#1a2220" />
              <rect x="265" y={bodyY + 7} width="22" height="12" fill="#FFF4D6" opacity="0.75" />
            </>
          )}
        </g>
      )}

      <rect x="130" y={bodyY} width="240" height="4" fill="rgba(0,0,0,0.2)" />
      <rect x="130" y="246" width="240" height="4" fill="rgba(0,0,0,0.25)" />

      {/* Dimension label */}
      <text
        x="240"
        y="318"
        textAnchor="middle"
        fill="rgba(244,246,242,0.55)"
        fontSize="11"
        fontFamily="Outfit, sans-serif"
      >
        {length.toFixed(1)} × {width.toFixed(1)} m
      </text>
    </svg>
  );
}
