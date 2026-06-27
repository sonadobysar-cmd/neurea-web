import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { CartLauncher } from "../components/Cart";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center text-white bg-[var(--ink)]">
      <p>Produkt nelze načíst.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-white bg-[var(--ink)]">
      <p>Produkt nenalezen.</p>
    </div>
  ),
});

function ProductPage() {
  useCartSync();
  const { handle } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [variantId, setVariantId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  useEffect(() => {
    fetchProducts(50, `handle:${handle}`)
      .then((list) => {
        const p = list[0] ?? null;
        setProduct(p);
        if (p) setVariantId(p.node.variants.edges[0]?.node.id ?? null);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Načítání selhalo.");
      })
      .finally(() => setLoading(false));
  }, [handle]);

  const variant = product?.node.variants.edges.find((v) => v.node.id === variantId)?.node;

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Přidáno do košíku", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <SiteHeader />
      <section className="pt-28 md:pt-36 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <button onClick={() => navigate({ to: "/shop" })} className="text-[11px] font-mono uppercase tracking-[0.25em] text-black/60 hover:text-black">← Zpět do shopu</button>
            <CartLauncher />
          </div>

          {loading ? (
            <div className="py-20 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : !product ? (
            <p className="text-center text-black/60 py-20">Produkt nenalezen.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
                {product.node.images.edges[0]?.node ? (
                  <img src={product.node.images.edges[0].node.url} alt={product.node.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-black/20 font-display font-black text-[10rem]">©</div>
                )}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50 mb-2">{product.node.productType || "—"}</div>
                <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter leading-[0.95]">{product.node.title}</h1>
                <div className="mt-4 font-display font-black text-3xl tabular-nums">
                  {variant ? `${parseFloat(variant.price.amount).toFixed(0)} ${variant.price.currencyCode}` : ""}
                </div>
                {product.node.description && (
                  <p className="mt-6 text-black/70 leading-relaxed">{product.node.description}</p>
                )}

                {product.node.options.length > 0 && product.node.options[0].name !== "Title" && (
                  <div className="mt-8 space-y-4">
                    {product.node.options.map((opt) => (
                      <div key={opt.name}>
                        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-black/60 mb-2">{opt.name}</div>
                        <div className="flex flex-wrap gap-2">
                          {product.node.variants.edges.map((v) => {
                            const val = v.node.selectedOptions.find((o) => o.name === opt.name)?.value;
                            if (!val) return null;
                            const active = v.node.id === variantId;
                            return (
                              <button
                                key={v.node.id}
                                onClick={() => setVariantId(v.node.id)}
                                disabled={!v.node.availableForSale}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition ${
                                  active
                                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                                    : "border-black/15 hover:border-[var(--ink)] disabled:opacity-40"
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleAdd}
                  disabled={isAdding || !variant}
                  className="mt-10 w-full inline-flex items-center justify-center gap-2 bg-[var(--pink)] hover:bg-[var(--ink)] text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
                >
                  {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Přidat do košíku"}
                </button>

                <Link to="/shop" className="block mt-4 text-center text-[12px] font-mono uppercase tracking-wider text-black/50 hover:text-black">
                  Pokračovat v nákupu →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
