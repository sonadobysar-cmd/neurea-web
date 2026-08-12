"use client";

import { useEffect } from "react";

function loadScript(id: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset.src === src) {
      resolve();
      return;
    }
    existing?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.dataset.src = src;
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function LuxuryLanding({
  html,
  marquee,
}: {
  html: string;
  marquee: string[];
}) {
  useEffect(() => {
    window.__ROBIN_MARQUEE = marquee;
    let cancelled = false;

    (async () => {
      try {
        await loadScript("robin2-balloon-data", "/robin2-balloon-data.js");
        if (!cancelled) await loadScript("luxury-init", "/luxury.js");
        if (!cancelled) await loadScript("robin-merge-init", "/robin-merge.js?v=5");
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [marquee]);

  return (
    <>
      <div id="bubbles" aria-hidden="true" />
      <div id="glow" aria-hidden="true" />
      <div className="luxury-root" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

declare global {
  interface Window {
    __ROBIN_MARQUEE?: string[];
    __ROBIN_TURNSTILE_SITE_KEY?: string;
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string | number;
      reset: (id: string | number) => void;
      getResponse: (id: string | number) => string;
    };
  }
}
