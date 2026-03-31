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
