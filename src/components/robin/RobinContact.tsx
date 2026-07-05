"use client";

import { useState } from "react";
import { robinSite } from "@/lib/robinSite";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal } from "./ScrollReveal";

export function RobinContact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Poptávka — ${name}`);
    const body = encodeURIComponent(
      `Jméno: ${name}\nE-mail: ${email}\nTelefon: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:${robinSite.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setLoading(false);
  }

  return (
    <section id="kontakt" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">Kontakt</p>
          <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
            Máte zájem o kouzelnické vystoupení?
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-wider text-white/40">Kouzelník</p>
                <p className="mt-1 text-2xl font-bold text-white">{robinSite.magician}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-white/40">Telefon</p>
                <a
                  href={`tel:${robinSite.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-2xl font-bold text-robin-gold transition hover:text-robin-amber"
                >
                  {robinSite.phoneDisplay}
                </a>
                <p className="mt-1 text-sm text-white/50">Telefonáty: {robinSite.phoneHours}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-white/40">E-mail</p>
                <a
                  href={`mailto:${robinSite.email}`}
                  className="mt-1 block text-lg text-white/80 transition hover:text-robin-gold"
                >
                  {robinSite.email}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-white/40">Působnost</p>
                <p className="mt-1 text-white/70">Praha a celá Česká republika</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-3">
            {sent ? (
              <div className="rounded-3xl border border-robin-gold/30 bg-robin-gold/10 p-10 text-center">
                <span className="text-5xl">✨</span>
                <h3 className="mt-4 font-robin-display text-2xl font-bold text-white">Děkujeme!</h3>
                <p className="mt-2 text-white/65">
                  Váš e-mailový klient se otevřel. Pošlete zprávu a brzy se ozveme.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-white/60">Jméno *</span>
                    <input
                      name="name"
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-robin-gold/50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-white/60">Telefon</span>
                    <input
                      name="phone"
                      type="tel"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-robin-gold/50"
                    />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="text-sm font-medium text-white/60">E-mail *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-robin-gold/50"
                  />
                </label>
                <label className="mt-5 block">
                  <span className="text-sm font-medium text-white/60">Zpráva *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Typ akce, datum, počet diváků, místo…"
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-robin-gold/50"
                  />
                </label>
                <MagneticButton className="mt-8 inline-block">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-gradient-to-r from-robin-orange to-robin-gold px-10 py-4 font-bold uppercase tracking-wider text-black transition hover:shadow-lg hover:shadow-robin-orange/30 disabled:opacity-60"
                  >
                    {loading ? "Odesílám…" : "Odeslat poptávku"}
                  </button>
                </MagneticButton>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
