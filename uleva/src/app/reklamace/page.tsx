import { LegalDoc, TodoNote } from "@/components/LegalDoc";

export default function Page() {
  return (
    <LegalDoc title="Reklamace">
      <p>
        Reklamaci služby uplatněte u podpory MamaSOS. Uveďte číslo rezervace,
        datum a popis problému.
      </p>
      <TodoNote>
        Doplnit závazný reklamační řád (lhůty, způsob vyřízení) před spuštěním.
      </TodoNote>
    </LegalDoc>
  );
}
