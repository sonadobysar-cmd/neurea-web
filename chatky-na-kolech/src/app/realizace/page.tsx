import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { SiteNav } from "@/components/SiteNav";
import { realizations } from "@/data/content";

export const metadata: Metadata = {
  title: "Realizace tiny houses na kolech",
  description:
    "Prohlédněte si realizované tiny houses na kolech — exteriéry, interiéry, ploché i kulaté střechy pro bydlení, Airbnb a glamping.",
  alternates: { canonical: "/realizace" },
  openGraph: {
    title: "Realizace tiny houses na kolech · Chatky na kolech",
    description:
      "Skutečné tiny houses z naší dílny — exteriéry, interiéry, kulaté i ploché střechy. Každý s koly.",
    url: "/realizace",
    images: [{ url: "/media/realizace/tiny-12x4.jpg", width: 1600, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Realizace tiny houses na kolech",
    images: ["/media/realizace/tiny-12x4.jpg"],
  },
};

export default function RealizacePage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Důkaz</p>
          <h1>Realizace tiny houses na kolech</h1>
          <p>
            Každý tiny house vzniká pro jiného člověka, jiné místo a jiný způsob
            využití. Prohlédněte si skutečné domy z naší dílny — každý je
            originál.
          </p>
        </div>
      </header>

      <section className="section section-paper">
        <div className="wrap">
          <div className="gallery">
            {realizations.map((r, i) => {
              const span = i === 0;
              const tall = i === 3 || i === 5;
              return (
                <figure
                  key={r.id}
                  className={`gallery-item reveal${span ? " span-2" : ""}${
                    tall ? " tall" : ""
                  }`}
                >
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes={span ? "100vw" : "(max-width:700px) 100vw, 50vw"}
                  />
                  <figcaption>
                    <div>
                      <h3>{r.title}</h3>
                      <span>
                        {r.place} · {r.year}
                      </span>
                    </div>
                    <span>{r.tag}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-3" style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                marginBottom: "1.25rem",
              }}
            >
              Chcete tu být příště vy?
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <Link href="/konfigurator" className="btn btn-ink btn-arrow">
                Spočítat svůj dům
                <ArrowIcon />
              </Link>
              <Link href="/#kontakt" className="btn btn-ghost">
                Poptat konzultaci
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
