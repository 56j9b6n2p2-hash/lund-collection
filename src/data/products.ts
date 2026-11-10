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
    subtitle: "Julmarknad fram, domkyrka bak",
    price: 1290,
    image: "/media/hoodie/domkyrkan-vit-1.jpg",
    imageAlt:
      "Vintervit hoodie med julmarknaden på bröstet och Lunds domkyrka på ryggen",
    colorName: "Vintervit",
    colorHex: "#f2eee6",
    material: "Unisex · 271 g/m² · 50/50 bomull/polyester",
    badge: "Juldrop",
    description:
      "En tung, mjuk hoodie med julmarknaden på bröstet och Lunds domkyrka i kvällsljus på ryggen. Två motiv från samma vinterkväll i Lund — granen, ljusen och katedralen som reser sig över taken. Den borstade insidan håller värmen kvar under kalla promenader mellan Domkyrkan och Lundagård.",
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
