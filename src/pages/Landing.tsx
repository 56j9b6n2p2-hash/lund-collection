import { useEffect } from "react";
import { useLocation } from "react-router";
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
  ShoppingBag,
  Snowflake,
  Sparkles,
  Star,
  TramFront,
} from "lucide-react";
import { ChristmasStar } from "@/components/ChristmasStar";
import { CinematicVideo } from "@/components/CinematicVideo";
import {
  CinematicVideoPlaylist,
  type CinematicClip,
} from "@/components/CinematicVideoPlaylist";
import { DropSignupForm } from "@/components/DropSignupForm";
import { HoodieShowcase } from "@/components/HoodieShowcase";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const heroClips: CinematicClip[] = [
  {
    place: "Domkyrkan",
    kind: "place",
    tone: "video-frost",
    desktopSrc: "/media/video/hero-cathedral-1440.mp4",
    mobileSrc: "/media/video/hero-cathedral-960.mp4",
    poster: "/media/video/posters/hero-cathedral.jpg",
    alt: "Drönarvy över Lunds domkyrka i vinterljus",
  },
  {
    place: "Domkyrkan · kväll",
    kind: "place",
    tone: "video-evening",
    desktopSrc: "/media/video/cathedral-evening-1440.mp4",
    mobileSrc: "/media/video/cathedral-evening-960.mp4",
    poster: "/media/video/posters/cathedral-evening.jpg",
    alt: "Lunds domkyrka i snö och kvällsljus",
  },
  {
    place: "Snöfall",
    kind: "snow",
    tone: "video-frost",
    desktopSrc: "/media/video/snow-landscape-1440.mp4",
    mobileSrc: "/media/video/snow-landscape-960.mp4",
    poster: "/media/video/posters/snow-landscape.jpg",
    alt: "Snöfall över ett snötäckt vinterlandskap",
  },
  {
    place: "Centrala Lund",
    kind: "place",
    tone: "video-frost",
    desktopSrc: "/media/video/city-tram-1600.mp4",
    mobileSrc: "/media/video/city-tram-960.mp4",
    poster: "/media/video/posters/city-tram.jpg",
    alt: "Grön spårvagn passerar genom centrala Lund",
  },
  {
    place: "Julnatten",
    kind: "mood",
    tone: "video-festive",
    desktopSrc: "/media/video/festive-tram-1440.mp4",
    mobileSrc: "/media/video/festive-tram-960.mp4",
    poster: "/media/video/posters/festive-tram.jpg",
    alt: "Spårvagn passerar en juldekorerad byggnad i kvällsljus",
  },
];

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

