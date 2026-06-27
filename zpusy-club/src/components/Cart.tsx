import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartButton({ onClick }: { onClick: () => void }) {
  const totalItems = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition"
      aria-label="Košík"
    >
      <ShoppingBag className="w-4 h-4" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-[var(--pink)] text-white text-[10px] font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "CZK";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[101] w-full sm:max-w-md bg-[var(--ink)] text-white border-l border-white/10 flex flex-col transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">/ košík</div>
            <h2 className="font-display font-black text-2xl mt-1">Tvůj výběr</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center">
              <div>
                <ShoppingBag className="w-10 h-10 text-white/30 mx-auto mb-3" />
                <p className="text-white/60 text-sm">Zatím je tu prázdno.</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{item.product.node.title}</h4>
                    <p className="text-[11px] text-white/50">{item.selectedOptions.map((o) => o.value).join(" · ")}</p>
                    <p className="font-bold text-sm mt-1">{parseFloat(item.price.amount).toFixed(0)} {item.price.currencyCode}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button onClick={() => removeItem(item.variantId)} className="text-white/40 hover:text-white">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-6 h-6 grid place-items-center rounded border border-white/15 hover:bg-white/10">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-6 h-6 grid place-items-center rounded border border-white/15 hover:bg-white/10">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Celkem</span>
              <span className="font-display font-black text-2xl">{total.toFixed(0)} {currency}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full inline-flex items-center justify-center gap-2 bg-[var(--pink)] hover:bg-white hover:text-[var(--pink)] text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
            >
              {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : (<><ExternalLink className="w-4 h-4" /> Pokladna</>)}
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

export function CartLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CartButton onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
