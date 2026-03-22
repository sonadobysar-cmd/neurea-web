"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "neurea-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gold/25 bg-white/98 p-4 shadow-[0_-8px_40px_rgba(26,26,26,0.06)] backdrop-blur-md md:p-5"
      role="dialog"
      aria-label="Souhlas s cookies"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:px-2">
        <p className="text-sm font-normal leading-relaxed text-ink/70">
          Web používá nezbytné cookies pro chod stránky a může využívat anonymizovanou analytiku. Více
          v{" "}
          <Link href="/cookies" className="text-gold underline-offset-2 hover:underline">
            cookie politice
          </Link>{" "}
          a v{" "}
          <Link href="/zasady-ochrany-udaju" className="text-gold underline-offset-2 hover:underline">
            zásadách GDPR
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-sm border border-gold/40 bg-cream px-7 py-2.5 text-sm font-medium tracking-wide text-ink transition hover:bg-gold/15"
        >
          Rozumím
        </button>
      </div>
    </div>
  );
}
