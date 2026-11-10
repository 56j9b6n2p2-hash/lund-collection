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
};

export const products: Product[] = [
  {
    id: "domkyrkan-hoodie",
    name: "Domkyrkan Hoodie",
    subtitle: "Tung fleece, mjuk insida",
    price: 1290,
    image: "/media/products/hoodie.jpg",
    imageAlt: "Ung kvinna i ljus hoodie på en stig genom skogen",
    colorName: "Benvit",
    colorHex: "#e8dfd0",
    material: "Unisex · 480 g ekologisk bomull",
    badge: "Nyhet",
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
    badge: "Bästsäljare",
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
