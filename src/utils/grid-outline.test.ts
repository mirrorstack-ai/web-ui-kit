import { describe, expect, it } from "vitest";
import {
  gridOutlinePath,
  maskCols,
  maskFromShape,
  maxTier,
} from "./grid-outline";

/** Count subpaths (each closed loop emits exactly one `M ... Z`). */
const loopCount = (d: string) => (d.match(/Z/g) ?? []).length;
/** Count distinct corner anchors: every corner emits an `A` arc (radius > 0). */
const arcCount = (d: string) => (d.match(/ A /g) ?? []).length;

describe("maskCols", () => {
  it("returns the widest row length", () => {
    expect(maskCols([[1, 1], [1, 1, 1], [1]])).toBe(3);
    expect(maskCols([])).toBe(0);
  });
});

describe("maskFromShape", () => {
  it("fills cells with value between 1 and tier inclusive", () => {
    const shape = [
      [0, 1, 2],
      [1, 2, 3],
    ];
    expect(maskFromShape(shape, 1)).toEqual([
      [false, true, false],
      [true, false, false],
    ]);
    expect(maskFromShape(shape, 2)).toEqual([
      [false, true, true],
      [true, true, false],
    ]);
    expect(maskFromShape(shape, 3)).toEqual([
      [false, true, true],
      [true, true, true],
    ]);
  });
});

describe("maxTier", () => {
  it("is 1 for a plain 0/1 matrix", () => {
    expect(maxTier([[0, 1], [1, 1]])).toBe(1);
  });
  it("returns the highest tier referenced", () => {
    expect(maxTier([[1, 2], [3, 0]])).toBe(3);
  });
});

describe("gridOutlinePath", () => {
  it("returns empty string for an empty mask", () => {
    expect(gridOutlinePath([], { cell: 10 })).toBe("");
    expect(gridOutlinePath([[false]], { cell: 10 })).toBe("");
  });

  it("traces a single block as one closed loop with 4 rounded corners", () => {
    const d = gridOutlinePath([[true]], { cell: 100 });
    expect(d.startsWith("M ")).toBe(true);
    expect(d.trim().endsWith("Z")).toBe(true);
    expect(loopCount(d)).toBe(1);
    expect(arcCount(d)).toBe(4);
  });

  it("merges collinear cells — a 1x3 row still has only 4 corners", () => {
    expect(arcCount(gridOutlinePath([[true, true, true]], { cell: 50 }))).toBe(4);
  });

  it("an L-shape has 6 corners (5 convex + 1 concave)", () => {
    const d = gridOutlinePath(
      [
        [true, false],
        [true, true],
      ],
      { cell: 40 },
    );
    expect(loopCount(d)).toBe(1);
    expect(arcCount(d)).toBe(6);
  });

  it("the user's example shape has 8 corners (one notch on each cut corner)", () => {
    const d = gridOutlinePath(
      maskFromShape(
        [
          [0, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 0],
        ],
        1,
      ),
      { cell: 30 },
    );
    expect(loopCount(d)).toBe(1);
    // 6 convex corners of the staircase rectangle outline + 2 concave notch
    // corners (one per cut block) = 8.
    expect(arcCount(d)).toBe(8);
  });

  it("a donut traces two loops (outer ring + interior hole)", () => {
    const d = gridOutlinePath(
      [
        [true, true, true],
        [true, false, true],
        [true, true, true],
      ],
      { cell: 20 },
    );
    expect(loopCount(d)).toBe(2);
    // outer square (4) + inner square (4) = 8
    expect(arcCount(d)).toBe(8);
  });

  it("clamps corner radii so adjacent corners on a short edge don't overlap", () => {
    // A single 10px block with radius 12: each of the 4 corners would want
    // 12px but the edge is only 10px, so radius clamps to 5.
    const d = gridOutlinePath([[true]], { cell: 10, radius: 12 });
    expect(d).toContain("A 5 5 ");
  });

  it("erodes the shape by gap/2 — outer edges pull inward", () => {
    // 200×100 rect, gap 20 ⇒ eroded by 10 ⇒ corners at (10,10)…(190,90).
    const d = gridOutlinePath([[true, true]], { cell: 100, gap: 20, radius: 10 });
    expect(arcCount(d)).toBe(4); // still a rectangle
    expect(d).toMatch(/\b190\b/);
    expect(d).toMatch(/\b90\b/);
    expect(d).not.toMatch(/\b200\b/); // the un-eroded edge is gone
  });

  it("clamps gap below `cell` so the shape can't collapse", () => {
    // gap 1000 with cell 100 ⇒ erosion clamps to (100−2)/2 = 49, leaving a sliver.
    const d = gridOutlinePath([[true]], { cell: 100, gap: 1000 });
    expect(d).not.toBe("");
    expect(arcCount(d)).toBe(4);
  });

  it("respects a notch on a shape edge as a concave (sweep 0) corner", () => {
    const d = gridOutlinePath(
      [
        [true, true, true],
        [true, false, true],
        [true, true, true],
      ],
      { cell: 30 },
    );
    // interior hole corners are concave from the filled region's perspective
    expect(d).toMatch(/A \d+(\.\d+)? \d+(\.\d+)? 0 0 0 /); // at least one sweep-0 arc
    expect(d).toMatch(/A \d+(\.\d+)? \d+(\.\d+)? 0 0 1 /); // and at least one sweep-1 arc
  });
});
