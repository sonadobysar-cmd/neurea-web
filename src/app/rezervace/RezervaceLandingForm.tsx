"use client";

import { useState, type FormEvent } from "react";

type Interest = "studie" | "seznam";

type SubmitState = "idle" | "submitting" | "success" | "error";

async function postLead(payload: {
  name: string;
  email: string;
  interest: Interest;
  website: string;
}): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/rezervace/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? "Odeslání se nepovedlo. Zkuste to prosím znovu." };
  }
  return { ok: true };
}

function SuccessCard({ interest }: { interest: Interest }) {
  const title = interest === "studie" ? "Přihlášení do studie přijato" : "Jste na seznamu";
  return (
    <div
      className="flex min-h-[320px] flex-col justify-center rounded-2xl border border-[#B8963E]/30 bg-[#1a1a18] p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-8"
      role="status"
      aria-live="polite"
    >
      <p className="font-heading text-lg text-[#B8963E] sm:text-xl">{title}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-white/85">
        Vaše údaje jsme zaznamenali. Brzy vás budeme kontaktovat na uvedený e-mail.
      </p>
      <p className="mt-6 text-sm text-white/50">
        NEUREA · Brno ·{" "}
        <a href="mailto:info@neurea.cz" className="text-[#B8963E]/90 hover:text-[#B8963E]">
          info@neurea.cz
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

  async function onSubmitStudie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const website = String(fd.get("website") ?? "");
    setErrStudie(null);
    setStudie("submitting");
    const r = await postLead({ name, email, interest: "studie", website });
    if (!r.ok) {
      setErrStudie(r.error ?? "Chyba");
      setStudie("error");
      return;
    }
    setStudie("success");
  }

  async function onSubmitSeznam(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const website = String(fd.get("website") ?? "");
    setErrSeznam(null);
    setSeznam("submitting");
    const r = await postLead({ name, email, interest: "seznam", website });
    if (!r.ok) {
      setErrSeznam(r.error ?? "Chyba");
      setSeznam("error");
      return;
    }
    setSeznam("success");
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {/* Formulář 1 — studie */}
      {studie === "success" ? (
        <SuccessCard interest="studie" />
      ) : (
        <form
          onSubmit={onSubmitStudie}
          className="relative flex flex-col rounded-2xl border border-[#B8963E]/20 bg-[#1a1a18] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-6 md:p-7"
          noValidate
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="rez-web-studie">Web</label>
            <input id="rez-web-studie" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <h2 className="font-heading text-xl font-normal tracking-tight text-[#B8963E] sm:text-2xl">
            Testovací studie zdarma
          </h2>
          <p className="mt-1 text-[13px] text-white/80">Zbývá 6 míst</p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Absolvujte sérii sezení zdarma výměnou za anonymní data o výsledcích.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="studie-name" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Jméno
              </label>
              <input
                id="studie-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={studie === "submitting"}
                className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
                placeholder="Vaše jméno"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="studie-email" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
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
                className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
                placeholder="vas@email.cz"
              />
            </div>
          </div>

          {errStudie ? (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200/95" role="alert">
              {errStudie}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={studie === "submitting"}
            className="mt-6 min-h-[52px] w-full rounded-lg bg-[#B8963E] px-6 py-3.5 text-[15px] font-semibold tracking-wide text-[#111110] transition hover:bg-[#c9a24a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8963E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {studie === "submitting" ? "Odesílám…" : "Přihlásit se do studie"}
          </button>
          <p className="mt-4 text-center text-[12px] leading-snug text-white/45">
            Kapacita je omezená. Vybereme vás do 48 hodin.
          </p>
        </form>
      )}

      {/* Formulář 2 — seznam */}
      {seznam === "success" ? (
        <SuccessCard interest="seznam" />
      ) : (
        <form
          onSubmit={onSubmitSeznam}
          className="relative flex flex-col rounded-2xl border border-[#B8963E]/20 bg-[#1a1a18] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-6 md:p-7"
          noValidate
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="rez-web-seznam">Web</label>
            <input id="rez-web-seznam" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <h2 className="font-heading text-xl font-normal tracking-tight text-[#B8963E] sm:text-2xl">
            Rezervační seznam
          </h2>
          <p className="mt-1 text-[13px] text-white/80">Spouštíme září 2025</p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Buďte mezi prvními kteří se dozví o spuštění. Žádný závazek.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="seznam-name" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Jméno
              </label>
              <input
                id="seznam-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={seznam === "submitting"}
                className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
                placeholder="Vaše jméno"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="seznam-email" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
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
                className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
                placeholder="vas@email.cz"
              />
            </div>
          </div>

          {errSeznam ? (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200/95" role="alert">
              {errSeznam}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={seznam === "submitting"}
            className="mt-6 min-h-[52px] w-full rounded-lg border-2 border-[#B8963E] bg-transparent px-6 py-3.5 text-[15px] font-semibold tracking-wide text-[#B8963E] transition hover:bg-[#B8963E]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8963E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {seznam === "submitting" ? "Odesílám…" : "Rezervovat místo na seznamu"}
          </button>
          <p className="mt-4 text-center text-[12px] leading-snug text-white/45">
            Zavoláme vám jako prvním — ještě před spuštěním.
          </p>
        </form>
      )}
    </div>
  );
}
