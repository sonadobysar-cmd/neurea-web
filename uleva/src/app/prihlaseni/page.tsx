"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !user) return;
    router.replace(user.role === "mom" ? "/ucet" : "/ucet-pecujici");
  }, [ready, user, router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = login(String(fd.get("email") || ""), String(fd.get("password") || ""));
    if (!res.ok) {
      setError(res.error);
      return;
    }
    // redirect handled by effect after login sets user
  }

  return (
    <div className="shell max-w-lg pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Přihlášení</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">Vítej zpátky</h1>
      <p className="mt-3 text-ink-soft">
        Přihlas se jako maminka nebo pečující. Demo účty běží v tomto prohlížeči.
      </p>

      <form onSubmit={onSubmit} className="panel-solid mt-8 space-y-4 p-6">
        <label className="block text-sm font-semibold">
          E-mail
          <input required type="email" name="email" className="input mt-1.5" />
        </label>
        <label className="block text-sm font-semibold">
          Heslo
          <input required type="password" name="password" className="input mt-1.5" />
        </label>
        {error && <p className="text-sm font-semibold text-rose">{error}</p>}
        <button type="submit" className="btn btn-rose w-full">
          Přihlásit se
        </button>
      </form>

      <p className="mt-5 text-sm text-ink-soft">
        Nemáš účet?{" "}
        <Link href="/registrace" className="font-bold text-ink underline">
          Registrace maminky
        </Link>{" "}
        nebo{" "}
        <Link href="/nabidnout" className="font-bold text-ink underline">
          registrace pečující
        </Link>
        .
      </p>
    </div>
  );
}
