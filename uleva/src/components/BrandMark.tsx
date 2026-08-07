function MarkGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.5 24V9.2c0-.7.8-1.1 1.35-.7L16 14.8l8.15-6.3c.55-.4 1.35 0 1.35.7V24"
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14.8V24"
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Crafted MamaSOS mark — soft organic vessel + M. */
export function BrandMark({
  size = "md",
  tone = "moss",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  const sizeClass = {
    sm: "brand-mark--sm",
    md: "brand-mark--md",
    lg: "brand-mark--lg",
    hero: "brand-mark--hero",
  }[size];

  const toneClass = {
    moss: "brand-mark--moss",
    rose: "brand-mark--rose",
    light: "brand-mark--light",
    ink: "brand-mark--ink",
  }[tone];

  return (
    <span
      className={`brand-mark ${sizeClass} ${toneClass} ${className}`.trim()}
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
      ? "text-[2.25rem]"
      : size === "sm"
        ? "text-[1.4rem]"
        : "text-[1.75rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandMark
        size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
        tone={resolvedMark}
      />
      <BrandWord
        light={tone === "light"}
        className={`${wordClass} leading-none`}
      />
    </span>
  );
}
