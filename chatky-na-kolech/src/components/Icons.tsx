export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="currentColor" opacity="0.08" />
      <path
        d="M8 26.5V18.2L20 10l12 8.2V26.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 26.5V21.2h5.2V26.5M20.8 26.5V19h5.2v7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="29.5" r="1.4" fill="currentColor" />
      <circle cx="12.5" cy="29.5" r="1.4" fill="currentColor" />
      <circle cx="27.5" cy="29.5" r="1.4" fill="currentColor" />
      <path
        d="M10.2 29.5h4.6M17.8 29.5h4.4M25.2 29.5h4.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
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
