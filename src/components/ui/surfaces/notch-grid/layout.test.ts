import { describe, expect, it } from "vitest";
import {
  optimalPlacement,
  packItems,
  placementToMask,
  rectMask,
  type LayoutInput,
} from "./layout";

/** Build a rectangular boolean mask of `rows × cols` true cells. */
const rect = (cols: number, rows: number): boolean[][] =>
  Array.from({ length: rows }, () => Array<boolean>(cols).fill(true));

/** Convenience: a tagged flow item with an `r×c` rectangular footprint. */
const box = (tag: string, cols: number, rows: number): LayoutInput<string> => ({
  item: tag,
  mask: rect(cols, rows),
});

const at = <T,>(r: { placed: { item: T; col: number; row: number }[] }, item: T) =>
  r.placed.find((p) => p.item === item)!;

describe("packItems", () => {
  it("flows 1×1 boxes left-to-right then wraps", () => {
    const res = packItems([box("a", 1, 1), box("b", 1, 1), box("c", 1, 1)], 2);
    expect(at(res, "a")).toMatchObject({ col: 0, row: 0 });
    expect(at(res, "b")).toMatchObject({ col: 1, row: 0 });
    expect(at(res, "c")).toMatchObject({ col: 0, row: 1 });
    expect(res).toMatchObject({ cols: 2, rows: 2 });
  });

  it("packs a wide box onto its own row when it doesn't fit beside others", () => {
    const res = packItems([box("a", 1, 1), box("wide", 3, 1), box("b", 1, 1)], 3);
    expect(at(res, "a")).toMatchObject({ col: 0, row: 0 });
    expect(at(res, "wide")).toMatchObject({ col: 0, row: 1 });
    // "b" backfills the gap on row 0 (cols 1–2 are free).
    expect(at(res, "b")).toMatchObject({ col: 1, row: 0 });
    expect(res.rows).toBe(2);
  });

  it("nestles a complementary L-shape into another item's notch", () => {
    // A: a 2×2 block missing its bottom-right cell → leaves a 1×1 notch.
    const aMask = [
      [true, true],
      [true, false],
    ];
    // B: a single cell — should drop into A's notch at (1, 1).
    const res = packItems(
      [{ item: "A", mask: aMask }, box("B", 1, 1)],
      2,
    );
    expect(at(res, "A")).toMatchObject({ col: 0, row: 0 });
    expect(at(res, "B")).toMatchObject({ col: 1, row: 1 });
    expect(res).toMatchObject({ cols: 2, rows: 2 });
  });

  it("places explicit items first, then flows the rest around them", () => {
    const res = packItems(
      [
        box("flow1", 1, 1),
        { item: "pinned", mask: rect(1, 1), col: 0, row: 0 },
        box("flow2", 1, 1),
      ],
      2,
    );
    expect(at(res, "pinned")).toMatchObject({ col: 0, row: 0 });
    // flow items skip the occupied (0,0): land at (1,0) then (0,1).
    expect(at(res, "flow1")).toMatchObject({ col: 1, row: 0 });
    expect(at(res, "flow2")).toMatchObject({ col: 0, row: 1 });
  });

  it("clamps column count to at least 1", () => {
    const res = packItems([box("a", 1, 1), box("b", 1, 1)], 0);
    expect(res.cols).toBeGreaterThanOrEqual(1);
    expect(at(res, "a")).toMatchObject({ col: 0, row: 0 });
    expect(at(res, "b")).toMatchObject({ col: 0, row: 1 });
  });

  it("reports items wider than the column count and stacks them at col 0", () => {
    const res = packItems([box("a", 1, 1), box("toobig", 3, 1)], 2);
    expect(res.overflowed).toEqual(["toobig"]);
    expect(at(res, "toobig").col).toBe(0);
    expect(res.cols).toBe(3); // grid widened to contain it
  });

  it("returns a grid size that contains every placed item", () => {
    const res = packItems([box("a", 2, 1), box("b", 1, 2), box("c", 1, 1)], 3);
    for (const p of res.placed) {
      expect(p.col + p.cols).toBeLessThanOrEqual(res.cols);
      expect(p.row + p.rows).toBeLessThanOrEqual(res.rows);
    }
  });
});

describe("rectMask", () => {
  it("builds an all-true cols×rows mask, clamped to at least 1×1", () => {
    expect(rectMask(2, 3)).toEqual([
      [true, true],
      [true, true],
      [true, true],
    ]);
    expect(rectMask(0, 0)).toEqual([[true]]);
  });
});

describe("placementToMask", () => {
  it("unions placed rectangles into one mask — gaps become notches", () => {
    // Pack [2×2, 1×1] into 2 cols → 2×2 at (0,0), 1×1 at (2,0):
    const { placed } = packItems(
      [
        { item: "big", mask: rectMask(2, 2) },
        { item: "small", mask: rectMask(1, 1) },
      ],
      2,
    );
    expect(placementToMask(placed)).toEqual([
      [true, true],
      [true, true],
      [true, false], // the 1×1 leaves the (2,1) cell empty — a notch
    ]);
  });

  it("never returns an empty mask", () => {
    expect(placementToMask([])).toEqual([[false]]);
  });
});

describe("optimalPlacement", () => {
  const sub = (id: string, w: number, h: number): LayoutInput<string> => ({
    item: id,
    mask: rectMask(w, h),
  });

  it("packs a 1×1 + 2×2 into the compact landscape L (xxx / ·xx)", () => {
    const res = optimalPlacement([sub("a", 1, 1), sub("b", 2, 2)], { maxCols: 6 });
    expect({ cols: res.cols, rows: res.rows }).toEqual({ cols: 3, rows: 2 }); // 3×2 bbox
    const mask = placementToMask(res.placed);
    expect(mask).toEqual([
      [true, true, true], // xxx
      [false, true, true], // ·xx — the 1×1 (input first) anchors the top-left
    ]);
  });

  it("a square `targetAspect` prefers the tall stack instead", () => {
    const res = optimalPlacement([sub("a", 1, 1), sub("b", 2, 2)], {
      maxCols: 6,
      targetAspect: 1,
    });
    expect({ cols: res.cols, rows: res.rows }).toEqual({ cols: 2, rows: 3 }); // 2×3 bbox
  });

  it("honours an explicit position and skips the search", () => {
    const res = optimalPlacement(
      [{ item: "pinned", mask: rectMask(1, 1), col: 3, row: 1 }, sub("flow", 1, 1)],
      { maxCols: 4 },
    );
    const p = res.placed.find((x) => x.item === "pinned")!;
    expect({ col: p.col, row: p.row }).toEqual({ col: 3, row: 1 });
  });

  it("falls back gracefully for an empty input", () => {
    expect(optimalPlacement([], { maxCols: 4 })).toMatchObject({ placed: [], cols: 4, rows: 0 });
  });
});
