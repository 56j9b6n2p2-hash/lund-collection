import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Plus,
  ShoppingBag,
  TramFront,
} from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { CinematicVideo } from "@/components/CinematicVideo";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Wordmark } from "@/components/Wordmark";
import { formatSek, products, type Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Landmark,
    value: "1104",
    label: "Domkyrkans första sten",
    copy: "Nio sekler av historia i stadens absoluta mitt.",
  },
  {
    icon: GraduationCap,
    value: "1666",
    label: "Lunds universitet",
    copy: "Kunskap, rörelse och unga idéer som format staden.",
  },
  {
    icon: TramFront,
    value: "45 000",
    label: "Studenter",
    copy: "Ett Lund som ständigt byter skepnad — utan att tappa riktning.",
  },
];

const places = [
  {
    title: "Domkyrkan",
    meta: "1104 · Romansk",
    image: "/media/lund/cathedral.jpg",
    alt: "Lunds domkyrka i varmt ljus",
    copy: "Två torn, ett astronomiskt ur och tystnaden mellan valven.",
    className: "sm:col-span-2 lg:row-span-2",
    large: true,
  },
  {
    title: "Lundagård",
    meta: "Parken · 1666",
    image: "/media/lund/lundagard.jpg",
    alt: "Lundagårds grönska vid Lunds universitet",
    copy: "Gruset, grönskan och genvägarna mellan föreläsningarna.",
  },
  {
    title: "Universitetsbiblioteket",
    meta: "1907 · Jugend",
    image: "/media/lund/university-library.jpg",
    alt: "Lunds universitetsbibliotek med murgröna i höstdimma",
    copy: "Murgröna, läslampor och höstdimma över hyllorna.",
  },
  {
    title: "Stortorget",
    meta: "Stadens hjärta",
    image: "/media/lund/stortorget.jpg",
    alt: "Rött tegel och staty vid Stortorget i Lund",
    copy: "Mötesplatsen där stadens ljus tänds först.",
  },
  {
    title: "Universitetshuset",
    meta: "1882 · Nyklassicism",
    image: "/media/lund/universitetshuset.jpg",
    alt: "Universitetshuset i Lund med sin historiska fasad",
    copy: "Kunskapen har formats här i över 350 år.",
  },
];

