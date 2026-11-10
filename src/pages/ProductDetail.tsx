import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Plus,
  RotateCcw,
  Star,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { formatSek, getProduct, products } from "@/data/products";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useStorefront } from "@/components/StorefrontLayout";

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { cart, openCart } = useStorefront();

  usePageMeta({
    title: product
      ? `${product.name} — Kollektionen av Lund`
      : "Plagget hittades inte — Kollektionen av Lund",
    description: product
      ? `${product.subtitle}. ${product.description.slice(0, 120)}`
      : "Plagget finns inte i julkollektionen. Utforska hela kollektionen från Kollektionen av Lund.",
    path: `/shop/${id ?? ""}`,
  });

  function handleAdd(productId: string) {
    cart.addItem(productId);
    openCart();
  }

  if (!product) {
    return (
      <section className="container-site flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <p className="eyebrow text-gold-deep">Julkollektionen</p>
        <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.9] text-ink">
          Plagget finns inte.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-ink/65">
          Det kan ha flyttat till en annan del av Lund. Gå tillbaka till
          kollektionen och leta vidare.
        </p>
        <Link
          to="/shop"
          className="eyebrow mt-8 flex h-12 items-center gap-2 bg-ink px-6 text-bone transition-colors hover:bg-gold hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          Till kollektionen
        </Link>
      </section>
    );
  }

  const related = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
  const isSquareProduct = product.id === "domkyrkan-hoodie";

  return (
    <>
      <div className="bg-background pt-20">
        <div className="container-site border-b border-ink/10 py-5">
          <nav aria-label="Brödsmulor" className="eyebrow text-ink/50">
            <Link to="/" className="transition-colors hover:text-gold-deep">
              Hem
            </Link>
            <span aria-hidden="true" className="px-2 text-ink/25">
              /
            </span>
            <Link
              to="/shop"
              className="transition-colors hover:text-gold-deep"
            >
              Julkollektionen
            </Link>
            <span aria-hidden="true" className="px-2 text-ink/25">
              /
            </span>
            <span className="text-ink/80">{product.name}</span>
          </nav>
        </div>

        <section className="container-site grid gap-10 py-10 md:grid-cols-12 md:gap-12 md:py-14">
          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-2xl bg-sand">
              <img
                src={product.image}
                alt={product.imageAlt}
                width={isSquareProduct ? 1200 : 900}
                height={isSquareProduct ? 1200 : 1125}
                loading="eager"
                fetchPriority="high"
                className={`h-full w-full object-cover ${
                  isSquareProduct
                    ? "aspect-square"
                    : "aspect-[4/5] grayscale-[0.25]"
                }`}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-sand/80 bg-card p-4">
                <Truck
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Frakt från Lund
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Leverans 2–4 arbetsdagar. Fri frakt över 1 500 kr.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-sand/80 bg-card p-4">
                <RotateCcw
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Öppet köp i 30 dagar
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Beställ tryggt. Skicka tillbaka om plagget inte passar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <p className="eyebrow flex items-center gap-2.5 text-gold-deep">
              <Star className="size-3" fill="currentColor" strokeWidth={1.5} />
              Julkollektionen · 2026
            </p>
            <h1 className="mt-4 text-[clamp(2.8rem,5.6vw,4.8rem)] leading-[0.88] text-ink">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {product.subtitle}
            </p>
            <p className="mt-5 text-2xl font-semibold tabular-nums text-ink">
              {formatSek(product.price)}
            </p>

            <p className="mt-6 text-sm leading-7 text-ink/70">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-2.5 text-xs text-muted-foreground">
              <span
                aria-hidden="true"
                className="inline-block size-3.5 rounded-full border border-ink/10"
                style={{ backgroundColor: product.colorHex }}
              />
              <span>
                Färg: <span className="text-ink">{product.colorName}</span>
              </span>
              <span className="text-ink/20">·</span>
              <span>{product.material}</span>
            </div>

            <button
              type="button"
              onClick={() => handleAdd(product.id)}
              className="eyebrow mt-7 flex h-12 w-full items-center justify-center gap-2 bg-gold px-6 text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Reservera plagget
              <Plus className="size-4" strokeWidth={1.8} />
            </button>
            <Link
              to="/#juldroppet"
              className="eyebrow mt-3 flex h-12 w-full items-center justify-center gap-2 border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              Anmäl dig till juldroppet
              <ArrowUpRight className="size-3.5" />
            </Link>
            <p className="mt-3 text-center text-[10px] leading-5 text-muted-foreground">
              Kostnadsfri reservation · Ingen betalning dras nu
            </p>

            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="eyebrow text-ink/55">Detaljer</p>
              <ul className="mt-4 space-y-2.5">
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 text-xs leading-5 text-ink/65"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-gold-deep"
                      strokeWidth={1.8}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-t border-ink/10 pt-5 text-[11px] leading-5 text-muted-foreground">
              Skickas från Lund inom 2–4 arbetsdagar. Beställningar packas för
              hand i små serier.
            </p>
          </div>
        </section>
      </div>

      <section className="bg-ink text-bone">
        <div className="container-site grid gap-8 py-14 md:grid-cols-12 md:items-center md:gap-10 md:py-16">
          <div className="overflow-hidden rounded-2xl md:col-span-5">
            <img
              src={product.place.image}
              alt={product.place.alt}
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <Star className="size-3" fill="currentColor" strokeWidth={1.5} />
              Platsen bakom plagget
            </p>
            <h2 className="mt-4 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.9] text-bone">
              {product.place.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-bone/65">
              {product.place.copy}
            </p>
            <Link
              to="/#platser"
              className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
            >
              Se alla platser
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-gold-deep">
              <Star className="size-3" fill="currentColor" strokeWidth={1.5} />
              Mer från julen
            </p>
            <h2 className="mt-3 text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[0.9] text-ink">
              Fler plagg.
            </h2>
          </div>
          <Link
            to="/shop"
            className="eyebrow hidden items-center gap-2 border-b border-ink/20 pb-1 text-ink transition-colors hover:border-gold hover:text-gold-deep sm:inline-flex"
          >
            Hela kollektionen
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAdd={handleAdd}
              index={products.indexOf(item)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
