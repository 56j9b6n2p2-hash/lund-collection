export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  galleryImages: string[];
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
    price: 529,
    image: "/media/hoodie/lund-hoodie-domkyrkan-kram-fram.jpg",
    galleryImages: [
      "/media/hoodie/lund-hoodie-domkyrkan-kram-fram.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-kram-bak.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-oliv-fram.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-oliv-bak.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-svart-fram.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-svart-bak.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-ljusgra-fram.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-ljusgra-bak.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-bordeaux-fram.jpg",
      "/media/hoodie/lund-hoodie-domkyrkan-bordeaux-bak.jpg",
    ],
    imageAlt:
      "Kräm Lund hoodie med inramat Domkyrkan-motiv – Lund merch och Lund tröja från Kollektionen av Lund",
    colorName: "Kräm",
    colorHex: "#d8c8b2",
    material: "Unisex · 271 g/m² · 50/50 bomull/polyester",
    badge: "Lokal pre-order",
    description:
      "En tung Lund hoodie med ett inramat Domkyrkan-motiv på bröstet och en ren rygg. Kollektionen av Lund gör Lund merch för kalla promenader mellan Domkyrkan, Lundagård och Stortorget – en Lund tröja för dig som vill bära med dig staden. Den borstade insidan håller värmen under skånska vintrar, och plagget fungerar lika bra som vardagsplagg som julklapp med Lund-motiv. Hoodien är lokal pre-order för 529 kr, tryckt i liten serie och levererad personligen till dörren i Lund innan jul. Ett unikt presenttips till studenter, Lundabor och alla med Lund i hjärtat.",
    details: [
      "Gildan Heavy Blend 18500 · unisex regular fit",
      "271 g/m² · 50% bomull / 50% polyester",
      "Borstad insida, dubbelfodrad huva och känguruficka",
      "OEKO-TEX® Standard 100 · lokalt tryckt i liten serie",
      "Egen hemleverans i Lund innan jul · betala med Klarna, kort, Amazon Pay eller Apple Pay – eller utan betalning",
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
      "lund merch sverige",
      "merch lund",
      "merch från lund",
      "lund kläder",
      "lund kläder online",
      "kläder med lund-motiv",
      "lund sweatshirt",
      "lund tröja",
      "köp lund tröja",
      "lund hoodie",
      "köp lund hoodie",
      "hoodie lund",
      "souvenir lund kläder",
      "lund present",
      "present till någon som älskar lund",
      "julklapp lund",
      "julklapp från lund",
      "unik julklapp lund",
      "julklapp med lund-motiv",
      "lund jultröja",
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
