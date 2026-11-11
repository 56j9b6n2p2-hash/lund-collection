import { Link } from "react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Clapperboard,
  Clock3,
  MapPin,
  Play,
} from "lucide-react";
import { CinematicVideo } from "@/components/CinematicVideo";
import { FilmCollectionStructuredData } from "@/components/FilmStructuredData";
import { Reveal } from "@/components/Reveal";
import {
  films,
  formatFilmDuration,
  totalFilmDuration,
} from "@/data/films";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";

export default function Films() {
  const totalMinutes = Math.floor(totalFilmDuration / 60);
  const totalSeconds = totalFilmDuration % 60;

  usePageMeta({
    title: "Lunds videokollektion | Filmer från Lund",
    description:
      "Lunds videokollektion: nio korta filmer om Domkyrkan, spårvagnen, snöfallet och julnatten. Se varje film med spelare, bild och berättelse från Lund.",
    path: "/film",
    image: "/media/video/posters/winter-drone.jpg",
    imageAlt: "Drönarvy över ett snötäckt Lund i vinterljus",
  });

  return (
    <>
      <FilmCollectionStructuredData />

      <section
        aria-labelledby="films-title"
        className="relative flex min-h-[76svh] items-end overflow-hidden bg-ink text-bone"
      >
        <CinematicVideo
          priority
          desktopSrc="/media/video/winter-drone-1440.mp4"
          mobileSrc="/media/video/winter-drone-mobile.mp4"
          poster="/media/video/posters/winter-drone.jpg"
          alt="Drönarvy över ett snötäckt Lund i vinterljus"
          mediaClassName="video-frost"
          overlayClassName="bg-gradient-to-t from-ink via-[#07131c]/75 to-[#07131c]/45"
        />

        <div className="container-site relative z-10 pb-12 pt-32 md:pb-16 md:pt-36">
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
            <span className="text-bone/80">Lunds videokollektion</span>
          </nav>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <Reveal className="md:col-span-7">
              <p className="eyebrow flex items-center gap-2.5 text-gold">
                <Clapperboard className="size-3.5" strokeWidth={1.5} />
                Lund i rörelse · 2026
              </p>
              <h1
                id="films-title"
                className="mt-5 max-w-full break-words text-[clamp(2.7rem,8vw,7.2rem)] leading-[0.84] text-bone"
              >
                Lunds
                <br />
                videokollektion<span className="text-gold">.</span>
              </h1>
            </Reveal>

            <Reveal
              className="md:col-span-4 md:col-start-9 md:pb-1"
              delay={0.12}
            >
              <p className="max-w-sm text-sm leading-7 text-bone/75">
                Nio korta filmer om staden i vinter: Domkyrkan, spårvagnen,
                snöfallet och julnatten. Samma platser som formade kollektionen,
                sedda i rörelse.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-bone/15 pt-4 text-[11px] text-bone/60">
                <span className="flex items-center gap-1.5">
                  <Clapperboard className="size-3 text-gold" strokeWidth={1.6} />
                  {films.length} filmer
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3 text-gold" strokeWidth={1.6} />
                  {totalMinutes} min {totalSeconds} s
                </span>
              </div>
              <a
                href="#filmerna"
                className="eyebrow group mt-7 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
              >
                Se filmerna
                <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="filmerna"
        aria-labelledby="film-list-title"
        className="container-site section-pad scroll-mt-24"
      >
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold/70" />
              Filmerna
            </p>
            <h2
              id="film-list-title"
              className="mt-4 max-w-xl text-[clamp(2.3rem,4.9vw,4.4rem)] leading-[0.9] text-ink"
            >
              Korta nedslag i en stad som aldrig står still.
            </h2>
          </Reveal>
          <Reveal className="max-w-xs md:pb-1" delay={0.1}>
            <p className="text-sm leading-6 text-ink/65">
              Välj en film för att se den i spelaren och läsa om platsen,
              ljuset och stunden bakom bilden.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-12 md:mt-12 md:grid-cols-2">
          {films.map((film, index) => (
            <Reveal
              key={film.id}
              className={cn(index === 0 && "md:col-span-2")}
              delay={Math.min(index * 0.05, 0.25)}
            >
              <Link
                to={`/film/${film.id}`}
                aria-label={`Se filmen ${film.title}`}
                className="group block"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-ink",
                    index === 0
                      ? "aspect-[16/10] md:aspect-[2.15/1]"
                      : "aspect-video",
                  )}
                >
                  <img
                    src={film.poster}
                    alt={film.alt}
                    width={1440}
                    height={810}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="h-full w-full object-cover brightness-[0.82] saturate-[0.88] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10"
                  />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 md:p-5">
                    <span className="eyebrow border border-bone/20 bg-ink/40 px-2.5 py-1.5 text-[9px] text-bone/80 backdrop-blur-sm">
                      {film.kicker}
                    </span>
                    <span className="flex items-center gap-1.5 border border-bone/20 bg-ink/40 px-2.5 py-1.5 text-[10px] tabular-nums text-bone/75 backdrop-blur-sm">
                      <Clock3 className="size-3 text-gold" strokeWidth={1.6} />
                      {formatFilmDuration(film.durationSeconds)}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
                    <div className="min-w-0">
                      <p className="eyebrow flex items-center gap-1.5 text-[9px] text-gold-soft">
                        <MapPin className="size-3" strokeWidth={1.6} />
                        {film.location}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.7rem,3.2vw,2.7rem)] uppercase leading-none text-bone">
                        {film.title}
                      </h3>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-bone/30 bg-ink/35 text-bone backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:size-12">
                      <Play
                        className="ml-0.5 size-4"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-5">
                  <p className="max-w-xl text-sm leading-6 text-ink/65">
                    {film.summary}
                  </p>
                  <span className="eyebrow mt-1 hidden shrink-0 items-center gap-1.5 text-ink/45 transition-colors group-hover:text-gold-deep sm:flex">
                    Se filmen
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
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
              Filmerna är en del av samma berättelse som Domkyrkan Hoodie:
              Lund i vinter, fångat i ljuset mellan kullersten och snö.
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
              to="/#platser"
              className="eyebrow inline-flex items-center gap-2 text-bone/60 transition-colors hover:text-gold"
            >
              Platserna i Lund
              <ArrowUpRight className="size-3" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
