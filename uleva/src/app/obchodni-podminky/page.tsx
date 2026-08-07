import { LegalDoc, TodoNote } from "@/components/LegalDoc";

export default function Page() {
  return (
    <LegalDoc title="Obchodní podmínky">
      <p>
        MamaSOS provozuje online platformu pro zprostředkování rezervací mezi
        klientkou a samostatnou podnikatelkou (pečující). Smlouva o poskytnutí
        služby vzniká mezi klientkou a pečující.
      </p>
      <TodoNote>
        Doplnit finální právní text schválený advokátem před produkčním
        spuštěním.
      </TodoNote>
    </LegalDoc>
  );
}
