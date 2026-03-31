import { Fragment } from "react";

type TrustStripProps = {
  /** Nad tmavým hero (AEON) — světlý text na poloprůhledné liště */
  variant?: "light" | "dark";
};

/**
 * Jeden řádek claimů (jako horní pás u referenčního webu) — bez divné interpunkce.
 */
export function TrustStrip({ variant = "light" }: TrustStripProps) {
  const items = [
    "Měřitelná neuro-somatická péče",
    "Diskrétní prostor · Brno",
    "Věda a technologie v klidném tempu",
  ];

  const bar =
    variant === "dark"
      ? "border-b border-white/[0.08] bg-black/35 backdrop-blur-xl"
      : "border-b border-gold/12 bg-gradient-to-r from-white/90 via-pearl/95 to-white/90 backdrop-blur-md";

  const dot = variant === "dark" ? "text-gold/40" : "text-gold/35";
  const text = variant === "dark" ? "text-cream/75 md:text-cream/80" : "text-ink/48 md:text-ink/48";

  return (
    <div className={bar}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 px-4 py-2.5 text-center md:gap-x-3 md:px-8 md:py-3">
        {items.map((t, i) => (
          <Fragment key={t}>
            {i > 0 && (
              <span className={`hidden font-heading text-[9px] sm:inline ${dot}`} aria-hidden>
                ·
              </span>
            )}
            <span
              className={`font-heading text-[9px] font-semibold uppercase tracking-[0.32em] md:text-[10px] md:tracking-[0.36em] ${text}`}
            >
              {t}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
