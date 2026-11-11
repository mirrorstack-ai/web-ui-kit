import { describe, expect, it } from "vitest";

import { resolveLocale, fromQuery } from "../axes.js";
import { HOST_SETTINGS_COPY, SURFACE_FRAME, hostSettingsCopy } from "../hostChrome.js";

// Both of the facts asserted here were got wrong by a hand-rolled preview, and
// both were reported as defects in the MODULE rather than the harness.

describe("the frame the console uses", () => {
  it("is max-w-5xl, and not something narrower", () => {
    // 🔴 NOT "FULL WIDTH", AND NOT max-w-3xl. web-applications' ModuleMount
    // wraps every mount in `max-w-5xl mx-auto`, inside a tab shell that does
    // the same. ai-assistant's first preview used max-w-3xl — NARROWER than
    // the console — which is what made the owner call the page cramped: a
    // verdict about the harness, delivered as a verdict about the page.
    expect(SURFACE_FRAME.settings).toContain("max-w-5xl");
    expect(SURFACE_FRAME.settings).toContain("mx-auto");
    for (const frame of Object.values(SURFACE_FRAME)) {
      expect(frame, "no surface may be narrower than the console's").not.toMatch(
        /max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl)\b/,
      );
    }
  });
});

describe("the console's copy", () => {
  it("carries a title and a {name} subtitle for every locale it claims", () => {
    for (const [locale, copy] of Object.entries(HOST_SETTINGS_COPY)) {
      expect(copy.title, locale).not.toBe("");
      // The subtitle without its placeholder is a subtitle that names no
      // module — "管理 " — which is worse than no header at all.
      expect(copy.manage, locale).toContain("{name}");
    }
  });

  it("falls back rather than rendering a message key", () => {
    // A preview showing `moduleSettings.title` teaches a reviewer nothing
    // about the page, and it looks like a module bug.
    expect(hostSettingsCopy("zh-TW").title).toBe("設定");
    expect(hostSettingsCopy("zh-Hant-TW").title).toBe("設定");
    expect(hostSettingsCopy("de-DE").title).toBe("Settings");
    expect(hostSettingsCopy("").title).toBe("Settings");
  });
});

describe("the locale axis", () => {
  it("follows the browser when the query string says nothing", () => {
    // 🔴 THIS IS WHAT MAKES A PREFLIGHT SHEET MEAN ANYTHING. /ui-preflight
    // renders the owner's matrix by driving a browser CONTEXT — it sets the
    // language, not this page's query string — and it asks for "en" while a
    // module ships "en-US". ai-assistant's preview read only ?locale=, so all
    // four "en" cells of every sheet rendered Chinese: half the matrix
    // asserted nothing while the report said PASS.
    expect(resolveLocale(["zh-TW", "en-US"], "en", "")).toBe("en-US");
    expect(resolveLocale(["zh-TW", "en-US"], "en-GB", "")).toBe("en-US");
    expect(resolveLocale(["zh-TW", "en-US"], "zh-TW", "")).toBe("zh-TW");
  });

  it("lets an explicit ?locale= win, so a review is handed over as a link", () => {
    expect(resolveLocale(["zh-TW", "en-US"], "en", "?locale=zh-TW")).toBe("zh-TW");
  });

  it("prefers an exact match over a subtag match", () => {
    // "en" must not win "en-US" when the module also ships plain "en".
    expect(resolveLocale(["en-US", "en"], "en", "")).toBe("en");
  });

  it("falls back to the first locale rather than rendering nothing", () => {
    expect(resolveLocale(["zh-TW", "en-US"], "de-DE", "")).toBe("zh-TW");
    expect(resolveLocale(["zh-TW", "en-US"], "", "?locale=fr")).toBe("zh-TW");
  });

  it("ignores a query value the module does not ship", () => {
    // An unrecognised axis value is a typo or a stale link, not a request to
    // render an empty page.
    expect(fromQuery("locale", ["zh-TW", "en-US"] as const, "?locale=klingon")).toBeNull();
    expect(fromQuery("scenario", ["configured"] as const, "?scenario=configured")).toBe(
      "configured",
    );
  });
});
