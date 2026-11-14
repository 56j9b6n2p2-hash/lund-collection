import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Clock3,
  MapPin,
} from "lucide-react";
import { FilmStructuredData } from "@/components/FilmStructuredData";
import { Reveal } from "@/components/Reveal";
import { films, formatFilmDuration, getFilm } from "@/data/films";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function FilmDetail() {
  const { id } = useParams();
  const film = id ? getFilm(id) : undefined;

  usePageMeta({
    title: film
      ? `${film.title} | Lunds videokollektion`
      : "Filmen hittades inte — Lunds videokollektion",
    description: film
      ? film.description
      : "Filmen finns inte i Lunds videokollektion. Se alla filmer från Lund och kollektionen.",
    path: `/film/${id ?? ""}`,
    image: film?.poster ?? "/media/video/posters/winter-drone.jpg",
    imageAlt: film?.alt ?? "Vinter i Lund",
    type: "video.other",
    noindex: !film,
  });

  if (!film) {
    return (
      <section className="container-site flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <p className="eyebrow text-gold-deep">Lunds videokollektion</p>
        <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.9] text-ink">
          Filmen finns inte.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-ink/65">
          Den kan ha flyttat till en annan del av Lund. Gå tillbaka till
          videokollektionen och välj en annan film.
        </p>
        <Link
          to="/film"
          className="eyebrow mt-8 flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-bone transition-colors hover:bg-gold hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          Till filmerna
        </Link>
      </section>
    );
  }

  const index = films.findIndex((item) => item.id === film.id);
  const previousFilm = films[(index - 1 + films.length) % films.length];
  const nextFilm = films[(index + 1) % films.length];

  return (
    <>
      <FilmStructuredData film={film} />

      <div className="bg-ink text-bone">
        <div className="container-site pt-20">
          <nav
            aria-label="Brödsmulor"
            className="eyebrow flex flex-wrap items-center gap-y-1 border-b border-bone/10 py-5 text-bone/50"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Hem
            </Link>
            <span aria-hidden="true" className="px-2 text-bone/30">
              /
            </span>
            <Link to="/film" className="transition-colors hover:text-gold">
              Lunds videokollektion
            </Link>
            <span aria-hidden="true" className="px-2 text-bone/30">
              /
            </span>
            <span className="text-bone/80">{film.title}</span>
          </nav>

          <div className="py-10 md:py-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <p className="eyebrow flex items-center gap-2.5 text-gold">
                  <Clapperboard className="size-3.5" strokeWidth={1.5} />
                  {film.kicker}
                </p>
                <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.86] text-bone">
                  {film.title}
                </h1>
              </Reveal>

              <Reveal
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-bone/60 md:justify-end md:pb-1"
                delay={0.08}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-gold" strokeWidth={1.6} />
                  {film.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3 text-gold" strokeWidth={1.6} />
                  {formatFilmDuration(film.durationSeconds)}
                </span>
                <span className="tabular-nums text-bone/40">2026</span>
              </Reveal>
            </div>

            <Reveal className="mt-8 md:mt-10" delay={0.12}>
              <div className="overflow-hidden rounded-2xl border border-bone/10 bg-black shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]">
                <video
                  key={film.id}
                  controls
                  playsInline
                  preload="metadata"
                  poster={film.poster}
                  aria-label={`Videospelare: ${film.title}`}
                  className="aspect-video w-full bg-black"
                >
                  <source src={film.desktopSrc} type="video/mp4" />
                  Din webbläsare kan inte spela upp videon.{" "}
                  <a href={film.desktopSrc}>Öppna filmen direkt</a>.
                </video>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="bg-background">
        <div className="container-site grid gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
          <Reveal className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold/70" />
              Om filmen
            </p>
            <div className="mt-6 space-y-4">
              {film.story.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl text-[15px] leading-7 text-ink/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              to="/film"
              className="eyebrow group mt-8 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Alla filmer
            </Link>
          </Reveal>

          <Reveal
            className="md:col-span-4 md:col-start-9 md:self-start"
            delay={0.1}
          >
            <div className="surface-card rounded-2xl p-6">
              <p className="eyebrow text-gold-deep">Filmen i korthet</p>
              <dl className="mt-5 divide-y divide-ink/10 text-sm">
                <div className="flex items-baseline justify-between gap-6 py-3 first:pt-0">
                  <dt className="text-ink/50">Plats</dt>
                  <dd className="text-right text-ink">{film.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-ink/50">Längd</dt>
                  <dd className="tabular-nums text-ink">
                    {formatFilmDuration(film.durationSeconds)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-ink/50">Serie</dt>
                  <dd className="text-right text-ink">Lunds videokollektion</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3 last:pb-0">
                  <dt className="text-ink/50">År</dt>
                  <dd className="text-ink">2026</dd>
                </div>
              </dl>
            </div>

            <Link
              to="/shop/domkyrkan-hoodie"
              className="eyebrow group mt-4 flex items-center justify-between gap-4 border border-ink/15 p-4 text-ink transition-colors hover:border-gold hover:bg-gold/10"
            >
              <span>Se Lund hoodien</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/45">
        <div className="container-site grid gap-px py-10 sm:grid-cols-2 md:py-12">
          <Link
            to={`/film/${previousFilm.id}`}
            className="group flex items-start gap-4 py-4 pr-4 sm:py-0"
          >
            <ArrowLeft className="mt-1 size-4 shrink-0 text-gold-deep transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="eyebrow block text-[9px] text-ink/45">
                Föregående film
              </span>
              <span className="mt-2 block font-display text-xl uppercase leading-none text-ink transition-colors group-hover:text-gold-deep">
                {previousFilm.title}
              </span>
            </span>
          </Link>
          <Link
            to={`/film/${nextFilm.id}`}
            className="group flex items-start justify-between gap-4 border-t border-ink/10 py-4 pl-4 sm:border-t-0 sm:py-0 sm:text-right"
          >
            <span className="ml-auto">
              <span className="eyebrow block text-[9px] text-ink/45">
                Nästa film
              </span>
              <span className="mt-2 block font-display text-xl uppercase leading-none text-ink transition-colors group-hover:text-gold-deep">
                {nextFilm.title}
              </span>
            </span>
            <ArrowRight className="mt-1 size-4 shrink-0 text-gold-deep transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
