import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import {
  priceCategories,
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
  const pricedById = new Map(pricedServices.map((service) => [service.id, service]));

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

      <section className="section services-catalog-section" style={{ paddingTop: 0 }}>
        <div className="container services-catalog-grid">
          {dict.services.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <article
                className={`service-detail-card service-detail-card-${i + 1}`}
                id={item.id}
              >
                <div className="service-detail-topline">
                  <span>0{i + 1}</span>
                  <span>{dict.services.eyebrow}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={`/${locale}/booking`} className="service-detail-link">
                  {dict.nav.book} <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
          <Reveal className="services-price-jump-wrap" delay={0.12}>
            <Link href="#pricing" className="services-price-jump">
              <span className="eyebrow eyebrow-on-dark">{dict.pricing.eyebrow}</span>
              <div>
                <h3>{dict.pricing.title}</h3>
                <p>{dict.pricing.lead}</p>
              </div>
              <span aria-hidden="true">↓</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft" id="pricing">
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

          <div className="pricing-category-grid">
            {priceCategories.map((category, i) => (
              <Reveal key={category.id} delay={i * 0.06}>
                <article className="pricing-category-card">
                  <header>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{category.title[locale]}</h3>
                      <p>{category.description[locale]}</p>
                    </div>
                  </header>
                  <div className="pricing-category-list">
                    {category.serviceIds.map((id) => {
                      const service = pricedById.get(id);
                      if (!service) return null;

                      return (
                        <div className="pricing-category-row" key={service.id}>
                          <span>{service.name[locale]}</span>
                          <strong>{service.price ?? dict.pricing.onRequest}</strong>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="price-notes price-notes-panel">
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
