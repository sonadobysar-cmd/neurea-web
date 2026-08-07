import { LegalDoc, TodoNote } from "@/components/LegalDoc";

export default function Page() {
  return (
    <LegalDoc title="Ochrana osobních údajů">
      <p>
        Zpracováváme údaje potřebné k rezervaci, ověření pečujících a podpoře
        zákaznic v souladu s GDPR.
      </p>
      <TodoNote>
        Doplnit kompletní zásady zpracování osobních údajů a kontakt DPO /
        správce.
      </TodoNote>
    </LegalDoc>
  );
}
