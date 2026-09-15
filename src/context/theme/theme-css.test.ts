import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Resolved from the vitest root rather than import.meta.url: this suite also
// runs under the react18 config, whose transform leaves import.meta.url as a
// non-file URL and makes fileURLToPath throw before a single test runs.
const themeCss = readFileSync(join(process.cwd(), "src/theme.css"), "utf8");

/**
 * 🔴 `color-scheme` is the ONLY thing the browser consults when it paints the
 * controls we do not draw ourselves — the date/datetime picker indicator and
 * its popup, `<select>` popups, spin buttons, autofill, the canvas behind the
 * page. Our dark mode is a `.dark` CLASS, which the UA cannot see.
 *
 * Without these two declarations the browser believes every page is light and
 * paints a near-black calendar glyph onto a near-black input. That shipped, and
 * the owner reported it (T152) as one icon; it was one visible instance of a
 * whole class of native controls being painted for the wrong mode.
 *
 * Asserted here rather than in a render because no jsdom test and no contact
 * sheet can see a UA-painted control: the glyph is not in the DOM, and a
 * headless screenshot of a native picker is not something the matrix captures.
 * The declaration existing is the only part that is checkable in CI.
 */
describe("theme.css declares the page's colour scheme to the browser", () => {
  const block = (selector: string): string => {
    // The last occurrence, because `.dark` appears in comments above its rule.
    const at = themeCss.lastIndexOf(`${selector} {`);
    if (at === -1) throw new Error(`no ${selector} rule in theme.css`);
    const end = themeCss.indexOf("}", at);
    return themeCss.slice(at, end);
  };

  it("says light on the root", () => {
    expect(block(":root")).toMatch(/color-scheme:\s*light/);
  });

  it("says dark in the dark block, beside the tokens it belongs with", () => {
    expect(block(".dark")).toMatch(/color-scheme:\s*dark/);
  });

  // 🔴 Both halves, or it is worse than neither. A page that declares only
  // `light` pins every dark page to light-mode native controls even when the
  // OS is dark — which is the same bug with the fallback removed.
  it("declares both, never one", () => {
    const declarations = themeCss.match(/color-scheme:\s*\w+/g) ?? [];
    expect(declarations).toHaveLength(2);
    expect(new Set(declarations.map((d) => d.split(":")[1]?.trim()))).toEqual(
      new Set(["light", "dark"]),
    );
  });

  // The dark rule must come after the light one: `:root` and `.dark` have equal
  // specificity, so source order is the only thing that decides which wins on
  // an <html class="dark">. Every colour token in this file already relies on
  // that; this keeps color-scheme on the same footing.
  it("puts the dark declaration after the light one, since specificity ties", () => {
    expect(themeCss.indexOf("color-scheme: dark")).toBeGreaterThan(
      themeCss.indexOf("color-scheme: light"),
    );
  });
});
