import Link from "next/link";
import { LegalDoc, TodoNote } from "@/components/LegalDoc";

export default function Page() {
  return (
    <LegalDoc title="Storno podmínky" eyebrow="Rezervace">
      <p>
        MamaSOS je zprostředkovatel. Níže je rámec pravidel, která budou platit
        pro rezervace na platformě.
      </p>
      <h2 className="!mt-6 text-base font-bold text-ink">Co když pečující nepřijede?</h2>
      <p>
        Pomůžeme najít náhradní termín nebo vrátíme platbu podle storno
        podmínek. Kontaktujte podporu co nejdříve.
      </p>
      <h2 className="!mt-6 text-base font-bold text-ink">Co když návštěvu zruší klientka?</h2>
      <TodoNote>
        Definovat lhůty storna (např. volné zrušení do X hodin) a výši
        storno poplatku. Do té doby neuvádět konkrétní čísla jako závazná.
      </TodoNote>
      <h2 className="!mt-6 text-base font-bold text-ink">Kdy se vrací peníze?</h2>
      <p>
        Při zrušení ze strany pečující nebo neuskutečnění služby dle pravidel
        platformy vracíme platbu způsobem, jakým byla uhrazena.
      </p>
      <TodoNote>Doplnit lhůtu vrácení (např. do X pracovních dní).</TodoNote>
      <h2 className="!mt-6 text-base font-bold text-ink">Náhradní pečující</h2>
      <p>
        Pokud to kapacita lokality dovolí, pokusíme se nabídnout náhradní
        ověřenou pečující se stejným typem služby.
      </p>
      <h2 className="!mt-6 text-base font-bold text-ink">Služba neodpovídá objednávce</h2>
      <p>
        Napište na{" "}
        <Link href="/kontakt" className="font-bold text-ink underline">
          kontakt
        </Link>{" "}
        nebo postupujte dle{" "}
        <Link href="/reklamace" className="font-bold text-ink underline">
          reklamací
        </Link>
        .
      </p>
    </LegalDoc>
  );
}
