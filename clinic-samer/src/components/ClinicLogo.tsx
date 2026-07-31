"use client";

import { useId } from "react";

/** Soft lilac badge — SA monogram (proposal C refined) */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const grad = `badge-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 64 72"
      width="48"
      height="54"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={grad} x1="32" y1="6" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d4c8e8" />
          <stop offset="0.45" stopColor="#b5a4d6" />
          <stop offset="1" stopColor="#9b8bb8" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="8.5" r="4" fill={`url(#${grad})`} />

      <path
        d="M32 13.8c-8.8 0-16 7.8-16 19.5 0 10.8 7.2 19.8 16 24.2 8.8-4.4 16-13.4 16-24.2 0-11.7-7.2-19.5-16-19.5z"
        fill={`url(#${grad})`}
      />

      <g
        fill="none"
        stroke="#fff"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M28.4 29.6c-2.3 0-3.9 1.2-3.9 2.9 0 1.3 1 2.2 2.9 2.7 2.3.6 3.5 1.5 3.5 3.1 0 1.9-1.8 3.2-4.2 3.2-1.9 0-3.4-.9-4.2-2.2" />
        <path d="M39.3 44.2 41.45 37.8 43.6 44.2" />
        <path d="M40.2 41.35h3" />
      </g>
    </svg>
  );
}
