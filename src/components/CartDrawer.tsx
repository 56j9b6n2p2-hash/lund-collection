import { useState } from "react";
import { Link } from "react-router";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatSek } from "@/data/products";
import type { CartApi, PlacedOrder } from "@/hooks/use-cart";

type Mode = "cart" | "checkout" | "done";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CartDrawer({
  open,
  onOpenChange,
  cart,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartApi;
}) {
  const [mode, setMode] = useState<Mode>("cart");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const createOrder = useMutation(api.orders.createOrder);

  const itemLabel = cart.count === 1 ? "vara" : "varor";

  function resetToCart() {
    setMode("cart");
    setError(null);
    setPlaced(null);
    setCustomerName("");
    setEmail("");
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      resetToCart();
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (customerName.trim().length < 2) {
      setError("Ange ditt namn så vi vet vem beställningen tillhör.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("Ange en giltig e-postadress.");
      return;
    }
    if (cart.detailed.length === 0) {
      setError("Varukorgen är tom.");
      return;
    }

    const orderSummary = {
      total: cart.subtotal,
      itemCount: cart.count,
      email: email.trim(),
    };

    setSubmitting(true);
    try {
      const orderId = await createOrder({
        customerName: customerName.trim(),
        email: email.trim(),
        items: cart.detailed.map((line) => ({
          productId: line.product.id,
          name: line.product.name,
          price: line.product.price,
          quantity: line.qty,
        })),
      });

      setPlaced({
        reference: `LUN-${String(orderId).slice(-6).toUpperCase()}`,
        email: orderSummary.email,
        total: orderSummary.total,
        itemCount: orderSummary.itemCount,
      });
      cart.clear();
      setMode("done");
    } catch {
      setError(
        "Reservationen kunde inte skickas just nu. Försök igen eller mejla hej@kollektionenavlund.se.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const firstName = customerName.trim().split(" ")[0] || "";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-sand bg-[#fbf7f0] p-0 sm:max-w-[440px] [&>button]:text-ink/60 [&>button:hover]:text-ink"
      >
        <SheetHeader className="shrink-0 border-b border-sand px-6 py-6 pr-14 text-left">
          <p className="eyebrow mb-2 text-gold-deep">
            {mode === "done" ? "Reservation mottagen" : "Kollektionen av Lund"}
          </p>
          <SheetTitle asChild>
            <h2 className="font-display text-3xl uppercase leading-none text-ink">
              {mode === "cart"
                ? "Din varukorg"
                : mode === "checkout"
                  ? "Reservation"
                  : "Tack"}
            </h2>
          </SheetTitle>
          <SheetDescription className="mt-2 text-sm text-muted-foreground">
            {mode === "cart"
              ? `${cart.count} ${itemLabel} · Kostnadsfri reservation`
              : mode === "checkout"
                ? "Ingen betalning dras nu. Vi återkommer inför den 1 december."
                : `Din reservation är registrerad, ${firstName}.`}
          </SheetDescription>
        </SheetHeader>

        {mode === "done" && placed ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-8">
            <div className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold">
              <Check className="size-6" strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink">
              Välkommen till julen i Lund.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Vi har tagit emot din reservation på {placed.itemCount} plagg. Vi
              kontaktar dig på{" "}
              <span className="font-semibold text-ink">{placed.email}</span>{" "}
              inför släppet den 1 december.
            </p>
            <dl className="mt-8 divide-y divide-sand border-y border-sand text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Reservationsnummer</dt>
                <dd className="font-semibold tracking-wide">
                  {placed.reference}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Delsumma</dt>
                <dd className="font-semibold">{formatSek(placed.total)}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Leverans</dt>
                <dd>Efter 1 december</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              Frakt tillkommer. Vi återkommer med totalsumma och betalning inför
              den 1 december.
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="eyebrow mt-8 flex h-12 items-center justify-center gap-2 bg-ink px-6 text-bone transition-colors hover:bg-gold hover:text-ink"
            >
              Stäng
            </button>
          </div>
        ) : cart.detailed.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-12 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-sand bg-white/60 text-ink/50">
              <ShoppingBag className="size-6" strokeWidth={1.4} />
            </span>
            <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink">
              Tomt, än så länge.
            </h3>
            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-muted-foreground">
              Fyra plagg inspirerade av Domkyrkan, Lundagård, Stortorget och
              nätterna över Lund.
            </p>
            <Link
              to="/shop"
              onClick={() => handleOpenChange(false)}
              className="eyebrow mt-8 flex h-12 items-center gap-2 border border-ink/20 px-6 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
            >
              Utforska kollektionen
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ) : mode === "cart" ? (
          <>
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-sand">
                {cart.detailed.map((line) => (
                  <li key={line.id} className="flex gap-4 py-5">
                    <img
                      src={line.product.image}
                      alt={line.product.imageAlt}
                      width={76}
                      height={95}
                      loading="lazy"
                      className="h-[95px] w-[76px] shrink-0 rounded-md bg-sand object-cover grayscale-[0.35]"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-5 text-ink">
                            {line.product.name}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span
                              aria-hidden="true"
                              className="inline-block size-2 rounded-full border border-ink/10"
                              style={{
                                backgroundColor: line.product.colorHex,
                              }}
                            />
                            {line.product.colorName}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold tabular-nums">
                          {formatSek(line.product.price * line.qty)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex h-8 items-center border border-ink/15">
                          <button
                            type="button"
                            onClick={() => cart.decrement(line.id)}
                            aria-label={`Minska antal ${line.product.name}`}
                            className="flex size-8 items-center justify-center text-ink/60 transition-colors hover:bg-sand hover:text-ink"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => cart.addItem(line.id)}
                            aria-label={`Öka antal ${line.product.name}`}
                            className="flex size-8 items-center justify-center text-ink/60 transition-colors hover:bg-sand hover:text-ink"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(line.id)}
                          aria-label={`Ta bort ${line.product.name}`}
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-sand bg-[#f8f3e9] px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-muted-foreground">Delsumma</span>
                <span className="font-display text-2xl leading-none text-ink">
                  {formatSek(cart.subtotal)}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                Frakt tillkommer. Fri frakt över 1 500 kr. Reservationen är
                kostnadsfri och ingen betalning dras nu.
              </p>
              <button
                type="button"
                onClick={() => setMode("checkout")}
                className="eyebrow mt-5 flex h-12 w-full items-center justify-center gap-2 bg-gold px-6 text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                Till reservationen
                <ArrowRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-3 w-full py-2 text-center text-xs text-muted-foreground underline decoration-sand underline-offset-4 transition-colors hover:text-ink"
              >
                Fortsätt handla
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cart-name"
                  className="eyebrow mb-2 block text-muted-foreground"
                >
                  Namn
                </label>
                <input
                  id="cart-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="För- och efternamn"
                  className="h-11 w-full rounded-md border border-ink/15 bg-white/70 px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
              </div>
              <div>
                <label
                  htmlFor="cart-email"
                  className="eyebrow mb-2 block text-muted-foreground"
                >
                  E-post
                </label>
                <input
                  id="cart-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="namn@exempel.se"
                  className="h-11 w-full rounded-md border border-ink/15 bg-white/70 px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
              </div>
            </div>

            <div className="mt-6 border-y border-sand py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {cart.count} {itemLabel}
                </span>
                <span className="font-semibold tabular-nums">
                  {formatSek(cart.subtotal)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frakt</span>
                <span className="text-muted-foreground">Tillkommer</span>
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-4 rounded-md border border-destructive/25 bg-destructive/5 px-3 py-2 text-xs leading-5 text-destructive"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="eyebrow mt-6 flex h-12 w-full items-center justify-center gap-2 bg-gold px-6 text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Skickar…
                </>
              ) : (
                <>
                  Skicka reservation
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("cart");
                setError(null);
              }}
              className="mt-3 flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-3.5" />
              Tillbaka till varukorgen
            </button>
            <p className="mt-5 text-center text-[11px] leading-5 text-muted-foreground">
              Kostnadsfri reservation · Designat i Lund, Sverige
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
