export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  imageAlt: string;
  colorName: string;
  colorHex: string;
  material: string;
  badge?: string;
  description: string;
  details: string[];
  tags: string[];
  place: {
    name: string;
    image: string;
    alt: string;
    copy: string;
  };
};

export const products: Product[] = [
  {
    id: "domkyrkan-hoodie",
    name: "Domkyrkan Hoodie",
    subtitle: "Lund hoodie med julmarknad fram och domkyrka bak",
    price: 1290,
    image: "/media/hoodie/domkyrkan-vit-1.jpg",
    imageAlt:
      "Vintervit Lund hoodie med julmarknaden på bröstet och Lunds domkyrka på ryggen",
    colorName: "Vintervit",
    colorHex: "#dcd7c1",
    material: "Unisex · 271 g/m² · 50/50 bomull/polyester",
    badge: "Juldrop",
    description:
      "En tung Lund hoodie med julmarknaden på bröstet och Lunds domkyrka i kvällsljus på ryggen. Lund merch för kalla promenader mellan Domkyrkan och Lundagård — granen, ljusen och katedralen som reser sig över taken. Den borstade insidan håller värmen kvar under skånska vintrar.",
    details: [
      "Gildan Heavy Blend 18500 · unisex regular fit",
      "271 g/m² · 50% bomull / 50% polyester",
      "Borstad insida, dubbelfodrad huva och känguruficka",
      "OEKO-TEX® Standard 100 · tryckt på beställning i EU",
    ],
    tags: [
      "hoodie",
      "tröja",
      "unisex",
      "bomull",
      "jul",
      "domkyrkan",
      "katedral",
      "katedraltryck",
      "julmarknad",
      "vintervit",
      "stortorget",
      "lund merch",
      "merch lund",
      "merch från lund",
      "lund kläder",
      "lund hoodie",
      "hoodie lund",
    ],
    place: {
      name: "Domkyrkan",
      image: "/media/lund/winter-domkyrkan.jpg",
      alt: "Lunds domkyrka i snö och vinterljus",
      copy: "Katedralen som rest sig över Lund i nio sekler. I december lyser fönstren varmt mot snön, och tornen syns långt över taken.",
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export const sekFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

export function formatSek(value: number) {
  return sekFormatter.format(value);
}
