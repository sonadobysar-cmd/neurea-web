/** MamaSOS — signal mark derived from the Morse code for SOS. */

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
      <circle cx="8" cy="32" r="4" fill="currentColor" />
      <circle cx="20" cy="32" r="4" fill="currentColor" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <rect x="40" y="28" width="20" height="8" rx="4" fill="currentColor" />
      <circle cx="8" cy="48" r="4" fill="currentColor" opacity=".34" />
      <rect x="16" y="44" width="20" height="8" rx="4" fill="currentColor" opacity=".34" />
      <circle cx="44" cy="48" r="4" fill="currentColor" opacity=".34" />
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
      <span>Mama</span><span className="brand-sos">SOS</span>
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
  const markColor = tone === "light" ? "text-apricot" : "text-rose";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        className={`grid place-items-center rounded-2xl ${markSize} ${
          tone === "light" ? "bg-white/15" : "bg-[rgba(224,122,108,0.12)]"
        }`}
      >
        <LogoMark className={`h-[70%] w-[70%] ${markColor}`} />
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
  return <LogoMark className={`h-7 w-7 text-plum ${className}`.trim()} />;
}
