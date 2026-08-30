import { describe, expect, it, vi, afterEach } from "vitest";
import { formatDate, formatRelativeDate } from "./date";

describe("formatDate", () => {
  it("formats a date string", () => {
    const result = formatDate("2026-04-29");
    expect(result).toContain("Apr");
    expect(result).toContain("29");
    expect(result).toContain("2026");
  });

  it("formats an ISO datetime string", () => {
    const result = formatDate("2025-12-25T10:00:00Z");
    expect(result).toContain("Dec");
    expect(result).toContain("25");
    expect(result).toContain("2025");
  });

  it("formats with an explicit locale", () => {
    expect(formatDate("2026-04-29T12:00:00Z", "zh-TW")).toContain("月");
  });

  it("accepts custom Intl date and time options", () => {
    const result = formatDate("2026-04-29T12:34:00Z", "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    });
    expect(result).toContain("Apr 29, 2026");
    expect(result).toContain("12:34");
  });

  it("returns an empty string for an unparseable date", () => {
    expect(formatDate("not-a-date")).toBe("");
  });

  it.each(["xx-Fake", "!!!"])(
    "falls back to the runtime locale for locale tag %s",
    (locale) => {
      expect(() => formatDate("2026-04-29T12:00:00Z", locale)).not.toThrow();
      expect(formatDate("2026-04-29T12:00:00Z", locale)).toBe(
        formatDate("2026-04-29T12:00:00Z"),
      );
    },
  );

  // Comparing output against the no-locale call is not sufficient on its own:
  // on a runner whose default is en-US, hard-coding "en-US" in the catch branch
  // produces a byte-identical string. Only "!!!" is structurally invalid enough
  // to throw and actually reach the fallback ("xx-Fake" is a well-formed tag and
  // is passed straight through), so the contract is asserted here directly:
  // the fallback must hand the formatter `undefined`.
  it("passes undefined to the formatter when falling back", () => {
    const intl = Intl as unknown as {
      DateTimeFormat: typeof Intl.DateTimeFormat;
    };
    const Original = intl.DateTimeFormat;
    const seen: (string | string[] | undefined)[] = [];
    intl.DateTimeFormat = function (
      this: unknown,
      locales?: string | string[],
      options?: Intl.DateTimeFormatOptions,
    ) {
      seen.push(locales);
      return new Original(locales, options);
    } as unknown as typeof Intl.DateTimeFormat;
    try {
      formatDate("2026-04-29T12:00:00Z", "!!!");
      expect(seen.at(0)).toBe("!!!");
      expect(seen.at(-1)).toBeUndefined();
    } finally {
      intl.DateTimeFormat = Original;
    }
  });
});

describe("formatRelativeDate", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  function setNow(dateStr: string, timeZone?: string) {
    if (timeZone) vi.stubEnv("TZ", timeZone);
    vi.useFakeTimers();
    vi.setSystemTime(new Date(dateStr));
  }

  it("uses the local calendar date rather than elapsed hours", () => {
    setNow("2026-04-28T12:00:00Z", "Etc/GMT+12");
    expect(formatRelativeDate("2026-04-28T08:00:00Z", "en")).toBe(
      "yesterday",
    );
  });

  it("returns 'today' for a future time on the same local calendar day", () => {
    setNow("2026-04-28T12:00:00-04:00", "America/New_York");
    expect(formatRelativeDate("2026-04-28T13:00:00-04:00", "en")).toBe(
      "today",
    );
  });

  it("returns 'yesterday' across local midnight even when one hour elapsed", () => {
    setNow("2026-04-28T00:30:00-04:00", "America/New_York");
    expect(formatRelativeDate("2026-04-27T23:30:00-04:00", "en")).toBe(
      "yesterday",
    );
  });

  it("returns 'yesterday' across a 23-hour DST calendar day", () => {
    setNow("2026-03-08T12:00:00-04:00", "America/New_York");
    expect(formatRelativeDate("2026-03-07T12:00:00-05:00", "en")).toBe(
      "yesterday",
    );
  });

  it("uses the week bucket for seven calendar days across DST", () => {
    setNow("2026-03-10T12:00:00-04:00", "America/New_York");
    expect(formatRelativeDate("2026-03-03T12:00:00-05:00", "en")).toBe(
      "1 week ago",
    );
  });

  it("returns 'yesterday' across a date-line offset change", () => {
    // Pacific/Kwajalein moved across the date line, so these two consecutive
    // local dates have midnights 47 hours apart. Any approach that divides the
    // elapsed gap between local midnights lands on 1.96 and rounds to 2 days;
    // only comparing civil dates as ordinals gets this right.
    setNow("1969-10-01T12:00:00-12:00", "Pacific/Kwajalein");
    expect(formatRelativeDate("1969-09-30T12:00:00+11:00", "en")).toBe(
      "yesterday",
    );
  });

  it("returns 'yesterday' across the year-100 boundary", () => {
    // Guards the Date.UTC two-digit-year mapping: Date.UTC(99, ...) means 1999,
    // which would put these two consecutive days ~700,000 days apart.
    setNow("0100-01-01T12:00:00Z", "UTC");
    expect(formatRelativeDate("0099-12-31T12:00:00Z", "en")).toBe("yesterday");
  });

  it("returns 'yesterday' across a 25-hour fall-back DST day", () => {
    setNow("2026-11-02T12:00:00-05:00", "America/New_York");
    expect(formatRelativeDate("2026-11-01T12:00:00-04:00", "en")).toBe(
      "yesterday",
    );
  });

  it("returns 'yesterday' for one day ago", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-27T12:00:00Z")).toBe("yesterday");
  });

  it("returns days ago for 2-6 days", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-25T12:00:00Z")).toBe("3 days ago");
    expect(formatRelativeDate("2026-04-22T12:00:00Z")).toBe("6 days ago");
  });

  it("returns weeks ago for 7-29 days", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-20T12:00:00Z")).toBe("1 week ago");
    expect(formatRelativeDate("2026-04-14T12:00:00Z")).toBe("2 weeks ago");
  });

  it("returns formatted date for 30+ days ago", () => {
    setNow("2026-04-28T12:00:00Z");
    const result = formatRelativeDate("2026-03-14T12:00:00Z");
    expect(result).toContain("Mar");
    expect(result).toContain("14");
  });

  it("uses the locale for dates 30+ days ago", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(
      formatRelativeDate("2026-03-14T12:00:00Z", "zh-TW"),
    ).toContain("月");
  });

  it("handles boundary at exactly 7 days", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-21T12:00:00Z")).toBe("1 week ago");
  });

  it("handles boundary at exactly 30 days", () => {
    setNow("2026-04-28T12:00:00Z");
    const result = formatRelativeDate("2026-03-29T12:00:00Z");
    expect(result).toContain("Mar");
    expect(result).toContain("29");
  });

  it("returns an empty string for an unparseable date", () => {
    expect(formatRelativeDate("not-a-date")).toBe("");
  });

  it("formats future dates with relative day wording", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-05-01T12:00:00Z")).toBe("in 3 days");
  });

  it.each(["xx-Fake", "!!!"])(
    "falls back to the runtime locale for locale tag %s",
    (locale) => {
      setNow("2026-04-28T12:00:00Z");
      expect(() =>
        formatRelativeDate("2026-04-27T12:00:00Z", locale),
      ).not.toThrow();
      expect(formatRelativeDate("2026-04-27T12:00:00Z", locale)).toBe(
        formatRelativeDate("2026-04-27T12:00:00Z"),
      );
    },
  );

  // Same contract as formatDate above. vi.spyOn cannot be used on
  // Intl.RelativeTimeFormat: it wraps the class in a plain call, so `new` raises
  // a TypeError instead of the RangeError the fallback keys on. A hand-rolled
  // function wrapper is constructible and preserves the original's throwing.
  it("passes undefined to the formatter when falling back", () => {
    setNow("2026-04-28T12:00:00Z");
    // `Intl.RelativeTimeFormat` is readonly in the lib types, so reach it
    // through a mutable view rather than suppressing the error at each site.
    const intl = Intl as unknown as {
      RelativeTimeFormat: typeof Intl.RelativeTimeFormat;
    };
    const Original = intl.RelativeTimeFormat;
    const seen: (string | string[] | undefined)[] = [];
    intl.RelativeTimeFormat = function (
      this: unknown,
      locales?: string | string[],
      options?: Intl.RelativeTimeFormatOptions,
    ) {
      seen.push(locales);
      return new Original(locales, options);
    } as unknown as typeof Intl.RelativeTimeFormat;
    try {
      formatRelativeDate("2026-04-27T12:00:00Z", "!!!");
      expect(seen.at(0)).toBe("!!!");
      expect(seen.at(-1)).toBeUndefined();
    } finally {
      intl.RelativeTimeFormat = Original;
    }
  });

  it("formats relative dates in Traditional Chinese", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-27T12:00:00Z", "zh-TW")).toContain(
      "昨",
    );
  });
});
