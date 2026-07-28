"use client";

import { useId } from "react";

/** Soft pastel SAC monogram — Samer Asad Clinic */
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
      viewBox="0 0 72 48"
      width="54"
      height="36"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={g("plate")} x1="0" y1="0" x2="72" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6F2FB" />
          <stop offset="0.55" stopColor="#EDE6F7" />
          <stop offset="1" stopColor="#E2D8F2" />
        </linearGradient>
        <linearGradient id={g("ink")} x1="12" y1="10" x2="60" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A6B9A" />
          <stop offset="1" stopColor="#9B8BB8" />
        </linearGradient>
      </defs>

      {/* Soft squircle plate — not a circle */}
      <rect
        x="1"
        y="1"
        width="70"
        height="46"
        rx="14"
        fill={`url(#${g("plate")})`}
      />
      <rect
        x="1"
        y="1"
        width="70"
        height="46"
        rx="14"
        fill="none"
        stroke="rgba(181,164,214,0.45)"
        strokeWidth="1"
      />

      {/* Custom SAC letterforms */}
      <g fill={`url(#${g("ink")})`}>
        {/* S — open modern */}
        <path d="M21.4 16.2c-.7-1.35-2.15-2.2-4.05-2.2-2.5 0-4.2 1.2-4.2 3.05 0 1.55 1.05 2.45 3.65 3.05l1.05.25c1.55.35 2.15.75 2.15 1.65 0 1-.95 1.75-2.55 1.75-1.5 0-2.65-.6-3.3-1.75l-1.9 1.05c.9 1.8 2.7 2.85 4.95 2.85 2.8 0 4.65-1.5 4.65-3.7 0-1.8-1.15-2.85-3.75-3.5l-1.05-.25c-1.35-.3-1.9-.7-1.9-1.5 0-.9.85-1.5 2.15-1.5 1.2 0 2.05.5 2.5 1.4l1.8-1.05z" />

        {/* A — geometric, open crossbar as floating dash */}
        <path d="M35.6 31.2h-1.85l-.5 1.85h-1.95L35.1 16.8h2.15l3.8 16.25h-2.1l-.5-1.85zm-.95-3.5-.85 3.15h1.7l-.85-3.15z" />
        <path d="M34.1 24.6h3.05l-.55-2.35h-1.95l-.55 2.35z" opacity="0.35" />
        {/* Distinctive floating bar */}
        <rect x="33.35" y="24.15" width="4.5" height="1.35" rx="0.65" />

        {/* C — open geometric arc via path */}
        <path d="M55.35 18.35c-.85-1.15-2.25-1.9-4-1.9-3.35 0-5.55 2.55-5.55 6.35 0 3.8 2.2 6.35 5.55 6.35 1.75 0 3.15-.75 4-1.9l-1.75-1.15c-.5.7-1.25 1.15-2.25 1.15-1.85 0-3.15-1.55-3.15-4.45s1.3-4.45 3.15-4.45c1 0 1.75.45 2.25 1.15l1.75-1.15z" />
      </g>

      {/* Original accent — thin lilac slash between A and C */}
      <path
        d="M44.2 18.5l1.15 12.2"
        stroke="#C9BBE3"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
