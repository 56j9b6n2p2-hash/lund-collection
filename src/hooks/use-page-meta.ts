import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    const ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]',
    );
    const twitterTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]',
    );
    const twitterDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:description"]',
    );
    const canonical =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    const previous = {
      title: document.title,
      description: metaDescription?.content,
      ogTitle: ogTitle?.content,
      ogDescription: ogDescription?.content,
      ogUrl: ogUrl?.content,
      twitterTitle: twitterTitle?.content,
      twitterDescription: twitterDescription?.content,
      canonical: canonical?.href,
    };

    const url = `https://kollektionenavlund.se${path}`;
    document.title = title;
    metaDescription?.setAttribute("content", description);
    ogTitle?.setAttribute("content", title);
    ogDescription?.setAttribute("content", description);
    ogUrl?.setAttribute("content", url);
    twitterTitle?.setAttribute("content", title);
    twitterDescription?.setAttribute("content", description);
    canonical?.setAttribute("href", url);

    return () => {
      document.title = previous.title;
      if (previous.description !== undefined) {
        metaDescription?.setAttribute("content", previous.description);
      }
      if (previous.ogTitle !== undefined) {
        ogTitle?.setAttribute("content", previous.ogTitle);
      }
      if (previous.ogDescription !== undefined) {
        ogDescription?.setAttribute("content", previous.ogDescription);
      }
      if (previous.ogUrl !== undefined) {
        ogUrl?.setAttribute("content", previous.ogUrl);
      }
      if (previous.twitterTitle !== undefined) {
        twitterTitle?.setAttribute("content", previous.twitterTitle);
      }
      if (previous.twitterDescription !== undefined) {
        twitterDescription?.setAttribute(
          "content",
          previous.twitterDescription,
        );
      }
      if (previous.canonical !== undefined) {
        canonical?.setAttribute("href", previous.canonical);
      }
    };
  }, [title, description, path]);
}
