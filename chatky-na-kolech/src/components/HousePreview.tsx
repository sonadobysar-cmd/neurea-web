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
  smrk: "#D4B896",
  thermo: "#6E4E36",
  modrin: "#C8A66E",
  plech: "#8E969C",
  half: "#D4B896",
};

const WALL_DARK: Record<FacadeId, string> = {
  smrk: "#B89468",
  thermo: "#4C3424",
  modrin: "#A88850",
  plech: "#6E767C",
  half: "#8E969C",
};

function Window({
  x,
  y,
  w,
  h,
  glow,
  opacity = 0.88,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  glow: string;
  opacity?: number;
}) {
  const pad = Math.max(2.5, w * 0.08);
  return (
    <g>
      {/* Outer frame flush to wall */}
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#1A1612" />
      {/* Inner glass */}
      <rect
        x={x + pad}
        y={y + pad}
        width={w - pad * 2}
        height={h - pad * 2}
        rx="1"
        fill={glow}
        opacity={opacity}
      />
      {/* Mullion */}
      <line
        x1={x + w / 2}
        y1={y + pad}
        x2={x + w / 2}
        y2={y + h - pad}
        stroke="rgba(26,22,18,0.28)"
        strokeWidth="1.5"
      />
      {/* Sill */}
      <rect
        x={x - 1.5}
        y={y + h - 1}
        width={w + 3}
        height={3}
        rx="0.5"
        fill="rgba(0,0,0,0.22)"
      />
    </g>
  );
}

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
  const wallDark = WALL_DARK[facade];
  const hasLoft = loft !== "none";
  const twinLoft = loft === "two";

  // Body scales with dimensions; always grounded on chassis
  const bodyW = 176 + ((length - 6) / 6) * 108; // ~176–284
  const bodyH = (hasLoft ? 112 : 92) + ((width - 2.5) / 1.5) * 12;
  const cx = 260;
  const chassisY = 272;
  const bodyX = cx - bodyW / 2;
  const bodyY = chassisY - bodyH;

  // Roof always sits on body top edge (bodyY)
  const eave = 12;
  const roofL = bodyX - eave;
  const roofR = bodyX + bodyW + eave;
  const roofW = roofR - roofL;
  const peakH = roof === "ackova" ? 52 : roof === "kulata" ? 44 : 0;

  const roofFill =
    roof === "kulata" ? "#5C6670" : roof === "plocha" ? "#3C4450" : "#4A5560";

  const windowGlow = "#FFE9C4";
  const bathGlow = "#D9EAF5";

  // Openings — inset from edges, never collide with door
  const doorW = Math.min(34, bodyW * 0.13);
  const doorH = bodyH * 0.58;
  const doorX = bodyX + bodyW * 0.08;
  const doorY = chassisY - doorH;

  const winH = Math.min(38, bodyH * 0.34);
  const winW = Math.min(44, bodyW * 0.16);
  const winY = bodyY + bodyH * 0.26;
  const winGap = bodyW * 0.06;
  const win1X = doorX + doorW + winGap + 4;
  const win2X = Math.min(
    bodyX + bodyW - winW - bodyW * 0.08,
    win1X + winW + winGap + 8,
  );

  return (
    <svg
      className="house-svg"
      viewBox="0 0 520 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Náhled Tiny House ${length} × ${width} m`}
    >
      <defs>
        <linearGradient id="hp-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c241c" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a1510" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="hp-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wall} />
          <stop offset="100%" stopColor={wallDark} />
        </linearGradient>
        <linearGradient id="hp-half" x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor={wall} />
          <stop offset="50%" stopColor={WALL.plech} />
        </linearGradient>
        <linearGradient id="hp-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={roofFill} />
          <stop offset="100%" stopColor="#2A3038" />
        </linearGradient>
        <linearGradient id="hp-chassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#121212" />
        </linearGradient>
        <filter id="hp-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.32" />
        </filter>
      </defs>

      <ellipse cx="260" cy="322" rx="190" ry="14" fill="#0c0a08" opacity="0.38" />
      <rect x="0" y="304" width="520" height="56" fill="url(#hp-ground)" />

      <g filter="url(#hp-soft)">
        {/* Chassis */}
        <rect
          x={bodyX - 6}
          y={chassisY}
          width={bodyW + 12}
          height={8}
          rx="2"
          fill="url(#hp-chassis)"
        />
        <rect
          x={bodyX - 20}
          y={chassisY + 1}
          width={24}
          height={5}
          rx="1"
          fill="#333"
        />
        {/* Wheels under body */}
        <g>
          <circle cx={bodyX + bodyW * 0.2} cy={chassisY + 17} r={14} fill="#101010" />
          <circle cx={bodyX + bodyW * 0.2} cy={chassisY + 17} r={6.5} fill="#3a3a3a" />
          <circle cx={bodyX + bodyW * 0.78} cy={chassisY + 17} r={14} fill="#101010" />
          <circle cx={bodyX + bodyW * 0.78} cy={chassisY + 17} r={6.5} fill="#3a3a3a" />
        </g>

        {/* Body — rectangular cabin */}
        <rect
          className="wall"
          x={bodyX}
          y={bodyY}
          width={bodyW}
          height={bodyH}
          fill={facade === "half" ? "url(#hp-half)" : "url(#hp-wall)"}
          rx="1.5"
        />

        {/* Cladding lines */}
        <g opacity="0.1" stroke="#1a120c" strokeWidth="0.85">
          {Array.from({ length: 11 }).map((_, i) => {
            const x = bodyX + ((i + 1) / 12) * bodyW;
            return (
              <line key={i} x1={x} y1={bodyY + 1} x2={x} y2={chassisY - 1} />
            );
          })}
        </g>

        {/* Door — grounded on sill */}
        <rect x={doorX} y={doorY} width={doorW} height={doorH} rx="2" fill="#1C1612" />
        <rect
          x={doorX + 3}
          y={doorY + 5}
          width={doorW - 6}
          height={doorH * 0.38}
          rx="1"
          fill={windowGlow}
          opacity="0.22"
        />
        <circle
          cx={doorX + doorW - 7}
          cy={doorY + doorH * 0.55}
          r="2"
          fill="#E8D4A8"
          opacity="0.9"
        />

        {/* Windows — inside wall plane */}
        <Window
          x={win1X}
          y={winY}
          w={winW}
          h={winH}
          glow={hasKitchen ? windowGlow : "#F2E4C6"}
          opacity={hasKitchen ? 0.92 : 0.7}
        />
        {win2X > win1X + winW + 6 && (
          <Window
            x={win2X}
            y={winY}
            w={winW}
            h={winH}
            glow={hasBathroom ? bathGlow : "#EDE0C8"}
            opacity={hasBathroom ? 0.9 : 0.58}
          />
        )}

        {/* Loft windows — upper wall, under eaves */}
        {hasLoft && (
          <g>
            <Window
              x={cx - (twinLoft ? 34 : 13)}
              y={bodyY + 10}
              w={24}
              h={14}
              glow={windowGlow}
              opacity={0.85}
            />
            {twinLoft && (
              <Window
                x={cx + 10}
                y={bodyY + 10}
                w={24}
                h={14}
                glow={windowGlow}
                opacity={0.85}
              />
            )}
          </g>
        )}

        {/* Bottom sill / skirt */}
        <rect
          x={bodyX}
          y={chassisY - 3}
          width={bodyW}
          height={3}
          fill="rgba(0,0,0,0.2)"
        />

        {/* ——— Roof: drawn last, flush on bodyY ——— */}
        {roof === "plocha" && (
          <g className="roof">
            <rect
              x={roofL}
              y={bodyY - 11}
              width={roofW}
              height={12}
              rx="1.5"
              fill="url(#hp-roof)"
            />
            <rect
              x={roofL}
              y={bodyY - 13}
              width={roofW}
              height={3}
              rx="1"
              fill="#252B32"
            />
            {/* Cap flashing on wall top */}
            <rect
              x={bodyX}
              y={bodyY - 1}
              width={bodyW}
              height={2}
              fill="rgba(0,0,0,0.25)"
            />
          </g>
        )}

        {roof === "ackova" && (
          <g className="roof">
            {/* Gable sits on wall top — no gap, no float */}
            <path
              d={`M${roofL} ${bodyY} L${cx} ${bodyY - peakH} L${roofR} ${bodyY} Z`}
              fill="url(#hp-roof)"
            />
            <path
              d={`M${roofL + 8} ${bodyY - 1} L${cx} ${bodyY - peakH + 8} L${roofR - 8} ${bodyY - 1}`}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.4"
            />
            {/* Ridge cap */}
            <rect
              x={cx - 4}
              y={bodyY - peakH - 2}
              width={8}
              height={5}
              rx="1"
              fill="#1e2228"
            />
            {/* Eave shadow on wall */}
            <rect
              x={bodyX}
              y={bodyY}
              width={bodyW}
              height={4}
              fill="rgba(0,0,0,0.16)"
            />
          </g>
        )}

        {roof === "kulata" && (
          <g className="roof">
            {/* Barrel vault seated on body top */}
            <path
              d={`M${roofL} ${bodyY}
                  Q${cx} ${bodyY - peakH * 2} ${roofR} ${bodyY}
                  L${roofR - 2} ${bodyY}
                  Q${cx} ${bodyY - peakH * 1.75} ${roofL + 2} ${bodyY}
                  Z`}
              fill="url(#hp-roof)"
            />
            <path
              d={`M${roofL + 10} ${bodyY - 2} Q${cx} ${bodyY - peakH * 1.55} ${roofR - 10} ${bodyY - 2}`}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.2"
            />
            <rect
              x={bodyX}
              y={bodyY}
              width={bodyW}
              height={3}
              fill="rgba(0,0,0,0.14)"
            />
          </g>
        )}
      </g>

      <text
        x="260"
        y="350"
        textAnchor="middle"
        fill="rgba(247,241,232,0.48)"
        fontSize="12"
        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        letterSpacing="0.04em"
      >
        {length.toFixed(1).replace(".", ",")} × {width.toFixed(1).replace(".", ",")} m
      </text>
    </svg>
  );
}
