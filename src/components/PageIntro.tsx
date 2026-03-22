"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Celková délka intro (fade overlay končí cca ve 4. s) + malá rezerva před odstraněním z DOM */
const INTRO_REMOVE_MS = 4200;

/**
 * Fullscreen úvodní intro — první prvek v `<body>`.
 * Logo: `site.heroSymbolUrl` (stejné jako hero).
 *
 * Po načtení JS se overlay vždy po pár sekundách odebere z DOM (záloha, kdyby CSS animace nespadla
 * a zůstala jen bílá obrazovka). U `prefers-reduced-motion` se intro nezobrazí.
 */
export function PageIntro() {
  const [visible, setVisible] = useState(true);
  const { width, height } = site.heroSymbolSize;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), INTRO_REMOVE_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-logo-stage">
        <div className="intro-logo-3d">
          {/* eslint-disable-next-line @next/next/no-img-element -- statické logo z public/ */}
          <img
            src={site.heroSymbolUrl}
            alt=""
            width={width}
            height={height}
            className="intro-logo-img"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
