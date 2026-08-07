/**
 * MamaSOS brand — rose petal mark + wordmark
 */

export function LogoMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M10.5 52V14.2c0-1.4 1.55-2.2 2.7-1.4l12.3 8.4c.7.48 1.62.48 2.32 0L32 15.8l4.18 5.4c.7.48 1.62.48 2.32 0l12.3-8.4c1.15-.8 2.7 0 2.7 1.4V52c0 1.15-.95 2.1-2.1 2.1h-5.3c-1.15 0-2.1-.95-2.1-2.1V30.6L35.4 40.2c-.7.55-1.7.55-2.4 0L26 30.6V52c0 1.15-.95 2.1-2.1 2.1h-5.3c-1.15 0-2.1-.95-2.1-2.1Z"
      />
    </svg>
  );
}

export function BrandWord({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={`brand-word ${light ? "text-white" : "text-ink"} ${className}`.trim()}
    >
      Mama<span className="brand-sos">SOS</span>
    </span>
  );
}

export function BrandLockup({
  size = "md",
  tone = "ink",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "light";
  markTone?: string;
  className?: string;
}) {
  const markSize =
    size === "lg" ? "h-9 w-9" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const wordClass =
    size === "lg"
      ? "text-[1.9rem]"
      : size === "sm"
        ? "text-[1.3rem]"
        : "text-[1.55rem]";
  const markColor = tone === "light" ? "text-white" : "text-rose";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        className={`grid place-items-center rounded-full ${markSize} ${
          tone === "light"
            ? "bg-white/15 ring-1 ring-white/35"
            : "bg-[rgba(196,120,132,0.12)]"
        }`}
      >
        <LogoMark className={`${tone === "light" ? "h-[55%] w-[55%]" : "h-[58%] w-[58%]"} ${markColor}`} />
      </span>
      <BrandWord light={tone === "light"} className={`${wordClass} leading-none`} />
    </span>
  );
}

export function BrandMark({
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  return <LogoMark className={`h-7 w-7 text-rose ${className}`.trim()} />;
}