function ProductCard({
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
        <img
          src={product.image}
          alt={product.imageAlt}
          width={900}
          height={1125}
          loading="lazy"
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover grayscale-[0.45] sepia-[0.06] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:sepia-0"
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
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-sans text-[15px] font-semibold normal-case leading-5 tracking-normal text-ink">
              {product.name}
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
          aria-label={`Lägg ${product.name} i varukorgen`}
          className="mt-4 flex h-10 w-full items-center justify-between border border-ink/15 px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone sm:text-[10px] sm:tracking-[0.16em]"
        >
          Lägg i varukorg
          <Plus className="size-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

export default function Landing() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleAdd = (id: string) => {
    cart.addItem(id);
    setCartOpen(true);
  };

  const heroVariants = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: "easeOut" as const },
        },
      };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <a
        href="#kollektionen"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-bone focus:px-4 focus:py-3 focus:text-ink"
      >
        Hoppa till kollektionen
      </a>

      <SiteHeader cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cart={cart} />

      <main>
        {/* Hero */}
        <section
          aria-labelledby="hero-title"
          className="relative flex h-[100svh] min-h-[520px] items-end overflow-hidden bg-ink text-bone"
        >
          <CinematicVideo
            priority
            desktopSrc="/media/video/hero-cathedral-1440.mp4"
            mobileSrc="/media/video/hero-cathedral-960.mp4"
            poster="/media/video/posters/hero-cathedral.jpg"
            alt="Drönarvy över Lunds domkyrka och stadens tak"
            mediaClassName="video-warm"
            overlayClassName="bg-gradient-to-t from-ink via-ink/35 to-ink/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_18%,rgba(201,161,90,0.16),transparent_55%)]"
          />

          <div className="container-site relative z-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 md:pb-14">
            <div className="flex items-end justify-between gap-8">
              <div className="min-w-0">
                <motion.p
                  className="eyebrow flex items-center gap-3 text-gold"
                  variants={heroVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "show"}
                  transition={{ delay: 0.1 }}
                >
                  <span className="h-px w-8 bg-gold/70" />
                  Lund · Skåne · Vinter 2026
                </motion.p>

                <motion.h1
                  id="hero-title"
                  aria-label="En känsla. En stad. En kollektion."
                  className="hero-neon mt-5 font-display text-[clamp(2.5rem,10.4vw,11.5rem)] leading-[0.84] text-bone"
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "show"}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.16,
                      },
                    },
                  }}
                >
                  {["En känsla", "En stad", "En kollektion"].map((line) => (
                    <motion.span
                      key={line}
                      className="block"
                      variants={heroVariants}
                    >
                      {line}
                      <span className="text-gold">.</span>{" "}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.div
                  className="mt-7 flex max-w-xl flex-col gap-6 md:mt-9"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
                >
                  <p className="max-w-md text-[15px] leading-7 text-bone/80 md:text-base">
                    Lund rör sig tillsammans — från Domkyrkans skugga till
                    spårvagnen genom staden, i ljuset av en skånsk vinter.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#kollektionen"
                      className="eyebrow group inline-flex h-14 items-center gap-3 bg-gold px-6 text-ink transition-colors hover:bg-bone md:px-8"
                    >
                      Se vinterkollektionen
                      <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                    <a
                      href="#om-oss"
                      className="eyebrow hidden h-14 items-center gap-2 border border-bone/25 px-6 text-bone/80 transition-colors hover:border-bone/60 hover:text-bone sm:inline-flex"
                    >
                      Vår historia
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="hidden shrink-0 flex-col items-end gap-3 pb-2 text-right lg:flex"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <span className="eyebrow text-bone/55">Inspelat i Lund</span>
                <span className="flex items-center gap-2 text-[11px] text-bone/70">
                  <span className="size-1.5 animate-pulse rounded-full bg-gold motion-reduce:animate-none" />
                  Domkyrkan · 07:42
                </span>
                <span className="mt-3 h-20 w-px bg-gradient-to-b from-bone/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section
          aria-labelledby="manifesto-title"
          className="container-site section-pad"
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <p className="eyebrow flex items-center gap-3 text-gold-deep">
                <span className="h-px w-8 bg-gold/70" />
                Staden
              </p>
              <h2
                id="manifesto-title"
                className="mt-6 text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[0.89] text-ink"
              >
                En stad byggd av ljus, kullersten och kalla morgnar.
              </h2>
            </Reveal>

            <Reveal
              className="flex flex-col justify-end md:col-span-4 md:col-start-9"
              delay={0.12}
            >
              <span className="h-px w-14 bg-gold" />
              <p className="mt-6 text-[15px] leading-7 text-ink/70">
                Lund är inte en stad man passerar. Det är en stad man återvänder
                till — genom Domkyrkans valv, över Lundagårds grus och längs
                spårvagnens gröna linje.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-ink/70">
                Kollektionen av Lund är vår tolkning av den känslan: tidlös,
                lågmäld och byggd för att bäras länge.
              </p>
              <p className="eyebrow mt-8 text-ink/55">
                Kollektionen av Lund · Est. 2026
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-20">
            {stats.map((stat, index) => (
              <Reveal key={stat.value} delay={index * 0.07}>
                <div className="surface-card relative h-full rounded-2xl p-6 md:p-7">
                  <span className="eyebrow absolute right-5 top-5 text-[9px] text-ink/25">
                    0{index + 1}
                  </span>
                  <stat.icon
                    className="size-5 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-6 font-display text-4xl leading-none text-ink md:text-[2.75rem]">
                    {stat.value}
                  </p>
                  <p className="eyebrow mt-3 text-[9px] text-ink/55">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {stat.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Collection */}
        <section
          id="kollektionen"
          aria-labelledby="collection-title"
          className="scroll-mt-24 bg-[#ece2d2] section-pad"
        >
          <div className="container-site">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-ink/55">
                  <span className="h-px w-8 bg-gold" />
                  Kollektionen · Vinter 2026
                </p>
                <h2
                  id="collection-title"
                  className="mt-5 text-[clamp(2.7rem,5.8vw,5.4rem)] leading-[0.87] text-ink"
                >
                  Fyra plagg.
                  <br />
                  En stad.
                </h2>
              </Reveal>
              <Reveal className="max-w-sm" delay={0.1}>
                <p className="text-sm leading-6 text-ink/65">
                  Lågmälda plagg i material som åldras vackert. Varje detalj
                  hämtar sin färg från en plats i Lund — och varje plagg är
                  namngivet efter den.
                </p>
                <p className="eyebrow mt-5 text-ink/55">
                  Designad i Lund · Tillverkad i Portugal
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 md:mt-14">
              {products.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.06}>
                  <ProductCard
                    product={product}
                    onAdd={handleAdd}
                    index={index}
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t border-ink/10 pt-5 text-[10px] uppercase tracking-[0.12em] text-ink/65 sm:flex-row sm:items-center sm:justify-between">
              <p>Fri frakt över 1 500 kr · Leverans 2–4 arbetsdagar</p>
              <p>30 dagars öppet köp · Skickas från Lund</p>
            </div>
          </div>
        </section>

        {/* City film */}
        <section
          id="staden"
          aria-labelledby="city-title"
          className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink text-bone md:min-h-[82svh]"
        >
          <CinematicVideo
            desktopSrc="/media/video/city-tram-1600.mp4"
            mobileSrc="/media/video/city-tram-960.mp4"
            poster="/media/video/posters/city-tram.jpg"
            alt="Grön spårvagn passerar genom centrala Lund"
            mediaClassName="video-warm"
            overlayClassName="bg-gradient-to-t from-ink via-ink/30 to-ink/25"
          />

          <div className="container-site relative z-10 pb-12 pt-32 md:pb-16">
            <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between">
              <div>
                <Reveal>
                  <p className="eyebrow flex items-center gap-3 text-gold">
                    <span className="h-px w-8 bg-gold/70" />
                    Staden i rörelse
                  </p>
                  <h2
                    id="city-title"
                    className="mt-5 text-[clamp(2.8rem,6.8vw,6.2rem)] leading-[0.85] text-bone"
                  >
                    Kullersten.
                    <br />
                    Spårvagn.
                    <br />
                    Vinterljus.
                  </h2>
                </Reveal>
              </div>

              <Reveal className="max-w-sm pb-1" delay={0.15}>
                <p className="text-sm leading-7 text-bone/75">
                  En grön linje genom grå vintermorgnar. Lund är en stad som rör
                  sig långsamt — men aldrig står still.
                </p>
                <a
                  href="#platser"
                  className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
                >
                  Se platserna
                  <ArrowRight className="size-3.5" />
                </a>
              </Reveal>
            </div>
          </div>

          <div className="absolute right-5 top-24 hidden items-center gap-2 border border-bone/20 bg-ink/25 px-3 py-2 backdrop-blur-sm md:flex">
            <span className="size-1.5 rounded-full bg-gold" />
            <span className="eyebrow text-[9px] text-bone/70">
              Spelar in · Lund
            </span>
          </div>
        </section>

        {/* Night split */}
        <section className="bg-ink text-bone">
          <div className="container-site grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
            <Reveal className="md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-bone/10">
                <CinematicVideo
                  desktopSrc="/media/video/night-tram-1600.mp4"
                  mobileSrc="/media/video/night-tram-960.mp4"
                  poster="/media/video/posters/night-tram.jpg"
                  alt="Grön spårvagn glider genom Lund om natten"
                  mediaClassName="video-night"
                  overlayClassName="bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="eyebrow text-[9px] text-bone/65">
                      Nattvagnen · Lund
                    </p>
                    <p className="mt-1 text-sm text-bone/85">23:47</p>
                  </div>
                  <span className="eyebrow border border-bone/20 px-2.5 py-1.5 text-[8px] text-bone/70">
                    Vinter
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="flex flex-col justify-center md:col-span-5 md:col-start-8"
              delay={0.1}
            >
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span className="h-px w-8 bg-gold/70" />
                Efter midnatt
              </p>
              <h2 className="mt-5 text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[0.88] text-bone">
                Natten
                <br />
                över Lund
              </h2>
              <p className="mt-6 text-sm leading-7 text-bone/65">
                När biblioteken släcker och kullerstenen blanker av regn finns
                Lund kvar i sitt eget ljus: spårvagnen, skyltfönstren,
                cyklarnas lampor genom Lundagård.
              </p>

              <ol className="mt-8 border-y border-bone/10">
                {[
                  ["Domkyrkan", "Tystnaden mellan valven."],
                  ["Lundagård", "Gruset, träden och studenternas genvägar."],
                  ["Stortorget", "Ljuset från stadshuset över stenläggningen."],
                  ["Universitetshuset", "Kunskapen som formats i över 350 år."],
                ].map(([place, text], index) => (
                  <li
                    key={place}
                    className="flex items-baseline gap-4 border-b border-bone/10 py-3.5 first:border-t-0 last:border-b-0"
                  >
                    <span className="w-6 shrink-0 text-[10px] tabular-nums text-gold/80">
                      0{index + 1}
                    </span>
                    <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="text-sm font-medium text-bone/90">
                        {place}
                      </span>
                      <span className="text-[11px] leading-5 text-bone/60 sm:text-right">
                        {text}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-7 text-xs leading-6 text-bone/60">
                Varje plagg bär en plats. Varje plats bär en historia.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Places */}
        <section
          id="platser"
          aria-labelledby="places-title"
          className="container-site section-pad scroll-mt-24"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold-deep">
                <span className="h-px w-8 bg-gold/70" />
                Platserna
              </p>
              <h2
                id="places-title"
                className="mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.88] text-ink"
              >
                Fem platser.
                <br />
                Ett Lund.
              </h2>
            </Reveal>
            <Reveal className="max-w-sm" delay={0.1}>
              <p className="text-sm leading-6 text-ink/65">
                Domkyrkans romanska valv, Lundagårds grus, Stortorgets ljus och
                kunskapens hus. Platserna som gav kollektionen dess namn — och
                dess känsla.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[225px] lg:grid-cols-4 md:mt-12">
            {places.map((place, index) => (
              <Reveal
                key={place.title}
                className={cn(
                  "group relative min-h-[250px] overflow-hidden rounded-2xl bg-sand",
                  place.className,
                  place.large && "min-h-[380px] sm:min-h-[440px]",
                )}
                delay={index * 0.05}
              >
                <img
                  src={place.image}
                  alt={place.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
                />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 text-bone md:p-6">
                  <p className="eyebrow text-[9px] text-gold-soft">
                    0{index + 1} · {place.meta}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 font-display uppercase leading-none text-bone",
                      place.large
                        ? "text-3xl md:text-[2.75rem]"
                        : "text-2xl md:text-[1.75rem]",
                    )}
                  >
                    {place.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[11px] leading-5 text-bone/65">
                    {place.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="om-oss"
          aria-labelledby="about-title"
          className="container-site section-pad scroll-mt-24 border-t border-ink/10"
        >
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
            <Reveal className="md:col-span-6">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                  <img
                    src="/media/lund/autumn-street.jpg"
                    alt="Kullerstensgata i Lund som leder fram till en kyrka i höstskymning"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="surface-card mt-4 rounded-xl p-5 md:absolute md:-bottom-6 md:right-6 md:mt-0 md:max-w-[250px]">
                  <p className="eyebrow text-gold-deep">Designat i Lund</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    Små serier. Lång livslängd. Inga genvägar.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="md:col-span-5 md:col-start-8"
              delay={0.12}
            >
              <p className="eyebrow flex items-center gap-3 text-gold-deep">
                <span className="h-px w-8 bg-gold/70" />
                Om oss
              </p>
              <h2
                id="about-title"
                className="mt-5 text-[clamp(2.5rem,5vw,4.7rem)] leading-[0.88] text-ink"
              >
                Designat i Lund.
                <br />
                Buret överallt.
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-ink/70">
                Kollektionen av Lund föddes ur en enkel idé: att göra kläder som
                känns lika självklara som staden de kommer från. Vi arbetar i
                små serier med material som tål att användas — ekologisk bomull,
                borstad fleece och europeisk merinoull.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-ink/70">
                Varje plagg är namngivet efter en plats i Lund. Domkyrkan.
                Lundagård. Stortorget. Nattvandringen. Bär dem, slit dem, lämna
                dem vidare.
              </p>

              <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6">
                {[
                  "Små serier, tillverkade i Portugal",
                  "Material valda för att åldras vackert",
                  "Frakt från Lund inom 2–4 arbetsdagar",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-xs text-ink/65"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:hej@kollektionenavlund.se?subject=Fr%C3%A5ga%20till%20Kollektionen%20av%20Lund"
                className="eyebrow group mt-8 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-ink transition-colors hover:border-gold hover:text-ink/70"
              >
                Prata med oss
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section
          id="kontakt"
          aria-labelledby="contact-title"
          className="relative scroll-mt-20 overflow-hidden bg-ink text-bone"
        >
          <img
            src="/media/lund/street.jpg"
            alt=""
            aria-hidden="true"
            width={1200}
            height={800}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/55"
          />

          <div className="container-site relative z-10 grid gap-12 py-20 md:grid-cols-2 md:items-end md:py-28">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span className="h-px w-8 bg-gold/70" />
                Kontakt
              </p>
              <h2
                id="contact-title"
                className="mt-5 text-[clamp(2.5rem,6.2vw,5.7rem)] leading-[0.86] text-bone"
              >
                Bär din stad<span className="text-gold">.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-bone/70">
                Frågor om storlek, material eller din beställning? Vi finns i
                Lund — och svarar oftast samma dag.
              </p>
              <a
                href="mailto:hej@kollektionenavlund.se"
                className="mt-8 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-sm text-gold transition-colors hover:border-gold hover:text-gold-soft"
              >
                <Mail className="size-4" strokeWidth={1.5} />
                hej@kollektionenavlund.se
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-bone/15 bg-bone/[0.07] p-6 backdrop-blur-md md:p-8">
                <dl className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <div>
                      <dt className="eyebrow text-[9px] text-bone/60">
                        Pop-up & studio
                      </dt>
                      <dd className="mt-1.5 text-sm text-bone/90">
                        Stortorget 7, 222 23 Lund
                      </dd>
                      <dd className="mt-1">
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Stortorget+7+Lund+Sweden"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-gold/90 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold"
                        >
                          Visa på karta
                          <ArrowUpRight className="size-3" />
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <div>
                      <dt className="eyebrow text-[9px] text-bone/60">
                        Öppettider
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-bone/90">
                        Tis–fre 11–18
                        <br />
                        Lör 10–16 · Sön 12–16
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <ShoppingBag
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <div>
                      <dt className="eyebrow text-[9px] text-bone/60">
                        Beställningar
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-bone/90">
                        Skickas från Lund inom 2–4 arbetsdagar.
                        <br />
                        Fri frakt över 1 500 kr.
                      </dd>
                    </div>
                  </div>
                </dl>

                <a
                  href="mailto:hej@kollektionenavlund.se?subject=Boka%20privat%20visning%20i%20Lund"
                  className="eyebrow mt-8 flex h-12 w-full items-center justify-center gap-2 bg-gold px-6 text-ink transition-colors hover:bg-bone"
                >
                  Boka privat visning
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-bone">
        <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Wordmark size="large" />
            <p className="mt-6 max-w-sm text-sm leading-6 text-bone/55">
              Kläder inspirerade av Lund. Skapade för att bäras med stolthet —
              i katedralens skugga och på väg mot nästa föreläsning.
            </p>
            <p className="eyebrow mt-8 text-[9px] text-bone/50">
              Est. 2026 · Lund, Skåne
            </p>
          </div>

          <nav aria-label="Butik" className="md:col-span-3">
            <p className="eyebrow mb-5 text-bone/55">Butik</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#kollektionen"
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Hela kollektionen
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Varukorg ({cart.count})
                </button>
              </li>
              <li>
                <a
                  href="#platser"
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Platserna i Lund
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Information" className="md:col-span-2">
            <p className="eyebrow mb-5 text-bone/55">Information</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#om-oss"
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Om oss
                </a>
              </li>
              <li>
                <a
                  href="#kontakt"
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a
                  href="mailto:hej@kollektionenavlund.se"
                  className="text-bone/70 transition-colors hover:text-gold"
                >
                  Mejla oss
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-bone/55">Hitta hit</p>
            <address className="text-sm not-italic leading-6 text-bone/70">
              Stortorget 7
              <br />
              222 23 Lund
              <br />
              Sverige
            </address>
            <p className="mt-4 text-[10px] tracking-[0.08em] text-bone/55">
              55.7047° N · 13.1910° E
            </p>
          </div>
        </div>

        <div className="border-t border-bone/10">
          <div className="container-site flex flex-col gap-2 py-6 text-[11px] text-bone/55 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Kollektionen av Lund</p>
            <p>Designat i Lund, Sverige · 55.7047° N, 13.1910° E</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
