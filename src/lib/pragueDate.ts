/**
 * Kalendářní datum v časové zóně Europe/Prague (YYYY-MM-DD).
 * Bez závislosti na date-fns — vhodné pro připomínky „zítra“.
 */

const PRAGUE = "Europe/Prague";

function getYmdInPrague(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAGUE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return `${y}-${m}-${d}`;
}

/**
 * Zítra podle kalendáře v Praze (zohlední DST — hledá první jiné YMD než „dnes“).
 */
export function getTomorrowYmdPrague(now: Date = new Date()): string {
  const today = getYmdInPrague(now);
  let t = now.getTime() + 60 * 60 * 1000;
  const limit = now.getTime() + 72 * 60 * 60 * 1000;
  while (t < limit) {
    const ymd = getYmdInPrague(new Date(t));
    if (ymd !== today) return ymd;
    t += 60 * 60 * 1000;
  }
  return getYmdInPrague(new Date(now.getTime() + 36 * 60 * 60 * 1000));
}
