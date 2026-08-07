import { LegalDoc, TodoNote } from "@/components/LegalDoc";
import { MODEL_SUMMARY } from "@/data/legalModel";

export default function Page() {
  return (
    <LegalDoc title="Obchodní podmínky">
      <p>
        MamaSOS provozuje online tržiště / zprostředkování rezervací (
        {MODEL_SUMMARY.label}). {MODEL_SUMMARY.careContract}.{" "}
        {MODEL_SUMMARY.platformRole}
      </p>
      <p>
        Před platbou klientka vidí totožnost a IČO pečující, službu, termín a
        konečnou cenu. Platby mají probíhat přes licencovaného poskytovatele;
        ostré inkaso je v demu vypnuté.
      </p>
      <TodoNote>
        Finální VOP musí napsat / schválit advokát po volbě fakturačního modelu
        (viz interní /admin/pravni). Dokud není zvolený jeden model, nelze VOP
        považovat za finální.
      </TodoNote>
    </LegalDoc>
  );
}
