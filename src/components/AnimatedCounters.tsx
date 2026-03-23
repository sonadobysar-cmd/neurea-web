"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounter = {
  target: number;
  popisek: string;
  podpopisek: string;
};

function formatCzNumberNbsp(n: number) {
  // Česky oddělení tisíců mezerou + non-breaking space (pevná mezera).
  // Ručně, aby to bylo deterministické (Intl může vypsat i jiný typ mezery).
  const s = Math.trunc(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

function easeOutQuart(progress: number) {
  // 1 - Math.pow(1 - progress, 4)
  return 1 - Math.pow(1 - progress, 4);
}

export function AnimatedCounters() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasStartedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const counters = useMemo<AnimatedCounter[]>(
    () => [
      {
        target: 5000,
        popisek: "publikovaných vědeckých studií",
        podpopisek: "napříč všemi technologiemi Neurea",
      },
      {
        target: 500000,
        popisek: "lidí zaznamenalo měřitelné zlepšení",
        podpopisek: "díky technologiím které používáme",
      },
      {
        target: 35,
        popisek: "let vědeckého výzkumu",
        podpopisek: "za technologiemi které používáme",
      },
    ],
    [],
  );

  const [values, setValues] = useState<number[]>(() =>
    counters.map(() => 0),
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const durationMs = 2000;

    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const start = performance.now();

      const tick = (now: number) => {
        const rawProgress = (now - start) / durationMs;
        const progress = Math.min(rawProgress, 1);
        const eased = easeOutQuart(progress);

        // Počítáme od 0 do cílové hodnoty. Pro velká čísla používáme Math.round,
        // aby se výsledky přesně „zakulatily“ na cílové hodnoty na konci animace.
        setValues(
          counters.map((c) => Math.round(eased * c.target)),
        );

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Na úplném konci dorovnáme na cílové hodnoty.
          setValues(counters.map((c) => c.target));
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some((e) => e.isIntersecting);
        if (intersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [counters]);

  return (
    <section ref={sectionRef} className="bg-white section-spacious">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {counters.map((c, idx) => (
            <div
              key={c.popisek}
              className="glass-panel-strong px-8 py-12 text-center md:px-10"
            >
              <p className="font-display text-[2.25rem] font-light tracking-[-0.03em] text-ink md:text-[2.6rem]">
                {formatCzNumberNbsp(values[idx] ?? 0)}+
              </p>
              <p className="mt-4 font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                {c.popisek}
              </p>
              <p className="mt-3 text-[15px] font-normal leading-relaxed text-ink/60">
                {c.podpopisek}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

