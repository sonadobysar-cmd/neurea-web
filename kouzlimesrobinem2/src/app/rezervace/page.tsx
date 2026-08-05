import { redirect } from "next/navigation";

/** Sdílitelná adresa → sekce rezervace na hlavní stránce */
export default function RezervacePage() {
  redirect("/#rezervace");
}
