import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SegmentedButton } from "./SegmentedButton";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
] as const;

function renderSegmented(props: Partial<Parameters<typeof SegmentedButton>[0]> = {}) {
  return render(
    <SegmentedButton
      options={options}
      value="a"
      onChange={() => {}}
      aria-label="Test group"
      {...props}
    />,
  );
}

function getButtons(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button"));
}

describe("SegmentedButton", () => {
  it("renders all options", () => {
    const { container } = renderSegmented();
    const buttons = getButtons(container);
    expect(buttons).toHaveLength(3);
    expect(buttons[0].textContent).toBe("Option A");
    expect(buttons[1].textContent).toBe("Option B");
    expect(buttons[2].textContent).toBe("Option C");
  });

  it("has group role with aria-label", () => {
    const { container } = renderSegmented();
    const group = container.querySelector("[role='group']");
    expect(group).toBeInTheDocument();
    expect(group?.getAttribute("aria-label")).toBe("Test group");
  });

  describe("selection", () => {
    it("marks selected option with aria-pressed", () => {
      const { container } = renderSegmented({ value: "b" });
      const buttons = getButtons(container);
      expect(buttons[0].getAttribute("aria-pressed")).toBe("false");
      expect(buttons[1].getAttribute("aria-pressed")).toBe("true");
      expect(buttons[2].getAttribute("aria-pressed")).toBe("false");
    });

    it("applies selected styles to active option", () => {
      const { container } = renderSegmented({ value: "a" });
      const buttons = getButtons(container);
      expect(buttons[0].getAttribute("class")).toContain("bg-secondary-container");
    });

    it("applies unselected styles to inactive options", () => {
      const { container } = renderSegmented({ value: "a" });
      const buttons = getButtons(container);
      expect(buttons[1].getAttribute("class")).toContain("bg-surface");
    });
  });

  describe("onChange", () => {
    it("calls onChange when clicking an unselected option", () => {
      const handler = vi.fn();
      const { container } = renderSegmented({ value: "a", onChange: handler });
      const buttons = getButtons(container);
      fireEvent.click(buttons[1]);
      expect(handler).toHaveBeenCalledWith("b");
    });

    it("does not call onChange when clicking the selected option", () => {
      const handler = vi.fn();
      const { container } = renderSegmented({ value: "a", onChange: handler });
      const buttons = getButtons(container);
      fireEvent.click(buttons[0]);
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("disabled", () => {
    it("disables all buttons when disabled", () => {
      const { container } = renderSegmented({ disabled: true });
      const buttons = getButtons(container);
      for (const button of buttons) {
        expect(button).toBeDisabled();
      }
    });

    it("applies opacity when disabled", () => {
      const { container } = renderSegmented({ disabled: true });
      const group = container.querySelector("[role='group']");
      expect(group?.getAttribute("class")).toContain("opacity-50");
    });

    it("does not call onChange when disabled", () => {
      const handler = vi.fn();
      const { container } = renderSegmented({ disabled: true, onChange: handler });
      const buttons = getButtons(container);
      fireEvent.click(buttons[1]);
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("className", () => {
    it("applies custom className to the container", () => {
      const { container } = renderSegmented({ className: "custom-class" });
      const group = container.querySelector("[role='group']");
      expect(group?.getAttribute("class")).toContain("custom-class");
    });
  });
});
