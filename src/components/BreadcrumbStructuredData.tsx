import { useEffect } from "react";

const SITE_URL = "https://kollektionenavlund.se";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function BreadcrumbStructuredData({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, [items]);

  return null;
}
