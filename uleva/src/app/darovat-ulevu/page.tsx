import Link from "next/link";
import { TodoNote } from "@/components/LegalDoc";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

export default function GiftPage() {
  const hours = 3;
  const ulevaGift = SERVICE_PRICING.uleva.pricePerHour * hours;

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Dárkové poukazy</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">
          Nedávejte další bodyčko. Darujte čerstvé mamince skutečnou úlevu.
        </h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Partner, rodina, kamarádky nebo zaměstnavatel — poukaz na ověřenou
          pomoc s konkrétním termínem, ne další věc do skříně.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="panel-solid p-6">
          <p className="eyebrow">Nejoblíbenější</p>
          <h2 className="display mt-2 text-2xl">{hours} hodiny Úlevy doma</h2>
          <p className="mt-3 display text-4xl">{formatCzk(ulevaGift)}</p>
          <p className="mt-2 text-sm text-ink-soft">
            Úklid, vaření, pohlídání — podle toho, co maminka zrovna potřebuje.
          </p>
        </article>
        <article className="panel-solid p-6">
          <p className="eyebrow">Flexibilní</p>
          <h2 className="display mt-2 text-2xl">Finanční kredit</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Maminka si sama vybere službu a termín. Kredit uplatní při rezervaci.
          </p>
          <TodoNote>Doplnit nominální částky kreditu a platnost poukazu.</TodoNote>
        </article>
        <article className="panel-solid p-6">
          <p className="eyebrow">Balíček</p>
          <h2 className="display mt-2 text-2xl">Více návštěv</h2>
          <p className="mt-3 text-sm text-ink-soft">
            3 nebo 5 návštěv Úlevy doma — bez předplatného, jen předplacený balíček
            služeb.
          </p>
          <TodoNote>Připravit checkout balíčků po napojení plateb.</TodoNote>
        </article>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/kontakt" className="btn btn-rose">
          Mám zájem o poukaz
        </Link>
        <Link href="/cenik" className="btn btn-ghost">
          Zobrazit ceník
        </Link>
      </div>
    </div>
  );
}
