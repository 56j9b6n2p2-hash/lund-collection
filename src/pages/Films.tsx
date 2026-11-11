import { Link } from "react-router";
import {
  ArrowUpRight,
  Clapperboard,
  Clock3,
  MapPin,
} from "lucide-react";
import { CinematicVideo } from "@/components/CinematicVideo";
import { FilmPageStructuredData } from "@/components/FilmStructuredData";
import { Reveal } from "@/components/Reveal";
import { formatFilmDuration, heroMontage } from "@/data/films";
import { usePageMeta } from "@/hooks/use-page-meta";

const filmPlaces = [
  {
    title: "Domkyrkan",
    copy: "Katedralen i vinterljus, från drönarens höjd och från gatan.",
  },
  {
    title: "Spårvagnen",
    copy: "Den gröna linjen genom centrala Lund, i morgonljus och efter midnatt.",
  },
  {
    title: "Snön",
    copy: "Snöfallet över taken, Sankt Hans backar och ljuset i julnatten.",
  },
];

export default function Films() {
  const duration = formatFilmDuration(heroMontage.durationSeconds);

  usePageMeta({
    title: "Vinter över Lund | En sammanhängande film",
    description:
      "En sammanhängande vinterfilm över Lund: Domkyrkan, spårvagnen, snöfallet och julnatten i en enda film. Se bakgrundsfilmen från Kollektionen av Lund.",
    path: "/film",
    image: heroMontage.poster,
    imageAlt: heroMontage.alt,
    type: "video.other",
  });

  return (
    <>
      <FilmPageStructuredData />

      <section
        aria-labelledby="film-title"
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-bone"
      >
        <CinematicVideo
          priority
          desktopSrc={heroMontage.desktopSrc}
          mobileSrc={heroMontage.mobileSrc}
          poster={heroMontage.poster}
          alt={heroMontage.alt}
          overlayClassName="bg-gradient-to-t from-ink via-[#07131c]/75 to-[#07131c]/40"
        />

        <div className="container-site relative z-10 pb-14 pt-32 md:pb-20 md:pt-36">
          <nav
            aria-label="Brödsmulor"
            className="eyebrow flex flex-wrap items-center gap-y-1 text-bone/50"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Hem
            </Link>
            <span aria-hidden="true" className="px-2 text-bone/30">
              /
            </span>
            <span className="text-bone/80">Filmen</span>
          </nav>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <Reveal className="md:col-span-7">
              <p className="eyebrow flex items-center gap-2.5 text-gold">
                <Clapperboard className="size-3.5" strokeWidth={1.5} />
                Lund i rörelse · 2026
              </p>
              <h1
                id="film-title"
                className="mt-5 max-w-full break-words text-[clamp(2.7rem,8vw,7.2rem)] leading-[0.84] text-bone"
              >
                Vinter
                <br />
                över Lund<span className="text-gold">.</span>
              </h1>
            </Reveal>

            <Reveal
              className="md:col-span-4 md:col-start-9 md:pb-1"
              delay={0.12}
            >
              <p className="max-w-sm text-sm leading-7 text-bone/75">
                Nio platser, ett sammanhängande vinterljus. En enda film som
                spelar i bakgrunden — från Domkyrkan till spårvagnen, snön och
                julnatten.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-bone/15 pt-4 text-[11px] text-bone/60">
                <span className="flex items-center gap-1.5">
                  <Clapperboard className="size-3 text-gold" strokeWidth={1.6} />
                  En film
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3 text-gold" strokeWidth={1.6} />
                  {duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-gold" strokeWidth={1.6} />
                  Lund
                </span>
              </div>
              <Link
                to="/shop/domkyrkan-hoodie"
                className="eyebrow group mt-7 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
              >
                Se Lund hoodien
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="film-about-title"
        className="container-site section-pad"
      >
        <div className="grid gap-8 border-b border-ink/10 pb-10 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold/70" />
              Filmen
            </p>
            <h2
              id="film-about-title"
              className="mt-4 max-w-2xl text-[clamp(2.3rem,4.9vw,4.4rem)] leading-[0.9] text-ink"
            >
              Nio platser. En sammanhängande rörelse.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-1" delay={0.1}>
            <p className="text-sm leading-6 text-ink/65">
              Filmen är sammansatt av stadens vinterklipp och spelar utan ljud i
              bakgrunden. Ingen separat videoserie, bara en bild av Lund att
              stanna i.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {filmPlaces.map((place, index) => (
            <Reveal key={place.title} delay={Math.min(index * 0.08, 0.2)}>
              <article className="h-full border border-ink/10 bg-card p-6">
                <p className="eyebrow text-gold-deep">
                  0{index + 1} · Lund
                </p>
                <h3 className="mt-5 font-display text-3xl uppercase leading-none text-ink">
                  {place.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-ink/65">
                  {place.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-pine text-bone">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-gold/10 md:size-[28rem]"
        />
        <div className="container-site relative grid gap-9 py-16 md:grid-cols-12 md:items-center md:gap-10 md:py-20">
          <Reveal className="md:col-span-6">
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <Clapperboard className="size-3.5" strokeWidth={1.5} />
              Från film till plagg
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,4.8vw,4rem)] leading-[0.9] text-bone">
              Staden bärs.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-bone/65">
              Filmen är en del av samma berättelse som Domkyrkan Hoodie: Lund i
              vinter, fångat i ljuset mellan kullersten och snö.
            </p>
          </Reveal>
          <Reveal
            className="flex flex-col gap-3 md:col-span-5 md:col-start-8 md:items-end"
            delay={0.1}
          >
            <Link
              to="/shop/domkyrkan-hoodie"
              className="eyebrow group inline-flex h-12 items-center justify-center gap-2 bg-gold px-6 text-ink transition-colors hover:bg-bone"
            >
              Se Lund hoodien
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/"
              className="eyebrow inline-flex items-center gap-2 text-bone/60 transition-colors hover:text-gold"
            >
              Till startsidan
              <ArrowUpRight className="size-3" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
