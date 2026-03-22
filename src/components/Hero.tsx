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
};

/**
 * Hero — celá obrazovka z videa, dole CTA. Bez přechodu přes obraz — čisté video.
 */
export function Hero({
  videoSrc = "/videos/hero.mp4",
  videoWebmSrc,
  posterSrc,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.play().catch(() => {
        /* autoplay může blokovat prohlížeč */
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

      <div className="absolute inset-0">
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-4 pt-6 text-center md:px-10 md:pb-5 md:pt-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
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
