import { LuxuryLanding } from "@/components/LuxuryLanding";
import { renderLuxuryBody } from "@/lib/cms/render";
import { readSiteContent } from "@/lib/cms/store";
import { luxuryBodyTemplate } from "@/lib/luxuryBody";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await readSiteContent();
  const html = renderLuxuryBody(content, luxuryBodyTemplate);

  return <LuxuryLanding html={html} marquee={content.marquee} />;
}
