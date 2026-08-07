"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CITIES } from "@/data/providers";
import { useAuth } from "@/lib/auth";

export default function RegisterMomPage() {
  const { registerMom, user, ready } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !user) return;
    router.replace(user.role === "mom" ? "/ucet" : "/ucet-pecujici");
  }, [ready, user, router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = registerMom({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      phone: String(fd.get("phone") || ""),
      city: String(fd.get("city") || ""),
    });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.push("/ucet");
  }

  return (
    <div className="shell max-w-lg pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Pro maminky</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">Založ si účet</h1>
      <p className="mt-3 text-ink-soft">
        Pak můžeš rezervovat termíny, ukládat rezervace a nechat AI doporučit
        kandidátku.
      </p>

      <form onSubmit={onSubmit} className="panel-solid mt-8 space-y-4 p-6">
        <label className="block text-sm font-semibold">
          Jméno
          <input required name="name" className="input mt-1.5" />
        </label>
        <label className="block text-sm font-semibold">
          E-mail
          <input required type="email" name="email" className="input mt-1.5" />
        </label>
        <label className="block text-sm font-semibold">
          Telefon
          <input name="phone" className="input mt-1.5" placeholder="+420…" />
        </label>
        <label className="block text-sm font-semibold">
          Město
          <select name="city" className="input mt-1.5" defaultValue="praha">
            {Object.entries(CITIES).map(([key, c]) => (
              <option key={key} value={key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Heslo
          <input required type="password" name="password" minLength={4} className="input mt-1.5" />
        </label>
        {error && <p className="text-sm font-semibold text-rose">{error}</p>}
        <button type="submit" className="btn btn-rose w-full">
          Vytvořit účet maminky
        </button>
        <p className="text-xs leading-relaxed text-ink-soft">
          Demo režim: účet se ukládá jen v tomto prohlížeči. Produkční login
          (BankID / e-mail ověření) napojíme později.
        </p>
      </form>

      <p className="mt-5 text-sm text-ink-soft">
        Už máš účet?{" "}
        <Link href="/prihlaseni" className="font-bold text-ink underline">
          Přihlásit se
        </Link>
      </p>
    </div>
  );
}
