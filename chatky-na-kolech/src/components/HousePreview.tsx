"use client";

type Props = {
  cladding: string;
  roof: string;
  interior: string;
  extras: string[];
};

const WALL: Record<string, string> = {
  cedar: "#B8956A",
  charred: "#2A2420",
  ash: "#D4C4A8",
  sage: "#6B7F6A",
};

const ROOF: Record<string, string> = {
  seam: "#4A5560",
  wood: "#8B6914",
  green: "#3F5E48",
};

const INTERIOR_GLOW: Record<string, string> = {
  scandi: "#FFF4D6",
  walnut: "#E8A060",
  linen: "#F5E6C8",
};

export function HousePreview({ cladding, roof, interior, extras }: Props) {
  const wall = WALL[cladding] ?? WALL.cedar;
  const roofFill = ROOF[roof] ?? ROOF.seam;
  const glow = INTERIOR_GLOW[interior] ?? INTERIOR_GLOW.scandi;
  const hasSolar = extras.includes("solar");
  const hasStove = extras.includes("stove");
  const hasDeck = extras.includes("deck");
  const hasLoft = extras.includes("loft");

  return (
    <svg
      className="house-svg"
      viewBox="0 0 480 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Náhled konfigurace tiny house"
    >
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4032" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a2620" stopOpacity="0.9" />
        </linearGradient>
        <filter id="soft">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Ground */}
      <ellipse cx="240" cy="300" rx="180" ry="18" fill="#0a100c" opacity="0.45" />
      <rect x="0" y="280" width="480" height="60" fill="url(#ground)" />

      {/* Deck */}
      <g className="deck" opacity={hasDeck ? 1 : 0}>
        <rect x="78" y="248" width="70" height="8" rx="1" fill="#6B5344" />
        <rect x="82" y="256" width="4" height="22" fill="#4A3A30" />
        <rect x="140" y="256" width="4" height="22" fill="#4A3A30" />
        <path d="M78 248h70l-8-18H86z" fill="#7A6250" />
      </g>

      {/* Chassis / wheels */}
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
        y="140"
        width="240"
        height="110"
        fill={wall}
      />
      {/* Wood grain lines */}
      <g opacity="0.15" stroke="#000" strokeWidth="0.8">
        <line x1="130" y1="165" x2="370" y2="165" />
        <line x1="130" y1="190" x2="370" y2="190" />
        <line x1="130" y1="215" x2="370" y2="215" />
        <line x1="130" y1="235" x2="370" y2="235" />
      </g>

      {/* Roof */}
      <path
        className="roof"
        d="M118 148 L240 72 L362 148 Z"
        fill={roofFill}
      />
      <path
        d="M118 148 L240 72 L362 148"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="2"
      />
      {/* Roof ridge cap */}
      <rect x="234" y="70" width="12" height="8" rx="1" fill="#222" opacity="0.5" />

      {/* Green roof texture */}
      {roof === "green" && (
        <g opacity="0.55">
          <circle cx="200" cy="120" r="6" fill="#5a7a5a" />
          <circle cx="230" cy="105" r="7" fill="#4d6b4d" />
          <circle cx="260" cy="118" r="6" fill="#5a7a5a" />
          <circle cx="245" cy="95" r="5" fill="#6a8a6a" />
          <circle cx="215" cy="100" r="5" fill="#4d6b4d" />
        </g>
      )}

      {/* Solar */}
      <g className="solar" opacity={hasSolar ? 1 : 0}>
        <rect x="200" y="95" width="50" height="28" rx="2" fill="#1a2744" stroke="#3a5080" strokeWidth="1" transform="rotate(-28 225 109)" />
        <line x1="208" y1="90" x2="208" y2="118" stroke="#2a3a60" strokeWidth="0.8" transform="rotate(-28 225 109)" />
        <line x1="218" y1="90" x2="218" y2="118" stroke="#2a3a60" strokeWidth="0.8" transform="rotate(-28 225 109)" />
        <line x1="228" y1="90" x2="228" y2="118" stroke="#2a3a60" strokeWidth="0.8" transform="rotate(-28 225 109)" />
        <line x1="238" y1="90" x2="238" y2="118" stroke="#2a3a60" strokeWidth="0.8" transform="rotate(-28 225 109)" />
      </g>

      {/* Door */}
      <rect x="155" y="175" width="42" height="75" rx="2" fill="#1a1512" opacity="0.85" />
      <circle cx="188" cy="215" r="2.5" fill={glow} opacity="0.7" />

      {/* Windows */}
      <g>
        <rect x="220" y="165" width="52" height="42" rx="2" fill="#1a2220" />
        <rect
          className="window-glow"
          x="224"
          y="169"
          width="44"
          height="34"
          rx="1"
          fill={glow}
          opacity="0.85"
        />
        <line x1="246" y1="169" x2="246" y2="203" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        <line x1="224" y1="186" x2="268" y2="186" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      </g>
      <g>
        <rect x="290" y="165" width="52" height="42" rx="2" fill="#1a2220" />
        <rect
          className="window-glow"
          x="294"
          y="169"
          width="44"
          height="34"
          rx="1"
          fill={glow}
          opacity="0.75"
        />
        <line x1="316" y1="169" x2="316" y2="203" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        <line x1="294" y1="186" x2="338" y2="186" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      </g>

      {/* Loft window */}
      <g opacity={hasLoft ? 1 : 0.25}>
        <rect x="225" y="118" width="30" height="22" rx="1" fill="#1a2220" />
        <rect x="228" y="121" width="24" height="16" fill={glow} opacity={hasLoft ? 0.8 : 0.3} />
      </g>

      {/* Chimney + smoke */}
      <g opacity={hasStove ? 1 : 0}>
        <rect x="300" y="88" width="14" height="36" fill="#3a3530" />
        <rect x="297" y="84" width="20" height="6" rx="1" fill="#2a2520" />
        <ellipse className="smoke" cx="307" cy="70" rx="10" ry="14" fill="#c5ccc0" opacity="0.25" filter="url(#soft)" />
        <ellipse className="smoke" cx="312" cy="55" rx="8" ry="12" fill="#c5ccc0" opacity="0.18" filter="url(#soft)" style={{ animationDelay: "0.8s" }} />
      </g>

      {/* Trim */}
      <rect x="130" y="140" width="240" height="4" fill="rgba(0,0,0,0.2)" />
      <rect x="130" y="246" width="240" height="4" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}
