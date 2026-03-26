/**
 * Format a date value for display.
 *
 * @param date - ISO string, Date object, or epoch timestamp
 * @param options - Intl.DateTimeFormat options (defaults to "short" month, numeric day & year)
 * @returns Formatted date string, e.g. "Mar 20, 2026"
 */
export function formatDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "Invalid date";
  }

  const defaults: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return d.toLocaleDateString("en-US", options ?? defaults);
}
