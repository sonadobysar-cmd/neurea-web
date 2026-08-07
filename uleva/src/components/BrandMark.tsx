import Image from "next/image";

/**
 * MamaSOS brand system
 * Mark: rose petal M · Wordmark: high-contrast Didone serif
 */

/** Custom SVG mark — rose petal M (scalable, currentColor). */
export function LogoMark({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M10.5 52V14.2c0-1.4 1.55-2.2 2.7-1.4l12.3 8.4c.7.48 1.62.48 2.32 0L32 15.8l4.18 5.4c.7.48 1.62.48 2.32 0l12.3-8.4c1.15-.8 2.7 0 2.7 1.4V52c0 1.15-.95 2.1-2.1 2.1h-5.3c-1.15 0-2.1-.95-2.1-2.1V30.6L35.4 40.2c-.7.55-1.7.55-2.4 0L26 30.6V52c0 1.15-.95 2.1-2.1 2.1h-5.3c-1.15 0-2.1-.95-2.1-2.1Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.35"
        d="M32 8.5c4.2 3.8 6.8 7.2 7.6 11.2-2.4-1.2-5-1.9-7.6-1.9s-5.2.7-7.6 1.9c.8-4 3.4-7.4 7.6-11.2Z"
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

/** Full lockup: mark + wordmark (text) — crisp at any size */
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
    size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const wordClass =
    size === "lg"
      ? "text-[1.85rem] md:text-[2.05rem]"
      : size === "sm"
        ? "text-[1.2rem]"
        : "text-[1.4rem]";
  const markColor = tone === "light" ? "text-white" : "text-rose";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <LogoMark className={`${markSize} ${markColor}`} />
      <BrandWord light={tone === "light"} className={`${wordClass} leading-none`} />
    </span>
  );
}

/** Raster lockup for hero / campaign moments */
export function BrandLogoImage({
  variant = "dark",
  className = "",
  priority = false,
}: {
  variant?: "dark" | "light" | "wordmark";
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "light"
      ? "/brand/mamasos-lockup-light.png"
      : variant === "wordmark"
        ? "/brand/mamasos-logo-dark.png"
        : "/brand/mamasos-lockup.png";

  return (
    <Image
      src={src}
      alt="MamaSOS"
      width={640}
      height={160}
      priority={priority}
      className={`h-auto w-full ${className}`.trim()}
    />
  );
}

/** @deprecated use LogoMark */
export function BrandMark({
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "moss" | "rose" | "light" | "ink";
  className?: string;
}) {
  return <LogoMark className={`h-7 w-7 text-rose ${className}`.trim()} />;
}
