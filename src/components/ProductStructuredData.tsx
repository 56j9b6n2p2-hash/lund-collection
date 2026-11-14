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
          alternateName: [
            "Lund hoodie",
            "Lund merch hoodie",
            "Lund tröja",
            "Lund sweatshirt",
            "Domkyrkan hoodie",
          ],
          url: `${SITE_URL}/shop/${product.id}`,
          image: product.galleryImages.map((image) => `${SITE_URL}${image}`),
          description: product.description,
          sku: product.id,
          mpn: "LUND-DOMKYRKAN-529",
          category: "Apparel & Accessories > Clothing > Shirts & Tops > Hoodies",
          brand: {
            "@type": "Brand",
            name: "Kollektionen av Lund",
            url: SITE_URL,
          },
          color: product.colorName,
          material: product.material,
          audience: {
            "@type": "PeopleAudience",
            suggestedGender: "Unisex",
            suggestedMinAge: 16,
          },
          keywords: product.tags.join(", "),
          offers: {
            "@type": "Offer",
            "@id": `${SITE_URL}/shop/${product.id}#offer`,
            url: `${SITE_URL}/shop/${product.id}`,
            priceCurrency: "SEK",
            price: product.price,
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@id": `${SITE_URL}/#organization`,
            },
            areaServed: {
              "@type": "Country",
              name: "Sverige",
            },
            eligibleRegion: {
              "@type": "Country",
              name: "Sverige",
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
