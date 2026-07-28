import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
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
        <div className="container" style={{ marginTop: "2.5rem" }}>
          <Reveal>
            <Link href={`/${locale}/booking`} className="btn btn-primary">
              {dict.nav.book}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
