"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function isPrivateUrl(url: string): boolean {
  try {
    return new URL(url).pathname.startsWith("/admin");
  } catch {
    return true;
  }
}

export function Observability() {
  return (
    <>
      <Analytics
        beforeSend={(event: BeforeSendEvent) =>
          isPrivateUrl(event.url) ? null : event
        }
      />
      <SpeedInsights
        beforeSend={(event) => (isPrivateUrl(event.url) ? null : event)}
      />
    </>
  );
}
