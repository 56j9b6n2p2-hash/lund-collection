import { useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type HoodieView = {
  src: string;
  label: string;
  alt: string;
};

type Colorway = {
  id: string;
  label: string;
  hex: string;
  views: HoodieView[];
};

const colorways: Colorway[] = [
  {
    id: "rod",
    label: "Vinröd",
    hex: "#6f2430",
    views: [
      {
        src: "/media/hoodie/julklappstradet-rod-1.jpg",
        label: "Fram",
        alt: "Vinröd hoodie med julklappsträdet på bröstet",
      },
      {
        src: "/media/hoodie/julklappstradet-rod-2.jpg",
        label: "Bak",
        alt: "Vinröd hoodie med inramad julmarknad på ryggen",
      },
    ],
  },
  {
    id: "gron",
    label: "Grön",
    hex: "#3f4a32",
    views: [
      {
        src: "/media/hoodie/julklappstradet-gron-1.jpg",
        label: "Fram",
        alt: "Grön hoodie med julklappsträdet på bröstet",
      },
      {
        src: "/media/hoodie/julklappstradet-gron-2.jpg",
        label: "Bak",
        alt: "Grön hoodie med inramad julmarknad på ryggen",
      },
    ],
  },
  {
    id: "marinbla",
    label: "Marinblå",
    hex: "#1d2c3d",
    views: [
      {
        src: "/media/hoodie/julklappstradet-marinbla-1.jpg",
        label: "Fram",
        alt: "Marinblå hoodie med julklappsträdet på bröstet",
      },
      {
        src: "/media/hoodie/julklappstradet-marinbla-2.jpg",
        label: "Bak",
        alt: "Marinblå hoodie med inramad julmarknad på ryggen",
      },
    ],
  },
  {
    id: "sand",
    label: "Sand",
    hex: "#c9b18c",
    views: [
      {
        src: "/media/hoodie/julklappstradet-sand-1.jpg",
        label: "Fram",
        alt: "Sandfärgad hoodie med julklappsträdet på bröstet",
      },
      {
        src: "/media/hoodie/julklappstradet-sand-2.jpg",
        label: "Bak",
        alt: "Sandfärgad hoodie med inramad julmarknad på ryggen",
      },
    ],
  },
  {
    id: "svart",
    label: "Svart",
    hex: "#171717",
    views: [
      {
        src: "/media/hoodie/julklappstradet-svart-1.jpg",
        label: "Fram",
        alt: "Svart hoodie med julklappsträdet på bröstet",
      },
      {
        src: "/media/hoodie/julklappstradet-svart-2.jpg",
        label: "Bak",
        alt: "Svart hoodie med inramad julmarknad på ryggen",
      },
    ],
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const details = [
  {
    title: "Material & passform",
    copy: "Gildan Heavy Blend 18500 i 271 g/m². 50% bomull, 50% polyester och en mjukt borstad insida. Klassisk unisex regular fit med dubbelfodrad huva och känguruficka.",
  },
  {
    title: "Storleksguide",
    copy: "S–XXL. Plagget är unisex och har en rak passform. Vill du bära det oversize, välj en storlek upp. Måtten finns i storlekstabellen på produktsidan.",
  },
  {
    title: "Leverans",
    copy: "Trycks på beställning och skickas inom EU. Leverans 2–4 arbetsdagar från Lund. Fri frakt över 1 500 kr.",
  },
];

export function HoodieShowcase() {
  const [colorIndex, setColorIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const [size, setSize] = useState("M");
  const reduceMotion = useReducedMotion();

  const activeColor = colorways[colorIndex];
  const activeView = activeColor.views[viewIndex] ?? activeColor.views[0];

  function selectColor(index: number) {
    setColorIndex(index);
    setViewIndex(0);
  }

  return (
    <section
      id="kollektionen"
      aria-labelledby="collection-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink text-bone"
    >
      <img
        src="/media/hoodie/snow-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-[6px] saturate-150 brightness-[0.8]"
      />
      {!reduceMotion ? (
        <video
          poster="/media/hoodie/snow-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-[6px] saturate-150 brightness-[0.8]"
        >
          <source
            src="/media/hoodie/snow-960.mp4"
            media="(max-width: 767px)"
            type="video/mp4"
          />
          <source src="/media/hoodie/snow-1440.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,5,15,0.8)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/70"
      />

      <div className="container-site relative py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow flex items-center gap-3 text-bone/60">
                <span className="h-px w-8 bg-gold" />
                Jul · Drop
              </p>
              <h2
                id="collection-title"
                className="mt-6 text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.86] text-bone"
              >
                Jul i Lund
              </h2>
              <p className="mt-8 max-w-xl text-sm leading-8 text-bone/65">
                Inspirerad av Stortorget i Lund under julen. En stad som rör
                sig tillsammans, under en period av mörker där gemenskap
                behövs som mest.
              </p>
            </div>
            <p className="eyebrow max-w-xs text-gold/80 md:text-right">
              1 december
              <span className="mt-3 block font-sans text-[11px] normal-case leading-6 tracking-normal text-bone/50">
                En hoodie. Fem färger. Byggd för kalla promenader mellan
                Stortorget och Domkyrkan.
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-10 border border-bone/20 bg-ink/40 p-6 backdrop-blur-xl md:mt-16 md:p-12 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-10 lg:col-span-4">
              <div>
                <p className="eyebrow text-bone/55">
                  Hoodie — {activeColor.label}
                </p>
                <h3 className="mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.9] text-bone">
                  Julklappsträdet
                </h3>
                <p className="mt-8 max-w-sm text-sm leading-8 text-bone/75">
                  Snö över Stortorget, julbodar som lyser och ett träd fullt av
                  paket. En hyllning till Lund i december.
                </p>
                <p className="mt-6 max-w-sm text-sm leading-8 text-bone/55">
                  Julklappsträdet på bröstet och en inramad julmarknad på
                  ryggen. Tung fleece, mjuk insida och en passform som rymmer
                  både tjock tröja och vinterluft.
                </p>
              </div>

              <Link
                to="/shop"
                className="eyebrow group inline-flex w-fit items-center gap-2 border-b border-bone/30 pb-1 text-bone transition-colors hover:border-gold hover:text-gold"
              >
                Se kollektionen
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square overflow-hidden bg-bone/10">
                <img
                  key={activeView.src}
                  src={activeView.src}
                  alt={activeView.alt}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="eyebrow absolute bottom-4 left-4 bg-ink/70 px-3 py-2 text-[9px] text-bone/80 backdrop-blur-md">
                  {activeView.label}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-3">
              <div>
                <p className="eyebrow mb-4 text-bone/55">Vyer</p>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="group"
                  aria-label="Välj vy"
                >
                  {activeColor.views.map((view, index) => (
                    <button
                      key={view.src}
                      type="button"
                      onClick={() => setViewIndex(index)}
                      aria-pressed={viewIndex === index}
                      aria-label={`Visa ${view.label.toLowerCase()}`}
                      className={cn(
                        "relative aspect-square overflow-hidden border transition-all",
                        viewIndex === index
                          ? "border-bone"
                          : "border-transparent opacity-55 hover:opacity-90",
                      )}
                    >
                      <img
                        src={view.src}
                        alt=""
                        width={240}
                        height={240}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4 text-bone/55">Färg</p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Välj färg"
                >
                  {colorways.map((color, index) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => selectColor(index)}
                      aria-pressed={colorIndex === index}
                      className={cn(
                        "flex h-9 items-center gap-2 border px-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors",
                        colorIndex === index
                          ? "border-bone bg-bone/10 text-bone"
                          : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-3 rounded-full border border-bone/30"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4 text-bone/55">Storlek</p>
                <div
                  className="grid grid-cols-5 gap-1.5"
                  role="group"
                  aria-label="Välj storlek"
                >
                  {sizes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      aria-pressed={size === item}
                      className={cn(
                        "flex h-10 items-center justify-center border text-[11px] font-semibold transition-colors",
                        size === item
                          ? "border-bone bg-bone text-ink"
                          : "border-bone/20 text-bone/65 hover:border-bone/50 hover:text-bone",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#juldroppet"
                className="eyebrow mt-auto inline-flex h-12 items-center justify-center gap-2 bg-gold px-4 text-center text-ink transition-colors hover:bg-bone"
              >
                Skriv upp dig för förtur
                <ArrowRight className="size-3.5" />
              </a>
            </div>

            <div className="border-t border-bone/15 pt-5 lg:col-span-12">
              <div className="grid gap-x-12 gap-y-2 md:grid-cols-3">
                {details.map((detail) => (
                  <details key={detail.title} className="group border-b border-bone/15 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-xs font-semibold text-bone/80 [&::-webkit-details-marker]:hidden">
                      {detail.title}
                      <ChevronDown className="size-3.5 shrink-0 text-gold transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-xs leading-7 text-bone/55">
                      {detail.copy}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
