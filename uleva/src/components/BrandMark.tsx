/** Wordmark-led brand — no icon. Quiet luxury. */

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

/** @deprecated Prefer BrandWord — kept for call sites that expect a mark slot */
export function BrandMark(_props: {
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  return null;
}

export function BrandLockup({
  size = "md",
  tone = "ink",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "light";
  markTone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  const wordClass =
    size === "lg"
      ? "text-[1.85rem] md:text-[2.1rem]"
      : size === "sm"
        ? "text-[1.25rem]"
        : "text-[1.45rem]";

  return (
    <BrandWord
      light={tone === "light"}
      className={`${wordClass} ${className}`.trim()}
    />
  );
}
