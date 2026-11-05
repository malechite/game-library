import { DateTime } from "luxon";

export type DateInput = string | Date | null | undefined;

/**
 * Convert a DateInput to a luxon DateTime
 */
const toDateTime = (value: DateInput): DateTime | null => {
  if (!value) return null;
  return typeof value === "string" ? DateTime.fromISO(value) : DateTime.fromJSDate(value);
};

/**
 * Convert a date to a relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(value: DateInput): string {
  const dt = toDateTime(value);
  if (!dt?.isValid) return "";
  return dt.toRelative() ?? "";
}

/**
 * Format a date to a full localized date/time string
 */
export function formatFullDateTime(value: DateInput): string {
  const dt = toDateTime(value);
  if (!dt?.isValid) return "";
  return dt.toLocaleString(DateTime.DATETIME_FULL);
}

/**
 * Check if a date value is valid
 */
export function isValidDate(value: DateInput): boolean {
  const dt = toDateTime(value);
  return dt?.isValid ?? false;
}

/**
 * Human-friendly age from a birthdate, e.g. "5 mo" or "3 yr". Counts completed
 * months and switches to whole years at 12 months. Returns null when the date is
 * missing, invalid, or in the future.
 * @example formatAge(fiveMonthsAgo) // "5 mo"
 * @example formatAge("2023-06-03") // "3 yr" (relative to now)
 */
export function formatAge(value: DateInput): string | null {
  const dt = toDateTime(value);
  if (!dt?.isValid) return null;
  const months = Math.floor(DateTime.now().diff(dt, "months").months);
  if (months < 0) return null;
  if (months < 12) return `${months} mo`;
  return `${Math.floor(months / 12)} yr`;
}
