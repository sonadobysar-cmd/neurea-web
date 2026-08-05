/** Provizorní logo FLAX — monogram + stylizovaný flax / cabin mark */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="currentColor" opacity="0.1" />
      {/* Soft stone disc */}
      <circle cx="20" cy="20" r="13.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {/* Cabin roof */}
      <path
        d="M12.5 22.5V17.2L20 11.5l7.5 5.7V22.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      {/* Flax stem / door axis */}
      <path
        d="M20 14.5v12"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      {/* Flax seed heads */}
      <path
        d="M20 15.2c-2.2-1.6-4.2-.4-4.6 1.1M20 15.2c2.2-1.6 4.2-.4 4.6 1.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 18c-2.4-1.2-4.1.2-4.3 1.5M20 18c2.4-1.2 4.1.2 4.3 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Wheels */}
      <circle cx="14.5" cy="27.8" r="1.55" fill="currentColor" />
      <circle cx="20" cy="27.8" r="1.55" fill="currentColor" />
      <circle cx="25.5" cy="27.8" r="1.55" fill="currentColor" />
      <path
        d="M12.8 27.8h3.4M18.3 27.8h3.4M23.8 27.8h3.4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
