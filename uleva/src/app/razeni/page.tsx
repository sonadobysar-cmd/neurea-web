import Link from "next/link";
import { RANKING_RULES_PUBLIC } from "@/data/legalModel";

export default function RankingPage() {
  return (
    <div className="shell max-w-3xl pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Transparentnost</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">Jak řadíme výsledky</h1>
      <p className="mt-4 text-ink-soft">
        MamaSOS je online tržiště. Pořadí profilů není placené — platba za
        rezervaci neposouvá pečující ve výsledcích.
      </p>
      <ol className="mt-8 space-y-3">
        {RANKING_RULES_PUBLIC.map((rule, i) => (
          <li key={rule} className="panel-solid flex gap-3 p-4 text-sm">
            <span className="font-bold text-moss">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-ink-soft">
        Recenze označujeme jako „Ověřená návštěva“ pouze u dokončených rezervací.
        Demo data jsou na webu jasně označená.
      </p>
      <Link href="/hledat" className="btn btn-rose mt-8">
        Najít pomoc
      </Link>
    </div>
  );
}
