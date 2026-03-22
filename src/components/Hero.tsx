"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type HeroProps = {
  /** Cesta k MP4 v /public (např. /videos/hero.mp4) */
  videoSrc?: string;
  /** Volitelný WebM (menší soubor) */
  videoWebmSrc?: string;
  /** Náhled před načtením videa */
  posterSrc?: string;
  /** Krátký řádek skriptem (Momo Signature) nad tlačítky — vypni `false`, když chceš jen CTA */
  showTagline?: boolean;
};

/**
 * Hero — celá obrazovka z videa, dole CTA.
 * Video: soubor `public/videos/hero.mp4` (název přesně takto, malá písmena).
 */
export function Hero({
  videoSrc = "/videos/hero.mp4",
  videoWebmSrc,
  posterSrc,
  showTagline = true,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.play().catch(() => {
        /* autoplay může blokovat prohlížeč — zkus znovu po interakci */
      });
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [videoSrc, videoWebmSrc]);

  return (
    <section
      className="relative flex min-h-[calc(100dvh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-end overflow-hidden"
      aria-label="Úvodní sekce"
    >
      <h1 className="sr-only">
        NEUREA — Terapie mluví, Neurea měří. Neuro a somatika, první neuro-somatické pracoviště svého druhu v České republice.
      </h1>

      <div className="absolute inset-0 bg-ink">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          {...(posterSrc ? { poster: posterSrc } : {})}
          aria-hidden
        >
          {videoWebmSrc ? <source src={videoWebmSrc} type="video/webm" /> : null}
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/15"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px divider-gold opacity-90" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-10 pt-6 text-center md:px-10 md:pb-14 md:pt-8">
        {showTagline ? (
          <p className="font-script pointer-events-auto mb-8 max-w-2xl text-2xl leading-snug text-gold md:mb-10 md:text-[1.85rem]">
            Klid, který se dá měřit.
          </p>
        ) : null}

        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 md:gap-5">
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
