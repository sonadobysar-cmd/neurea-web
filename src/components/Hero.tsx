import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { site } from "@/lib/site";

/** Jemné krémové „částice“ / světlo — čistě CSS, bez tmavých ploch */
function HeroAmbientBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-cream" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 18% 22%, rgba(184, 150, 62, 0.09) 0%, transparent 42%)",
            "radial-gradient(circle at 82% 78%, rgba(249, 246, 240, 0.95) 0%, transparent 48%)",
            "radial-gradient(circle at 50% 100%, rgba(184, 150, 62, 0.05) 0%, transparent 55%)",
          ].join(", "),
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.35]" />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center md:px-8">
      {/* Logo — čistý obrázek, jemná animace (fade + pulse) */}
      <div className="animate-logo-fade-in opacity-0 [animation-fill-mode:forwards]">
        <div className="[perspective:800px]">
          <div className="animate-logo-pulse-soft gpu-promote">
            <LogoMark className="mx-auto h-[min(42vw,11rem)] w-[min(42vw,11rem)] sm:h-[min(32vw,12rem)] sm:w-[min(32vw,12rem)]" />
          </div>
        </div>
      </div>

      <h1 className="mt-12 max-w-3xl font-display text-[2.1rem] font-light leading-[1.15] tracking-[-0.02em] text-ink md:mt-14 md:text-5xl lg:text-[3.25rem]">
        Terapie mluví. Neurea měří.
      </h1>

      <p className="mt-8 max-w-2xl font-sans text-[15px] font-normal leading-relaxed tracking-[0.06em] text-gold md:text-base">
        První neuro-somatické pracoviště svého druhu v ČR
      </p>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
        <Link href="/rezervace" className="btn-gold">
          <span>Rezervovat</span>
        </Link>
        <Link href="/jak-to-funguje" className="btn-outline-gold">
          <span>Jak to funguje</span>
        </Link>
      </div>
    </div>
  );
}

/**
 * Úvod: světlý luxusní styl. Volitelné video — vždy se světlým přechodem (žádné černé pozadí).
 */
export function Hero() {
  const videoSrc = site.heroVideoUrl;

  if (videoSrc) {
    return (
      <section className="relative flex min-h-[100vh] min-h-[100dvh] flex-col overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <HeroVideoBackground src={videoSrc} poster={site.heroVideoPosterUrl} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/92 via-cream/95 to-cream"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-cream/80 to-white/70" aria-hidden />

        <div className="relative flex min-h-[100vh] min-h-[100dvh] flex-1 flex-col items-center justify-center py-20">
          <HeroContent />
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[100vh] min-h-[100dvh] flex-col overflow-hidden bg-cream">
      <HeroAmbientBg />
      <div className="relative flex min-h-[100vh] min-h-[100dvh] flex-1 flex-col items-center justify-center py-16 md:py-24">
        <HeroContent />
      </div>
    </section>
  );
}