export default function Landing() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key, reduceMotion]);

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
    <>
        {/* Hero */}
        <section
          aria-labelledby="hero-title"
          className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-ink text-bone"
        >
          <CinematicVideoPlaylist
            priority
            clips={heroClips}
            overlayClassName="bg-gradient-to-t from-ink via-[#07131c]/65 to-[#07131c]/40"
            showPlaceLabel
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_18%,rgba(201,161,90,0.2),transparent_55%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[22%] top-0 z-[3] hidden h-[7%] flex-col items-center lg:flex"
          >
            <span className="h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-gold/60" />
            <ChristmasStar className="-mt-1 size-24 xl:size-28" />
          </div>

          <div className="container-site relative z-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:pb-14 md:pt-28">
            <div className="flex items-end justify-between gap-8">
              <div className="min-w-0">
                <motion.p
                  className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-gold"
                  variants={heroVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "show"}
                  transition={{ delay: 0.1 }}
                >
                  <span className="h-px w-8 bg-gold/70" />
                  Lund · Skåne · Julen 2026
                  <Snowflake
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </motion.p>

                <motion.h1
                  id="hero-title"
                  aria-label="En känsla. En stad. En kollektion."
                  className="hero-neon mt-5 max-w-full break-words font-display text-[clamp(2.35rem,10.4vw,11.5rem)] leading-[0.84] text-bone"
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
                    Ett juldrop från Lund. Fyra plagg, inspirerade av
                    Domkyrkan, Lundagård och snön över Stortorget. Anmäl dig och
                    få första tillgång den 1 december.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#juldroppet"
                      className="eyebrow group inline-flex h-12 items-center gap-3 bg-gold px-5 text-ink transition-colors hover:bg-bone sm:h-14 sm:px-6 md:px-8"
                    >
                      Anmäl dig till juldroppet
                      <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                    <a
                      href="#kollektionen"
                      className="eyebrow inline-flex h-12 items-center gap-2 border border-bone/25 px-5 text-bone/80 transition-colors hover:border-bone/60 hover:text-bone sm:h-14 sm:px-6"
                    >
                      Se kollektionen
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
                <span className="eyebrow flex items-center gap-2 text-bone/55">
                  <Star className="size-2.5 text-gold" fill="currentColor" strokeWidth={1.5} />
                  Julen i Lund
                </span>
                <span className="flex items-center gap-2 text-[11px] text-bone/70">
                  <span className="size-1.5 animate-pulse rounded-full bg-gold motion-reduce:animate-none" />
                  Juldroppet · 1 december
                </span>
                <span className="mt-1 font-display text-4xl leading-none text-gold">
                  01.12
                </span>
                <span className="mt-2 h-16 w-px bg-gradient-to-b from-bone/40 to-transparent" />
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
                En stad byggd av ljus, kullersten och snötyngda morgnar.
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
                spårvagnens gröna linje, med julmarknadens ljus i ögonvrån.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-ink/70">
                I år har vi samlat den i en julkollektion: tidlös, lågmäld och
                byggd för att bäras länge. Ett litet släpp för snöiga promenader
                och ljusa kvällar.
              </p>
              <p className="eyebrow mt-8 flex items-center gap-2 text-ink/55">
                <Star className="size-2.5 text-gold" fill="currentColor" strokeWidth={1.5} />
                Julkollektionen 2026 · Kollektionen av Lund
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

        <HoodieShowcase />

        {/* Christmas drop signup */}
        <section
          id="juldroppet"
          aria-labelledby="juldroppet-title"
          className="relative scroll-mt-24 overflow-hidden border-y border-gold/15 bg-pine text-bone"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-[28rem] text-gold/[0.08] md:size-[38rem]"
          >
            <Star className="h-full w-full" strokeWidth={0.5} />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 size-64 text-gold/[0.06] md:size-80"
          >
            <Star className="h-full w-full" strokeWidth={0.5} />
          </div>

          <div className="container-site relative z-10 grid gap-12 py-20 md:grid-cols-12 md:items-center md:gap-10 md:py-28">
            <Reveal className="md:col-span-6">
              <p className="eyebrow flex items-center gap-2.5 text-gold">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                Save the date
              </p>
              <h2
                id="juldroppet-title"
                className="mt-5 text-[clamp(3rem,7vw,6.4rem)] leading-[0.84] text-bone"
              >
                Juldroppet
                <br />
                <span className="text-gold">1 december</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-bone/70">
                Fyra plagg, en stad och en kväll som hör vintern till. Anmäl dig
                så hör vi av oss inför släppet — och du slipper undra när
                dörrarna öppnar.
              </p>

              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-bone/15 pt-5">
                <div>
                  <dt className="eyebrow text-[9px] text-bone/55">Datum</dt>
                  <dd className="mt-1.5 font-display text-4xl leading-none text-gold">
                    01.12
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[9px] text-bone/55">År</dt>
                  <dd className="mt-1.5 font-display text-4xl leading-none text-bone">
                    2026
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[9px] text-bone/55">Plats</dt>
                  <dd className="mt-1.5 font-display text-4xl leading-none text-bone">
                    Lund
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="md:col-span-5 md:col-start-8" delay={0.12}>
              <div className="rounded-2xl border border-gold/25 bg-bone/[0.06] p-6 backdrop-blur-sm md:p-8">
                <p className="eyebrow text-gold">Första tillgång</p>
                <h3 className="mt-3 font-display text-3xl uppercase leading-none text-bone">
                  Stå på listan.
                </h3>
                <p className="mt-3 text-sm leading-6 text-bone/65">
                  Lämna din e-post, så hör vi av oss innan den 1 december.
                </p>
                <DropSignupForm source="landing" />
              </div>
            </Reveal>
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
            mediaClassName="video-frost"
            overlayClassName="bg-gradient-to-t from-ink via-[#07131c]/55 to-[#07131c]/35"
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
                    Snöfall.
                  </h2>
                </Reveal>
              </div>

              <Reveal className="max-w-sm pb-1" delay={0.15}>
                <p className="text-sm leading-7 text-bone/75">
                  En grön linje genom snötunga vintermorgnar. Lund är en stad som
                  rör sig långsamt — men aldrig står still.
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

          <div className="absolute right-5 top-24 z-10 hidden items-center gap-2 border border-bone/20 bg-ink/25 px-3 py-2 backdrop-blur-sm md:flex">
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
                  overlayClassName="bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
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
                När biblioteken släcker och kullerstenen blanker av snö finns
                Lund kvar i sitt eget ljus: spårvagnen, julskyltfönstren,
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
                dess känsla. I december, när snön ligger över taken, blir de
                ännu svårare att lämna.
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
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.8] saturate-[0.9] transition-transform duration-[900ms] group-hover:scale-[1.04]"
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
                    className="h-full w-full object-cover brightness-[0.82] saturate-[0.9]"
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
                Julkollektionen är namngiven efter platser i Lund. Domkyrkan.
                Lundagård. Stortorget. Nattvandringen. Bär dem under julen, slit
                dem länge och lämna dem vidare.
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
                Frågor om juldroppet, storlek eller din beställning? Vi finns i
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
    </>
  );
}
