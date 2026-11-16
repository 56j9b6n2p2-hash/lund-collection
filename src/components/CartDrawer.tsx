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
  CreditCard,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PaymentMethods } from "@/components/PaymentMethods";
import { formatSek } from "@/data/products";
import type { CartApi, PlacedOrder } from "@/hooks/use-cart";
import { trackGoogleAdsConversion } from "@/lib/google-ads";

type Mode = "cart" | "checkout" | "done" | "stripe";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/bJe3cw2Fig0U7yi8rOeEo00";

function buildStripeUrl(reference: string, email: string) {
  const params = new URLSearchParams({
    client_reference_id: reference,
    prefilled_email: email,
    locale: "sv",
  });

  return `${STRIPE_PAYMENT_LINK}?${params.toString()}`;
}

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
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [stripeUrl, setStripeUrl] = useState<string | null>(null);
  const createOrder = useMutation(api.orders.createOrder);

  const itemLabel = cart.count === 1 ? "vara" : "varor";

  function resetToCart() {
    setMode("cart");
    setError(null);
    setPlaced(null);
    setStripeUrl(null);
    setCustomerName("");
    setEmail("");
    setAddress("");
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      resetToCart();
    }
  }

  async function placeOrder(payWithStripe: boolean) {
    setError(null);

    if (customerName.trim().length < 2) {
      setError("Ange ditt namn så vi vet vem beställningen tillhör.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("Ange en giltig e-postadress.");
      return;
    }
    if (address.trim().length < 6) {
      setError(
        "Ange en fullständig leveransadress med gata, postnummer och ort.",
      );
      return;
    }
    if (cart.detailed.length === 0) {
      setError("Varukorgen är tom.");
      return;
    }
    if (payWithStripe && cart.count > 1) {
      setError(
        "Betalningen gäller ett plagg i taget. Skicka en betalningsfri pre-order för fler plagg, så fakturerar vi.",
      );
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
        address: address.trim(),
        items: cart.detailed.map((line) => ({
          productId: line.product.id,
          name: line.product.name,
          price: line.product.price,
          quantity: line.qty,
        })),
      });

      const order = {
        reference: `LUN-${String(orderId).slice(-6).toUpperCase()}`,
        email: orderSummary.email,
        address: address.trim(),
        total: orderSummary.total,
        itemCount: orderSummary.itemCount,
      };

      trackGoogleAdsConversion("purchase", {
        transaction_id: order.reference,
        value: order.total,
        currency: "SEK",
      });

      cart.clear();
      setPlaced(order);

      if (payWithStripe) {
        const url = buildStripeUrl(order.reference, order.email);
        setStripeUrl(url);
        setMode("stripe");
        // Give gtag a moment to send the conversion before Stripe takes over.
        window.setTimeout(() => window.location.assign(url), 350);
      } else {
        setMode("done");
      }
    } catch {
      setError(
        "Pre-ordern kunde inte skickas just nu. Försök igen eller skicka ett DM på Instagram.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void placeOrder(true);
  }

  function handlePreorder() {
    void placeOrder(false);
  }

  function handleGoToCheckout() {
    trackGoogleAdsConversion("beginCheckout", {
      value: cart.subtotal,
      currency: "SEK",
    });
    setMode("checkout");
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
            {mode === "done"
              ? "Pre-order mottagen"
              : mode === "stripe"
                ? "Betalning via Stripe"
                : "Kollektionen av Lund"}
          </p>
          <SheetTitle asChild>
            <h2 className="font-display text-3xl uppercase leading-none text-ink">
              {mode === "cart"
                ? "Din varukorg"
                : mode === "checkout"
                  ? "Pre-order"
                  : mode === "stripe"
                    ? "Betalning"
                    : "Tack"}
            </h2>
          </SheetTitle>
          <SheetDescription className="mt-2 text-sm text-muted-foreground">
            {mode === "cart"
              ? `${cart.count} ${itemLabel} · Flera betalsätt eller betalningsfri pre-order`
              : mode === "checkout"
                ? "Betala med Klarna, kort, Amazon Pay eller Apple Pay via Stripe – eller skicka en betalningsfri pre-order. Vi producerar samlat efter 1 december och kör hem den i Lund innan jul."
                : mode === "stripe"
                  ? "Stripe öppnas med din e-post och orderreferens ifyllda."
                  : `Din pre-order är registrerad, ${firstName}.`}
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
              Vi har tagit emot din pre-order på {placed.itemCount} plagg. Vi
              kontaktar dig på{" "}
              <span className="font-semibold text-ink">{placed.email}</span>{" "}
              för att stämma av leveransen i Lund innan jul.
            </p>
            <dl className="mt-8 divide-y divide-sand border-y border-sand text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Ordernummer</dt>
                <dd className="font-semibold tracking-wide">
                  {placed.reference}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Delsumma</dt>
                <dd className="font-semibold">{formatSek(placed.total)}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 py-3">
                <dt className="shrink-0 text-muted-foreground">
                  Leveransadress
                </dt>
                <dd className="max-w-[58%] text-right leading-5">
                  {placed.address}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Leverans</dt>
                <dd>I Lund · innan jul</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              Egen hemleverans i Lund. Vi återkommer med totalsumma och betalning
              inför den 1 december.
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-8 flex min-h-14 items-center justify-between gap-6 rounded-2xl bg-ink px-4 py-3 text-bone transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
            >
              <span className="text-sm font-semibold">Stäng</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        ) : mode === "stripe" && placed && stripeUrl ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-8">
            <div className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold">
              <CreditCard className="size-6" strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink">
              Öppnar Stripe.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Vi öppnar Stripes säkra betalning med{" "}
              <span className="font-semibold text-ink">
                {formatSek(placed.total)}
              </span>{" "}
              och din e-post ifylld. Slutför betalningen där.
            </p>
            <dl className="mt-8 divide-y divide-sand border-y border-sand text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Ordernummer</dt>
                <dd className="font-semibold tracking-wide">
                  {placed.reference}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Belopp</dt>
                <dd className="font-semibold">{formatSek(placed.total)}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 py-3">
                <dt className="shrink-0 text-muted-foreground">
                  Leveransadress
                </dt>
                <dd className="max-w-[58%] text-right leading-5">
                  {placed.address}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">Betalning</dt>
                <dd>Stripe · valt betalsätt</dd>
              </div>
            </dl>
            <a
              href={stripeUrl}
              className="group mt-8 flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-gold px-4 py-3 text-ink shadow-[0_16px_34px_-22px_rgba(201,161,90,0.9)] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-bone"
            >
              <span className="text-sm font-semibold">Öppna Stripe</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">
              Om Stripe inte öppnas automatiskt kan du använda knappen ovan.
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="group mt-3 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-ink/15 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-white/60"
            >
              <span>Stäng</span>
              <ArrowRight className="size-4 text-ink/40 transition-transform group-hover:translate-x-0.5" />
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
              En hoodie inspirerad av Domkyrkan och vinterkvällarna i Lund.
            </p>
            <Link
              to="/shop"
              onClick={() => handleOpenChange(false)}
              className="group mt-8 flex min-h-14 items-center justify-between gap-6 rounded-2xl border border-ink/20 bg-white/50 px-4 py-3 text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bone"
            >
              <span className="text-sm font-semibold">Utforska kollektionen</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
                Egen hemleverans i Lund. Flera betalsätt eller betalningsfri
                pre-order.
              </p>
              <button
                type="button"
                onClick={handleGoToCheckout}
                className="group mt-5 flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl bg-gold px-4 py-3 text-ink shadow-[0_16px_34px_-22px_rgba(201,161,90,0.9)] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-bone"
              >
                <span className="text-sm font-semibold">Till kassan</span>
                <span className="flex size-9 items-center justify-center rounded-full border border-ink/10 bg-white/20">
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
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
              <div>
                <label
                  htmlFor="cart-address"
                  className="eyebrow mb-2 block text-muted-foreground"
                >
                  Leveransadress
                </label>
                <input
                  id="cart-address"
                  name="address"
                  autoComplete="street-address"
                  required
                  minLength={6}
                  maxLength={200}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Gata, postnummer och ort"
                  aria-describedby="cart-address-help"
                  className="h-11 w-full rounded-md border border-ink/15 bg-white/70 px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
                <p
                  id="cart-address-help"
                  className="mt-1.5 text-[10px] leading-5 text-muted-foreground"
                >
                  Behövs för att vi ska kunna leverera hem till dig i Lund.
                </p>
              </div>
            </div>

            <PaymentMethods className="mt-6" />

            <div className="mt-4 border-y border-sand py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {cart.count} {itemLabel}
                </span>
                <span className="font-semibold tabular-nums">
                  {formatSek(cart.subtotal)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hemleverans</span>
                <span className="text-muted-foreground">I Lund</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Betalning</span>
                <span className="text-ink">Betalsätt · Stripe</span>
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
              disabled={submitting || cart.count > 1}
              className="group mt-4 flex min-h-14 w-full items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-left text-bone shadow-[0_16px_34px_-20px_rgba(16,24,32,0.8)] transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-ink disabled:hover:text-bone"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bone/10 transition-colors group-hover:bg-ink/10">
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CreditCard className="size-4" strokeWidth={1.8} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] opacity-55">
                  {submitting ? "Skickar…" : "Säker betalning"}
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  {submitting
                    ? "Skickar…"
                    : `Betala med kort · ${formatSek(cart.subtotal)}`}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            {cart.count > 1 ? (
              <p className="mt-2 text-center text-[10px] leading-5 text-muted-foreground">
                Betalningen gäller ett plagg i taget. Skicka en betalningsfri
                pre-order för fler plagg, så fakturerar vi.
              </p>
            ) : null}
            <button
              type="button"
              onClick={handlePreorder}
              disabled={submitting}
              className="group mt-2.5 flex min-h-14 w-full items-center gap-3 rounded-2xl border border-ink/15 bg-white/40 px-4 py-3 text-left text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white/80 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-sand/50 text-gold-deep">
                <Check className="size-4" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">
                  Köp utan betalning
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  Förtur · vi hör av oss innan jul
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-[10px] leading-5 text-muted-foreground">
              Betalningen slutförs säkert hos Stripe.
            </p>
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
            <p className="mt-4 text-center text-[11px] leading-5 text-muted-foreground">
              Kort eller betalningsfri pre-order · Designat i Lund, Sverige
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
