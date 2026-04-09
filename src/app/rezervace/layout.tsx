import type { ReactNode } from "react";
import { headers } from "next/headers";
import { isRezervaceLandingHost } from "@/lib/landingHost";
import { RezervaceLandingBodyClass } from "./RezervaceLandingBodyClass";

/** SEO / metadata: `page.tsx` (generateMetadata podle hostu), `dekujeme/page.tsx` atd. */

export default async function RezervaceLayout({ children }: { children: ReactNode }) {
  const h = await headers();
  const landing = isRezervaceLandingHost(h);

  return (
    <>
      {landing ? <RezervaceLandingBodyClass /> : null}
      {children}
    </>
  );
}
