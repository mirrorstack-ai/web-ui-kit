import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReadOnlyField } from "./ReadOnlyField";

function renderField(
  props: Partial<Parameters<typeof ReadOnlyField>[0]> = {},
) {
  return render(
    <ReadOnlyField label="Test Label" value="Test Value" {...props} />,
  );
}

describe("ReadOnlyField", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders label and value", () => {
    const { container } = renderField();
    expect(container.textContent).toContain("Test Label");
    expect(container.textContent).toContain("Test Value");
  });

  it("renders label as a label element", () => {
    const { container } = renderField();
    const label = container.querySelector("label");
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toBe("Test Label");
  });

  describe("mono", () => {
    it("applies monospace font when mono is true", () => {
      const { container } = renderField({ mono: true });
      const valueSpan = container.querySelector(".truncate");
      expect(valueSpan?.getAttribute("class")).toContain("font-mono");
    });

    it("does not apply monospace font by default", () => {
      const { container } = renderField();
      const valueSpan = container.querySelector(".truncate");
      expect(valueSpan?.getAttribute("class")).not.toContain("font-mono");
    });
  });

  describe("copyable", () => {
    it("shows copy button when copyable is true", () => {
      const { container } = renderField({ copyable: true });
      const btn = container.querySelector(
        "button[aria-label='Copy Test Label']",
      );
      expect(btn).toBeInTheDocument();
    });

    it("does not show copy button by default", () => {
      const { container } = renderField();
      const btn = container.querySelector("button");
      expect(btn).not.toBeInTheDocument();
    });

    it("copies value to clipboard on click", async () => {
      const { container } = renderField({ copyable: true });
      const btn = container.querySelector("button") as HTMLButtonElement;
      fireEvent.click(btn);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "Test Value",
      );
    });

    it("calls onCopy after successful copy", async () => {
      const handler = vi.fn();
      const { container } = renderField({
        copyable: true,
        onCopy: handler,
      });
      const btn = container.querySelector("button") as HTMLButtonElement;
      fireEvent.click(btn);
      await waitFor(() => {
        expect(handler).toHaveBeenCalledOnce();
      });
    });

    it("shows check icon after copy", async () => {
      const { container } = renderField({ copyable: true });
      const btn = container.querySelector("button") as HTMLButtonElement;

      // Before copy: shows content_copy
      const iconBefore = btn.querySelector(".material-symbols-rounded");
      expect(iconBefore?.textContent?.trim()).toBe("content_copy");

      fireEvent.click(btn);

      await waitFor(() => {
        const iconAfter = btn.querySelector(".material-symbols-rounded");
        expect(iconAfter?.textContent?.trim()).toBe("check");
      });
    });
  });

  describe("suffix", () => {
    it("renders suffix content", () => {
      const { container } = renderField({
        suffix: <span data-testid="suffix">Badge</span>,
      });
      const suffix = container.querySelector("[data-testid='suffix']");
      expect(suffix).toBeInTheDocument();
      expect(suffix?.textContent).toBe("Badge");
    });
  });

  describe("truncation", () => {
    it("applies truncate class to value", () => {
      const { container } = renderField();
      const valueSpan = container.querySelector(".truncate");
      expect(valueSpan).toBeInTheDocument();
    });
  });

  describe("className", () => {
    it("applies custom className to container", () => {
      const { container } = renderField({ className: "custom-class" });
      expect(
        container.firstElementChild?.getAttribute("class"),
      ).toContain("custom-class");
    });
  });
});
