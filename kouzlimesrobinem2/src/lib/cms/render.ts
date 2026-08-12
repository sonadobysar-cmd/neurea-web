import { escapeHtml } from "./escape";
import type { SiteContent } from "./types";

function esc(s: string): string {
  return escapeHtml(s);
}

function safeUrl(s: string): string {
  const v = s.trim();
  if (!v) return "";
  if (v.startsWith("/") && !v.startsWith("//")) return esc(v);
  try {
    const u = new URL(v);
    if (u.protocol === "https:" || u.protocol === "http:") return esc(u.toString());
  } catch {
    /* fall through */
  }
  return "";
}

function safeTel(s: string): string {
  const cleaned = s.replace(/[^\d+]/g, "");
  return esc(cleaned || s);
}

function safeMailto(s: string): string {
  const v = s.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "";
  return esc(v);
}

/** Booking widgets: Cal.com, Calendly, Google Appointment Schedules, TidyCal */
function safeBookingUrl(s: string): string {
  const v = s.trim();
  if (!v) return "";
  try {
    const u = new URL(v);
    if (u.protocol !== "https:") return "";
    const host = u.hostname.toLowerCase();
    const allowed =
      host === "cal.com" ||
      host.endsWith(".cal.com") ||
      host === "calendly.com" ||
      host.endsWith(".calendly.com") ||
      host === "calendar.google.com" ||
      host === "calendar.app.google" ||
      host.endsWith(".calendar.app.google") ||
      host === "tidycal.com" ||
      host.endsWith(".tidycal.com");
    return allowed ? esc(u.toString()) : "";
  } catch {
    return "";
  }
}

const SUIT_HREF: Record<string, string> = {
  h: "#s-h",
  d: "#s-d",
  s: "#s-s",
  c: "#s-c",
};
const RED_SUITS = new Set(["h", "d"]);

