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
      image: "/media/lund/cathedral.jpg",
      alt: "Lunds domkyrka i snö och kvällsljus",
      copy: "Katedralen som rest sig över Lund i nio sekler. I december lyser fönstren varmt mot snön, och tornen syns långt över taken.",
    },
  },
  {
    id: "lundagard-tee",
    name: "Lundagård Tee",
    subtitle: "Kraftig trikå, rak passform",
    price: 590,
    image: "/media/products/tee.jpg",
    imageAlt:
      "Modell i vit t-shirt mot en varm, neutral bakgrund i mjukt ljus",
    colorName: "Vintervit",
    colorHex: "#f2eee6",
    material: "Unisex · 100% ekologisk bomull",
    description:
      "En t-shirt med tyngd i tyget och en rak, tidlös passform. Tillräckligt enkel för vardag och tillräckligt genomtänkt för att bli den du tar fram varje gång.",
    details: [
      "Unisex · rak passform",
      "220 g ekologisk bomull",
      "Förstärkt krage",
      "Tillverkad i Portugal",
    ],
    tags: [
      "tee",
      "t-shirt",
      "unisex",
      "bomull",
      "jul",
      "lundagård",
      "vintervit",
    ],
    place: {
      name: "Lundagård",
      image: "/media/lund/lundagard.jpg",
      alt: "Lundagårds grönska vid Lunds universitet",
      copy: "Gruset, träden och genvägarna mellan föreläsningarna. Lundagård är staden i miniatyr — alltid på väg någonstans.",
    },
  },
  {
    id: "stortorget-cap",
    name: "Stortorget Cap",
    subtitle: "Tvättad twill, mjuk skärm",
    price: 490,
    image: "/media/products/cap.jpg",
    imageAlt: "Modell i sandfärgad keps i vinterljus",
    colorName: "Sand",
    colorHex: "#cdb896",
    material: "One size · Justerbar rem",
    badge: "Favorit",
    description:
      "En mjuk, tvättad twillkeps med låg profil och justerbar rem. Sandfärgen tar upp ljuset från Stortorget en tidig decembermorgon.",
    details: [
      "One size · justerbar rem",
      "Tvättad bomullstwill",
      "Låg profil och mjuk skärm",
      "Tillverkad i Portugal",
    ],
    tags: ["cap", "keps", "accessoar", "jul", "stortorget", "sand", "twill"],
    place: {
      name: "Stortorget",
      image: "/media/lund/stortorget.jpg",
      alt: "Rött tegel och staty vid Stortorget i Lund",
      copy: "Stadens mötesplats, där ljuset tänds först. En stenläggning som håller kvar värmen från alla som passerar.",
    },
  },
  {
    id: "nattvandring-beanie",
    name: "Nattvandring Beanie",
    subtitle: "Fin merinoull, dubbel kant",
    price: 390,
    image: "/media/products/beanie.jpg",
    imageAlt: "Porträtt av modell i mörk stickad mössa i svartvitt",
    colorName: "Midnattsblå",
    colorHex: "#1c2b3a",
    material: "One size · 100% merinoull",
    description:
      "En finstickad mössa i mjuk merinoull med dubbel kant. Gjord för sena turer genom Lund när biblioteken har släckt och kullerstenen blanker av regn.",
    details: [
      "One size · dubbel kant",
      "100% merinoull",
      "Mjuk, temperaturreglerande stickning",
      "Tillverkad i Portugal",
    ],
    tags: [
      "beanie",
      "mössa",
      "accessoar",
      "jul",
      "merinoull",
      "natt",
      "midnattsblå",
    ],
    place: {
      name: "Natten över Lund",
      image: "/media/video/posters/night-tram.jpg",
      alt: "Grön spårvagn genom Lund om natten",
      copy: "När staden blir tyst tar Lund på sig sitt eget ljus: spårvagnen, skyltfönstren och cyklarnas lampor genom mörkret.",
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
