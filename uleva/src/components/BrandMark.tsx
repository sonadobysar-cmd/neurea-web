/**
 * MamaSOS brand mark — M monogram.
 * Tone: warm, calm, maternal care. Not emergency "SOS", not clinical.
 */
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
      aria-hidden={true}
    >
      M
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
  const resolvedMark =
    markTone ?? (tone === "light" ? "light" : "moss");
  const wordClass =
    size === "lg"
      ? "text-[2.15rem]"
      : size === "sm"
        ? "text-[1.35rem]"
        : "text-[1.7rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandMark size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} tone={resolvedMark} />
      <span
        className={`display leading-none ${wordClass} ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        MamaSOS
      </span>
    </span>
  );
}
