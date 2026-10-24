import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Notch } from "./Notch";

afterEach(cleanup);

describe("Notch", () => {
  it("renders an SVG with path", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector("path")).toBeInTheDocument();
  });

  it("sets correct SVG dimensions for right notch", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} notchSide="right" />,
    );
    const svg = container.querySelector("svg");
    // Element is the content box (width+notchWidth × height); the centered
    // stroke is accommodated by the padded viewBox (content + strokeWidth,
    // offset by -strokeWidth/2) so the border stays inside the box.
    expect(svg).toHaveAttribute("width", "240");
    expect(svg).toHaveAttribute("height", "150");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 241 151");
  });

  it("sets correct SVG dimensions for bottom notch", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} notchSide="bottom" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "200");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 201 201");
  });

  it("renders head only", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={60} notchHeight={40} headOnly />,
    );
    const svg = container.querySelector("svg");
    // offset=0 → atStart=true, topIr=0, botIr=6
    // pathW = 60 + 6 = 66 (element width); pathH = 40 + 0 + 6 = 46 (element height)
    // viewBox pads by strokeWidth so the stroke stays inside the box: 67 × 47.
    expect(svg).toHaveAttribute("width", "66");
    expect(svg).toHaveAttribute("height", "46");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 67 47");
  });

  it("applies fill and stroke", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} fill="red" stroke="blue" strokeWidth={2} />,
    );
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "red");
    expect(path).toHaveAttribute("stroke", "blue");
    expect(path).toHaveAttribute("stroke-width", "2");
  });

  it("supports fill none for outline only", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} fill="none" />,
    );
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "none");
  });

  // notchOffset semantics: positive = from left, on the top AND bottom edges.
  // The top edge renders via rotate(90), which mirrors the build axis — these
  // pin the internal flip that compensates, so a given offset lands the tab at
  // the same visual spot whichever edge it's on.
  describe("notchOffset edge semantics", () => {
    const pathD = (notchSide: "top" | "bottom", notchOffset: number) => {
      const { container } = render(
        <Notch
          width={200}
          height={150}
          notchWidth={52}
          notchHeight={46}
          notchSide={notchSide}
          notchOffset={notchOffset}
        />,
      );
      const d = container.querySelector("path")?.getAttribute("d");
      cleanup();
      return d;
    };

    it("mirrors the build-space offset on the top edge", () => {
      // Same visual spot (30px from the left) requires mirrored build paths:
      // top(30) must match bottom's tab placed 30px from the RIGHT (-30).
      expect(pathD("top", 30)).toBe(pathD("bottom", -30));
      expect(pathD("top", -30)).toBe(pathD("bottom", 30));
    });

    it("keeps top and bottom build paths distinct for an uncentered offset", () => {
      expect(pathD("top", 30)).not.toBe(pathD("bottom", 30));
    });
  });

  // notchGap: the notch gets shorter while its tip and the content stay put —
  // the body's edge drops toward the tip instead (core-v2#1703).
  describe("notchGap", () => {
    const draw = (props: Partial<Parameters<typeof Notch>[0]>) => {
      const { container } = render(
        <Notch width={200} height={150} notchWidth={40} notchHeight={50} radius={12} inverseRadius={10} notchOffset={80} {...props} />,
      );
      const svg = container.querySelector("svg")!;
      return { svg, d: svg.querySelector("path")!.getAttribute("d"), transform: svg.querySelector("path")!.getAttribute("transform") };
    };

    it.each(["top", "bottom", "left", "right"] as const)("keeps the box (and so the tip) where it was — %s", (notchSide) => {
      const plain = draw({ notchSide });
      const gapped = draw({ notchSide, notchGap: 10 });
      expect(gapped.svg.getAttribute("width")).toBe(plain.svg.getAttribute("width"));
      expect(gapped.svg.getAttribute("height")).toBe(plain.svg.getAttribute("height"));
      expect(gapped.transform).toBe(plain.transform);
      expect(gapped.d).not.toBe(plain.d);
    });

    it("draws a taller body and a shorter notch in the same box", () => {
      expect(draw({ notchSide: "top", notchGap: 10 }).d).toBe(draw({ notchSide: "top", height: 160, notchHeight: 40 }).d);
      expect(draw({ notchSide: "right", notchGap: 10 }).d).toBe(draw({ notchSide: "right", width: 210, notchWidth: 30 }).d);
    });

    it("clamps so the notch keeps room for its corners", () => {
      // protrusion 50 − (radius 12 + inverseRadius 10) = 28 at most.
      expect(draw({ notchSide: "top", notchGap: 99 }).d).toBe(draw({ notchSide: "top", notchGap: 28 }).d);
      expect(draw({ notchSide: "top", notchGap: -5 }).d).toBe(draw({ notchSide: "top" }).d);
    });
  });

  describe("headRadius", () => {
    const props = { width: 200, height: 150, notchWidth: 40, notchHeight: 50, notchOffset: 20, radius: 12, inverseRadius: 6 };
    const pathD = (extra: object = {}, base: object = props) =>
      render(<Notch {...(base as typeof props)} {...extra} />).container.querySelector("path")?.getAttribute("d");

    it("leaves the path byte-identical when unset or equal to radius", () => {
      // Pinned from the output before `headRadius` existed.
      const legacy =
        "M 12,0 H 188 A 12,12 0 0,1 200,12 V 14 A 6,6 0 0,0 206,20 H 228 A 12,12 0 0,1 240,32 V 58 A 12,12 0 0,1 228,70 H 206 A 6,6 0 0,0 200,76 V 138 A 12,12 0 0,1 188,150 H 12 A 12,12 0 0,1 0,138 V 12 A 12,12 0 0,1 12,0 Z";
      expect(pathD()).toBe(legacy);
      expect(pathD({ headRadius: 12 })).toBe(legacy);
    });

    it("rounds only the tab's two outer corners", () => {
      const d = pathD({ headRadius: 20 });
      expect(d).toContain("H 220 A 20,20 0 0,1 240,40");
      expect(d).toContain("V 50 A 20,20 0 0,1 220,70");
      // body corners keep `radius`
      expect(d).toContain("H 188 A 12,12 0 0,1 200,12");
      expect(d).toContain("V 138 A 12,12 0 0,1 188,150");
    });

    it("applies to the tab's outer corners when the notch is flush with an edge", () => {
      const d = pathD({ headRadius: 20, notchOffset: 0 });
      expect(d).toContain("H 220 A 20,20 0 0,1 240,20");
    });

    it("applies to headOnly", () => {
      const d = pathD({ headRadius: 20, headOnly: true });
      expect(d).toBe("M 0,0 A 6,6 0 0,0 6,6 H 26 A 20,20 0 0,1 46,26 V 36 A 20,20 0 0,1 26,56 H 6 A 6,6 0 0,0 0,62 V 0 Z");
      expect(pathD({ headOnly: true })).toBe(pathD({ headOnly: true, headRadius: 12 }));
    });
  });
});
