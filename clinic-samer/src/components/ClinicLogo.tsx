export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="44"
      height="44"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="cs-ring" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8D5C0" />
          <stop offset="0.5" stopColor="#D4B0C2" />
          <stop offset="1" stopColor="#9A6D84" />
        </linearGradient>
        <linearGradient id="cs-fill" x1="14" y1="10" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A3540" />
          <stop offset="1" stopColor="#7A5266" />
        </linearGradient>
        <linearGradient id="cs-petal" x1="32" y1="8" x2="52" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3E4EA" />
          <stop offset="1" stopColor="#D8C4A8" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="url(#cs-fill)" />
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="url(#cs-ring)"
        strokeWidth="1.35"
      />
      <circle
        cx="32"
        cy="32"
        r="24.2"
        fill="none"
        stroke="rgba(243,228,234,0.28)"
        strokeWidth="0.7"
      />

      <path
        d="M39 13.8c4.4 1.3 8.4 5.4 7.7 10.5-.5 4-3.8 6.6-7.4 6.1 1.6-3.5 1.3-8 .0-16.6z"
        fill="url(#cs-petal)"
        opacity="0.9"
      />

      <path
        d="M34.8 24.2c-1.1-2.3-3.5-3.5-6.4-3.5-3.9 0-6.7 2.1-6.7 5.1 0 2.6 1.9 4.1 5.8 5.1l1.7.4c2.5.6 3.5 1.3 3.5 2.7 0 1.7-1.7 2.9-4.2 2.9-2.4 0-4.2-1-5.2-2.9l-2.6 1.5c1.5 3.1 4.5 4.7 7.9 4.7 4.5 0 7.4-2.4 7.4-5.8 0-2.9-1.9-4.5-6-5.5l-1.7-.4c-2.2-.5-3.2-1.2-3.2-2.5 0-1.5 1.5-2.5 3.6-2.5 1.9 0 3.3.8 4.1 2.4l2.5-1.7z"
        fill="#FFF8F5"
      />
    </svg>
  );
}
