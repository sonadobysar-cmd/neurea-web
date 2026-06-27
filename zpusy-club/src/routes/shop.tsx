import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { CartLauncher } from "../components/Cart";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Zpussy Club" },
      { name: "description", content: "Limitovaná kapsle Zpussy Club. Heavyweight trička, mikiny, totebag a hrnek." },
      { property: "og:title", content: "Shop — Zpussy Club" },
      { property: "og:description", content: "Mluvíme o všem. Nos to na sobě." },
    ],
  }),
  component: ShopPage,
});

const SWATCHES = [
  "linear-gradient(135deg, #ff2d87 0%, #e91e7a 100%)",
  "linear-gradient(135deg, #14142b 0%, #0e0a1a 100%)",
  "linear-gradient(135deg, #2dd4cf 0%, #14b8b3 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
];

function ShopPage() {
  useCartSync();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string>("Vše");
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  useEffect(() => {
    fetchProducts(50)
      .then((p) => setProducts(p))
      .catch((e) => {
        console.error(e);
        toast.error("Nepodařilo se načíst produkty.");
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Vše", ...Array.from(new Set(products.map((p) => p.node.productType).filter(Boolean)))];
  const filtered = cat === "Vše" ? products : products.filter((p) => p.node.productType === cat);

  const handleAdd = async (p: ShopifyProduct) => {
    const variant = p.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: p,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success(`Přidáno: ${p.node.title}`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <SiteHeader />

      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          background: "radial-gradient(circle at 15% 20%, rgba(255,45,135,0.5), transparent 45%), radial-gradient(circle at 85% 80%, rgba(45,212,207,0.4), transparent 45%)",
        }} />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              <Link to="/" className="hover:text-white transition">Domů</Link>
              <span>/</span>
              <span className="text-white">Shop</span>
            </div>
            <CartLauncher />
          </div>
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">/ DROP 01 — 2026</div>
              <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter">
                Nos to{" "}
                <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  na sobě.
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pl-8 md:border-l md:border-white/15">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Limitovaná kapsle Zpussy Club. Heavyweight střihy, kvalitní materiály, žádný "rychlý merch".
                Každý kus je očíslovaný.
              </p>
              <div className="mt-6 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-white/50">
                <span className="w-2 h-2 rounded-full bg-[var(--pink)] animate-pulse" />
                Skladem — odesíláme do 48 h
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 md:top-20 z-40 bg-[var(--cream)]/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c) => {
              const count = c === "Vše" ? products.length : products.filter((p) => p.node.productType === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-[8px] text-[13px] font-bold transition border ${
                    cat === c
                      ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                      : "bg-transparent text-[var(--ink)] border-black/15 hover:border-[var(--ink)]"
                  }`}
                >
                  {c}
                  <span className="ml-2 text-[10px] opacity-60 font-mono">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50">
            {filtered.length} produktů
          </div>
        </div>
      </div>

      <section className="py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {loading ? (
            <div className="py-20 grid place-items-center text-black/50">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-black/60">
              <p className="font-display font-bold text-2xl mb-2">No products found</p>
              <p className="text-sm">Zatím tu nic není.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {filtered.map((p, i) => {
                const node = p.node;
                const image = node.images.edges[0]?.node;
                const price = node.priceRange.minVariantPrice;
                const swatch = SWATCHES[i % SWATCHES.length];
                const badge = node.tags?.[0];
                return (
                  <article key={node.id} className="group">
                    <Link to="/product/$handle" params={{ handle: node.handle }}>
                      <div
                        className="relative aspect-[4/5] rounded-[18px] overflow-hidden mb-5 transition duration-500 group-hover:-translate-y-2"
                        style={{ background: image ? undefined : swatch }}
                      >
                        {image ? (
                          <img src={image.url} alt={image.altText ?? node.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center">
                            <span className="font-display font-black text-[10rem] md:text-[12rem] leading-none tracking-tighter select-none text-white/15">©</span>
                          </div>
                        )}
                        <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
                            DROP 01 / 2026
                          </span>
                          {badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[6px] bg-white/15 text-white backdrop-blur">
                              {badge}
                            </span>
                          )}
                        </div>
                        <span className="absolute bottom-5 left-5 text-[11px] font-mono text-white/60 mix-blend-difference">
                          N° {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </Link>

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 mb-1.5">
                          {node.productType || "—"}
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl leading-tight tracking-tight">
                          {node.title}
                        </h3>
                        {node.description && (
                          <p className="text-sm text-black/60 mt-1 line-clamp-2">{node.description}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-black text-xl md:text-2xl tabular-nums">
                          {parseFloat(price.amount).toFixed(0)} {price.currencyCode}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(p)}
                      disabled={isAdding}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[var(--ink)] hover:bg-[var(--pink)] text-white text-[12px] font-bold uppercase tracking-wider py-3 rounded-xl transition disabled:opacity-50"
                    >
                      {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Přidat do košíku"}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white py-16 md:py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10">
          {[
            { t: "Doprava zdarma", d: "Nad 1 500 Kč po celé ČR. Balíkovna i kurýr." },
            { t: "Vrácení do 14 dnů", d: "Beze stresu. Bez ptaní. Bez poplatků." },
            { t: "Limitované kusy", d: "Každý DROP je v omezeném počtu. Když to není, není to." },
          ].map((x) => (
            <div key={x.t}>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--pink)] mb-3">
                / info
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2">{x.t}</div>
              <p className="text-white/60 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
