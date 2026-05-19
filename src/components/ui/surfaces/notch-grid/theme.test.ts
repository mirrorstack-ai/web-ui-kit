import { describe, expect, it } from "vitest";
import { resolveNotchTheme } from "./theme";

describe("resolveNotchTheme — defaults & auto resolution", () => {
  it("undefined theme → ghost neutral (both knobs auto)", () => {
    const r = resolveNotchTheme();
    expect(r.fill).toBe("transparent");
    expect(r.cssBackground).toBe("transparent");
    expect(r.color).toBe("var(--color-on-surface-variant)");
    expect(r.stroke).toBe("none");
    expect(r.strokeWidth).toBe(0);
    expect(r.boxShadow).toBe("none");
  });

  it("variant=primary alone → filled primary (type defaults to filled when variant set)", () => {
    const r = resolveNotchTheme({ variant: "primary" });
    expect(r.fill).toBe("var(--color-primary-container)");
    expect(r.color).toBe("var(--color-on-primary-container)");
  });

  it("type=auto + variant=auto → ghost neutral", () => {
    const r = resolveNotchTheme({ type: "auto", variant: "auto" });
    expect(r.fill).toBe("transparent");
    expect(r.color).toBe("var(--color-on-surface-variant)");
  });

  it("type=auto + variant=primary → filled primary", () => {
    const r = resolveNotchTheme({ type: "auto", variant: "primary" });
    expect(r.fill).toBe("var(--color-primary-container)");
    expect(r.color).toBe("var(--color-on-primary-container)");
  });

  it("variant=auto → resolves to neutral", () => {
    const r = resolveNotchTheme({ type: "outlined", variant: "auto" });
    expect(r.color).toBe("var(--color-on-surface-variant)");
    expect(r.stroke).toBe("var(--color-outline-variant)");
    expect(r.strokeWidth).toBe(1);
  });
});

describe("resolveNotchTheme — type=filled", () => {
  it("primary → primary-container fill, on-primary-container text", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "primary" });
    expect(r.fill).toBe("var(--color-primary-container)");
    expect(r.color).toBe("var(--color-on-primary-container)");
    expect(r.stroke).toBe("none");
    expect(r.strokeWidth).toBe(0);
    expect(r.boxShadow).toBe("none");
  });

  it("secondary, tertiary, error → matching container tokens", () => {
    expect(resolveNotchTheme({ type: "filled", variant: "secondary" }).fill)
      .toBe("var(--color-secondary-container)");
    expect(resolveNotchTheme({ type: "filled", variant: "tertiary" }).fill)
      .toBe("var(--color-tertiary-container)");
    expect(resolveNotchTheme({ type: "filled", variant: "error" }).fill)
      .toBe("var(--color-error-container)");
  });

  it("surface → surface-container; neutral → surface-container-low", () => {
    expect(resolveNotchTheme({ type: "filled", variant: "surface" }).fill)
      .toBe("var(--color-surface-container)");
    expect(resolveNotchTheme({ type: "filled", variant: "neutral" }).fill)
      .toBe("var(--color-surface-container-low)");
  });

  it("warn → warning-container (schema→kit alias)", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "warn" });
    expect(r.fill).toBe("var(--color-warning-container)");
    expect(r.color).toBe("var(--color-on-warning-container)");
  });
});

describe("resolveNotchTheme — type=outlined", () => {
  it("primary → transparent bg, primary text, 1px primary stroke", () => {
    const r = resolveNotchTheme({ type: "outlined", variant: "primary" });
    expect(r.fill).toBe("transparent");
    expect(r.color).toBe("var(--color-primary)");
    expect(r.stroke).toBe("var(--color-primary)");
    expect(r.strokeWidth).toBe(1);
    expect(r.boxShadow).toBe("none");
  });

  it("neutral / surface → outline-variant stroke", () => {
    expect(resolveNotchTheme({ type: "outlined", variant: "neutral" }).stroke)
      .toBe("var(--color-outline-variant)");
    expect(resolveNotchTheme({ type: "outlined", variant: "surface" }).stroke)
      .toBe("var(--color-outline-variant)");
  });

  it("warn → warning stroke (alias)", () => {
    expect(resolveNotchTheme({ type: "outlined", variant: "warn" }).stroke)
      .toBe("var(--color-warning)");
  });
});

describe("resolveNotchTheme — type=elevated", () => {
  it("primary → surface-container-low fill, on-surface text, m3-1 shadow, no accent bar", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "primary" });
    expect(r.fill).toBe("var(--color-surface-container-low)");
    expect(r.color).toBe("var(--color-on-surface)");
    expect(r.boxShadow).toBe("var(--shadow-m3-1)");
    expect(r.accentBar).toBeUndefined();
  });

  it("neutral drops one surface tier (container-lowest)", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "neutral" });
    expect(r.fill).toBe("var(--color-surface-container-lowest)");
  });

  it("warn → exposes accentBar=warning color for the renderer's inset stripe", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "warn" });
    expect(r.fill).toBe("var(--color-surface-container-low)");
    expect(r.accentBar).toBe("var(--color-warning)");
    expect(r.boxShadow).toBe("var(--shadow-m3-1)");
  });

  it("error → exposes accentBar=error color", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "error" });
    expect(r.accentBar).toBe("var(--color-error)");
  });
});

