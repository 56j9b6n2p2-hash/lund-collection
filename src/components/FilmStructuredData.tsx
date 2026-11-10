import { useEffect } from "react";
import { films, type LundFilm } from "@/data/films";

const SITE_URL = "https://kollektionenavlund.se";

function absoluteUrl(value: string) {
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function videoObject(film: LundFilm) {
  const url = `${SITE_URL}/film/${film.id}`;

  return {
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: film.title,
    description: film.description,
    thumbnailUrl: [absoluteUrl(film.poster)],
    uploadDate: film.uploadDate,
    duration: `PT${film.durationSeconds}S`,
    contentUrl: absoluteUrl(film.desktopSrc),
    url,
    inLanguage: "sv-SE",
    isFamilyFriendly: true,
    genre: "Stadsfilm",
    about: {
      "@type": "Place",
      name: "Lund",
    },
    publisher: {
      "@type": "Organization",
      name: "Kollektionen av Lund",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}

export function FilmStructuredData({ film }: { film: LundFilm }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "film-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        videoObject(film),
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/film/${film.id}#breadcrumbs`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Hem",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Lunds videokollektion",
              item: `${SITE_URL}/film`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: film.title,
              item: `${SITE_URL}/film/${film.id}`,
            },
          ],
        },
      ],
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, [film]);

  return null;
}

export function FilmCollectionStructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "film-collection-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/film#collection`,
          url: `${SITE_URL}/film`,
          name: "Lunds videokollektion",
          description:
            "Sju korta filmer om Lund i vinter: Domkyrkan, spårvagnen, snöfallet och julnatten.",
          inLanguage: "sv-SE",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: "Kollektionen av Lund",
          },
        },
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/film#films`,
          numberOfItems: films.length,
          itemListElement: films.map((film, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: videoObject(film),
          })),
        },
      ],
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