export function renderLuxuryBody(content: SiteContent, template: string): string {
  const c = content;
  const card = (i: number) => c.disciplines.cards[i];
  const nums = ["I.", "II.", "III.", "IV."];

  const galleryHtml = c.gallery.images
    .map((img) => {
      const wide = img.wide ? " wide" : "";
      return `<figure class="gph${wide}" data-lightbox><img src="${safeUrl(img.src)}" alt="${esc(img.alt)}"></figure>`;
    })
    .join("\n      ");

  const momentsHtml = (c.moments?.images ?? [])
    .map((img, i) => {
      const wide = img.wide ? " wide" : "";
      return `<figure class="mph${wide}" data-i="${i}" data-lightbox><img src="${safeUrl(img.src)}" alt="${esc(img.alt)}" loading="lazy"></figure>`;
    })
    .join("\n      ");

  const pricingTicketsHtml = c.pricing.tickets
    .map((ticket, index) => {
      const note = ticket.priceNote
        ? `<p class="tk-note">${esc(ticket.priceNote).replace(/\n/g, "<br>")}</p>`
        : "";
      return `<div class="ticket reveal d${Math.min(index + 1, 3)}">
        <div class="tk-main">
          <div class="tk-audience">
            <span class="tk-tag">${esc(ticket.audienceLabel)}</span>
            <h3>${esc(ticket.audience)}</h3>
          </div>
          <div class="tk-price-block tk-price-block--main">
            <span class="from">${esc(ticket.priceLabel)}</span>
            <div class="amt">${esc(ticket.priceAmount)} <small>${esc(ticket.priceCurrency)}</small></div>
            <span class="per">${esc(ticket.pricePer)}</span>
            ${note}
          </div>
        </div>
        <div class="tk-side">
          <div class="tk-price-row">
            <span class="from">${esc(ticket.travelLabel)}</span>
            <div class="amt amt-sm">${esc(ticket.travelAmount)} <small>${esc(ticket.travelUnit)}</small></div>
            <span class="per">${esc(ticket.travelPer)}</span>
            <p class="tk-side-note">${esc(ticket.travelNote)}</p>
          </div>
          <a class="btn btn-ink" href="#rezervace">Rezervovat termín<svg class="st"><use href="#star"/></svg></a>
        </div>
      </div>`;
    })
    .join("\n      ");

  const cardHtml = (i: number) => {
    const item = card(i);
    if (!item) return "";
    const back = item.back.map((li) => `<li>${esc(li)}</li>`).join("");
    const suit = item.suit && SUIT_HREF[item.suit] ? item.suit : "s";
    const red = RED_SUITS.has(suit) ? " red" : "";
    const suitHref = SUIT_HREF[suit];
    const corner = `<div class="idx${red}"><b>${esc(item.letter)}</b><svg class="suit" viewBox="0 0 24 24" aria-hidden="true"><use href="${suitHref}"/></svg></div>`;
    return `<article class="pcard" data-i="${i}" tabindex="0" role="button" aria-label="${esc(item.title)} — kliknutím otočíte kartu">
        <div class="pc-inner">
          <div class="pc-face">
            ${corner}
            <div class="ph"><img src="${safeUrl(item.image)}" alt="${esc(item.imageAlt)}"></div>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.text).replace(/\n/g, "<br>")}</p>
            <div class="idx flip${red}"><b>${esc(item.letter)}</b><svg class="suit" viewBox="0 0 24 24" aria-hidden="true"><use href="${suitHref}"/></svg></div>
          </div>
          <div class="pc-face pc-back">
            <svg class="st"><use href="#star"/></svg>
            <h4>${esc(item.title)}</h4>
            <ul>${back}</ul>
            <span class="flip-hint">Kliknutím otočíte zpět</span>
          </div>
        </div>
      </article>`;
  };

  const stepsHtml = c.program.steps
    .map((s, i) => {
      const delay = i === 0 ? "" : ` d${i}`;
      return `<div class="step reveal${delay}"><div class="rn">${nums[i] || `${i + 1}.`}</div><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></div>`;
    })
    .join("\n      ");

  let html = template;

  const replacements: Record<string, string> = {
    "{{cms.brand.name}}": esc(c.brand.name),
    "{{cms.brand.tagline}}": esc(c.brand.tagline),
    "{{cms.hero.eyebrow}}": esc(c.hero.eyebrow),
    "{{cms.hero.line1}}": esc(c.hero.line1),
    "{{cms.hero.line2Before}}": esc(c.hero.line2Before),
    "{{cms.hero.line2Em}}": esc(c.hero.line2Em),
    "{{cms.hero.line2After}}": esc(c.hero.line2After),
    "{{cms.hero.line3}}": esc(c.hero.line3),
    "{{cms.hero.lead}}": esc(c.hero.lead),
    "{{cms.hero.ctaPrimary}}": esc(c.hero.ctaPrimary),
    "{{cms.hero.ctaSecondary}}": esc(c.hero.ctaSecondary),
    "{{cms.hero.image}}": safeUrl(c.hero.image),
    "{{cms.hero.imageAlt}}": esc(c.hero.imageAlt),
    "{{cms.hero.seal}}": esc(c.hero.seal),
    "{{cms.disciplines.eyebrow}}": esc(c.disciplines.eyebrow),
    "{{cms.disciplines.titleBefore}}": esc(c.disciplines.titleBefore),
    "{{cms.disciplines.titleEm}}": esc(c.disciplines.titleEm),
    "{{cms.disciplines.lead}}": esc(c.disciplines.lead),
    "{{cms.disciplines.cards}}": [cardHtml(0), cardHtml(1), cardHtml(2)].join("\n      "),
    "{{cms.program.eyebrow}}": esc(c.program.eyebrow),
    "{{cms.program.titleBefore}}": esc(c.program.titleBefore),
    "{{cms.program.titleEm}}": esc(c.program.titleEm),
    "{{cms.program.lead}}": esc(c.program.lead),
    "{{cms.program.steps}}": stepsHtml,
    "{{cms.gallery.eyebrow}}": esc(c.gallery.eyebrow),
    "{{cms.gallery.titleBefore}}": esc(c.gallery.titleBefore),
    "{{cms.gallery.titleEm}}": esc(c.gallery.titleEm),
    "{{cms.gallery.images}}": galleryHtml,
    "{{cms.moments.titleBefore}}": esc(c.moments?.titleBefore ?? ""),
    "{{cms.moments.titleEm}}": esc(c.moments?.titleEm ?? ""),
    "{{cms.moments.lead}}": esc(c.moments?.lead ?? ""),
    "{{cms.moments.images}}": momentsHtml,
    "{{cms.quote.eyebrow}}": esc(c.quote.eyebrow),
    "{{cms.quote.text}}": esc(c.quote.text),
    "{{cms.quote.caption}}": esc(c.quote.caption),
    "{{cms.pricing.eyebrow}}": esc(c.pricing.eyebrow),
    "{{cms.pricing.titleBefore}}": esc(c.pricing.titleBefore),
    "{{cms.pricing.titleEm}}": esc(c.pricing.titleEm),
    "{{cms.pricing.lead}}": esc(c.pricing.lead),
    "{{cms.pricing.tickets}}": pricingTicketsHtml,
    "{{cms.about.eyebrow}}": esc(c.about.eyebrow),
    "{{cms.about.titleBefore}}": esc(c.about.titleBefore),
    "{{cms.about.titleEm}}": esc(c.about.titleEm),
    "{{cms.about.lead1}}": esc(c.about.lead1),
    "{{cms.about.lead2}}": esc(c.about.lead2),
    "{{cms.about.signature}}": esc(c.about.signature),
    "{{cms.about.image}}": safeUrl(c.about.image),
    "{{cms.about.imageAlt}}": esc(c.about.imageAlt),
    "{{cms.contact.eyebrow}}": esc(c.contact.eyebrow),
    "{{cms.contact.titleBefore}}": esc(c.contact.titleBefore),
    "{{cms.contact.titleEm}}": esc(c.contact.titleEm),
    "{{cms.contact.phoneDisplay}}": esc(c.contact.phoneDisplay),
    "{{cms.contact.phoneHref}}": safeTel(c.contact.phoneHref),
    "{{cms.contact.email}}": safeMailto(c.contact.email),
    "{{cms.contact.thanks}}": esc(c.contact.thanks),
    "{{cms.contact.bookingUrl}}": safeBookingUrl(c.contact.bookingUrl ?? ""),
    "{{cms.footer.copy}}": esc(c.footer.copy),
  };

  const bookingUrl = safeBookingUrl(c.contact.bookingUrl ?? "");
  replacements["{{cms.contact.bookingEmbed}}"] = bookingUrl
    ? `<iframe class="booking-frame" src="${bookingUrl}" title="Rezervace termínu" loading="lazy" allow="fullscreen"></iframe>`
    : "";
  replacements["{{cms.contact.bookingSecClass}}"] = bookingUrl ? "" : " is-empty";

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  return html;
}
