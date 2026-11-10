import { useEffect } from "react";
import type { Product } from "@/data/products";

const SITE_URL = "https://kollektionenavlund.se";

export function ProductStructuredData({ product }: { product: Product }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "product-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/shop/${product.id}#product`,
          name: product.name,
          image: [`${SITE_URL}${product.image}`],
          description: product.description,
          sku: product.id,
          category: "Apparel & Accessories > Clothing > Hoodies",
          brand: {
            "@type": "Brand",
            name: "Kollektionen av Lund",
          },
          color: product.colorName,
          material: product.material,
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/shop/${product.id}`,
            priceCurrency: "SEK",
            price: product.price,
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@type": "Organization",
              name: "Kollektionen av Lund",
            },
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/shop/${product.id}#breadcrumbs`,
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
              name: "Julkollektionen",
              item: `${SITE_URL}/shop`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: `${SITE_URL}/shop/${product.id}`,
            },
          ],
        },
      ],
    });

    document.head.appendChild(script);
    return () => script.remove();
  }, [product]);

  return null;
}
