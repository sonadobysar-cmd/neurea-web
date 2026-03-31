"use client";

import { useState, type FormEvent } from "react";

const OPTIONS = [
  {
    value: "studie",
    label: "Chci se přihlásit do testovací studie zdarma",
  },
  {
    value: "seznam",
    label: "Chci být na seznamu zájemců při spuštění",
  },
] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function RezervaceLandingForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const interest = String(fd.get("interest") ?? "");
    const website = String(fd.get("website") ?? "");

    setErrorMessage(null);
    setState("submitting");

    try {
      const res = await fetch("/rezervace/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest, website }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? "Odeslání se nepovedlo. Zkuste to prosím znovu.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMessage("Chyba spojení. Zkuste to prosím znovu.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="mx-auto w-full max-w-md rounded-2xl border border-[#B8963E]/30 bg-[#1a1a18] p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-8 md:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="font-heading text-xl text-[#B8963E] sm:text-2xl">Děkujeme</p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base">
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

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto w-full max-w-md space-y-5 rounded-2xl border border-[#B8963E]/25 bg-[#1a1a18] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:space-y-6 sm:p-6 md:p-8"
      noValidate
    >
      {/* Honeypot — ponechte prázdné (proti spamu) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="rez-website">Web</label>
        <input id="rez-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <label htmlFor="rez-name" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
          Jméno
        </label>
        <input
          id="rez-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={state === "submitting"}
          className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
          placeholder="Vaše jméno"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rez-email" className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
          Email
        </label>
        <input
          id="rez-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          disabled={state === "submitting"}
          className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#111110] px-4 py-3 text-[16px] text-white placeholder:text-white/35 outline-none transition focus:border-[#B8963E]/70 focus:ring-2 focus:ring-[#B8963E]/25 disabled:opacity-60 sm:text-[15px]"
          placeholder="vas@email.cz"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
          Zájem
        </legend>
        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex min-h-[48px] cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-[#111110] p-4 transition hover:border-[#B8963E]/35 has-[:checked]:border-[#B8963E]/55 has-[:checked]:bg-[#B8963E]/[0.06]"
            >
              <input
                type="radio"
                name="interest"
                value={opt.value}
                required
                disabled={state === "submitting"}
                className="mt-1 h-[18px] w-[18px] shrink-0 border-white/30 text-[#B8963E] focus:ring-[#B8963E]/40 disabled:opacity-60"
              />
              <span className="text-left text-[15px] leading-snug text-white/90">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {errorMessage ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200/95" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="min-h-[52px] w-full rounded-lg bg-[#B8963E] px-6 py-3.5 text-[15px] font-semibold tracking-wide text-[#111110] transition hover:bg-[#c9a24a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8963E] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Odesílám…" : "Rezervovat místo"}
      </button>
    </form>
  );
}
