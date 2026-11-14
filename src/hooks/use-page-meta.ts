import { useEffect } from "react";

const SITE_URL = "https://kollektionenavlund.se";
const SITE_NAME = "Kollektionen av Lund";
const DEFAULT_IMAGE = "/media/video/posters/winter-drone.jpg";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "product" | "video.other";
  noindex?: boolean;
};

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function imageMimeType(value: string) {
  const clean = value.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".webp")) return "image/webp";
  if (clean.endsWith(".avif")) return "image/avif";
  if (clean.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

function setMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setAlternate(hreflang: string, href: string) {
  const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function usePageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt,
  imageWidth = 1440,
  imageHeight = 810,
  type = "website",
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    const cleanPath = path.split("#")[0].split("?")[0] || "/";
    const url = absoluteUrl(cleanPath === "" ? "/" : cleanPath);
    const imageUrl = absoluteUrl(image);
    const imageDescription = imageAlt ?? title;

    document.title = title;
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "sv_SE");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:secure_url", imageUrl);
    setMeta("property", "og:image:type", imageMimeType(imageUrl));
    setMeta("property", "og:image:alt", imageDescription);
    setMeta("property", "og:image:width", String(imageWidth));
    setMeta("property", "og:image:height", String(imageHeight));

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);
    setMeta("name", "twitter:image:alt", imageDescription);

    setCanonical(url);
    setAlternate("sv-SE", url);
    setAlternate("x-default", url);
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    type,
    noindex,
  ]);
}