describe("resolveNotchTheme — type=ghost", () => {
  it("primary → transparent bg, primary text, no stroke or shadow", () => {
    const r = resolveNotchTheme({ type: "ghost", variant: "primary" });
    expect(r.fill).toBe("transparent");
    expect(r.color).toBe("var(--color-primary)");
    expect(r.stroke).toBe("none");
    expect(r.boxShadow).toBe("none");
  });

  it("neutral → on-surface-variant text", () => {
    expect(resolveNotchTheme({ type: "ghost", variant: "neutral" }).color)
      .toBe("var(--color-on-surface-variant)");
  });

  it("warn → warning text (alias)", () => {
    expect(resolveNotchTheme({ type: "ghost", variant: "warn" }).color)
      .toBe("var(--color-warning)");
  });
});

describe("resolveNotchTheme — gradient overlay", () => {
  it("gradient=0 leaves cssBackground equal to fill", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "primary", gradient: 0 });
    expect(r.cssBackground).toBe("var(--color-primary-container)");
    expect(r.fill).toBe("var(--color-primary-container)");
  });

  it("gradient>0 wraps cssBackground in a linear-gradient (fill stays solid)", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "primary", gradient: 1 });
    expect(r.cssBackground).toContain("linear-gradient(180deg");
    expect(r.cssBackground).toContain("var(--color-primary-container)");
    expect(r.cssBackground).toContain("color-mix(in oklab");
    expect(r.cssBackground).toContain("white 12%");
    // SVG fill stays solid — gradient isn't a valid SVG paint.
    expect(r.fill).toBe("var(--color-primary-container)");
  });

  it("gradient=0.5 → 6% white mix at top", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "primary", gradient: 0.5 });
    expect(r.cssBackground).toContain("white 6%");
  });

  it("gradient clamped at 1 (gradient=2 still produces 12%)", () => {
    const r = resolveNotchTheme({ type: "filled", variant: "primary", gradient: 2 });
    expect(r.cssBackground).toContain("white 12%");
  });

  it("gradient ignored for transparent backgrounds (outlined, ghost)", () => {
    const outlined = resolveNotchTheme({ type: "outlined", variant: "primary", gradient: 1 });
    expect(outlined.cssBackground).toBe("transparent");
    const ghost = resolveNotchTheme({ type: "ghost", variant: "primary", gradient: 1 });
    expect(ghost.cssBackground).toBe("transparent");
  });

  it("gradient applies to elevated fill (it's a solid token, not transparent)", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "primary", gradient: 1 });
    expect(r.cssBackground).toContain("linear-gradient(180deg");
    expect(r.cssBackground).toContain("var(--color-surface-container-low)");
  });
});

describe("resolveNotchTheme — exhaustive type×variant matrix", () => {
  const types = ["filled", "outlined", "elevated", "ghost"] as const;
  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "surface",
    "neutral",
    "warn",
    "error",
  ] as const;

  it("every (type, variant) pair returns valid CSS-shaped strings", () => {
    for (const type of types) {
      for (const variant of variants) {
        const r = resolveNotchTheme({ type, variant });
        expect(typeof r.fill).toBe("string");
        expect(r.fill.length).toBeGreaterThan(0);
        expect(typeof r.cssBackground).toBe("string");
        expect(r.color).toMatch(/^var\(--color-/);
        expect(typeof r.stroke).toBe("string");
        expect(typeof r.strokeWidth).toBe("number");
        expect(typeof r.boxShadow).toBe("string");
      }
    }
  });

  it("elevated rows are the only chromes carrying a shadow", () => {
    for (const variant of variants) {
      for (const type of types) {
        const r = resolveNotchTheme({ type, variant });
        if (type === "elevated") {
          expect(r.boxShadow).toBe("var(--shadow-m3-1)");
          expect(r.filter).toBe("var(--filter-m3-1)");
        } else {
          expect(r.boxShadow).toBe("none");
          expect(r.filter).toBe("none");
        }
      }
    }
  });

  it("non-elevated chromes always return filter=none", () => {
    const cases = [
      { type: "filled" as const, variant: "primary" as const },
      { type: "outlined" as const, variant: "primary" as const },
      { type: "ghost" as const, variant: "primary" as const },
    ];
    for (const t of cases) {
      expect(resolveNotchTheme(t).filter).toBe("none");
    }
  });

  it("elevated returns filter=var(--filter-m3-1) — drop-shadow chain that traces the rendered shape", () => {
    const r = resolveNotchTheme({ type: "elevated", variant: "primary" });
    expect(r.filter).toBe("var(--filter-m3-1)");
  });
});
