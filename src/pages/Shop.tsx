import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Search, Star, X } from "lucide-react";
import { DropSignupForm } from "@/components/DropSignupForm";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useStorefront } from "@/components/StorefrontLayout";

export default function Shop() {
  const { cart, openCart } = useStorefront();
  const [query, setQuery] = useState("");

  usePageMeta({
    title: "Julkollektionen 2026 — Kollektionen av Lund",
    description:
      "Utforska julkollektionen 2026 från Kollektionen av Lund. Fyra tidlösa plagg inspirerade av Domkyrkan, Lundagård och Stortorget. Sök efter plagg, färg eller material.",
    path: "/shop",
  });

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;

    return products.filter((product) =>
      [
        product.name,
        product.subtitle,
        product.material,
        product.colorName,
        product.description,
        product.place.name,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  function handleAdd(id: string) {
    cart.addItem(id);
    openCart();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-pine pt-20 text-bone">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-12 size-72 text-gold/10 md:size-[28rem]"
        >
          <Star className="h-full w-full" strokeWidth={0.6} />
        </div>
        <div className="container-site relative pb-12 pt-10 md:pb-16 md:pt-14">
          <nav aria-label="Brödsmulor" className="eyebrow text-bone/50">
            <Link to="/" className="transition-colors hover:text-gold">
              Hem
            </Link>
            <span aria-hidden="true" className="px-2 text-bone/30">
              /
            </span>
            <span className="text-bone/80">Julkollektionen</span>
          </nav>

          <div className="mt-10 flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2.5 text-gold">
                <Star className="size-3" fill="currentColor" strokeWidth={1.5} />
                Julkollektionen · 2026
              </p>
              <h1 className="mt-5 text-[clamp(3rem,7.6vw,6.6rem)] leading-[0.86] text-bone">
                Julen, i fyra
                <br />
                plagg<span className="text-gold">.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-bone/65">
                Fyra lugna plagg för kalla morgnar, sena kvällar och allt
                däremellan. Sök, läs och reservera din favorit inför juldroppet.
              </p>
            </div>

            <div className="hidden shrink-0 items-end gap-3 pb-1 md:flex">
              <span className="font-display text-[7rem] leading-[0.75] text-gold/25">
                04
              </span>
              <span className="eyebrow pb-1 text-bone/45">plagg</span>
            </div>
          </div>

          <div className="mt-10 max-w-xl md:mt-12">
            <label
              htmlFor="catalog-search"
              className="eyebrow text-bone/60"
            >
              Sök i kollektionen
            </label>
            <div className="relative mt-2.5">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/45"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Sök på plagg, färg eller material"
                className="h-12 w-full rounded-md border border-transparent bg-bone py-3 pl-11 pr-11 text-sm text-ink outline-none transition-shadow placeholder:text-ink/45 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Rensa sökningen"
                  className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-sand hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-4">
          <p className="eyebrow text-ink/55">
            {query.trim() ? `Resultat för “${query.trim()}”` : "Alla plagg"}
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {filtered.length} plagg
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                index={products.indexOf(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
            <span className="flex size-14 items-center justify-center rounded-full border border-sand bg-card text-ink/50">
              <Search className="size-5" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 font-display text-3xl uppercase leading-none text-ink">
              Inget hittades.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Vi kunde inte hitta något som matchar “{query.trim()}”. Prova ett
              annat ord, eller titta på hela kollektionen.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="eyebrow mt-7 flex h-11 items-center gap-2 border border-ink/20 px-5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
            >
              Rensa sökningen
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </section>

      <section className="bg-pine text-bone">
        <div className="container-site grid gap-8 py-14 md:grid-cols-12 md:items-center md:gap-10 md:py-16">
          <div className="md:col-span-6">
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <Star className="size-3" fill="currentColor" strokeWidth={1.5} />
              Juldroppet · 1 december
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,4.8vw,4rem)] leading-[0.9] text-bone">
              Först till kvarn.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-bone/65">
              Lämna din e-post så hör vi av oss inför släppet. Inga nyhetsbrev
              i onödan — bara det viktigaste inför den 1 december.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="rounded-2xl border border-bone/15 bg-bone/[0.05] p-5 md:p-6">
              <DropSignupForm source="shop" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
