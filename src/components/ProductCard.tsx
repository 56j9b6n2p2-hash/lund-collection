import { Link } from "react-router";
import { Plus } from "lucide-react";
import { formatSek, type Product } from "@/data/products";

export function ProductCard({
  product,
  onAdd,
  index,
}: {
  product: Product;
  onAdd: (id: string) => void;
  index: number;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-sand/80 bg-card p-2.5 shadow-[0_1px_2px_rgba(16,24,32,0.03),0_24px_50px_-40px_rgba(16,24,32,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(16,24,32,0.04),0_30px_60px_-35px_rgba(16,24,32,0.45)]">
      <Link
        to={`/shop/${product.id}`}
        aria-label={`Visa ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          width={900}
          height={1125}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-60"
        />
        {product.badge ? (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-bone/95 px-2.5 py-1.5 text-[9px] text-ink">
            {product.badge}
          </span>
        ) : null}
        <span className="eyebrow absolute right-3 top-3 text-[9px] text-bone/90">
          0{index + 1}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-sans text-[15px] font-semibold normal-case leading-5 tracking-normal text-ink">
              <Link
                to={`/shop/${product.id}`}
                className="transition-colors hover:text-gold-deep"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {product.subtitle}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
            {formatSek(product.price)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-sand/80 pt-3">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rounded-full border border-ink/10"
              style={{ backgroundColor: product.colorHex }}
            />
            {product.colorName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {product.material.split(" · ")[0]}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAdd(product.id)}
          aria-label={`Förbeställ ${product.name}`}
          className="mt-4 flex h-10 w-full items-center justify-between border border-ink/15 px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone sm:text-[10px] sm:tracking-[0.16em]"
        >
          Förbeställ
          <Plus className="size-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}
