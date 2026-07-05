"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { href: "#sluzby", label: "Služby" },
  { href: "#predstaveni", label: "Představení" },
  { href: "#galerie", label: "Galerie" },
  { href: "#cenik", label: "Ceník" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export function RobinNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], [0, 1]);
  const backgroundColor = useTransform(navBg, (v) => `rgba(8, 8, 12, ${v * 0.92})`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed inset-x-0 top-0 z-50 transition-[backdrop-filter] duration-300 ${
        scrolled ? "backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="#" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-robin-orange to-robin-gold shadow-lg shadow-robin-orange/30">
            <Image src="/robin/IMG_0872.jpg" alt="" width={40} height={40} className="object-cover" />
          </span>
          <span className="font-robin-display text-lg font-bold uppercase tracking-wider text-white md:text-xl">
            Kouzlíme s Robinem
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-widest text-white/70 transition hover:text-robin-gold"
            >
              {l.label}
            </a>
          ))}
          <MagneticButton>
            <a
              href="#kontakt"
              className="inline-flex rounded-full bg-gradient-to-r from-robin-orange via-robin-amber to-robin-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-robin-orange/25 transition hover:shadow-robin-gold/40"
            >
              Objednat
            </a>
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-black/95 px-5 py-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium uppercase tracking-wider text-white/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-robin-orange to-robin-gold py-3 text-center font-bold uppercase text-black"
            >
              Objednat představení
            </a>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
