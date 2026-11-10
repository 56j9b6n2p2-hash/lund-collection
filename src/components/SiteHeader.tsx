import { useState } from "react";
import { Link } from "react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/Wordmark";

const navItems = [
  { label: "Shop", to: "/shop" },
  { label: "Juldroppet", to: "/#juldroppet" },
  { label: "Staden", to: "/#staden" },
  { label: "Om oss", to: "/#om-oss" },
  { label: "Kontakt", to: "/#kontakt" },
];

export function SiteHeader({
  cartCount,
  onOpenCart,
}: {
  cartCount: number;
  onOpenCart: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemLabel = cartCount === 1 ? "vara" : "varor";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-bone/10 bg-navy/95 backdrop-blur-md">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Kollektionen av Lund – till startsidan"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0 py-2 transition-opacity hover:opacity-85"
        >
          <Wordmark />
        </Link>

        <div className="flex items-center gap-2 md:gap-6 lg:gap-9">
          <nav aria-label="Huvudmeny" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="eyebrow relative py-2 text-bone/80 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-gold hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Öppna varukorgen, ${cartCount} ${itemLabel}`}
            className="group relative flex h-11 items-center gap-2.5 border border-bone/20 px-3 text-bone transition-colors hover:border-gold hover:text-gold sm:px-4"
          >
            <ShoppingBag className="size-[17px]" strokeWidth={1.6} />
            <span className="eyebrow hidden lg:inline">Varukorg</span>
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold tabular-nums transition-colors ${
                cartCount > 0
                  ? "bg-gold text-ink"
                  : "bg-bone/10 text-bone/70 group-hover:bg-gold/20"
              }`}
            >
              {cartCount}
            </span>
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Öppna meny"
                className="-mr-2 size-11 text-bone hover:bg-bone/10 hover:text-gold md:hidden"
              >
                <Menu className="size-5" strokeWidth={1.6} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l border-bone/15 bg-ink p-0 text-bone [&>button]:text-bone/70 [&>button:hover]:text-gold"
            >
              <SheetHeader className="border-b border-bone/10 px-6 py-6 text-left">
                <SheetTitle className="sr-only">Meny</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigera på Kollektionen av Lund
                </SheetDescription>
                <Wordmark />
              </SheetHeader>

              <nav aria-label="Mobilmeny" className="flex flex-col px-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-bone/10 py-5"
                  >
                    <span className="font-display text-[2rem] uppercase leading-none text-bone transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="eyebrow text-bone/30">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto px-6 pb-8">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCart();
                  }}
                  className="flex w-full items-center justify-between border border-bone/20 px-4 py-4 text-left transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="eyebrow">Varukorg</span>
                  <span className="text-xs tabular-nums text-bone/60">
                    {cartCount} {itemLabel}
                  </span>
                </button>
                <p className="mt-8 text-xs leading-6 text-bone/60">
                  Designat i Lund, Sverige
                  <br />
                  Fri frakt över 1 500 kr
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
