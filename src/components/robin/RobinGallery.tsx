"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const PHOTOS = [
  { src: "/robin/IMG_0872.jpg", alt: "Portrét kouzelníka Robina Panuše" },
  { src: "/robin/IMG_0722.jpg", alt: "Robin tvoří balonkové zvířátko" },
  { src: "/robin/IMG_0890.jpg", alt: "Dynamické kouzelnické představení pro děti" },
  { src: "/robin/IMG_0750.jpg", alt: "Kouzelník Robin s modrou kouzelnickou taškou" },
  { src: "/robin/IMG_0584.jpg", alt: "Robin s plyšovým mývalcem na pódiu" },
  { src: "/robin/IMG_0628.jpg", alt: "Close-up kouzla se žlutými míčky" },
  { src: "/robin/IMG_0779.jpg", alt: "Barevné hedvábné šátky z kouzelnické tašky" },
] as const;

export function RobinGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="galerie" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">Galerie</p>
          <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
            Kouzla v obrazech
          </h2>
        </ScrollReveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={i * 0.06}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(i)}
                className="group mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-robin-gold"
              >
                <div className="relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    className="w-full object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    Zvětšit
                  </span>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Zvětšená fotografie"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label="Zavřít"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20 md:left-8"
            aria-label="Předchozí"
          >
            ‹
          </button>
          <Image
            src={PHOTOS[lightbox].src}
            alt={PHOTOS[lightbox].alt}
            width={1200}
            height={1600}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % PHOTOS.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20 md:right-8"
            aria-label="Další"
          >
            ›
          </button>
        </motion.div>
      )}
    </section>
  );
}
