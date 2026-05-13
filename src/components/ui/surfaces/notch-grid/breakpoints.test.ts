import { describe, expect, it } from "vitest";
import {
  NOTCH_BREAKPOINTS,
  rectMatrix,
  resolveResponsive,
  resolveShapeMatrix,
} from "./breakpoints";

describe("resolveResponsive", () => {
  it("returns a non-map value unchanged (incl. arrays / matrices)", () => {
    expect(resolveResponsive(5, 800)).toBe(5);
    const matrix = [[1, 1], [1, 0]];
    expect(resolveResponsive(matrix, 800)).toBe(matrix);
  });

  it("picks the largest named breakpoint <= width (mobile-first cascade)", () => {
    const v = { base: "b", md: "m", lg: "l" };
    expect(resolveResponsive(v, 0)).toBe("b");
    expect(resolveResponsive(v, 700)).toBe("b"); // < md (768)
    expect(resolveResponsive(v, 768)).toBe("m"); // == md
    expect(resolveResponsive(v, 900)).toBe("m"); // md <= 900 < lg
    expect(resolveResponsive(v, 1200)).toBe("l");
  });

  it("accepts raw px thresholds as keys", () => {
    const v = { 0: "s", 500: "m", 900: "l" };
    expect(resolveResponsive(v, 100)).toBe("s");
    expect(resolveResponsive(v, 500)).toBe("m");
    expect(resolveResponsive(v, 1000)).toBe("l");
  });

  it("mixes named and px keys, sorting by resolved threshold", () => {
    const v = { base: "s", 500: "m", lg: "l" }; // 0, 500, 1024
    expect(resolveResponsive(v, 400)).toBe("s");
    expect(resolveResponsive(v, 600)).toBe("m");
    expect(resolveResponsive(v, 1100)).toBe("l");
  });

  it("falls back to the smallest threshold when width is below all of them", () => {
    expect(resolveResponsive({ md: "m", lg: "l" }, 0)).toBe("m");
  });

  it("honours overridden breakpoints", () => {
    const v = { base: "s", md: "m" };
    // Move md down to 600 — now 650 resolves to m instead of s.
    expect(resolveResponsive(v, 650, { ...NOTCH_BREAKPOINTS, md: 600 })).toBe("m");
    expect(resolveResponsive(v, 650)).toBe("s");
  });

  it("treats an unknown breakpoint name as base (0)", () => {
    expect(resolveResponsive({ weird: "w", lg: "l" }, 10)).toBe("w");
  });
});

describe("rectMatrix", () => {
  it("builds a solid cols×rows matrix of 1s", () => {
    expect(rectMatrix(2, 3)).toEqual([
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
  });
  it("clamps to at least 1×1", () => {
    expect(rectMatrix(0, 0)).toEqual([[1]]);
  });
});

describe("resolveShapeMatrix", () => {
  it("passes a bare matrix through", () => {
    const m = [[1, 0], [1, 1]];
    expect(resolveShapeMatrix(m, { width: 800, columns: 4 })).toBe(m);
  });

  it("cascades a breakpoint map by width", () => {
    const shape = { base: [[1]], md: [[1, 1], [1, 1]] };
    expect(resolveShapeMatrix(shape, { width: 400, columns: 4 })).toEqual([[1]]);
    expect(resolveShapeMatrix(shape, { width: 900, columns: 4 })).toEqual([
      [1, 1],
      [1, 1],
    ]);
  });

  it("picks the largest size-candidate whose width fits the column count", () => {
    const shape = { sizes: [[1, 1], [2, 2], [3, 2]] as const };
    expect(resolveShapeMatrix(shape, { width: 0, columns: 1 })).toEqual([[1]]);
    expect(resolveShapeMatrix(shape, { width: 0, columns: 2 })).toEqual([
      [1, 1],
      [1, 1],
    ]);
    // columns=4 ⇒ the 3×2 candidate fits and is the largest.
    expect(resolveShapeMatrix(shape, { width: 0, columns: 4 })).toEqual([
      [1, 1, 1],
      [1, 1, 1],
    ]);
  });

  it("falls back to the smallest size-candidate when none fit", () => {
    const shape = { sizes: [[3, 1], [4, 1]] as const };
    expect(resolveShapeMatrix(shape, { width: 0, columns: 1 })).toEqual([[1, 1, 1]]);
  });

  it("picks the first `prefer` matrix that fits the column count", () => {
    const big = [[1, 1, 1], [1, 1, 0]];
    const mid = [[1, 1], [1, 1]];
    const small = [[1]];
    const shape = { prefer: [big, mid, small] };
    expect(resolveShapeMatrix(shape, { width: 0, columns: 4 })).toBe(big);
    expect(resolveShapeMatrix(shape, { width: 0, columns: 2 })).toBe(mid);
    expect(resolveShapeMatrix(shape, { width: 0, columns: 1 })).toBe(small);
  });

  it("falls back to the narrowest `prefer` matrix when none fit", () => {
    const wide = [[1, 1, 1]];
    const narrower = [[1, 1]];
    expect(resolveShapeMatrix({ prefer: [wide, narrower] }, { width: 0, columns: 1 })).toBe(narrower);
  });

  it("returns a 1×1 for an empty `prefer` list", () => {
    expect(resolveShapeMatrix({ prefer: [] }, { width: 0, columns: 4 })).toEqual([[1]]);
  });
});
