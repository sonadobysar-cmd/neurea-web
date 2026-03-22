import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Úzký text (GDPR, FAQ) · širší grid (služby) · ceník (tabulka) */
  variant?: "narrow" | "wide" | "pricing";
  className?: string;
};

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  narrow: "page-inner-narrow",
  wide: "page-inner-wide",
  pricing: "page-inner-pricing",
};

/**
 * Jednotné odsazení a šířka obsahu — prémiový „editorial“ layout.
 */
export function PageShell({ children, variant = "narrow", className = "" }: Props) {
  return (
    <div className={`${variantClass[variant]} ${className}`.trim()}>{children}</div>
  );
}
