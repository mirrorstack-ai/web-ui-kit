import {
  act,
  cleanup,
  createEvent,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Popover } from "./Popover";

const CLOSE_DELAY_MS = 150;
const originalPointerEvent = window.PointerEvent;

class TestPointerEvent extends MouseEvent {
  readonly pointerType: string;

  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? "";
  }
}

beforeAll(() => {
  Object.defineProperty(window, "PointerEvent", {
    configurable: true,
    value: TestPointerEvent,
  });
});

afterAll(() => {
  Object.defineProperty(window, "PointerEvent", {
    configurable: true,
    value: originalPointerEvent,
  });
});

function rect({
  bottom,
  height,
  left,
  right,
  top,
  width,
}: {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}): DOMRect {
  return {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x: left,
    y: top,
    toJSON: () => ({}),
  };
}

function renderPopover() {
  return render(
    <Popover trigger={<button type="button">Person</button>}>
      <div>Identity details</div>
    </Popover>,
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Popover", () => {
  it("opens on hover and closes after mouse leave", () => {
    vi.useFakeTimers();
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText("Identity details")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(CLOSE_DELAY_MS));
    expect(screen.queryByText("Identity details")).not.toBeInTheDocument();
  });

  it("opens on keyboard focus and closes when focus leaves", () => {
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });
    const outside = document.createElement("button");
    document.body.append(outside);

    fireEvent.focus(trigger);
    expect(screen.getByText("Identity details")).toBeInTheDocument();
    fireEvent.blur(trigger, { relatedTarget: outside });
    expect(screen.queryByText("Identity details")).not.toBeInTheDocument();
    outside.remove();
  });

  it("stays open when the pointer leaves while the trigger still has focus", () => {
    vi.useFakeTimers();
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });

    fireEvent.focus(trigger);
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(CLOSE_DELAY_MS + 1));

    expect(screen.getByText("Identity details")).toBeInTheDocument();
  });

  it("stays open when focus leaves while the pointer is still over it", () => {
    vi.useFakeTimers();
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });
    const outside = document.createElement("button");
    document.body.append(outside);

    fireEvent.mouseEnter(trigger);
    fireEvent.focus(trigger);
    fireEvent.blur(trigger, { relatedTarget: outside });
    expect(screen.getByText("Identity details")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(CLOSE_DELAY_MS + 1));
    expect(screen.queryByText("Identity details")).not.toBeInTheDocument();
    outside.remove();
  });

  it("opens on click for touch and pointer activation", () => {
    renderPopover();

    fireEvent.click(screen.getByRole("button", { name: "Person" }));

    expect(screen.getByText("Identity details")).toBeInTheDocument();
  });

  it("reveals on the first touch tap and allows the second tap to navigate", () => {
    render(
      <Popover trigger={<a href="/users/ada">Ada</a>}>
        <div>Identity details</div>
      </Popover>,
    );
    const trigger = screen.getByRole("link", { name: "Ada" });

    fireEvent.pointerDown(trigger, { pointerType: "touch" });
    const firstClick = createEvent.click(trigger);
    fireEvent(trigger, firstClick);

    expect(firstClick.defaultPrevented).toBe(true);
    expect(screen.getByText("Identity details")).toBeInTheDocument();

    fireEvent.pointerDown(trigger, { pointerType: "touch" });
    const secondClick = createEvent.click(trigger);
    fireEvent(trigger, secondClick);

    expect(secondClick.defaultPrevented).toBe(false);
    expect(screen.getByText("Identity details")).toBeInTheDocument();
  });

  it("never prevents a mouse click", () => {
    render(
      <Popover trigger={<a href="/users/ada">Ada</a>}>
        <div>Identity details</div>
      </Popover>,
    );
    const trigger = screen.getByRole("link", { name: "Ada" });

    fireEvent.pointerDown(trigger, { pointerType: "mouse" });
    const click = createEvent.click(trigger);
    fireEvent(trigger, click);

    expect(click.defaultPrevented).toBe(false);
    expect(screen.getByText("Identity details")).toBeInTheDocument();
  });

  it("keeps the content open when the pointer enters it before the close delay", () => {
    vi.useFakeTimers();
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });

    fireEvent.mouseEnter(trigger);
    const content = screen.getByText("Identity details").parentElement!;
    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(CLOSE_DELAY_MS - 25));
    fireEvent.mouseEnter(content);
    act(() => vi.advanceTimersByTime(CLOSE_DELAY_MS));

    expect(screen.getByText("Identity details")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus from content to the trigger", () => {
    render(
      <Popover trigger={<button type="button">Person</button>}>
        <button type="button">Card action</button>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Person" });
    fireEvent.focus(trigger);
    const action = screen.getByRole("button", { name: "Card action" });
    action.focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("button", { name: "Card action" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on an outside click", () => {
    renderPopover();
    fireEvent.focus(screen.getByRole("button", { name: "Person" }));
    expect(screen.getByText("Identity details")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Identity details")).not.toBeInTheDocument();
  });

  it("renders the floating content in a body portal", () => {
    const { container } = renderPopover();
    fireEvent.focus(screen.getByRole("button", { name: "Person" }));
    const content = document.querySelector<HTMLElement>("[data-popover-content]")!;

    expect(document.body).toContainElement(content);
    expect(container).not.toContainElement(content);
  });

  it("does not trap focus or intercept Tab", () => {
    render(
      <Popover trigger={<button type="button">Person</button>}>
        <button type="button">Card action</button>
      </Popover>,
    );
    fireEvent.focus(screen.getByRole("button", { name: "Person" }));
    const action = screen.getByRole("button", { name: "Card action" });
    const tab = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "Tab",
    });

    action.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(false);
  });

  it("associates the trigger with content exactly once", () => {
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Person" });
    fireEvent.focus(trigger);
    const content = document.querySelector<HTMLElement>("[data-popover-content]")!;

    expect(trigger).toHaveAttribute("aria-describedby", content.id);
    expect(trigger.getAttribute("aria-describedby")?.split(" ")).toEqual([
      content.id,
    ]);
    expect(content).not.toHaveAttribute("role");
    expect(content).not.toHaveAttribute("aria-live");
  });

  it("flips above and clamps horizontally near viewport edges", () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 320,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 200,
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.hasAttribute("data-popover-content")) {
          return rect({
            bottom: 100,
            height: 100,
            left: 0,
            right: 160,
            top: 0,
            width: 160,
          });
        }
        return rect({
          bottom: 194,
          height: 24,
          left: 290,
          right: 314,
          top: 170,
          width: 24,
        });
      },
    );

    try {
      renderPopover();
      fireEvent.focus(screen.getByRole("button", { name: "Person" }));
      const content = document.querySelector<HTMLElement>("[data-popover-content]")!;

      expect(content).toHaveAttribute("data-placement", "top");
      expect(content.style.left).toBe("152px");
      expect(content.style.top).toBe("62px");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
      Object.defineProperty(window, "innerHeight", {
        configurable: true,
        value: originalInnerHeight,
      });
    }
  });
});
