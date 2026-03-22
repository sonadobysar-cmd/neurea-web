"use client";

import Link from "next/link";

/**
 * Rychlé CTA na mobilu — nad spodní cookie lištou (cookie má z-[100]).
 */
export function FloatingCta() {
  return (
    <div
      className="pointer-events-none fixed bottom-24 left-0 right-0 z-[95] flex justify-center gap-3 px-4 md:hidden"
      aria-hidden={false}
    >
      <div className="pointer-events-auto flex w-full max-w-md gap-2 rounded-sm border border-white/90 bg-white/80 p-1.5 shadow-luxury-lg backdrop-blur-xl backdrop-saturate-150">
        <Link
          href="/rezervace"
          className="btn-gold !min-h-0 flex-1 !py-3 !text-[11px] text-center shadow-sm transition active:scale-[0.98]"
        >
          <span>Rezervovat</span>
        </Link>
        <Link
          href="/testy"
          className="btn-outline-gold !min-h-0 flex-1 !py-3 !text-[11px] text-center transition active:scale-[0.98]"
        >
          <span>Testy</span>
        </Link>
      </div>
    </div>
  );
}
