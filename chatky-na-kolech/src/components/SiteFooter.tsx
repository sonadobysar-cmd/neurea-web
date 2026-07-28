import Link from "next/link";
import { brand, nav } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-brand">{brand.name}</div>
            <p>
              Prémiové tiny houses na míru. Navrženo přírodou, postaveno mistry
              v české dílně.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigace</h4>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <p>{brand.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {brand.name}</span>
          <span>Život ve dřevě. Na kolech.</span>
        </div>
      </div>
    </footer>
  );
}
