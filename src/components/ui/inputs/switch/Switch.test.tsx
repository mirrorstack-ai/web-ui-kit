import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

function renderSwitch(props: Partial<Parameters<typeof Switch>[0]> = {}) {
  return render(
    <Switch
      checked={false}
      onChange={() => {}}
      aria-label="Test switch"
      {...props}
    />,
  );
}

function getSwitch(container: HTMLElement) {
  return container.querySelector("[role='switch']") as HTMLButtonElement;
}

describe("Switch", () => {
  it("renders with role switch", () => {
    const { container } = renderSwitch();
    const sw = getSwitch(container);
    expect(sw).toBeInTheDocument();
    expect(sw.getAttribute("role")).toBe("switch");
  });

  it("sets aria-checked based on checked prop", () => {
    const { container: offContainer } = renderSwitch({ checked: false });
    expect(getSwitch(offContainer).getAttribute("aria-checked")).toBe("false");

    const { container: onContainer } = renderSwitch({ checked: true });
    expect(getSwitch(onContainer).getAttribute("aria-checked")).toBe("true");
  });

  it("sets aria-label", () => {
    const { container } = renderSwitch({ "aria-label": "Notifications" });
    expect(getSwitch(container).getAttribute("aria-label")).toBe(
      "Notifications",
    );
  });

  it("sets aria-labelledby", () => {
    const { container } = renderSwitch({ "aria-labelledby": "label-id" });
    expect(getSwitch(container).getAttribute("aria-labelledby")).toBe(
      "label-id",
    );
  });

  describe("onChange", () => {
    it("calls onChange with true when unchecked switch is clicked", () => {
      const handler = vi.fn();
      const { container } = renderSwitch({ checked: false, onChange: handler });
      fireEvent.click(getSwitch(container));
      expect(handler).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when checked switch is clicked", () => {
      const handler = vi.fn();
      const { container } = renderSwitch({ checked: true, onChange: handler });
      fireEvent.click(getSwitch(container));
      expect(handler).toHaveBeenCalledWith(false);
    });
  });

  describe("color", () => {
    it("applies primary track color when checked", () => {
      const { container } = renderSwitch({ checked: true, color: "primary" });
      expect(getSwitch(container).getAttribute("class")).toContain(
        "bg-primary",
      );
    });

    it("applies error track color when checked", () => {
      const { container } = renderSwitch({ checked: true, color: "error" });
      expect(getSwitch(container).getAttribute("class")).toContain("bg-error");
    });

    it("applies warning track color when checked", () => {
      const { container } = renderSwitch({ checked: true, color: "warning" });
      expect(getSwitch(container).getAttribute("class")).toContain(
        "bg-warning",
      );
    });

    it("applies outline-variant when unchecked", () => {
      const { container } = renderSwitch({ checked: false });
      expect(getSwitch(container).getAttribute("class")).toContain(
        "bg-outline-variant",
      );
    });
  });

  describe("thumb", () => {
    it("translates thumb when checked", () => {
      const { container } = renderSwitch({ checked: true });
      const thumb = container.querySelector("span");
      expect(thumb?.getAttribute("class")).toContain("translate-x-5");
    });

    it("does not translate thumb when unchecked", () => {
      const { container } = renderSwitch({ checked: false });
      const thumb = container.querySelector("span");
      expect(thumb?.getAttribute("class")).not.toContain("translate-x-5");
    });
  });

  describe("disabled", () => {
    it("disables the button when disabled", () => {
      const { container } = renderSwitch({ disabled: true });
      expect(getSwitch(container)).toBeDisabled();
    });

    it("applies opacity when disabled", () => {
      const { container } = renderSwitch({ disabled: true });
      expect(getSwitch(container).getAttribute("class")).toContain(
        "opacity-50",
      );
    });

    it("does not call onChange when disabled", () => {
      const handler = vi.fn();
      const { container } = renderSwitch({
        disabled: true,
        onChange: handler,
      });
      fireEvent.click(getSwitch(container));
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("className", () => {
    it("applies custom className", () => {
      const { container } = renderSwitch({ className: "custom-class" });
      expect(getSwitch(container).getAttribute("class")).toContain(
        "custom-class",
      );
    });
  });
});
