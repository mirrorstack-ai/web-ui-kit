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

  it("returns an empty string for an unparseable date", () => {
    expect(formatDate("not-a-date")).toBe("");
  });

  it.each(["xx-Fake", "!!!"])(
    "falls back to the runtime locale for locale tag %s",
    (locale) => {
      expect(() => formatDate("2026-04-29T12:00:00Z", locale)).not.toThrow();
      expect(formatDate("2026-04-29T12:00:00Z", locale)).not.toBe("");
    },
  );
});

describe("formatRelativeDate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function setNow(dateStr: string) {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(dateStr));
  }

  it("returns 'today' for the current date", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-28T08:00:00Z")).toBe("today");
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
        "yesterday",
      );
    },
  );

  it("formats relative dates in Traditional Chinese", () => {
    setNow("2026-04-28T12:00:00Z");
    expect(formatRelativeDate("2026-04-27T12:00:00Z", "zh-TW")).toContain(
      "昨",
    );
  });
});
