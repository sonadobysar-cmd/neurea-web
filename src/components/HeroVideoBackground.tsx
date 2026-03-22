"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** Náhled před načtením videa (např. první snímek z Canvy) */
  poster?: string | null;
};

/**
 * Smyčkové hero video (autoplay vyžaduje muted + playsInline — stejně jako u AEON).
 * Při prefers-reduced-motion se přehrávání vypne.
 */
export function HeroVideoBackground({ src, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        v.pause();
      } else {
        void v.play().catch(() => {
          /* některé prohlížeče blokují autoplay i s muted */
        });
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full min-h-full w-full object-cover object-center"
      src={src}
      poster={poster ?? undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
