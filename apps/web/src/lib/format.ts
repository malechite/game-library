const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const wholeCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const shortDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** "$1,234.50", or an em dash when there is no value. */
export const formatCurrency = (value: number | null | undefined): string =>
  value === null || value === undefined ? "—" : currency.format(value);

/** "$23,267" — for large totals where cents are noise. */
export const formatTotal = (value: number): string => wholeCurrency.format(value);

/** "Aug 6, 2022" from an ISO date or timestamp; em dash when missing. */
export const formatDate = (value: string | null | undefined): string => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : shortDate.format(date);
};

/** Today as an ISO date (YYYY-MM-DD) in the user's time zone. */
export const todayIsoDate = (): string => {
  const now = new Date();
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
