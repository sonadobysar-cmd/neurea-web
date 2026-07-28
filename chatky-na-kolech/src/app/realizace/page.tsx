import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { SiteNav } from "@/components/SiteNav";
import { realizations } from "@/data/content";

export const metadata: Metadata = {
  title: "Realizace",
  description:
    "Tiny houses Chatky na kolech — bydlení, Airbnb i kempy. Ukázky atmosféry a připravované projekty.",
};

export default function RealizacePage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Důkaz</p>
          <h1>Realizace</h1>
          <p>
            Skutečné domy z naší dílny — exteriéry na louce, interiéry ze smrku,
            kulaté střechy i flat box. Každý s koly.
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
                    alt={r.title}
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
                Domluvit hovor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
