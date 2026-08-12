"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent, LegalPageContent } from "@/lib/cms/types";
import type { AnalyticsDashboard } from "@/lib/analytics/types";
import type { BookingDashboard } from "@/lib/bookings/types";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminBookings } from "./AdminBookings";
import { AdminPasswordForm } from "./AdminPasswordForm";

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nahrání selhalo.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nahrání selhalo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-image">
      <Field label={label + " (URL)"} value={value} onChange={onChange} />
      <div className="admin-image-row">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <div className="admin-image-empty">Bez náhledu</div>
        )}
        <label className="admin-upload">
          {uploading ? "Nahrávám…" : "Nahrát fotku"}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
    </div>
  );
}

function LegalPageEditor({
  title,
  page,
  previewHref,
  onChange,
}: {
  title: string;
  page: LegalPageContent;
  previewHref: string;
  onChange: (page: LegalPageContent) => void;
}) {
  return (
    <div className="admin-legal-block">
      <div className="admin-legal-head">
        <h3>{title}</h3>
        <a href={previewHref} target="_blank" rel="noreferrer">
          Náhled ↗
        </a>
      </div>
      <div className="admin-grid">
        <Field label="Nadpis stránky" value={page.title} onChange={(v) => onChange({ ...page, title: v })} />
        <Field label="Poznámka dole (aktualizováno)" value={page.updated} onChange={(v) => onChange({ ...page, updated: v })} />
      </div>
      <Field label="Úvodní text" value={page.lead} onChange={(v) => onChange({ ...page, lead: v })} multiline />
      <p className="admin-help">
        U každé sekce: odstavce oddělte prázdným řádkem. Odrážky pište na samostatné řádky začínající „- “.
        V obchodních podmínkách lze vložit odkaz na GDPR pomocí{" "}
        <code>{"{{privacy-link}}"}</code>.
      </p>
      {page.sections.map((section, i) => (
        <div className="admin-card-block" key={`${section.heading}-${i}`}>
          <Field
            label={`Sekce ${i + 1} — nadpis`}
            value={section.heading}
            onChange={(v) => {
              const sections = [...page.sections];
              sections[i] = { ...section, heading: v };
              onChange({ ...page, sections });
            }}
          />
          <Field
            label="Obsah sekce"
            value={section.body}
            multiline
            onChange={(v) => {
              const sections = [...page.sections];
              sections[i] = { ...section, body: v };
              onChange({ ...page, sections });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function AdminEditor({
  initial,
  analytics,
  bookings,
  turnstileConfigured,
}: {
  initial: SiteContent;
  analytics: AnalyticsDashboard;
  bookings: BookingDashboard;
  turnstileConfigured: boolean;
}) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const marqueeText = useMemo(() => content.marquee.join("\n"), [content.marquee]);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/cms/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Uložení selhalo.");
      setStatus(
        data.storage === "blob"
          ? "Uloženo. Změny jsou hned na webu."
          : "Uloženo lokálně. Na Vercelu nastavte BLOB_READ_WRITE_TOKEN pro trvalé ukládání.",
      );
      router.refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Uložení selhalo.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <h1>Úpravy webu</h1>
          <p>Texty, ceny, kontakt a fotky. Po uložení se web hned aktualizuje.</p>
        </div>
        <div className="admin-top-actions">
          <a href="/" target="_blank" rel="noreferrer">
            Otevřít web
          </a>
          <button type="button" className="admin-ghost" onClick={logout}>
            Odhlásit
          </button>
          <button type="submit" form="admin-content-form" disabled={saving}>
            {saving ? "Ukládám…" : "Uložit změny"}
          </button>
        </div>
      </header>

      {status ? <p className="admin-status">{status}</p> : null}

      {!turnstileConfigured ? (
        <div className="admin-booking-warning" role="alert">
          Cloudflare Turnstile nemá produkční klíče. Kontaktní i rezervační formulář zůstávají bezpečně vypnuté, dokud se klíče nedoplní.
        </div>
      ) : null}

      <AdminBookings initial={bookings} />

      <AdminPasswordForm />

      <AdminAnalytics dashboard={analytics} />

      <form id="admin-content-form" className="admin-content-form" onSubmit={onSave}>
      <section className="admin-section">
        <h2>Značka</h2>
        <div className="admin-grid">
          <Field label="Název" value={content.brand.name} onChange={(v) => patch("brand", { ...content.brand, name: v })} />
          <Field label="Podtitulek" value={content.brand.tagline} onChange={(v) => patch("brand", { ...content.brand, tagline: v })} />
        </div>
      </section>

      <section className="admin-section">
        <h2>Hero</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => patch("hero", { ...content.hero, eyebrow: v })} />
          <Field label="Řádek 1" value={content.hero.line1} onChange={(v) => patch("hero", { ...content.hero, line1: v })} />
          <Field label="Zvýrazněné slovo" value={content.hero.line2Em} onChange={(v) => patch("hero", { ...content.hero, line2Em: v })} />
          <Field label="Text za zvýrazněním" value={content.hero.line2After} onChange={(v) => patch("hero", { ...content.hero, line2After: v })} />
          <Field label="Řádek 3" value={content.hero.line3} onChange={(v) => patch("hero", { ...content.hero, line3: v })} />
          <Field label="CTA 1" value={content.hero.ctaPrimary} onChange={(v) => patch("hero", { ...content.hero, ctaPrimary: v })} />
          <Field label="CTA 2" value={content.hero.ctaSecondary} onChange={(v) => patch("hero", { ...content.hero, ctaSecondary: v })} />
          <Field label="Pečeť u fotky" value={content.hero.seal} onChange={(v) => patch("hero", { ...content.hero, seal: v })} />
        </div>
        <Field label="Popis" value={content.hero.lead} onChange={(v) => patch("hero", { ...content.hero, lead: v })} multiline />
        <ImageField label="Hero fotka" value={content.hero.image} onChange={(v) => patch("hero", { ...content.hero, image: v })} />
        <Field label="Alt text fotky" value={content.hero.imageAlt} onChange={(v) => patch("hero", { ...content.hero, imageAlt: v })} />
      </section>

      <section className="admin-section">
        <h2>Marquee (běžící text)</h2>
        <Field
          label="Položky — každá na nový řádek"
          value={marqueeText}
          multiline
          onChange={(v) =>
            patch(
              "marquee",
              v
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </section>

      <section className="admin-section">
        <h2>Tři disciplíny</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.disciplines.eyebrow} onChange={(v) => patch("disciplines", { ...content.disciplines, eyebrow: v })} />
          <Field label="Nadpis před" value={content.disciplines.titleBefore} onChange={(v) => patch("disciplines", { ...content.disciplines, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.disciplines.titleEm} onChange={(v) => patch("disciplines", { ...content.disciplines, titleEm: v })} />
        </div>
        <Field label="Lead" value={content.disciplines.lead} onChange={(v) => patch("disciplines", { ...content.disciplines, lead: v })} multiline />
        {content.disciplines.cards.map((card, i) => (
          <div className="admin-card-block" key={i}>
            <h3>Karta {i + 1}</h3>
            <div className="admin-grid">
              <Field
                label="Hodnota (A/J/Q/K)"
                value={card.letter}
                onChange={(v) => {
                  const cards = [...content.disciplines.cards];
                  cards[i] = { ...card, letter: v };
                  patch("disciplines", { ...content.disciplines, cards });
                }}
              />
              <Field
                label="Barva (s/h/d/c)"
                value={card.suit || "s"}
                onChange={(v) => {
                  const suit = (["h", "d", "s", "c"].includes(v) ? v : "s") as "h" | "d" | "s" | "c";
                  const cards = [...content.disciplines.cards];
                  cards[i] = { ...card, suit };
                  patch("disciplines", { ...content.disciplines, cards });
                }}
              />
              <Field
                label="Název"
                value={card.title}
                onChange={(v) => {
                  const cards = [...content.disciplines.cards];
                  cards[i] = { ...card, title: v };
                  patch("disciplines", { ...content.disciplines, cards });
                }}
              />
            </div>
            <Field
              label="Text"
              value={card.text}
              multiline
              onChange={(v) => {
                const cards = [...content.disciplines.cards];
                cards[i] = { ...card, text: v };
                patch("disciplines", { ...content.disciplines, cards });
              }}
            />
            <Field
              label="Rub karty (řádky)"
              value={card.back.join("\n")}
              multiline
              onChange={(v) => {
                const cards = [...content.disciplines.cards];
                cards[i] = {
                  ...card,
                  back: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                };
                patch("disciplines", { ...content.disciplines, cards });
              }}
            />
            <ImageField
              label="Fotka"
              value={card.image}
              onChange={(v) => {
                const cards = [...content.disciplines.cards];
                cards[i] = { ...card, image: v };
                patch("disciplines", { ...content.disciplines, cards });
              }}
            />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Galerie</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.gallery.eyebrow} onChange={(v) => patch("gallery", { ...content.gallery, eyebrow: v })} />
          <Field label="Nadpis před" value={content.gallery.titleBefore} onChange={(v) => patch("gallery", { ...content.gallery, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.gallery.titleEm} onChange={(v) => patch("gallery", { ...content.gallery, titleEm: v })} />
        </div>
        {content.gallery.images.map((img, i) => (
          <div className="admin-card-block" key={i}>
            <h3>Fotka {i + 1}</h3>
            <ImageField
              label="Obrázek"
              value={img.src}
              onChange={(v) => {
                const images = [...content.gallery.images];
                images[i] = { ...img, src: v };
                patch("gallery", { ...content.gallery, images });
              }}
            />
            <Field
              label="Alt text"
              value={img.alt}
              onChange={(v) => {
                const images = [...content.gallery.images];
                images[i] = { ...img, alt: v };
                patch("gallery", { ...content.gallery, images });
              }}
            />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Z vystoupení (fotky od klientů)</h2>
        <div className="admin-grid">
          <Field label="Nadpis před" value={content.moments.titleBefore} onChange={(v) => patch("moments", { ...content.moments, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.moments.titleEm} onChange={(v) => patch("moments", { ...content.moments, titleEm: v })} />
        </div>
        <Field label="Lead" value={content.moments.lead} onChange={(v) => patch("moments", { ...content.moments, lead: v })} multiline />
        {content.moments.images.map((img, i) => (
          <div className="admin-card-block" key={i}>
            <h3>Fotka {i + 1}</h3>
            <ImageField
              label="Obrázek"
              value={img.src}
              onChange={(v) => {
                const images = [...content.moments.images];
                images[i] = { ...img, src: v };
                patch("moments", { ...content.moments, images });
              }}
            />
            <Field
              label="Alt text"
              value={img.alt}
              onChange={(v) => {
                const images = [...content.moments.images];
                images[i] = { ...img, alt: v };
                patch("moments", { ...content.moments, images });
              }}
            />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Citát</h2>
        <Field label="Eyebrow" value={content.quote.eyebrow} onChange={(v) => patch("quote", { ...content.quote, eyebrow: v })} />
        <Field label="Citát" value={content.quote.text} onChange={(v) => patch("quote", { ...content.quote, text: v })} multiline />
        <Field label="Podpis" value={content.quote.caption} onChange={(v) => patch("quote", { ...content.quote, caption: v })} />
      </section>

      <section className="admin-section">
        <h2>Ceník</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.pricing.eyebrow} onChange={(v) => patch("pricing", { ...content.pricing, eyebrow: v })} />
          <Field label="Nadpis před" value={content.pricing.titleBefore} onChange={(v) => patch("pricing", { ...content.pricing, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.pricing.titleEm} onChange={(v) => patch("pricing", { ...content.pricing, titleEm: v })} />
        </div>
        <Field label="Textace u ceníku" value={content.pricing.lead} onChange={(v) => patch("pricing", { ...content.pricing, lead: v })} multiline />
        {content.pricing.tickets.map((ticket, i) => (
          <div className="admin-card-block" key={i}>
            <h3>Vstupenka {i + 1}</h3>
            <div className="admin-grid">
              <Field label="Platná pro — popisek" value={ticket.audienceLabel} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, audienceLabel: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Platná pro" value={ticket.audience} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, audience: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Cena — popisek" value={ticket.priceLabel} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, priceLabel: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Cena — částka" value={ticket.priceAmount} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, priceAmount: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Měna" value={ticket.priceCurrency} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, priceCurrency: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Pod cenou" value={ticket.pricePer} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, pricePer: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Doprava — popisek" value={ticket.travelLabel} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, travelLabel: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Doprava — částka" value={ticket.travelAmount} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, travelAmount: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Jednotka dopravy" value={ticket.travelUnit} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, travelUnit: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
              <Field label="Popis dopravy" value={ticket.travelPer} onChange={(v) => {
                const tickets = [...content.pricing.tickets];
                tickets[i] = { ...ticket, travelPer: v };
                patch("pricing", { ...content.pricing, tickets });
              }} />
            </div>
            <Field label="Poznámka k ceně" value={ticket.priceNote} onChange={(v) => {
              const tickets = [...content.pricing.tickets];
              tickets[i] = { ...ticket, priceNote: v };
              patch("pricing", { ...content.pricing, tickets });
            }} multiline />
            <Field label="Poznámka k dopravě" value={ticket.travelNote} onChange={(v) => {
              const tickets = [...content.pricing.tickets];
              tickets[i] = { ...ticket, travelNote: v };
              patch("pricing", { ...content.pricing, tickets });
            }} multiline />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>O Robinovi</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.about.eyebrow} onChange={(v) => patch("about", { ...content.about, eyebrow: v })} />
          <Field label="Nadpis před" value={content.about.titleBefore} onChange={(v) => patch("about", { ...content.about, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.about.titleEm} onChange={(v) => patch("about", { ...content.about, titleEm: v })} />
          <Field label="Podpis" value={content.about.signature} onChange={(v) => patch("about", { ...content.about, signature: v })} />
        </div>
        <Field label="Odstavec 1" value={content.about.lead1} onChange={(v) => patch("about", { ...content.about, lead1: v })} multiline />
        <Field label="Odstavec 2" value={content.about.lead2} onChange={(v) => patch("about", { ...content.about, lead2: v })} multiline />
        <ImageField label="Fotka" value={content.about.image} onChange={(v) => patch("about", { ...content.about, image: v })} />
      </section>

      <section className="admin-section">
        <h2>Kontakt</h2>
        <div className="admin-grid">
          <Field label="Eyebrow" value={content.contact.eyebrow} onChange={(v) => patch("contact", { ...content.contact, eyebrow: v })} />
          <Field label="Nadpis před" value={content.contact.titleBefore} onChange={(v) => patch("contact", { ...content.contact, titleBefore: v })} />
          <Field label="Zvýraznění" value={content.contact.titleEm} onChange={(v) => patch("contact", { ...content.contact, titleEm: v })} />
          <Field label="Telefon (zobrazení)" value={content.contact.phoneDisplay} onChange={(v) => patch("contact", { ...content.contact, phoneDisplay: v })} />
          <Field label="Telefon (odkaz, např. +420…)" value={content.contact.phoneHref} onChange={(v) => patch("contact", { ...content.contact, phoneHref: v })} />
          <Field label="E-mail" value={content.contact.email} onChange={(v) => patch("contact", { ...content.contact, email: v })} />
        </div>
        <Field label="Děkovací text" value={content.contact.thanks} onChange={(v) => patch("contact", { ...content.contact, thanks: v })} multiline />
        <p className="admin-help">
          Rezervace, jejich schválení a blokace vlastních termínů jsou nahoře v sekci „Rezervace a kalendář“.
        </p>
      </section>

      <section className="admin-section">
        <h2>Patička</h2>
        <Field label="Copyright" value={content.footer.copy} onChange={(v) => patch("footer", { ...content.footer, copy: v })} />
      </section>

      <section className="admin-section">
        <h2>Obchodní podmínky</h2>
        <LegalPageEditor
          title="Obchodní podmínky"
          page={content.legal.terms}
          previewHref="/obchodni-podminky"
          onChange={(terms) => patch("legal", { ...content.legal, terms })}
        />
      </section>

      <section className="admin-section">
        <h2>Ochrana osobních údajů (GDPR)</h2>
        <LegalPageEditor
          title="GDPR"
          page={content.legal.privacy}
          previewHref="/ochrana-udaju"
          onChange={(privacy) => patch("legal", { ...content.legal, privacy })}
        />
      </section>

      <div className="admin-bottom">
        <button type="submit" disabled={saving}>
          {saving ? "Ukládám…" : "Uložit změny"}
        </button>
      </div>
      </form>
    </div>
  );
}
