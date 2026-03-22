import Link from "next/link";

/**
 * Hero — high luxury brand: hodně bílého prostoru, typografie, bez loga a bez videa.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100vh] min-h-[100dvh] flex-col justify-center overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-gold opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_55%,#F9F6F0_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center md:px-10 md:pb-32 md:pt-36">
        <p className="font-sans text-[10px] font-normal uppercase tracking-[0.42em] text-gold opacity-75">
          Neuro &amp; somatika
        </p>

        <p className="font-script mt-8 max-w-2xl text-2xl leading-snug text-gold md:mt-10 md:text-[1.85rem]">
          Klid, který se dá měřit.
        </p>

        <h1 className="mt-10 max-w-4xl font-display font-light tracking-[-0.03em] text-ink md:mt-12">
          <span className="block text-[2.35rem] leading-[1.15] md:text-5xl lg:text-[3.25rem]">
            Terapie mluví.
          </span>
          <span className="mt-2 block text-[2.35rem] leading-[1.15] md:text-5xl lg:text-[3.25rem]">
            <span className="font-script text-[2.6rem] text-gold md:text-[3.15rem] lg:text-[3.75rem]">Neurea</span>{" "}
            <span className="font-display">měří.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-xl font-sans text-[13px] font-light italic leading-relaxed text-ink/55 md:text-sm">
          První neuro-somatické pracoviště svého druhu v České republice.
        </p>

        <div
          className="divider-gold my-12 w-20 md:my-14"
          aria-hidden
        />

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/rezervace" className="btn-gold">
            <span>Rezervovat</span>
          </Link>
          <Link href="/jak-to-funguje" className="btn-outline-gold">
            <span>Jak to funguje</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
