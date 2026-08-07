import Link from "next/link";
import type { ReactNode } from "react";

export function LegalDoc({
  title,
  eyebrow = "Právní",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="shell max-w-3xl pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">{title}</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
      <p className="mt-10 text-xs text-ink-soft">
        Otázky?{" "}
        <Link href="/kontakt" className="font-bold text-ink underline">
          Kontaktujte podporu
        </Link>
        .
      </p>
    </div>
  );
}

export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-rose/40 bg-[rgba(201,123,132,0.08)] px-4 py-3 text-sm text-ink">
      <span className="font-bold text-rose-deep">TODO:</span> {children}
    </p>
  );
}
