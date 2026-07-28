import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import {
  priceNotes,
  pricedServices,
} from "@/data/clinic-catalog";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const notes = priceNotes[locale];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.services.eyebrow}</span>
            <h1>{dict.services.title}</h1>
            <p className="lead">{dict.services.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container service-grid">
          {dict.services.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <article className="service-card">
                <div className="num">0{i + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.pricing.eyebrow}</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "var(--rose-ink)",
                margin: "0.35rem 0 0.85rem",
              }}
            >
              {dict.pricing.title}
            </h2>
            <p className="lead" style={{ maxWidth: "42rem" }}>
              {dict.pricing.lead}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="price-table-wrap">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>{dict.services.eyebrow}</th>
                    <th>{dict.pricing.priceCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricedServices.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name[locale]}</td>
                      <td>
                        {s.price ?? dict.pricing.onRequest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="price-notes">
              <h3>{dict.pricing.notesTitle}</h3>
              <ul>
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p className="source-note">{dict.pricing.sourceNote}</p>
            </div>
          </Reveal>

          <div style={{ marginTop: "2rem" }}>
            <Reveal>
              <Link href={`/${locale}/booking`} className="btn btn-primary">
                {dict.nav.book}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
