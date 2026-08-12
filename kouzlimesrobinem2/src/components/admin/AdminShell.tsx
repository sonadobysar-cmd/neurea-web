"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

const navigation = [
  { href: "/admin", label: "Přehled", short: "Přehled" },
  { href: "/admin/rezervace", label: "Rezervace", short: "Rezervace" },
  { href: "/admin/statistiky", label: "Statistiky", short: "Statistiky" },
  { href: "/admin/obsah", label: "Obsah webu", short: "Obsah" },
  { href: "/admin/fotky", label: "Fotky a galerie", short: "Fotky" },
  { href: "/admin/cenik", label: "Ceník", short: "Ceník" },
  { href: "/admin/pravni", label: "Právní texty", short: "Právní" },
  { href: "/admin/nastaveni", label: "Nastavení", short: "Nastavení" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = navigation.find((item) => isActive(pathname, item.href));

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-app-shell">
      <header className="admin-mobile-bar">
        <div>
          <span className="admin-mobile-kicker">Kouzlíme s Robinem</span>
          <strong>{active?.short ?? "Administrace"}</strong>
        </div>
        <button
          type="button"
          className="admin-menu-button"
          aria-expanded={menuOpen}
          aria-controls="admin-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          <span className="admin-sr-only">{menuOpen ? "Zavřít menu" : "Otevřít menu"}</span>
        </button>
      </header>

      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`} id="admin-navigation">
        <div className="admin-sidebar-brand">
          <span>Administrace</span>
          <strong>Kouzlíme s Robinem</strong>
        </div>
        <nav className="admin-nav" aria-label="Navigace administrace">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "active" : ""}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-actions">
          <a href="/" target="_blank" rel="noreferrer">
            Otevřít web ↗
          </a>
          <button type="button" onClick={logout}>
            Odhlásit se
          </button>
        </div>
      </aside>

      {menuOpen ? (
        <button
          type="button"
          className="admin-menu-backdrop"
          aria-label="Zavřít menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main className="admin-main">{children}</main>
    </div>
  );
}
