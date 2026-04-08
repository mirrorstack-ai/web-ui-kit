import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionLabel } from "./SectionLabel";

describe("SectionLabel", () => {
  it("renders children", () => {
    const { container } = render(<SectionLabel>Settings</SectionLabel>);
    expect(container.textContent).toBe("Settings");
  });

  it("renders as a p element", () => {
    const { container } = render(<SectionLabel>Title</SectionLabel>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("applies uppercase and tracking styles", () => {
    const { container } = render(<SectionLabel>Title</SectionLabel>);
    const el = container.querySelector("p");
    expect(el?.getAttribute("class")).toContain("uppercase");
    expect(el?.getAttribute("class")).toContain("tracking-wider");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionLabel className="mt-4">Title</SectionLabel>,
    );
    const el = container.querySelector("p");
    expect(el?.getAttribute("class")).toContain("mt-4");
  });

  it("passes through native attributes", () => {
    const { container } = render(
      <SectionLabel id="section-1">Title</SectionLabel>,
    );
    const el = container.querySelector("p");
    expect(el?.getAttribute("id")).toBe("section-1");
  });
});
