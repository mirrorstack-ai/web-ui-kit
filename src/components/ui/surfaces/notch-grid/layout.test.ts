import { describe, expect, it } from "vitest";
import {
  placementToMask,
  rectMask,
  solveLayout,
  type SolverItem,
} from "./layout";

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
    // A 2×2 at (0,0) and a 1×1 at (0,2) → the (2,1) cell stays empty (a notch).
    const placed = [
      { col: 0, row: 0, cols: 2, rows: 2 },
      { col: 0, row: 2, cols: 1, rows: 1 },
    ];
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
