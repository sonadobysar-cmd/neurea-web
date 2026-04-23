/** Meta Pixel jen pro rezervace.neurea.cz (landing). */
export const REZERVACE_META_PIXEL_ID = "1286461769591154";

/** Volitelně: kód z Events Manager → Testovací události (NEXT_PUBLIC_ = viditelné v bundlu). */
function metaPixelInitSuffix(): string {
  const code = process.env.NEXT_PUBLIC_META_PIXEL_TEST_EVENT_CODE?.trim();
  if (!code) return "";
  return `, {}, { test_event_code: ${JSON.stringify(code)} }`;
}

/** Inline bootstrap jako Meta Pixel Code (init + PageView). */
export function getRezervaceMetaPixelBootstrap(): string {
  const initSuffix = metaPixelInitSuffix();
  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${REZERVACE_META_PIXEL_ID}'${initSuffix});
fbq('track', 'PageView');
`.trim();
}

/** `fbq('track', 'Lead')` po úspěšném odeslání lead formuláře; krátký retry když se pixel ještě dobinduje. */
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

  requestAnimationFrame(() => {
    if (fire()) return;
    window.setTimeout(() => {
      fire();
    }, 750);
  });
}
