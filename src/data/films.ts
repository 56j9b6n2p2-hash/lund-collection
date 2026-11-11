export type LundFilm = {
  id: string;
  title: string;
  kicker: string;
  location: string;
  durationSeconds: number;
  poster: string;
  alt: string;
  summary: string;
  description: string;
  story: string[];
  desktopSrc: string;
  mobileSrc: string;
  uploadDate: string;
};

export const films: LundFilm[] = [
  {
    id: "vinter-over-lund",
    title: "Vinter över Lund",
    kicker: "Drönarvy · 01",
    location: "Lund",
    durationSeconds: 16,
    poster: "/media/video/posters/winter-drone.jpg",
    alt: "Drönarvy över ett snötäckt Lund med Domkyrkan i vinterljus",
    summary:
      "Ett långsamt snöfall över taken, tornen och kullerstensgatorna.",
    description:
      "Drönarvy över Lund i vinterljus: snötäckta tak, Domkyrkans torn och Stortorgets tysta gator. En långsam film om staden från ovan.",
    story: [
      "Filmen börjar högt över taken, där Lund blir ett mönster av kullerstensgator, skorstenar och snö. Domkyrkans torn är stadens fasta punkt medan ljuset långsamt skiftar över taken.",
      "Vinter över Lund är en av nio korta filmer från julkollektionen 2026. De är gjorda för att fånga staden i rörelse — från drönarens tysta vy till spårvagnens gröna linje genom morgonen.",
    ],
    desktopSrc: "/media/video/winter-drone-1440.mp4",
    mobileSrc: "/media/video/winter-drone-mobile.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "domkyrkan-i-vinterljus",
    title: "Domkyrkan i vinterljus",
    kicker: "Domkyrkan · 02",
    location: "Domkyrkan",
    durationSeconds: 18,
    poster: "/media/video/posters/hero-cathedral.jpg",
    alt: "Lunds domkyrka i snö och vinterljus",
    summary: "Katedralen mellan snöfall och ett blekt eftermiddagsljus.",
    description:
      "Lunds domkyrka i vinterljus, med snö på taken och stadens ljud dämpade av kylan. En närgången drönarfilm om katedralen och platsen runt den.",
    story: [
      "Domkyrkan har stått i Lund i nio sekler. I vinterljus blir stenarna mjukare, tornen tydligare och snön ligger kvar längs takens kanter. Filmen kretsar långsamt runt katedralen och platsen där staden möts.",
      "Härifrån är det bara några kvarter till Stortorget, Lundagård och gatorna som formade kollektionen. Filmen är ett stilla porträtt av stadens äldsta och mest självklara landmärke.",
    ],
    desktopSrc: "/media/video/hero-cathedral-1440.mp4",
    mobileSrc: "/media/video/hero-cathedral-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "domkyrkan-efter-morkret",
    title: "Domkyrkan efter mörkret",
    kicker: "Domkyrkan · kväll · 03",
    location: "Domkyrkan",
    durationSeconds: 8,
    poster: "/media/video/posters/cathedral-evening.jpg",
    alt: "Lunds domkyrka i snö och kvällsljus",
    summary: "Varma fönster och snö runt stadens äldsta byggnad.",
    description:
      "När decembermörkret faller över Lund lyser Domkyrkans fönster varmt mot snön. En kort kvällsfilm om katedralen, tystnaden och ljuset i staden.",
    story: [
      "På kvällen förändras Domkyrkan. Fönstren lyser, snön fångar ljuset och stenarna runt omkring blir mörkare. Filmen fångar de minuter då staden går från eftermiddag till kväll.",
      "Det är samma plats som på dagen, men en annan känsla. Här finns lugnet som gör att Lund känns som en stad man stannar i — särskilt i december.",
    ],
    desktopSrc: "/media/video/cathedral-evening-1440.mp4",
    mobileSrc: "/media/video/cathedral-evening-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "snon-over-lund",
    title: "Snön över Lund",
    kicker: "Vinter · 04",
    location: "Lund",
    durationSeconds: 10,
    poster: "/media/video/posters/snow-landscape.jpg",
    alt: "Snöfall över ett snötäckt vinterlandskap",
    summary: "Ett stilla snöfall över det skånska vinterlandskapet.",
    description:
      "Snön faller stilla över Lund och det skånska landskapet. En meditativ vinterfilm om kyla, ljus och den tystnad som bara snö kan skapa.",
    story: [
      "Snön förändrar ljudet i staden. Den lägger sig över gator, tak och fält, och det som annars hörs tydligt blir plötsligt dämpat. Filmen låter snöfallet ta plats utan brådska.",
      "Det är en enkel bild av vintern i Lund — men också en av de känslor som kollektionen bygger på. Kyla, ljus och något mjukt mitt i allt.",
    ],
    desktopSrc: "/media/video/snow-landscape-1440.mp4",
    mobileSrc: "/media/video/snow-landscape-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "sparvagnen-genom-lund",
    title: "Spårvagnen genom Lund",
    kicker: "Centrala Lund · 05",
    location: "Centrala Lund",
    durationSeconds: 18,
    poster: "/media/video/posters/city-tram.jpg",
    alt: "Grön spårvagn passerar genom centrala Lund",
    summary: "Den gröna linjen genom kullersten och vintermorgon.",
    description:
      "Den gröna spårvagnen rör sig genom centrala Lund en vintermorgon. Kullersten, snö och stadens vardagliga rytm i en film om Lund i rörelse.",
    story: [
      "Spårvagnen är en av stadens tydligaste rörelser. Den går genom kullerstenen, förbi skyltfönster och människor på väg till föreläsningar, arbete eller kaffe. På vintern blir den gröna linjen ett streck av färg i det vita.",
      "Filmen följer färden genom centrala Lund utan att skynda. Det är samma sträcka som många tar varje dag — men sedd med lite mer tid och uppmärksamhet.",
    ],
    desktopSrc: "/media/video/city-tram-1600.mp4",
    mobileSrc: "/media/video/city-tram-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "julnatten-i-lund",
    title: "Julnatten i Lund",
    kicker: "Jul · 06",
    location: "Lund",
    durationSeconds: 10,
    poster: "/media/video/posters/festive-tram.jpg",
    alt: "Spårvagn passerar en juldekorerad byggnad i kvällsljus",
    summary: "Ljus, juldekorationer och en stad som håller värmen.",
    description:
      "Julnatten i Lund med varma fönster, dekorationer och spårvagnen som passerar genom kvällen. En film om stadens ljus och gemenskap i december.",
    story: [
      "I december tänds Lund på ett annat sätt. Skyltfönster, julstjärnor och lampor längs gatorna gör att mörkret känns mindre. Filmen fångar den där stunden då staden går från vardag till jul.",
      "Julnatten hör till kollektionen lika mycket som Domkyrkan gör. Det är här hoodien används: på väg mellan marknaden, middagen och hemmet, med kylan mot kinderna och ljuset i ögonvrån.",
    ],
    desktopSrc: "/media/video/festive-tram-1440.mp4",
    mobileSrc: "/media/video/festive-tram-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "natten-over-lund",
    title: "Natten över Lund",
    kicker: "Efter midnatt · 07",
    location: "Lund",
    durationSeconds: 17,
    poster: "/media/video/posters/night-tram.jpg",
    alt: "Grön spårvagn glider genom Lund om natten",
    summary: "Spårvagnen, skyltfönstren och tystnaden efter midnatt.",
    description:
      "Efter midnatt blir Lund en annan stad: spårvagnen glider genom tysta gator, skyltfönstren lyser och kullerstenen blanker av snö. En nattfilm från Lund.",
    story: [
      "När biblioteken har släckt och de flesta har gått hem finns Lund fortfarande kvar. Spårvagnen rör sig genom gatorna, julskyltfönstren lyser och snön gör kullerstenen mjuk i kanten.",
      "Filmen är ett sista nedslag i staden efter midnatt. Den avslutar videokollektionen och påminner om att Lund inte stannar bara för att kvällen är över.",
    ],
    desktopSrc: "/media/video/night-tram-1600.mp4",
    mobileSrc: "/media/video/night-tram-960.mp4",
    uploadDate: "2026-11-10",
  },
  {
    id: "st-hans-park",
    title: "Vinter över Sankt Hans backar",
    kicker: "Sankt Hans · 08",
    location: "Sankt Hans park",
    durationSeconds: 12,
    poster: "/media/video/posters/st-hans-park.jpg",
    alt: "Snötäckta backar och park i Sankt Hans park i Lund",
    summary:
      "Snö över backarna och utsikt mot Öresund från norra Lund.",
    description:
      "Sankt Hans park i vinter: snötäckta backar, stilla promenadvägar och utsikt över Lund och slätten mot Öresund. En kort film från stadens största park.",
    story: [
      "Norr om Lunds centrum öppnar Sankt Hans backar upp sig mot himlen. På vintern blir kullarna en plats för pulka, promenader och en vid utsikt över staden och det skånska landskapet.",
      "Filmen fångar parken när snön ligger kvar och ljudet av staden känns avlägset. Det är samma vinter som går igen i kollektionen — men här finns plats för tystnad, rörelse och kall luft.",
    ],
    desktopSrc: "/media/video/st-hans-park-1440.mp4",
    mobileSrc: "/media/video/st-hans-park-960.mp4",
    uploadDate: "2026-11-11",
  },
  {
    id: "vinterljus-over-lund",
    title: "Vinterljus över Lund",
    kicker: "Vinterljus · 09",
    location: "Lund",
    durationSeconds: 9,
    poster: "/media/hoodie/snow-poster.jpg",
    alt: "Snöfall i vinterljus bakom Domkyrkan Hoodie",
    summary: "Snöfallet som ramar in julkollektionen i vinterljus.",
    description:
      "Ett stilla snöfall i vinterljuset över Lund — bakgrunden till Domkyrkan Hoodie och julkollektionen 2026. En kort film om kyla, ljus och snö.",
    story: [
      "Snön faller tätt men mjukt över staden. Filmen är en närbild av vinterljuset som kollektionen bygger på: kallt, stilla och med ett varmt sken någonstans i bakgrunden.",
      "Här används bilden bakom Domkyrkan Hoodie. Samma snö, samma mörker och samma känsla av att stanna en stund innan man går vidare genom Lund.",
    ],
    desktopSrc: "/media/hoodie/snow-1440.mp4",
    mobileSrc: "/media/hoodie/snow-960.mp4",
    uploadDate: "2026-11-11",
  },
];

export function getFilm(id: string): LundFilm | undefined {
  return films.find((film) => film.id === id);
}

export function formatFilmDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export const totalFilmDuration = films.reduce(
  (total, film) => total + film.durationSeconds,
  0,
);
