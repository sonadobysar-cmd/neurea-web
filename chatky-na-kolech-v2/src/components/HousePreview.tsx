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
  activeHotspot?: string | null;
  onHotspot?: (id: string) => void;
};

const WALL: Record<FacadeId, string> = {
  smrk: "#C9A87A",
  thermo: "#5A3E2C",
  modrin: "#B89562",
  plech: "#3A3E42",
  half: "#C9A87A",
};

const WALL_DARK: Record<FacadeId, string> = {
  smrk: "#A88858",
  thermo: "#3E2A1E",
  modrin: "#967848",
  plech: "#2A2E32",
  half: "#3A3E42",
};

function Hotspot({
  cx,
  cy,
  id,
  label,
  active,
  onClick,
}: {
  cx: number;
  cy: number;
  id: string;
  label: string;
  active?: boolean;
  onClick?: (id: string) => void;
}) {
  return (
    <g
      className={`hp-pin${active ? " is-active" : ""}`}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={() => onClick?.(id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      <circle cx={cx} cy={cy} r="14" fill="rgba(255,255,255,0.92)" />
      <circle
        cx={cx}
        cy={cy}
        r="14"
        fill="none"
        stroke={active ? "#111" : "rgba(17,17,17,0.35)"}
        strokeWidth={active ? 2 : 1.25}
      />
      <circle cx={cx} cy={cy} r="4" fill="#111" />
      <title>{label}</title>
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
  activeHotspot,
  onHotspot,
}: Props) {
  const wall = WALL[facade];
  const wallDark = WALL_DARK[facade];
  const hasLoft = loft !== "none";
  const twinLoft = loft === "two";
  const isMetal = facade === "plech";

  // Orthographic side elevation — clean architectural product shot
  const bodyW = 200 + ((length - 6) / 6) * 120;
  const bodyH = (hasLoft ? 118 : 96) + ((width - 2.5) / 1.5) * 10;
  const cx = 280;
  const chassisY = 268;
  const bodyX = cx - bodyW / 2;
  const bodyY = chassisY - bodyH;
  const eave = roof === "plocha" ? 6 : 14;
  const roofL = bodyX - eave;
  const roofR = bodyX + bodyW + eave;
  const peakH = roof === "ackova" ? 48 : roof === "kulata" ? 40 : 0;

  const roofFill = "#2C3036";
  const glow = "#F5E6C4";
  const bathGlow = "#D6E8F4";

  const doorW = Math.min(32, bodyW * 0.12);
  const doorH = bodyH * 0.56;
  const doorX = bodyX + bodyW * 0.1;
  const doorY = chassisY - doorH;

  const winH = Math.min(36, bodyH * 0.32);
  const winW = Math.min(40, bodyW * 0.145);
  const winY = bodyY + bodyH * 0.28;
  const win1X = doorX + doorW + bodyW * 0.08;
  const win2X = bodyX + bodyW - winW - bodyW * 0.1;

  return (
    <svg
      className="house-svg"
      viewBox="0 0 560 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Náhled Tiny House ${length} × ${width} m`}
    >
      <defs>
        <linearGradient id="hp-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wall} />
          <stop offset="100%" stopColor={wallDark} />
        </linearGradient>
        <linearGradient id="hp-half" x1="0" y1="0" x2="1" y2="0">
          <stop offset="48%" stopColor={wall} />
          <stop offset="48%" stopColor={WALL.plech} />
          <stop offset="100%" stopColor={WALL_DARK.plech} />
        </linearGradient>
        <linearGradient id="hp-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A4048" />
          <stop offset="100%" stopColor={roofFill} />
        </linearGradient>
        <linearGradient id="hp-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E6E2" />
          <stop offset="100%" stopColor="#D4D0C8" />
        </linearGradient>
        <filter id="hp-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Soft ground plane */}
      <ellipse cx="280" cy="300" rx="210" ry="18" fill="#E4E0D8" opacity="0.9" />
      <ellipse cx="280" cy="300" rx="160" ry="10" fill="#CDC8BE" opacity="0.45" />

      <g filter="url(#hp-soft)">
        {/* Chassis */}
        <rect
          x={bodyX - 8}
          y={chassisY}
          width={bodyW + 16}
          height={7}
          rx="1"
          fill="#1A1A1A"
        />
        <rect x={bodyX - 28} y={chassisY + 1} width={26} height={4} rx="1" fill="#2A2A2A" />

        {/* Wheels */}
        <g>
          {[0.22, 0.78].map((t) => (
            <g key={t}>
              <circle cx={bodyX + bodyW * t} cy={chassisY + 16} r={13} fill="#111" />
              <circle cx={bodyX + bodyW * t} cy={chassisY + 16} r={5.5} fill="#555" />
            </g>
          ))}
        </g>

        {/* Body */}
        <rect
          className="wall"
          x={bodyX}
          y={bodyY}
          width={bodyW}
          height={bodyH}
          fill={facade === "half" ? "url(#hp-half)" : "url(#hp-wall)"}
          rx="1"
        />

        {/* Cladding */}
        <g opacity={isMetal ? 0.2 : 0.12} stroke="#1a120c" strokeWidth="0.8">
          {Array.from({ length: isMetal ? 18 : 14 }).map((_, i) => {
            const x = bodyX + ((i + 1) / (isMetal ? 19 : 15)) * bodyW;
            return (
              <line key={i} x1={x} y1={bodyY + 1} x2={x} y2={chassisY - 1} />
            );
          })}
        </g>

        {/* Door */}
        <rect x={doorX} y={doorY} width={doorW} height={doorH} rx="1.5" fill="#111" />
        <rect
          x={doorX + 3}
          y={doorY + 4}
          width={doorW - 6}
          height={doorH * 0.4}
          rx="1"
          fill={glow}
          opacity="0.35"
        />
        <circle
          cx={doorX + doorW - 6}
          cy={doorY + doorH * 0.55}
          r="1.8"
          fill="#E8D4A8"
        />

        {/* Windows */}
        {[
          { x: win1X, glow: hasKitchen ? glow : "#EFE4CC", op: hasKitchen ? 0.92 : 0.7 },
          {
            x: win2X,
            glow: hasBathroom ? bathGlow : "#E8DFD0",
            op: hasBathroom ? 0.9 : 0.55,
          },
        ].map((w, i) =>
          w.x > win1X - 1 || i === 0 ? (
            <g key={i}>
              <rect x={w.x} y={winY} width={winW} height={winH} rx="1.5" fill="#111" />
              <rect
                x={w.x + 3}
                y={winY + 3}
                width={winW - 6}
                height={winH - 6}
                rx="1"
                fill={w.glow}
                opacity={w.op}
              />
              <line
                x1={w.x + winW / 2}
                y1={winY + 3}
                x2={w.x + winW / 2}
                y2={winY + winH - 3}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1.2"
              />
              <rect
                x={w.x - 1}
                y={winY + winH}
                width={winW + 2}
                height={2.5}
                fill="rgba(0,0,0,0.18)"
              />
            </g>
          ) : null,
        )}

        {/* Loft windows */}
        {hasLoft && (
          <g>
            <rect
              x={cx - (twinLoft ? 32 : 12)}
              y={bodyY + 12}
              width={22}
              height={13}
              rx="1"
              fill="#111"
            />
            <rect
              x={cx - (twinLoft ? 29 : 9)}
              y={bodyY + 14}
              width={16}
              height={9}
              fill={glow}
              opacity="0.85"
            />
            {twinLoft && (
              <>
                <rect x={cx + 10} y={bodyY + 12} width={22} height={13} rx="1" fill="#111" />
                <rect
                  x={cx + 13}
                  y={bodyY + 14}
                  width={16}
                  height={9}
                  fill={glow}
                  opacity="0.85"
                />
              </>
            )}
          </g>
        )}

        {/* Skirt */}
        <rect
          x={bodyX}
          y={chassisY - 2.5}
          width={bodyW}
          height={2.5}
          fill="rgba(0,0,0,0.2)"
        />

        {/* Roof — flush on bodyY */}
        {roof === "plocha" && (
          <g className="roof">
            <rect
              x={roofL}
              y={bodyY - 10}
              width={roofR - roofL}
              height={11}
              rx="1"
              fill="url(#hp-roof)"
            />
            <rect
              x={roofL}
              y={bodyY - 12}
              width={roofR - roofL}
              height={2.5}
              fill="#1A1E22"
            />
          </g>
        )}

        {roof === "ackova" && (
          <g className="roof">
            <path
              d={`M${roofL} ${bodyY} L${cx} ${bodyY - peakH} L${roofR} ${bodyY} Z`}
              fill="url(#hp-roof)"
            />
            <path
              d={`M${roofL + 6} ${bodyY} L${cx} ${bodyY - peakH + 7} L${roofR - 6} ${bodyY}`}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.2"
            />
            <rect
              x={cx - 3.5}
              y={bodyY - peakH - 1.5}
              width={7}
              height={4}
              rx="0.5"
              fill="#15181C"
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

        {roof === "kulata" && (
          <g className="roof">
            <path
              d={`M${roofL} ${bodyY}
                  Q${cx} ${bodyY - peakH * 2} ${roofR} ${bodyY}
                  L${roofR - 1} ${bodyY}
                  Q${cx} ${bodyY - peakH * 1.72} ${roofL + 1} ${bodyY} Z`}
              fill="url(#hp-roof)"
            />
            <path
              d={`M${roofL + 10} ${bodyY - 1} Q${cx} ${bodyY - peakH * 1.5} ${roofR - 10} ${bodyY - 1}`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <rect
              x={bodyX}
              y={bodyY}
              width={bodyW}
              height={2.5}
              fill="rgba(0,0,0,0.12)"
            />
          </g>
        )}
      </g>

      {/* Hotspots */}
      <Hotspot
        cx={cx}
        cy={roof === "plocha" ? bodyY - 18 : bodyY - peakH * 0.45}
        id="roof"
        label="Střecha"
        active={activeHotspot === "roof"}
        onClick={onHotspot}
      />
      <Hotspot
        cx={bodyX + bodyW * 0.72}
        cy={bodyY + bodyH * 0.55}
        id="facade"
        label="Fasáda"
        active={activeHotspot === "facade"}
        onClick={onHotspot}
      />
      <Hotspot
        cx={win1X + winW / 2}
        cy={winY + winH / 2}
        id="window"
        label="Okna / interiér"
        active={activeHotspot === "window"}
        onClick={onHotspot}
      />
      <Hotspot
        cx={doorX + doorW / 2}
        cy={doorY + doorH * 0.35}
        id="door"
        label="Vstup"
        active={activeHotspot === "door"}
        onClick={onHotspot}
      />
      <Hotspot
        cx={bodyX + bodyW * 0.5}
        cy={chassisY + 28}
        id="size"
        label="Rozměry"
        active={activeHotspot === "size"}
        onClick={onHotspot}
      />

      <text
        x="280"
        y="330"
        textAnchor="middle"
        fill="#8A8580"
        fontSize="11"
        fontFamily="DM Sans, system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        {length.toFixed(1).replace(".", ",")} × {width.toFixed(1).replace(".", ",")} m
      </text>
    </svg>
  );
}
