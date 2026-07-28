"use client";

import { useId } from "react";

export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const g = (name: string) => `${name}-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      width="52"
      height="52"
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id={g("core")} cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#4A3D68" />
          <stop offset="45%" stopColor="#2A2338" />
          <stop offset="100%" stopColor="#171322" />
        </radialGradient>
        <linearGradient id={g("ring")} x1="10" y1="8" x2="86" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F3FC" />
          <stop offset="0.28" stopColor="#D2C6E8" />
          <stop offset="0.62" stopColor="#A894C4" />
          <stop offset="1" stopColor="#6E5B8F" />
        </linearGradient>
        <linearGradient id={g("petal")} x1="48" y1="14" x2="66" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#E4DCF2" />
          <stop offset="1" stopColor="#B5A3D1" />
        </linearGradient>
        <linearGradient id={g("letter")} x1="30" y1="36" x2="70" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4DCF2" />
        </linearGradient>
        <linearGradient id={g("sheen")} x1="22" y1="18" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={g("soft")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.35" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Halo */}
      <circle cx="48" cy="48" r="47" fill={`url(#${g("core")})`} opacity="0.25" />

      {/* Disc */}
      <circle cx="48" cy="48" r="41" fill={`url(#${g("core")})`} />

      {/* Rings */}
      <circle cx="48" cy="48" r="41" fill="none" stroke={`url(#${g("ring")})`} strokeWidth="1.85" />
      <circle cx="48" cy="48" r="37.4" fill="none" stroke="rgba(247,243,252,0.22)" strokeWidth="0.75" />
      <circle
        cx="48"
        cy="48"
        r="34"
        fill="none"
        stroke="rgba(196,182,222,0.5)"
        strokeWidth="0.9"
        strokeDasharray="1.8 2.8"
        strokeLinecap="round"
      />

      {/* Seal ticks */}
      <g stroke="#E4DCF2" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
        <path d="M48 8.2v2.6" />
        <path d="M48 85.2v2.6" />
        <path d="M8.2 48h2.6" />
        <path d="M85.2 48h2.6" />
        <path d="M20.2 20.2l1.8 1.8" />
        <path d="M74 74l1.8 1.8" />
        <path d="M74 20.2l-1.8 1.8" />
        <path d="M22 74l-1.8 1.8" />
      </g>

      {/* Orchid crest */}
      <g filter={`url(#${g("soft")})`}>
        <path
          d="M48 18c3.4 4.2 3.8 9.2 1.2 12.6-1.6-3.2-4-5.4-7-6.6 2.2-2.6 4.2-4.6 5.8-6z"
          fill={`url(#${g("petal")})`}
        />
        <path
          d="M39.6 21c4.4 1.4 8 5 8.6 9.8-2.8-.5-5.8-2.2-8-4.6-1.4-1.9-1.7-3.5-.6-5.2z"
          fill={`url(#${g("petal")})`}
          opacity="0.88"
        />
        <path
          d="M56.4 21c-4.4 1.4-8 5-8.6 9.8 2.8-.5 5.8-2.2 8-4.6 1.4-1.9 1.7-3.5.6-5.2z"
          fill={`url(#${g("petal")})`}
          opacity="0.88"
        />
        {/* lower petal */}
        <path
          d="M48 31.4c2.2 0 4 1.7 4 4.1 0 3.4-4 6.3-4 6.3s-4-2.9-4-6.3c0-2.4 1.8-4.1 4-4.1z"
          fill={`url(#${g("petal")})`}
          opacity="0.75"
        />
        <circle cx="48" cy="32.6" r="1.8" fill="#F8F5FC" />
        <circle cx="48" cy="32.6" r="0.85" fill="#8B7AB0" />
      </g>

      {/* Interlocking SA monogram */}
      <g fill={`url(#${g("letter")})`}>
        {/* S */}
        <path d="M54.6 44.4c-1.5-3.4-5-5.3-9.3-5.3-5.6 0-9.5 2.9-9.5 7.1 0 3.7 2.6 5.8 8.1 7.1l2.3.55c3.3.8 4.6 1.75 4.6 3.55 0 2.2-2.25 3.8-5.7 3.8-3.3 0-5.8-1.4-7.2-4l-3.7 2.1c2.05 4.15 6.25 6.4 10.95 6.4 6.15 0 10.15-3.3 10.15-7.9 0-4-2.55-6.2-8.25-7.6l-2.25-.55c-3-.7-4.25-1.55-4.25-3.3 0-1.95 1.95-3.3 4.75-3.3 2.6 0 4.55 1.1 5.45 3.05l3.5-2.25z" />
        {/* A — refined geometric */}
        <path
          d="M68.2 66.2h-2.55l-.7 2.55H62.5L67 52.8h3.1l4.5 15.95h-2.95l-.7-2.55zm-1.3-4.7-1.05 3.85h2.1l-1.05-3.85z"
          fill="#C4B6DE"
        />
        <path
          d="M66.2 58.4h2.85l-1.1-4.05h-.65l-1.1 4.05z"
          fill="#C4B6DE"
          opacity="0.55"
        />
      </g>

      {/* Micro wordmark arc substitute — three dots */}
      <g fill="#C4B6DE" opacity="0.7">
        <circle cx="40.5" cy="72.5" r="0.7" />
        <circle cx="48" cy="73.4" r="0.7" />
        <circle cx="55.5" cy="72.5" r="0.7" />
      </g>

      {/* Sheen */}
      <path
        d="M22 26c8-10 20-15 30-13-12 2.5-22 10-30 22-1.2-3.2-1.2-6.2 0-9z"
        fill={`url(#${g("sheen")})`}
      />
    </svg>
  );
}
