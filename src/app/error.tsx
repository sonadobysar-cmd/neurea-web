"use client";

import { useEffect } from "react";

/**
 * Zachytí neočekávané chyby v App Routeru (runtime).
 * Častá příčina při vývoji: rozbitá cache `.next` → `npm run clean` a znovu `npm run dev`.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NEUREA]", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <p className="eyebrow">Chyba</p>
      <h1 className="mt-4 font-display text-2xl font-normal text-ink md:text-3xl">
        Něco se pokazilo
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink/60">
        Aplikace spadla při běhu. Zkuste znovu načíst stránku. Pokud se to opakuje, v terminálu ve
        složce projektu spusťte{" "}
        <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">npm run clean</code> a pak znovu{" "}
        <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">npm run dev</code>.
      </p>
      {process.env.NODE_ENV === "development" && error.message ? (
        <pre className="mt-6 max-h-40 w-full overflow-auto rounded-xl border border-ink/10 bg-ink/5 p-4 text-left text-xs text-ink/70">
          {error.message}
        </pre>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="btn-primary mt-10"
      >
        <span>Zkusit znovu</span>
      </button>
    </div>
  );
}
