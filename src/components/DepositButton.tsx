"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function DepositButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "Platbu nelze spustit.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Síťová chyba. Zkuste znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={pay}
        disabled={loading}
        className="btn-primary min-h-[52px] w-full !px-8 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
      >
        <span>
          {loading ? "Přesměrovávám na Stripe…" : `Zaplatit zálohu ${site.depositCzk} Kč`}
        </span>
      </button>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
