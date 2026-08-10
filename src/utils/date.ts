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
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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
