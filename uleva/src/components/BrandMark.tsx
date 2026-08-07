function MarkGlyph() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M7 23.5V9.4c0-.55.6-.88 1.05-.58L16 14.6l7.95-5.78c.45-.3 1.05.03 1.05.58v14.1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14.6V23.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandMark({
  size = "md",
  tone = "moss",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  return (
    <span
      className={`brand-mark brand-mark--${size} brand-mark--${tone} ${className}`.trim()}
      aria-hidden
    >
      <MarkGlyph />
    </span>
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
  markTone,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "light";
  markTone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  const resolvedMark = markTone ?? (tone === "light" ? "light" : "rose");
  const wordClass =
    size === "lg"
      ? "text-[2.1rem]"
      : size === "sm"
        ? "text-[1.35rem]"
        : "text-[1.55rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandMark
        size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
        tone={resolvedMark}
      />
      <BrandWord light={tone === "light"} className={`${wordClass} leading-none`} />
    </span>
  );
}
