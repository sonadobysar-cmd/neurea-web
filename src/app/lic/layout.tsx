import type { ReactNode } from "react";

export const metadata = {
  title: "Líc — Tvoje tvář. Sedí. Neskače.",
  description: "Shorty se stabilním beauty lockem a českými titulky.",
};

/** Bez NEUREA header/footer — full-bleed studio */
export default function LicLayout({ children }: { children: ReactNode }) {
  return children;
}
