import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";

function getProgressbar(container: HTMLElement) {
  return container.querySelector("[role='progressbar']") as HTMLElement;
}

describe("Progress", () => {
  describe("indeterminate (no value)", () => {
    it("renders linear with progressbar role and aria-label", () => {
      const { container } = render(<Progress type="linear" />);
      const el = getProgressbar(container);
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-label", "Loading");
      expect(el).not.toHaveAttribute("aria-valuenow");
    });

    it("renders circular with progressbar role", () => {
      const { container } = render(<Progress type="circular" />);
      const el = getProgressbar(container);
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-label", "Loading");
    });

    it("renders linear wave variant with SVG path", () => {
      const { container } = render(<Progress type="linear" variant="wave" />);
      expect(container.querySelector("svg path")).toBeInTheDocument();
    });

    it("renders linear normal variant with sliding bars", () => {
      const { container } = render(<Progress type="linear" variant="normal" />);
      const bars = container.querySelectorAll("[class*='animate-progress-bar']");
      expect(bars.length).toBe(2);
    });

    it("renders circular wave variant with wavy path", () => {
      const { container } = render(<Progress type="circular" variant="wave" />);
      expect(container.querySelectorAll("svg path").length).toBeGreaterThan(0);
    });

    it("renders circular normal variant with circle elements", () => {
      const { container } = render(<Progress type="circular" variant="normal" />);
      expect(container.querySelectorAll("svg circle").length).toBe(2);
    });
  });

  describe("determinate (with value)", () => {
    it("renders aria-valuenow", () => {
      const { container } = render(<Progress type="linear" value={60} />);
      const el = getProgressbar(container);
      expect(el).toHaveAttribute("aria-valuenow", "60");
      expect(el).toHaveAttribute("aria-label", "60% complete");
    });

    it("clamps value above 100", () => {
      const { container } = render(<Progress type="linear" value={150} />);
      expect(getProgressbar(container)).toHaveAttribute("aria-valuenow", "100");
    });

    it("clamps negative value to 0", () => {
      const { container } = render(<Progress type="linear" value={-20} />);
      expect(getProgressbar(container)).toHaveAttribute("aria-valuenow", "0");
    });

    it("renders circular determinate", () => {
      const { container } = render(<Progress type="circular" value={75} />);
      expect(getProgressbar(container)).toHaveAttribute("aria-valuenow", "75");
    });
  });

  describe("progressive", () => {
    it("renders progressive wave linear with value", () => {
      const { container } = render(<Progress type="linear" variant="wave" value={50} progressive />);
      expect(getProgressbar(container)).toHaveAttribute("aria-valuenow", "50");
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders progressive normal linear with sliding bars", () => {
      const { container } = render(<Progress type="linear" variant="normal" value={50} progressive />);
      expect(getProgressbar(container)).toHaveAttribute("aria-valuenow", "50");
      expect(container.querySelectorAll("[class*='animate-progress-bar']").length).toBe(2);
    });

    it("renders progressive circular with rotation animation", () => {
      const { container } = render(<Progress type="circular" value={50} progressive />);
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("class")).toContain("animate-progress-rotate");
    });
  });

  describe("colors", () => {
    it("applies four-color animation class", () => {
      const { container } = render(<Progress type="circular" value={50} color="four-color" />);
      expect(getProgressbar(container)?.getAttribute("class")).toContain("animate-progress-four-color");
    });

    it("applies current color for indeterminate", () => {
      const { container } = render(<Progress type="circular" color="current" />);
      expect(getProgressbar(container)?.getAttribute("class")).toContain("text-current");
    });
  });

  describe("props", () => {
    it("applies custom aria-label", () => {
      const { container } = render(<Progress type="linear" aria-label="Uploading" />);
      expect(getProgressbar(container)).toHaveAttribute("aria-label", "Uploading");
    });

    it("applies custom className", () => {
      const { container } = render(<Progress type="linear" className="my-class" />);
      expect(getProgressbar(container)?.getAttribute("class")).toContain("my-class");
    });

    it("applies style to circular", () => {
      const { container } = render(<Progress type="circular" style={{ width: 16, height: 16 }} />);
      const el = getProgressbar(container);
      expect(el.style.width).toBe("16px");
      expect(el.style.height).toBe("16px");
    });
  });

  describe("defaults", () => {
    it("defaults to linear type", () => {
      const { container } = render(<Progress />);
      expect(getProgressbar(container)).toBeInTheDocument();
      expect(getProgressbar(container)?.getAttribute("class")).not.toContain("inline-flex");
    });

    it("defaults to wave variant", () => {
      const { container } = render(<Progress type="linear" />);
      expect(container.querySelector("svg path")).toBeInTheDocument();
    });
  });
});

describe("waveScale", () => {
  // The whole point of the prop: a calmer wave WITHOUT the bar getting taller or
  // thicker. Reaching for `size` did both at once, which is why this exists.
  it("halves the period count without touching height or stroke", () => {
    const { container: plain } = render(
      <Progress type="linear" variant="wave" size="lg" value={50} />,
    );
    const { container: scaled } = render(
      <Progress type="linear" variant="wave" size="lg" value={50} waveScale={2} />,
    );

    const box = (root: HTMLElement) => root.querySelector("[role=progressbar]")!;
    expect(box(scaled).className).toBe(box(plain).className);

    const stroke = (root: HTMLElement) =>
      root.querySelector("path")!.getAttribute("stroke-width");
    expect(stroke(scaled)).toBe(stroke(plain));

    // One period is TWO cubic segments — the crest and the trough — so the "C"
    // count is halved to get periods. Asserting the geometry rather than a
    // viewBox number that could change for unrelated reasons.
    const periods = (root: HTMLElement) =>
      (root.querySelector("path")!.getAttribute("d")!.match(/C/g) ?? []).length / 2;
    expect(periods(scaled)).toBe(Math.round(periods(plain) / 2));
  });

  it("keeps a wave at extreme scales rather than flattening to a line", () => {
    const { container } = render(
      <Progress type="linear" variant="wave" size="sm" value={50} waveScale={999} />,
    );
    expect(container.querySelector("path")!.getAttribute("d")).toContain("C");
  });

  it("leaves unscaled output byte-identical", () => {
    const { container: a } = render(<Progress type="linear" variant="wave" value={40} />);
    const { container: b } = render(
      <Progress type="linear" variant="wave" value={40} waveScale={1} />,
    );
    expect(b.innerHTML).toBe(a.innerHTML);
  });
});
