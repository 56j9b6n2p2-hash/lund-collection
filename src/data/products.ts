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
    subtitle: "Lund hoodie med inramat Domkyrkan-motiv på bröstet",
    price: 679,
    image: "/media/hoodie/domkyrkan-vit-1.jpg",
    imageAlt:
      "Kräm Lund hoodie med inramat Domkyrkan-motiv på bröstet och slät rygg",
    colorName: "Kräm",
    colorHex: "#d8c8b2",
    material: "Unisex · 271 g/m² · 50/50 bomull/polyester",
    badge: "Lokal pre-order",
    description:
      "En tung Lund hoodie med ett inramat Domkyrkan-motiv på bröstet och en ren rygg. Lund merch för kalla promenader mellan Domkyrkan och Lundagård — katedralen, vinterljuset och staden som reser sig över taken. Den borstade insidan håller värmen kvar under skånska vintrar. Lokalt tryckt, 679 kr och levererad till dörren i Lund i lokal pre-order.",
    details: [
      "Gildan Heavy Blend 18500 · unisex regular fit",
      "271 g/m² · 50% bomull / 50% polyester",
      "Borstad insida, dubbelfodrad huva och känguruficka",
      "OEKO-TEX® Standard 100 · lokalt tryckt i liten serie",
      "Egen hemleverans i Lund innan jul · betala med Swish eller utan betalning",
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
      "kräm",
      "stortorget",
      "lund merch",
      "merch lund",
      "merch från lund",
      "lund kläder",
      "lund hoodie",
      "hoodie lund",
      "julklapp lund",
      "årets julklapp lund 2026",
      "julkläder lund",
      "kläder lund",
      "046 merch",
      "mårtenstorget",
      "klostergården",
      "linero",
      "norra fäladen",
      "tuna",
      "lundsnation",
      "lth",
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
