import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { ReviewsRatingSummary } from "@/components/ReviewsRatingSummary";
import { showcaseReviews } from "@/data/showcase-reviews";
import { isLocale, type Locale } from "@/lib/locales";
import { listReviews } from "@/lib/store";

const PROFILE_URL = "https://www.znamylekar.cz/profil/samer-asad";

const reviewCta: Record<Locale, { title: string; text: string; button: string }> = {
  cs: {
    title: "Podělte se o svou zkušenost",
    text: "Hodnocení sbíráme na ověřeném profilu ZnámyLékař, kde je mohou bezpečně najít i další pacientky.",
    button: "Napsat ověřené hodnocení",
  },
  en: {
    title: "Share your experience",
    text: "Reviews are collected on the verified ZnámyLékař profile, where other patients can find them safely.",
    button: "Write a verified review",
  },
  de: {
    title: "Teilen Sie Ihre Erfahrung",
    text: "Bewertungen sammeln wir im verifizierten ZnámyLékař-Profil, wo andere Patientinnen sie sicher finden können.",
    button: "Verifizierte Bewertung schreiben",
  },
  it: {
    title: "Condividi la tua esperienza",
    text: "Le recensioni vengono raccolte sul profilo verificato ZnámyLékař, dove altre pazienti possono trovarle in sicurezza.",
    button: "Scrivi una recensione verificata",
  },
  ar: {
    title: "شاركي تجربتك",
    text: "نجمع التقييمات في ملف ZnámyLékař الموثق حتى تتمكن المريضات الأخريات من العثور عليها بأمان.",
    button: "كتابة تقييم موثق",
  },
};

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const cta = reviewCta[locale];
  const approved = await listReviews({ status: "approved" });
  const items =
    approved.length > 0
      ? approved.map((r) => ({
          id: r.id,
          name: r.name,
          text: r.text,
          rating: r.rating,
          date: "",
        }))
      : showcaseReviews.map((r, i) => ({
          id: `zl-${i}`,
          name: r.name,
          text: r.text,
          rating: 5,
          date: r.date,
        }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.reviews.eyebrow}</span>
            <h1>{dict.reviews.title}</h1>
            <p className="lead">{dict.reviews.lead}</p>
            <ReviewsRatingSummary dict={dict} />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
          <div className="reviews-grid-home">
            {items.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.05}>
                <blockquote className="review-card-home">
                  <div className="stars">{"★".repeat(r.rating)}</div>
                  <p>“{r.text}”</p>
                  <footer>
                    <cite>{r.name}</cite>
                    {r.date ? <span>{r.date}</span> : null}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="form-card" style={{ maxWidth: 720 }}>
              <h2
                className="display"
                style={{ fontSize: "2rem", marginTop: 0, color: "var(--rose-ink)" }}
              >
                {cta.title}
              </h2>
              <p className="lead" style={{ marginBottom: "1.5rem" }}>
                {cta.text}
              </p>
              <a
                className="btn btn-primary"
                href={PROFILE_URL}
                target="_blank"
                rel="noreferrer"
              >
                {cta.button}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
