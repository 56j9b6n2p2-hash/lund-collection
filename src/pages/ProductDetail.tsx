import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  RotateCcw,
  Star,
  Truck,
} from "lucide-react";
import { formatSek, getProduct } from "@/data/products";
import { PaymentMethods } from "@/components/PaymentMethods";
import { ProductStructuredData } from "@/components/ProductStructuredData";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useStorefront } from "@/components/StorefrontLayout";

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { cart, openCart } = useStorefront();
  const [searchParams] = useSearchParams();
  const requestedColor = searchParams.get("color");
  const [selectedColorId, setSelectedColorId] = useState(
    product?.defaultColorId ?? "",
  );
  const [view, setView] = useState<"front" | "back">("front");

  useEffect(() => {
    if (!product) return;
    const nextColor =
      product.colors.find((color) => color.id === requestedColor)?.id ??
      product.defaultColorId;
    setSelectedColorId(nextColor);
    setView("front");
  }, [product, requestedColor]);

  const activeColor =
    product?.colors.find((color) => color.id === selectedColorId) ??
    product?.colors.find((color) => color.id === product.defaultColorId) ??
    product?.colors[0];

  usePageMeta({
    title: product
      ? "Lund Hoodie – Lund Merch | Unika Lundkläder"
      : "Plagget hittades inte — Kollektionen av Lund",
    description: product
      ? "Upptäck Lund Merch – en hoodie inspirerad av Lund. Den perfekta julklappen för dig som älskar Lund eller vill bära med dig stadens identitet."
      : "Plagget finns inte i julkollektionen. Utforska hela kollektionen från Kollektionen av Lund.",
    path: `/shop/${id ?? ""}`,
    image: activeColor?.image ?? product?.image ?? "/media/video/posters/winter-drone.jpg",
    imageAlt: activeColor?.alt ?? product?.imageAlt ?? "Vinter i Lund",
    imageWidth: product ? 1200 : 1440,
    imageHeight: product ? 1500 : 810,
    type: "product",
    noindex: !product,
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
          className="eyebrow mt-8 flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-bone transition-colors hover:bg-gold hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          Till kollektionen
        </Link>
      </section>
    );
  }

  const color = activeColor ?? product.colors[0];
  const isBackView = view === "back";

  return (
    <>
      <ProductStructuredData product={product} />
      <div className="bg-background pt-20">
        <div className="container-site border-b border-ink/10 py-5">
          <nav
            aria-label="Brödsmulor"
            className="eyebrow flex flex-wrap items-center gap-y-1 text-ink/50"
          >
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
            <div className="relative overflow-hidden rounded-2xl bg-sand">
              <img
                key={`${color.id}-${view}`}
                src={isBackView ? color.backImage : color.image}
                alt={isBackView ? color.backAlt : color.alt}
                width={1200}
                height={1500}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
              <div
                className="absolute bottom-3 left-3 flex gap-1.5"
                role="group"
                aria-label="Välj vy"
              >
                {(
                  [
                    { value: "front", label: "Fram" },
                    { value: "back", label: "Bak" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setView(option.value)}
                    aria-pressed={view === option.value}
                    className={`h-9 rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur transition-colors ${
                      view === option.value
                        ? "bg-ink text-bone"
                        : "bg-bone/85 text-ink/70 hover:bg-bone hover:text-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-sand/80 bg-card p-4">
                <Truck
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Egen hemleverans i Lund
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Vi kör eller cyklar hem din hoodie innan jul.
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
              Lokal pre-order · 046
            </p>
            <h1 className="mt-4 max-w-full break-words text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[0.88] text-ink">
              <span className="sr-only">Lund Hoodie – Lund Merch: </span>
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

            <div className="mt-6">
              <p className="text-xs text-muted-foreground">
                Färg: <span className="font-semibold text-ink">{color.name}</span>
              </p>
              <div
                className="mt-3 flex flex-wrap gap-2"
                role="group"
                aria-label="Välj färg"
              >
                {product.colors.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelectedColorId(option.id);
                      setView("front");
                    }}
                    aria-pressed={option.id === color.id}
                    aria-label={`Välj ${option.name}`}
                    className={`flex h-10 items-center gap-2 rounded-full border px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      option.id === color.id
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/15 bg-white/40 text-ink/65 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="size-4 shrink-0 rounded-full border border-black/20"
                      style={{ backgroundColor: option.hex }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
              <p className="mt-3 break-words text-xs text-muted-foreground">
                {product.material}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAdd(product.id)}
              className="group mt-7 flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl bg-gold px-4 py-3 text-ink shadow-[0_16px_34px_-22px_rgba(201,161,90,0.9)] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-bone"
            >
              <span className="text-left">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] opacity-55">
                  Lokal pre-order
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  Förbeställ hoodien · {formatSek(product.price)}
                </span>
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/20">
                <Plus className="size-4" strokeWidth={1.8} />
              </span>
            </button>
            <Link
              to="/#juldroppet"
              className="group mt-2.5 flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-ink/15 bg-white/40 px-4 py-3 text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white/80"
            >
              <span className="text-left">
                <span className="block text-sm font-semibold">
                  Få förtur &amp; skicka idé
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  Kostnadsfritt · vi hör av oss
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <PaymentMethods className="mt-4" />
            <p className="mt-3 text-center text-[10px] leading-5 text-muted-foreground">
              Klarna, kort, Amazon Pay eller Apple Pay i kassan · eller helt utan betalning
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
              Lokal pre-order: vi producerar samlat efter den 1 december och
              kör hem hoodien till dig i Lund innan jul. Inget stort lager i
              förväg.
            </p>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="product-seo-title"
        className="container-site pb-14 md:pb-20"
      >
        <div className="border-t border-ink/10 pt-10 md:pt-14">
          <p className="eyebrow text-gold-deep">Lund merch & julklappar</p>
          <h2
            id="product-seo-title"
            className="mt-4 max-w-3xl text-[clamp(2.3rem,4.8vw,4rem)] leading-[0.9] text-ink"
          >
            Lund hoodie – en julklapp med Lund-motiv
          </h2>
          <div className="mt-7 grid gap-6 border-t border-ink/10 pt-7 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="font-sans text-sm font-semibold normal-case tracking-normal text-ink">
                Kläder med Lund-motiv
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Domkyrkan, Stortorget och vinterljuset är tryckta i liten serie
                på en tung, borstad hoodie. Ett plagg för dig som vill bära Lund
                – inte bara besöka staden. Fungerar lika bra som Lund jultröja
                som souvenir från Lund.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold normal-case tracking-normal text-ink">
                Present till någon som älskar Lund
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Letar du efter en unik julklapp från Lund? Hoodien är ett
                personligt presenttips till studenter, Lundabor och alla med
                anknytning till staden – oavsett om de bor kvar eller längtar
                tillbaka.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold normal-case tracking-normal text-ink">
                Leverans i Lund innan jul
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Beställ i lokal pre-order för 529 kr. Vi producerar samlat efter
                den 1 december och kör eller cyklar hem din Lund hoodie till
                dörren i Lund innan jul.
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 font-medium text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              Se alla Lundkläder
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/om-oss"
              className="border-b border-ink/20 pb-1 font-medium text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              Om Kollektionen av Lund
            </Link>
            <Link
              to="/kontakt"
              className="border-b border-ink/20 pb-1 font-medium text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>

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
    </>
  );
}
