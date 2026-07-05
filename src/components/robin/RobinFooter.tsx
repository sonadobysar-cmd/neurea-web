import { robinSite } from "@/lib/robinSite";

export function RobinFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <p className="font-robin-display text-lg font-bold uppercase tracking-wider text-white">
            {robinSite.name}
          </p>
          <p className="mt-1 text-sm text-white/40">{robinSite.tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
          <a href={`tel:${robinSite.phone.replace(/\s/g, "")}`} className="hover:text-robin-gold">
            {robinSite.phoneDisplay}
          </a>
          <a href={`mailto:${robinSite.email}`} className="hover:text-robin-gold">
            {robinSite.email}
          </a>
        </div>
        <p className="text-xs text-white/30">© {year} {robinSite.magician}</p>
      </div>
    </footer>
  );
}
