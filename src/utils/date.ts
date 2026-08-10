function withLocaleFallback(
  locale: string | undefined,
  format: (resolvedLocale: string | undefined) => string,
): string {
  try {
    return format(locale);
  } catch (error) {
    if (!(error instanceof RangeError) || locale === undefined) throw error;
    return format(undefined);
  }
}

/**
 * Formats a date for display in the requested locale, or the runtime default
 * when no locale is supplied. Invalid date strings return an empty UI label.
 */
export function formatDate(dateStr: string, locale?: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  return withLocaleFallback(locale, (resolvedLocale) =>
    date.toLocaleDateString(resolvedLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );
}

/**
 * Formats a date relative to now in the requested locale, or the runtime
 * default when no locale is supplied. Dates from today through 29 days ago use
 * relative wording, while older dates use an absolute month and day. Future
 * dates deliberately use relative day wording (for example, "in 3 days").
 * Invalid date strings return an empty UI label.
 */
export function formatRelativeDate(dateStr: string, locale?: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  // Compare civil dates as ordinals rather than measuring elapsed time between
  // two local midnights. The components read here are already local; `Date.UTC`
  // is only an encoder, and because UTC has no offset changes its result is an
  // exact multiple of a day, so the difference is an exact integer. Measuring
  // the gap between local midnights instead would carry that day's UTC offset
  // shift into the quotient, which no amount of rounding fixes once an offset
  // moves by more than half a day (a date-line change moves it by a full day).
  const civilDay = (value: Date) =>
    Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86400000;
  const diffDays = civilDay(now) - civilDay(date);

  if (diffDays < 7) {
    return withLocaleFallback(locale, (resolvedLocale) =>
      new Intl.RelativeTimeFormat(resolvedLocale, { numeric: "auto" }).format(
        -diffDays,
        "day",
      ),
    );
  }
  if (diffDays < 30) {
    return withLocaleFallback(locale, (resolvedLocale) =>
      new Intl.RelativeTimeFormat(resolvedLocale, { numeric: "always" }).format(
        -Math.floor(diffDays / 7),
        "week",
      ),
    );
  }

  return withLocaleFallback(locale, (resolvedLocale) =>
    date.toLocaleDateString(resolvedLocale, {
      month: "short",
      day: "numeric",
    }),
  );
}
