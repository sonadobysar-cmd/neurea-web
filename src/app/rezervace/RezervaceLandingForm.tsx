"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Interest = "studie" | "seznam";

type SubmitState = "idle" | "submitting" | "success" | "error";

/** Počet zbývajících míst ve studii — z NEXT_PUBLIC_REZERVACE_STUDIE_MIST, výchozí 6. */
const STUDIE_MIST_ZBYVA = (() => {
  const raw = process.env.NEXT_PUBLIC_REZERVACE_STUDIE_MIST;
  if (raw === undefined || raw === "") return 6;
  const n = parseInt(String(raw), 10);
  return Number.isFinite(n) && n >= 0 ? n : 6;
})();

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Odpočet dolů k cílovému číslu z env — působí jako živé počítadlo. */
function StudieMistCounter({ target, mutedClass }: { target: number; mutedClass: string }) {
  const startVal = useMemo(() => {
    if (target <= 0) return 0;
    const raw = Math.min(target + 6, 48);
    return raw > target ? raw : target;
  }, [target]);

  const [display, setDisplay] = useState(startVal);

  useEffect(() => {
    if (target <= 0) {
      setDisplay(0);
      return;
    }
    if (startVal <= target) {
      setDisplay(target);
      return;
    }

    setDisplay(startVal);
    const duration = 2200;
    const t0 = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - t0;
      const u = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(u);
      const v = Math.round(startVal - (startVal - target) * eased);
      setDisplay(v);
      if (u < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, startVal]);

  return (
    <p className={`mt-1.5 text-[13px] ${mutedClass}`}>
      <span className="sr-only">Zbývá {target} míst</span>
      <span aria-hidden className="inline">
        Zbývá{" "}
        <strong className="font-bold tabular-nums text-ink">{display}</strong> míst
      </span>
    </p>
  );
}

async function postLead(payload: {
  name: string;
  email: string;
  interest: Interest;
  /** Honeypot — musí zůstat prázdné (nepoužívat název „website“, vyplňuje ho autofill). */
  neurea_hp: string;
}): Promise<{ ok: boolean; error?: string; clientEmailSent?: boolean }> {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/rezervace/api/lead`
      : "/rezervace/api/lead";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string; clientEmailSent?: boolean };
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? "Odeslání se nepovedlo. Zkuste to prosím znovu." };
  }
  return { ok: true, clientEmailSent: data.clientEmailSent !== false };
}

function SuccessCard({ interest, clientEmailSent = true }: { interest: Interest; clientEmailSent?: boolean }) {
  const title = interest === "studie" ? "Přihlášení do studie přijato" : "Jste na seznamu";
  return (
    <div
      className="rez-landing-card flex min-h-[320px] flex-col justify-center p-6 text-center sm:p-8"
      role="status"
      aria-live="polite"
    >
      <p className="font-heading text-lg text-gold sm:text-xl">{title}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/72">
        Vaše údaje jsme zaznamenali. Brzy vás budeme kontaktovat na uvedený e-mail.
      </p>
      {!clientEmailSent ? (
        <p
          className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/95 px-3 py-2.5 text-left text-[13px] leading-snug text-amber-950 sm:text-sm"
          role="status"
        >
          Automatické potvrzení na váš e-mail se nepodařilo odeslat (typicky neověřená odesílací doména v
          Resend nebo filtr u příjemce). Zájem máme u nás v pořádku — zkontrolujte prosím spam. Když nic
          nedorazí, napište nám na{" "}
          <a href={`mailto:${site.email}`} className="text-gold underline-offset-2 hover:underline">
            {site.email}
          </a>
          .
        </p>
      ) : null}
      <p className="mt-6 text-sm text-ink/48">
        NEUREA · Brno ·{" "}
        <a href={`mailto:${site.email}`} className="text-gold transition hover:opacity-90">
          {site.email}
        </a>
      </p>
    </div>
  );
}

export function RezervaceLandingForm() {
  const [studie, setStudie] = useState<SubmitState>("idle");
  const [seznam, setSeznam] = useState<SubmitState>("idle");
  const [errStudie, setErrStudie] = useState<string | null>(null);
  const [errSeznam, setErrSeznam] = useState<string | null>(null);
  const [studieClientEmailSent, setStudieClientEmailSent] = useState(true);
  const [seznamClientEmailSent, setSeznamClientEmailSent] = useState(true);

  async function onSubmitStudie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const neurea_hp = String(fd.get("neurea_hp") ?? "");
    setErrStudie(null);
    setStudie("submitting");
    const r = await postLead({ name, email, interest: "studie", neurea_hp });
    if (!r.ok) {
      setErrStudie(r.error ?? "Chyba");
      setStudie("error");
      return;
    }
    setStudieClientEmailSent(r.clientEmailSent !== false);
    setStudie("success");
  }

  async function onSubmitSeznam(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const neurea_hp = String(fd.get("neurea_hp") ?? "");
    setErrSeznam(null);
    setSeznam("submitting");
    const r = await postLead({ name, email, interest: "seznam", neurea_hp });
    if (!r.ok) {
      setErrSeznam(r.error ?? "Chyba");
      setSeznam("error");
      return;
    }
    setSeznamClientEmailSent(r.clientEmailSent !== false);
    setSeznam("success");
  }

  const labelClass =
    "block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/48";

  const muted = "text-ink/62";
  const finePrint = "text-ink/45";

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-7 md:grid-cols-2 md:gap-10">
      {studie === "success" ? (
        <SuccessCard interest="studie" clientEmailSent={studieClientEmailSent} />
      ) : (
        <form onSubmit={onSubmitStudie} className="rez-landing-card relative flex flex-col p-6 sm:p-7 md:p-8" noValidate>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="rez-hp-studie" className="sr-only">
              Ponechte prázdné (ochrana proti robotům)
            </label>
            <input
              id="rez-hp-studie"
              name="neurea_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <h2 className="font-heading text-xl font-normal tracking-tight text-gold sm:text-2xl">
            Testovací studie zdarma
          </h2>
          <StudieMistCounter target={STUDIE_MIST_ZBYVA} mutedClass={muted} />
          <p className={`mt-4 text-[15px] leading-relaxed ${muted}`}>
            Absolvujte sérii sezení zdarma výměnou za anonymní data o výsledcích.
          </p>

          <div className="mt-7 space-y-4">
            <div className="space-y-2">
              <label htmlFor="studie-name" className={labelClass}>
                Jméno
              </label>
              <input
                id="studie-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={studie === "submitting"}
                className="rez-input"
                placeholder="Vaše jméno"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="studie-email" className={labelClass}>
                Email
              </label>
              <input
                id="studie-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                disabled={studie === "submitting"}
                className="rez-input"
                placeholder="vas@email.cz"
              />
            </div>
          </div>

          {errStudie ? (
            <p
              className="mt-4 rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-center text-sm text-red-800"
              role="alert"
            >
              {errStudie}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={studie === "submitting"}
            className="btn-gold mt-7 w-full min-h-[52px] disabled:cursor-not-allowed disabled:opacity-65"
          >
            <span>{studie === "submitting" ? "Odesílám…" : "Přihlásit se do studie"}</span>
          </button>
          <p className={`mt-4 text-center text-[12px] leading-snug ${finePrint}`}>
            Kapacita je omezená. Vybereme vás do 48 hodin.
          </p>
        </form>
      )}

      {seznam === "success" ? (
        <SuccessCard interest="seznam" clientEmailSent={seznamClientEmailSent} />
      ) : (
        <form onSubmit={onSubmitSeznam} className="rez-landing-card relative flex flex-col p-6 sm:p-7 md:p-8" noValidate>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="rez-hp-seznam" className="sr-only">
              Ponechte prázdné (ochrana proti robotům)
            </label>
            <input
              id="rez-hp-seznam"
              name="neurea_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <h2 className="font-heading text-xl font-normal tracking-tight text-gold sm:text-2xl">
            Rezervační seznam
          </h2>
          <p className={`mt-1.5 text-[13px] ${muted}`}>Neurea přichází do Brna.</p>
          <p className={`mt-4 text-[15px] leading-relaxed ${muted}`}>
            Vybíráme první klienty kteří zažijí měřitelnou změnu dřív než kdokoliv jiný. Omezená kapacita.
          </p>

          <div className="mt-7 space-y-4">
            <div className="space-y-2">
              <label htmlFor="seznam-name" className={labelClass}>
                Jméno
              </label>
              <input
                id="seznam-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={seznam === "submitting"}
                className="rez-input"
                placeholder="Vaše jméno"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="seznam-email" className={labelClass}>
                Email
              </label>
              <input
                id="seznam-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                disabled={seznam === "submitting"}
                className="rez-input"
                placeholder="vas@email.cz"
              />
            </div>
          </div>

          {errSeznam ? (
            <p
              className="mt-4 rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-center text-sm text-red-800"
              role="alert"
            >
              {errSeznam}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={seznam === "submitting"}
            className="rez-btn-outline-gold mt-7 disabled:cursor-not-allowed"
          >
            <span>{seznam === "submitting" ? "Odesílám…" : "Rezervovat místo na seznamu"}</span>
          </button>
          <p className={`mt-4 text-center text-[12px] leading-snug ${finePrint}`}>
            Zavoláme vám jako prvním — ještě před spuštěním.
          </p>
        </form>
      )}
    </div>
  );
}
