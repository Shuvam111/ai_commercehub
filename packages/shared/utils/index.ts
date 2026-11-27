export function formatNpr(amount: number, locale = "en-NP"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "NPR", maximumFractionDigits: 0 }).format(amount);
}
