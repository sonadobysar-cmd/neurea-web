import { LegalDoc, TodoNote } from "@/components/LegalDoc";

export default function Page() {
  return (
    <LegalDoc title="Cookies">
      <p>
        Používáme nezbytné cookies pro přihlášení a rezervace. Analytické cookies
        jen se souhlasem.
      </p>
      <TodoNote>Doplnit cookie lištu a přesný seznam cookies.</TodoNote>
    </LegalDoc>
  );
}
