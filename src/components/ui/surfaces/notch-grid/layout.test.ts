import { describe, expect, it } from "vitest";
import {
  optimalPlacement,
  packItems,
  placementToMask,
  rectMask,
  solveLayout,
  type LayoutInput,
  type SolverItem,
} from "./layout";

/** Convenience: a tagged flow item with an `r×c` rectangular footprint. */
const box = (tag: string, cols: number, rows: number): LayoutInput<string> => ({
  item: tag,
  mask: rectMask(cols, rows),
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
        { item: "pinned", mask: rectMask(1, 1), col: 0, row: 0 },
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

describe("packItems flowOrder='farthest-fit'", () => {
  const ascii = (m: boolean[][]) => m.map((r) => r.map((c) => (c ? "x" : ".")).join("")).join("/");
  const ff = { flowOrder: "farthest-fit" } as const;
  // The compact cols cap NotchGrid uses for the sub-pack: max(widest, ceil(√(area·1.6))).
  // For a 1×1 + a 2×2 → area 5, widest 2 → cols 3.
  const COLS = 3;

  it("places a flow item at the diagonally opposite cell of an explicit one", () => {
    // Explicit 1×1 at the bottom-left → 2×2 lands at the top-right (1,0).
    const r = packItems(
      [
        { item: { key: "a" }, mask: rectMask(1, 1), col: 0, row: 2 },
        { item: { key: "b" }, mask: rectMask(2, 2) },
      ],
      COLS,
      ff,
    );
    expect(ascii(placementToMask(r.placed))).toBe(".xx/.xx/x..");
  });

  it("mirrors for the opposite corner — bottom-right → top-left", () => {
    const r = packItems(
      [
        { item: { key: "a" }, mask: rectMask(1, 1), col: 2, row: 2 },
        { item: { key: "b" }, mask: rectMask(2, 2) },
      ],
      COLS,
      ff,
    );
    expect(ascii(placementToMask(r.placed))).toBe("xx./xx./..x");
  });

  it("top-left → 2×2 at the diagonal centre (1,1)", () => {
    const r = packItems(
      [
        { item: { key: "a" }, mask: rectMask(1, 1), col: 0, row: 0 },
        { item: { key: "b" }, mask: rectMask(2, 2) },
      ],
      COLS,
      ff,
    );
    expect(ascii(placementToMask(r.placed))).toBe("x../.xx/.xx");
  });

  it("treats each placed flow item as an anchor for the next, so a flow-only pack still spreads", () => {
    // No initial anchors → `a` lands by first-fit at (0,0) and then becomes
    // an anchor, so `b` falls to the diagonally opposite cell rather than
    // packing right next to `a`.
    const r = packItems(
      [
        { item: { key: "a" }, mask: rectMask(1, 1) },
        { item: { key: "b" }, mask: rectMask(2, 2) },
      ],
      3,
      ff,
    );
    expect(r.placed.map((p) => `${(p.item as { key: string }).key}@(${p.col},${p.row})`)).toEqual([
      "a@(0,0)",
      "b@(1,1)",
    ]);
  });
});

describe("solveLayout (desire-based)", () => {
  it("empty input → empty placements, satisfaction = 1", () => {
    const out = solveLayout({ items: [], cols: 4 });
    expect(out.placements).toEqual([]);
    expect(out.rowsUsed).toBe(0);
    expect(out.unfit).toEqual([]);
    expect(out.satisfaction).toBe(1);
  });

  it("places a single fixed-position item at the requested cell", () => {
    const out = solveLayout({
      items: [
        { key: "a", desire: { position: [1, 2], shape: rectMask(2, 2) } },
      ],
      cols: 4,
    });
    expect(out.placements).toHaveLength(1);
    expect(out.placements[0].col).toBe(1);
    expect(out.placements[0].row).toBe(2);
    expect(out.placements[0].priorityUsed).toEqual({ position: "0", shape: "0" });
    expect(out.placements[0].scale).toBe(1);
  });

  it("priority position map: uses '0' when free, falls back to '1' when '0' blocked", () => {
    const out = solveLayout({
      items: [
        { key: "blocker", desire: { position: [0, 0], shape: rectMask(2, 2) } },
        {
          key: "b",
          desire: {
            position: { "0": [0, 0], "1": [2, 0] },
            shape: rectMask(2, 2),
          },
        },
      ],
      cols: 4,
    });
    const b = out.placements.find((p) => p.key === "b")!;
    expect(b.col).toBe(2);
    expect(b.row).toBe(0);
    expect(b.priorityUsed.position).toBe("1");
  });

  it("priority shape map: uses '0' when it fits", () => {
    const out = solveLayout({
      items: [
        {
          key: "a",
          desire: {
            shape: { "0": rectMask(2, 2), "1": rectMask(1, 1) },
          },
        },
      ],
      cols: 4,
    });
    expect(out.placements[0].cols).toBe(2);
    expect(out.placements[0].rows).toBe(2);
    expect(out.placements[0].priorityUsed.shape).toBe("0");
  });

  it("priority shape map: falls back to '1' when '0' is too wide", () => {
    const out = solveLayout({
      items: [
        {
          key: "wide",
          desire: {
            shape: { "0": rectMask(5, 1), "1": rectMask(2, 1) },
          },
        },
      ],
      cols: 3,
    });
    expect(out.placements[0].cols).toBe(2);
    expect(out.placements[0].priorityUsed.shape).toBe("1");
  });

  it("scale=true: prefers scale=1 when nothing blocks (cost-formula semantics)", () => {
    // W_scale * (scale-1) penalizes growth; scale=1 wins on cost when free.
    const out = solveLayout({
      items: [
        { key: "a", desire: { shape: rectMask(1, 1), scale: true } },
      ],
      cols: 4,
    });
    expect(out.placements[0].scale).toBe(1);
    expect(out.placements[0].cols).toBe(1);
  });

  it("scale=true: candidate set still bounded by cols (oversized scale skipped)", () => {
    // scale=3 of rectMask(2,2) → 6x6, too wide for cols=4; should land at scale=1.
    const out = solveLayout({
      items: [
        { key: "a", desire: { shape: rectMask(2, 2), scale: true } },
      ],
      cols: 4,
    });
    expect(out.placements[0].scale).toBe(1);
  });

  it("satisfaction = 1 when every item lands at priority '0'", () => {
    const out = solveLayout({
      items: [
        { key: "a", desire: { shape: rectMask(2, 2) } },
        { key: "b", desire: { shape: rectMask(1, 1) } },
      ],
      cols: 4,
    });
    expect(out.satisfaction).toBe(1);
  });

  it("satisfaction < 1 when an item demotes to a lower priority", () => {
    const out = solveLayout({
      items: [
        { key: "blocker", desire: { position: [0, 0], shape: rectMask(2, 2) } },
        {
          key: "b",
          desire: {
            position: { "0": [0, 0], "1": [2, 0] },
            shape: rectMask(2, 2),
          },
        },
      ],
      cols: 4,
    });
    expect(out.satisfaction).toBeLessThan(1);
    expect(out.satisfaction).toBeGreaterThanOrEqual(0);
  });

  it("fixed-position items placed before flow items", () => {
    const out = solveLayout({
      items: [
        // declared first but is flow — would otherwise land at (0,0)
        { key: "flow", desire: { shape: rectMask(2, 2) } },
        // declared second but is fixed — claims (0,0) in the fixed-pass
        { key: "fixed", desire: { position: [0, 0], shape: rectMask(1, 1) } },
      ],
      cols: 4,
    });
    const fixed = out.placements.find((p) => p.key === "fixed")!;
    const flow = out.placements.find((p) => p.key === "flow")!;
    expect(fixed.col).toBe(0);
    expect(fixed.row).toBe(0);
    // flow item displaced — first cell that fits a 2x2 mask without colliding
    // with the 1x1 at (0,0) is (1,0).
    expect(flow.col).toBe(1);
    expect(flow.row).toBe(0);
  });

  it("rowsUsed grows; surface extends vertically", () => {
    const out = solveLayout({
      items: [
        { key: "a", desire: { shape: rectMask(2, 2) } },
        { key: "b", desire: { shape: rectMask(2, 2) } },
        { key: "c", desire: { shape: rectMask(2, 2) } },
      ],
      cols: 2,
    });
    expect(out.placements).toHaveLength(3);
    expect(out.rowsUsed).toBe(6);
    expect(out.unfit).toEqual([]);
  });

  it("item wider than cols → flagged in unfit (pathological case)", () => {
    const out = solveLayout({
      items: [{ key: "oversize", desire: { shape: rectMask(10, 1) } }],
      cols: 4,
    });
    expect(out.placements).toHaveLength(0);
    expect(out.unfit).toEqual(["oversize"]);
  });

  it("cost ordering: position dominates shape (W_pos > W_shape)", () => {
    // Single 1x1 blocker forces a to fall back. Candidates by cost (W_pos=3,
    // W_shape=2):
    //   (pos="0",[0,0], shape="0",2x2) cost 0 — collides with blocker at (0,0)
    //   (pos="0",[0,0], shape="1",1x1) cost 2 — collides with blocker
    //   (pos="1",[2,0], shape="0",2x2) cost 3 — fits at (2,0)  ← chosen
    //   (pos="1",[2,0], shape="1",1x1) cost 5
    const out = solveLayout({
      items: [
        { key: "blocker", desire: { position: [0, 0], shape: rectMask(1, 1) } },
        {
          key: "a",
          desire: {
            position: { "0": [0, 0], "1": [2, 0] },
            shape: { "0": rectMask(2, 2), "1": rectMask(1, 1) },
          },
        },
      ],
      cols: 4,
    });
    const a = out.placements.find((p) => p.key === "a")!;
    expect(a.priorityUsed.position).toBe("1");
    expect(a.priorityUsed.shape).toBe("0");
    expect(a.col).toBe(2);
    expect(a.row).toBe(0);
  });

  it("fixed-position collision demotes the item to flow placement", () => {
    // Two items both claim (0,0). The second falls through to a flow scan.
    const out = solveLayout({
      items: [
        { key: "a", desire: { position: [0, 0], shape: rectMask(2, 2) } },
        { key: "b", desire: { position: [0, 0], shape: rectMask(1, 1) } },
      ],
      cols: 4,
    });
    const b = out.placements.find((p) => p.key === "b")!;
    // b doesn't land at (0,0) — flows to the first free spot for a 1x1.
    expect(b.col === 2 && b.row === 0).toBe(true);
    expect(out.unfit).toEqual([]);
  });

  it("SolverItem.item is carried through to Placement.item", () => {
    type Payload = { tag: string };
    const items: SolverItem<Payload>[] = [
      { key: "a", desire: { shape: rectMask(1, 1) }, item: { tag: "hello" } },
    ];
    const out = solveLayout<Payload>({ items, cols: 2 });
    expect(out.placements[0].item).toEqual({ tag: "hello" });
  });
});
