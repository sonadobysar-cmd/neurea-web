import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
};

/** Orientační mapa Brno centrum — po doplnění adresy nahraďte markerem na přesné souřadnice. */
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=16.566%2C49.180%2C16.630%2C49.230&layer=mapnik&marker=49.1951%2C16.6068";

export default function KontaktPage() {
  return (
    <PageShell>
      <p className="eyebrow">Spojení</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Kontakt
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        {site.locations.brno}
        <br />
        {site.locations.praha}
      </p>

      <div className="mt-10 glass-panel-strong p-8 md:p-9">
        <p className="text-[15px] text-ink/72">
          E-mail:{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-gold transition hover:underline">
            {site.email}
          </a>
        </p>
        {site.phone && (
          <p className="mt-4 text-[15px] text-ink/72">
            Telefon:{" "}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="font-medium text-gold transition hover:underline"
            >
              {site.phone}
            </a>
          </p>
        )}
        <p className="mt-4 text-xs text-ink/45">
          IČO {site.ico} · {site.operator}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-normal text-ink">Ordinační hodiny</h2>
        <ul className="mt-6 space-y-0 text-sm text-ink/75">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between gap-4 border-b border-ink/[0.07] py-3">
              <span>{h.day}</span>
              <span className="text-ink/55">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-white/60 bg-fog/40 shadow-luxury">
        <iframe
          title="Mapa — Brno (orientační)"
          src={MAP_EMBED_SRC}
          className="h-64 w-full border-0 md:h-80"
          loading="lazy"
        />
        <p className="border-t border-ink/[0.06] bg-white/40 px-4 py-3 text-xs text-ink/45">
          Mapa je orientační (centrum Brna). Po doplnění přesné adresy kliniky marker upravíme.
        </p>
      </div>
    </PageShell>
  );
}
