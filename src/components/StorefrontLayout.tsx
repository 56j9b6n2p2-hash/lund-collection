import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Outlet } from "react-router";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart, type CartApi } from "@/hooks/use-cart";

type StorefrontValue = {
  cart: CartApi;
  openCart: () => void;
};

const StorefrontContext = createContext<StorefrontValue | null>(null);

export function useStorefront() {
  const value = useContext(StorefrontContext);
  if (!value) {
    throw new Error("useStorefront must be used inside StorefrontLayout");
  }
  return value;
}

export function StorefrontLayout({ children }: { children?: ReactNode }) {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = useCallback(() => setCartOpen(true), []);

  const value = useMemo(() => ({ cart, openCart }), [cart, openCart]);

  return (
    <StorefrontContext.Provider value={value}>
      <div id="top" className="min-h-screen bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-bone focus:px-4 focus:py-3 focus:text-ink"
        >
          Hoppa till innehållet
        </a>

        <SiteHeader cartCount={cart.count} onOpenCart={openCart} />
        <CartDrawer
          open={cartOpen}
          onOpenChange={setCartOpen}
          cart={cart}
        />

        <main id="main-content">
          {children ?? <Outlet />}
        </main>

        <SiteFooter cartCount={cart.count} onOpenCart={openCart} />
      </div>
    </StorefrontContext.Provider>
  );
}
