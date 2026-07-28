import Link from "next/link";
import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{dict.brand.name}</h3>
          <p>{dict.footer.mission}</p>
        </div>
        <div>
          <h3>{dict.nav.contact}</h3>
          <ul>
            <li>{dict.contact.address}</li>
            <li>
              <a href={`mailto:${dict.contact.email}`}>{dict.contact.email}</a>
            </li>
            <li>
              <a href="tel:+420734421860">{dict.contact.phone}</a>
            </li>
            <li>
              <a href="tel:+420739700970">+420 739 700 970</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>{dict.footer.links}</h3>
          <ul>
            <li>
              <a href="https://www.gynekolog.cz" target="_blank" rel="noreferrer">
                gynekolog.cz
              </a>
            </li>
            <li>
              <a href="https://www.znamylekar.cz" target="_blank" rel="noreferrer">
                znamylekar.cz
              </a>
            </li>
            <li>
              <Link href={`/${locale}/booking`}>{dict.nav.book}</Link>
            </li>
            <li>
              <Link href={`/${locale}/reviews`}>{dict.nav.reviews}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {dict.brand.name}. {dict.footer.rights}
        </span>
        <span>clinic-samer.cz</span>
      </div>
    </footer>
  );
}
