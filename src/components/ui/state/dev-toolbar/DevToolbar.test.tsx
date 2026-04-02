import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DevToolbar } from "./DevToolbar";

const items = [
  { label: "State A", value: "a" },
  { label: "State B", value: "b" },
];

function renderToolbar(
  props: Partial<Parameters<typeof DevToolbar>[0]> = {},
) {
  return render(
    <DevToolbar
      items={items}
      value="a"
      onChange={() => {}}
      {...props}
    />,
  );
}

function getButtons(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button"));
}

describe("DevToolbar", () => {
  it("renders all item buttons", () => {
    const { container } = renderToolbar();
    const buttons = getButtons(container);
    expect(buttons[0].textContent).toBe("State A");
    expect(buttons[1].textContent).toBe("State B");
  });

  it("renders DEV label", () => {
    const { container } = renderToolbar();
    expect(container.textContent).toContain("DEV:");
  });

  it("highlights the selected item", () => {
    const { container } = renderToolbar({ value: "a" });
    const buttons = getButtons(container);
    expect(buttons[0].getAttribute("class")).toContain("bg-primary");
    expect(buttons[1].getAttribute("class")).toContain(
      "bg-surface-container-low",
    );
  });

  it("calls onChange when clicking an item", () => {
    const handler = vi.fn();
    const { container } = renderToolbar({ onChange: handler });
    const buttons = getButtons(container);
    fireEvent.click(buttons[1]);
    expect(handler).toHaveBeenCalledWith("b");
  });

  it("renders error toggle when onToggleError is provided", () => {
    const { container } = renderToolbar({
      onToggleError: vi.fn(),
      showError: false,
    });
    const buttons = getButtons(container);
    const errorButton = buttons[buttons.length - 1];
    expect(errorButton.textContent).toBe("Error OFF");
  });

  it("shows Error ON when showError is true", () => {
    const { container } = renderToolbar({
      onToggleError: vi.fn(),
      showError: true,
    });
    const buttons = getButtons(container);
    const errorButton = buttons[buttons.length - 1];
    expect(errorButton.textContent).toBe("Error ON");
    expect(errorButton.getAttribute("class")).toContain("bg-error");
  });

  it("calls onToggleError when error button is clicked", () => {
    const handler = vi.fn();
    const { container } = renderToolbar({
      onToggleError: handler,
      showError: false,
    });
    const buttons = getButtons(container);
    fireEvent.click(buttons[buttons.length - 1]);
    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not render error button without onToggleError", () => {
    const { container } = renderToolbar();
    const buttons = getButtons(container);
    expect(buttons).toHaveLength(2);
  });
});
