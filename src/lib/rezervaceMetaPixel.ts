/** Meta Pixel jen pro rezervace.neurea.cz (landing). */
export const REZERVACE_META_PIXEL_ID = "1286461769591154";

/** Volitelně: kód z Events Manager → Testovací události. */
function metaPixelInitSuffix(): string {
  const code = process.env.NEXT_PUBLIC_META_PIXEL_TEST_EVENT_CODE?.trim();
  if (!code) return "";
  return `,{},${JSON.stringify({ test_event_code: code })}`;
}

/**
 * Oficiální Meta Pixel bootstrap (jeden řádek jako v Meta Pixel Code).
 */
export function getRezervaceMetaPixelBootstrap(): string {
  const initSuffix = metaPixelInitSuffix();
  return (
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
    "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    `fbq('init','${REZERVACE_META_PIXEL_ID}'${initSuffix});fbq('track','PageView');`
  );
}

/** Záložní GET hit (bez JS API) — Meta často započítá aspoň základní událost. */
export function metaPixelBeacon(ev: "PageView" | "Lead"): void {
  if (typeof window === "undefined") return;
  const id = REZERVACE_META_PIXEL_ID;
  const test = process.env.NEXT_PUBLIC_META_PIXEL_TEST_EVENT_CODE?.trim();
  const u = new URL("https://www.facebook.com/tr");
  u.searchParams.set("id", id);
  u.searchParams.set("ev", ev);
  u.searchParams.set("dl", window.location.href);
  if (document.referrer) u.searchParams.set("rl", document.referrer);
  u.searchParams.set("if", "false");
  u.searchParams.set("ts", String(Date.now()));
  u.searchParams.set("rnd", String(Math.random()));
  if (test) u.searchParams.set("test_event_code", test);
  const img = new Image(1, 1);
  img.referrerPolicy = "no-referrer-when-downgrade";
  img.src = u.toString();
}

/** Po úspěšném leadu: `fbq('track','Lead')`, případně záložní beacon. */
export function trackRezervaceMetaLead(): void {
  if (typeof window === "undefined") return;
  const test = process.env.NEXT_PUBLIC_META_PIXEL_TEST_EVENT_CODE?.trim();

  const fire = (): boolean => {
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return false;
    if (test) {
      fbq("track", "Lead", {}, { test_event_code: test });
    } else {
      fbq("track", "Lead");
    }
    return true;
  };

  if (fire()) return;

  const delaysMs = [50, 200, 800, 2000, 5000] as const;
  let idx = 0;

  const schedule = () => {
    if (fire()) return;
    if (idx >= delaysMs.length) {
      metaPixelBeacon("Lead");
      return;
    }
    const wait = delaysMs[idx]!;
    idx += 1;
    window.setTimeout(() => {
      if (fire()) return;
      schedule();
    }, wait);
  };

  requestAnimationFrame(() => {
    if (fire()) return;
    schedule();
  });
}
