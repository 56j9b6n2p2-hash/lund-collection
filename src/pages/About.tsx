import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Snowflake,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/hooks/use-page-meta";

const INSTAGRAM_URL = "https://www.instagram.com/kollektionenavlund.se/";
const INSTAGRAM_DM_URL = "https://ig.me/m/kollektionenavlund.se";

const chapters = [
  {
    title: "Ena staden. Skapa gemenskap.",
    copy: "Vi bygger ett varumärke för staden, av staden. En plats med studentliv, historia och kontraster där vi förenar alla under ett gemensamt uttryck.",
  },
  {
    title: "Inga genvägar. Vi gör allt själva.",
    copy: "Vi driver allt på egen hand – från webbutveckling och design till att tejpa affischer och dela ut vykort i brevlådor runt om i Lund.",
  },
  {
    title: "Egen hemleverans i Lund.",
    copy: "När beställningen är klar lämnar vi inte paketet till anonyma ombud. Vi kör eller cyklar själva ut leveranserna direkt till dörren till alla kunder i Lund.",
  },
  {
    title: "Arbetsmöjligheter för unga.",
    copy: "Vår långsiktiga vision är att växa och kunna anställa andra unga i staden som vill arbeta, lära sig och bygga något eget.",
  },
  {
    title: "Ljus i mörkret.",
    copy: "Vintermörkret sänker sig, och det är då värme och lokal stolthet behövs som mest. Julkollektionen är skapad för Lund i vinterskrud.",
  },
] as const;

export default function About() {
  usePageMeta({
    title: "Om oss | Två 18-åringar. En stad. Något eget.",
    description:
      "Kollektionen av Lund byggs av två 18-åringar i Lund. Läs om vår lokala pre-order, egna hemleveranser, arbetsmöjligheter för unga och julkollektionen 2026. En stad. Ett riktnummer. 046.",
    path: "/om-oss",
    image: "/media/lund/winter-about.jpg",
    imageAlt: "Snötäckt kullerstensgata i Lund i vinterljus",
    imageWidth: 1200,
    imageHeight: 1500,
  });

  return (
    <>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink text-bone">
        <img
          src="/media/lund/winter-about.jpg"
          alt="Snötäckt kullerstensgata i Lund i vinterljus"
          width={1200}
          height={1500}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-20 size-[26rem] text-gold/[0.08] md:size-[36rem]"
        >
          <Star className="h-full w-full" strokeWidth={0.5} />
        </div>

        <div className="container-site relative z-10 pb-16 pt-32 md:pb-24 md:pt-40">
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
            <span className="text-bone/80">Om oss</span>
          </nav>

          <Reveal>
            <p className="eyebrow mt-10 flex items-center gap-2.5 text-gold">
              <Snowflake className="size-3.5" strokeWidth={1.5} />
              Om Kollektionen av Lund · 046
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,8vw,7.4rem)] leading-[0.86] text-bone">
              Två 18-åringar.
              <br />
              En stad.
              <br />
              <span className="text-gold">Något eget.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-bone/75 md:text-base">
              En stad. Ett riktnummer. 046. Vi bygger Lund merch för hela
              staden – från studentliv och historia till vintermörker och lokal
              stolthet.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site section-pad">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold/70" />
              Vår berättelse
            </p>
            <h2 className="mt-5 text-[clamp(2.6rem,4.8vw,4.5rem)] leading-[0.88] text-ink">
              Byggt i Lund.
              <br />
              För Lund.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-ink/65">
              Fem kapitel om varför vi finns, hur vi arbetar och vad vi vill
              bygga vidare på.
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.title} delay={Math.min(index * 0.06, 0.2)}>
                <article className="grid gap-4 border-t border-ink/10 py-8 sm:grid-cols-[6.5rem_1fr] md:py-9">
                  <p className="eyebrow whitespace-nowrap text-gold-deep">
                    Kapitel {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] uppercase leading-[0.92] text-ink">
                      {chapter.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/70">
                      {chapter.copy}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <p className="border-t border-ink/10 pt-8 text-sm leading-7 text-ink/60">
                Från Domkyrkan och Mårtenstorget till Klostergården, Linero,
                Norra Fäladen och tuna: vi vill göra Lund merch och julkläder
                för hela staden – från Lundsnation och LTH till årets julklapp
                Lund 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-pine text-bone">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-80 text-gold/[0.08] md:size-[30rem]"
        >
          <Star className="h-full w-full" strokeWidth={0.5} />
        </div>
        <div className="container-site relative z-10 grid gap-10 py-16 md:grid-cols-12 md:items-center md:py-20">
          <Reveal className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <Instagram className="size-3.5" strokeWidth={1.5} />
              Avslutning &amp; kontakt
            </p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.88] text-bone">
              Följ resan bakom kulisserna.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-bone/70">
              Följ resan bakom kulisserna eller skicka ett DM. Vi finns på
              Instagram och svarar så snart vi kan.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow group inline-flex h-12 items-center gap-2 rounded-xl bg-gold px-6 text-ink transition-colors hover:bg-bone"
              >
                Följ på Instagram
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
              >
                Skicka DM
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <div className="rounded-2xl border border-bone/15 bg-bone/[0.06] p-6 backdrop-blur-sm md:p-7">
              <p className="eyebrow text-gold">Direkt till oss</p>
              <p className="mt-4 font-display text-3xl uppercase leading-none text-bone">
                @kollektionenavlund.se
              </p>
              <p className="mt-4 text-sm leading-6 text-bone/65">
                Kunddialogen går via Instagram-DM i detta skede. Inga
                kontaktformulär, inga ombud – bara vi.
              </p>
              <Link
                to="/kontakt"
                className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:border-gold hover:text-gold-soft"
              >
                Till kontaktsidan
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
