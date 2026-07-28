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
        <linearGradient id="cs-ring" x1="8" y1="4" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4DCF2" />
          <stop offset="0.5" stopColor="#C4B6DE" />
          <stop offset="1" stopColor="#7A6A9E" />
        </linearGradient>
        <linearGradient id="cs-fill" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A2338" />
          <stop offset="1" stopColor="#5A4C7A" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#cs-fill)" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#cs-ring)" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke="rgba(228,220,242,0.22)" strokeWidth="0.8" />
      {/* Clean modern S */}
      <path
        d="M35.2 23.6c-1-2-3.2-3.2-5.9-3.2-3.6 0-6.1 1.9-6.1 4.7 0 2.4 1.7 3.8 5.3 4.7l1.6.4c2.3.6 3.2 1.2 3.2 2.5 0 1.5-1.5 2.6-3.8 2.6-2.2 0-3.8-.9-4.8-2.6l-2.5 1.5c1.4 2.8 4.1 4.3 7.3 4.3 4.1 0 6.8-2.2 6.8-5.3 0-2.7-1.7-4.1-5.5-5.1l-1.6-.4c-2-.5-2.9-1.1-2.9-2.3 0-1.4 1.4-2.3 3.3-2.3 1.7 0 3 .7 3.7 2.1l2.4-1.6z"
        fill="#F8F5FC"
      />
    </svg>
  );
}
