/** Meta Pixel jen pro rezervace.neurea.cz (landing). */
export const REZERVACE_META_PIXEL_ID = "1857806788241692";

/** Inline bootstrap stejný jako Meta Pixel Code (init + PageView). */
export const REZERVACE_META_PIXEL_BOOTSTRAP = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${REZERVACE_META_PIXEL_ID}');
fbq('track', 'PageView');
`.trim();

export function trackRezervaceMetaLead(): void {
  if (typeof window === "undefined") return;
  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }
}
