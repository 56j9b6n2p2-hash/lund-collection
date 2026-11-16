export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  image: string;
  backImage: string;
  alt: string;
  backAlt: string;
};

export const hoodieColors: ProductColor[] = [
  {
    id: "dark-teal",
    name: "Dark Teal",
    hex: "#1f4948",
    image: "/media/hoodie/lund-hoodie-domkyrkan-dark-teal-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-dark-teal-bak.jpg?v=4",
    alt: "Dark Teal Lund hoodie med inramat Domkyrkan-motiv – Lund merch från Kollektionen av Lund",
    backAlt: "Dark Teal Lund hoodie med slät rygg – baksidan av Lund hoodien",
  },
  {
    id: "navy",
    name: "Navy",
    hex: "#1e2c46",
    image: "/media/hoodie/lund-hoodie-domkyrkan-navy-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-navy-bak.jpg?v=4",
    alt: "Navy Lund hoodie med inramat Domkyrkan-motiv – Lund kläder med stadsmotiv",
    backAlt: "Navy Lund hoodie med slät rygg – Lund tröja från Kollektionen av Lund",
  },
  {
    id: "stone",
    name: "Stone",
    hex: "#d8c8b2",
    image: "/media/hoodie/lund-hoodie-domkyrkan-kram-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-kram-bak.jpg?v=4",
    alt: "Stone Lund hoodie med inramat Domkyrkan-motiv – Lund merch och julklapp med Lund-motiv",
    backAlt: "Stone Lund hoodie med slät rygg – baksidan av Lund tröjan",
  },
  {
    id: "burgundy",
    name: "Burgundy",
    hex: "#5e2430",
    image: "/media/hoodie/lund-hoodie-domkyrkan-bordeaux-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-bordeaux-bak.jpg?v=4",
    alt: "Burgundy Lund hoodie med inramat Domkyrkan-motiv – unik julklapp från Lund",
    backAlt: "Burgundy Lund hoodie med slät rygg – Lund tröja för vintern",
  },
  {
    id: "grey-melange",
    name: "Grey Melange",
    hex: "#b7b5b2",
    image: "/media/hoodie/lund-hoodie-domkyrkan-ljusgra-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-ljusgra-bak.jpg?v=4",
    alt: "Grey Melange Lund hoodie med inramat Domkyrkan-motiv – Lund kläder online",
    backAlt: "Grey Melange Lund hoodie med slät rygg – Lund sweatshirt från Kollektionen av Lund",
  },
  {
    id: "dark-grey",
    name: "Dark Grey",
    hex: "#3a3d42",
    image: "/media/hoodie/lund-hoodie-domkyrkan-dark-grey-fram.jpg?v=4",
    backImage: "/media/hoodie/lund-hoodie-domkyrkan-dark-grey-bak.jpg?v=4",
    alt: "Dark Grey Lund hoodie med inramat Domkyrkan-motiv – Lund merch för vintern",
    backAlt: "Dark Grey Lund hoodie med slät rygg – baksidan av Lund hoodien",
  },
];

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
  defaultColorId: string;
  colors: ProductColor[];
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

const stoneColor = hoodieColors.find((color) => color.id === "stone")!;

export const products: Product[] = [
  {
    id: "domkyrkan-hoodie",
    name: "Domkyrkan Hoodie",
    subtitle: "Lund hoodie med inramat Domkyrkan-motiv på bröstet",
    price: 529,
    image: stoneColor.image,
    galleryImages: hoodieColors.flatMap((color) => [
      color.image,
      color.backImage,
    ]),
    imageAlt: stoneColor.alt,
    colorName: stoneColor.name,
    colorHex: stoneColor.hex,
    defaultColorId: stoneColor.id,
    colors: hoodieColors,
    material: "Unisex · 271 g/m² · 50/50 bomull/polyester",
    badge: "Lokal pre-order",
    description:
      "En tung Lund hoodie med ett inramat Domkyrkan-motiv på bröstet och en ren rygg. Kollektionen av Lund gör Lund merch för kalla promenader mellan Domkyrkan, Lundagård och Stortorget – en Lund tröja för dig som vill bära med dig staden. Den borstade insidan håller värmen under skånska vintrar, och plagget fungerar lika bra som vardagsplagg som julklapp med Lund-motiv. Hoodien är lokal pre-order för 529 kr, tryckt i liten serie och levererad personligen till dörren i Lund innan jul. Ett unikt presenttips till studenter, Lundabor och alla med Lund i hjärtat.",
    details: [
      "Gildan Heavy Blend 18500 · unisex regular fit",
      "271 g/m² · 50% bomull / 50% polyester",
      "Pullover utan dragkedja · dubbelfodrad huva, känguruficka och ribbade muddar",
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
      "stone",
      "dark teal",
      "navy",
      "burgundy",
      "grey melange",
      "dark grey",
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
