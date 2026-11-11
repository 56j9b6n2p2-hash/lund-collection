import { useEffect } from "react";
import { heroMontage, type LundFilm } from "@/data/films";

const SITE_URL = "https://kollektionenavlund.se";

type VideoData = {
  title: string;
  description: string;
  poster: string;
  uploadDate: string;
  durationSeconds: number;
  desktopSrc: string;
  url: string;
};

function absoluteUrl(value: string) {
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function buildVideoObject(video: VideoData) {
  return {
    "@type": "VideoObject",
    "@id": `${video.url}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.poster)],
    uploadDate: video.uploadDate,
    duration: `PT${video.durationSeconds}S`,
    contentUrl: absoluteUrl(video.desktopSrc),
    url: video.url,
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

/**
 * Kept for the old per-film component. The public /film route no longer renders
 * individual watch pages; it uses one VideoObject for the combined montage.
 */
export function FilmStructuredData({ film }: { film: LundFilm }) {
  useEffect(() => {
    const script = document.createElement("script");
    const url = `${SITE_URL}/film/${film.id}`;
    script.type = "application/ld+json";
    script.id = "film-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        buildVideoObject({
          title: film.title,
          description: film.description,
          poster: film.poster,
          uploadDate: film.uploadDate,
          durationSeconds: film.durationSeconds,
          desktopSrc: film.desktopSrc,
          url,
        }),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
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
              name: "Filmen",
              item: `${SITE_URL}/film`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: film.title,
              item: url,
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

/**
 * One page, one video: the combined background montage on /film. There are no
 * ItemList entries for the individual clips anymore.
 */
export function FilmPageStructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    const url = `${SITE_URL}/film`;
    script.type = "application/ld+json";
    script.id = "film-page-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: "Vinter över Lund — en sammanhängande film",
          description: heroMontage.description,
          inLanguage: "sv-SE",
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(heroMontage.poster),
          },
          mainEntity: {
            "@id": `${url}#video`,
          },
        },
        buildVideoObject({
          title: heroMontage.title,
          description: heroMontage.description,
          poster: heroMontage.poster,
          uploadDate: heroMontage.uploadDate,
          durationSeconds: heroMontage.durationSeconds,
          desktopSrc: heroMontage.desktopSrc,
          url,
        }),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
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
              name: "Filmen",
              item: url,
            },
          ],
        },
      ],
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
