import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Instagram, Truck } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/hooks/use-page-meta";

const INSTAGRAM_URL = "https://www.instagram.com/kollektionenavlund.se/";
const INSTAGRAM_DM_URL = "https://ig.me/m/kollektionenavlund.se";
const contactBreadcrumbs = [
  { name: "Hem", path: "/" },
  { name: "Kontakt", path: "/kontakt" },
];

export default function Contact() {
  usePageMeta({
    title: "Kontakt | Lund Merch & Hoodies – Kollektionen av Lund",
    description:
      "Har du frågor om Lund merch, Lund hoodie eller din pre-order? Kontakta Kollektionen av Lund på Instagram för storlek, leverans och julklappar med Lund-motiv.",
    path: "/kontakt",
    image: "/media/lund/winter-contact.jpg",
    imageAlt: "Vinter i Lund – kontakt med Kollektionen av Lund",
    imageWidth: 1200,
    imageHeight: 800,
  });

  return (
    <>
      <BreadcrumbStructuredData items={contactBreadcrumbs} />
      <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-ink text-bone">
      <img
        src="/media/lund/winter-contact.jpg"
        alt=""
        aria-hidden="true"
        width={1200}
        height={800}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-3xl"
      />

      <div className="container-site relative z-10 py-32 md:py-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-2.5 text-gold">
            <Instagram className="size-3.5" strokeWidth={1.5} />
            Kontakt · 046
          </p>
          <h1 className="mt-5 text-[clamp(3rem,9vw,7rem)] leading-[0.86] text-bone">
            <span className="sr-only">
              Kontakt om Lund merch, Lund hoodie och Lund kläder –{" "}
            </span>
            Säg hej på Instagram<span className="text-gold">.</span>
          </h1>
          <h2 className="sr-only">
            Lund merch, storlekar och personlig hemleverans i Lund
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-bone/75">
            Vi tar kunddialogen direkt via Instagram-DM i detta skede. Frågor om
            storlek, lokal pre-order eller hemleverans i Lund? Skicka ett
            meddelande – vi svarar så snart vi kan.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow group inline-flex h-14 items-center gap-2.5 rounded-2xl bg-gold px-7 text-ink shadow-[0_16px_34px_-22px_rgba(201,161,90,0.9)] transition-all hover:-translate-y-0.5 hover:bg-bone"
            >
              <Instagram className="size-4" strokeWidth={1.8} />
              Skicka DM på Instagram
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-bone/70 transition-colors hover:border-gold hover:text-gold"
            >
              @kollektionenavlund.se
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          <p className="mt-6 text-[11px] leading-5 text-bone/50">
            En stad. Ett riktnummer. 046.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            ["01", "Pre-order", "Droppet öppnar 1 december."],
            ["02", "529 kr", "Lokalt tryckt hoodie."],
            ["03", "Hemleverans", "Vi kör eller cyklar hem den i Lund."],
          ].map(([number, title, copy], index) => (
            <Reveal key={title} delay={0.08 + index * 0.06}>
              <div className="h-full border border-bone/15 bg-bone/[0.04] p-5 backdrop-blur-sm">
                <p className="eyebrow text-[9px] text-gold/80">{number}</p>
                <p className="mt-3 font-display text-2xl uppercase leading-none text-bone">
                  {title}
                </p>
                <p className="mt-3 text-xs leading-5 text-bone/60">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 text-[11px] text-bone/45">
          <Truck className="size-3.5 text-gold" strokeWidth={1.5} />
          <Link
            to="/shop/domkyrkan-hoodie"
            className="transition-colors hover:text-gold"
          >
            Se Lund hoodien
          </Link>
        </Reveal>
      </div>
      </section>
    </>
  );
}
