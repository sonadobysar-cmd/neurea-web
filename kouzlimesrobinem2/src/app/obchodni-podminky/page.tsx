import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";
import { readSiteContent } from "@/lib/cms/store";
import "../ochrana-udaju/privacy.css";

export const metadata: Metadata = {
  title: "Obchodní podmínky | Kouzlíme s Robinem",
  description:
    "Obchodní podmínky pro objednání vystoupení Kouzlíme s Robinem — Robin Panuš.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const content = await readSiteContent();
  return <LegalPageView page={content.legal.terms} />;
}
