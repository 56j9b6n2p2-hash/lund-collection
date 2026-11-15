const GOOGLE_ADS_ID = "AW-18419317306";

const conversionLabels = {
  addToCart: "E0w9CIDAgLkdELr0gc9E",
  beginCheckout: "ftSZCP2_gLkdELr0gc9E",
  purchase: "edGyCMvk_rgdELr0gc9E",
} as const;

export type GoogleAdsConversion =
  keyof typeof conversionLabels;

type Gtag = (...args: unknown[]) => void;

export function trackGoogleAdsConversion(
  conversion: GoogleAdsConversion,
  params?: {
    transaction_id?: string;
    value?: number;
    currency?: string;
  },
) {
  if (typeof window === "undefined") return;

  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabels[conversion]}`,
    ...(params?.transaction_id
      ? { transaction_id: params.transaction_id }
      : {}),
    ...(typeof params?.value === "number" ? { value: params.value } : {}),
    ...(params?.currency ? { currency: params.currency } : {}),
  });
}
