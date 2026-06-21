import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import {
  describe,
  expect,
  it,
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
  vi,
} from "vitest";
import { DropdownMenu } from "./DropdownMenu";
import type { DropdownMenuEntry } from "./DropdownMenu";

afterEach(cleanup);

const HOVER_CLOSE_GRACE_MS = 150;

// JSDOM ships no PointerEvent, and fireEvent.pointerEnter(el, { pointerType })
// silently drops the init dict — leaving `e.pointerType` undefined, which the
// component's mouse-only guard treats as not-a-mouse. Stub a MouseEvent
// subclass that carries pointerType so hover events are dispatched as the
// component sees them in a real browser.
class StubPointerEvent extends MouseEvent {
  pointerType: string;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? "";
  }
}

const items: DropdownMenuEntry[] = [
  { id: "edit", label: "Edit", icon: "edit" },
  { id: "duplicate", label: "Duplicate", icon: "content_copy" },
  { type: "separator" },
  { id: "disabled-item", label: "Locked", disabled: true },
  { id: "delete", label: "Delete", icon: "delete", variant: "danger" },
];

const trigger = <button>Open</button>;

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens menu on click", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", () => {
    const onSelect = vi.fn();
    render(<DropdownMenu items={items} onSelect={onSelect} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Edit"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit", label: "Edit" }),
    );
  });

  it("closes on Escape", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("skips disabled items in keyboard nav", () => {
    const onSelect = vi.fn();
    render(<DropdownMenu items={items} onSelect={onSelect} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    const menu = screen.getByRole("menu");

    // ArrowDown from first item (Edit) -> Duplicate -> skip separator -> skip disabled -> Delete
    fireEvent.keyDown(menu, { key: "ArrowDown" }); // Edit -> Duplicate
    fireEvent.keyDown(menu, { key: "ArrowDown" }); // Duplicate -> Delete (skips separator + disabled)
    fireEvent.keyDown(menu, { key: "Enter" });

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "delete" }),
    );
  });
});

describe("DropdownMenu openOnHover", () => {
  const realPointerEvent = globalThis.PointerEvent;
  beforeAll(() => {
    globalThis.PointerEvent = StubPointerEvent as unknown as typeof PointerEvent;
  });
  afterAll(() => {
    globalThis.PointerEvent = realPointerEvent;
  });
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const mouse = { pointerType: "mouse" };

  // The hover handlers live on the OUTER container div (`relative inline-block`),
  // and pointerenter/pointerleave do not bubble — so fire them directly on the
  // container, not on a descendant (the trigger button or a menu item).
  const renderHover = (onSelect: (item: { id: string }) => void = () => {}) => {
    const { container } = render(
      <DropdownMenu
        items={items}
        onSelect={onSelect}
        trigger={trigger}
        openOnHover
      />,
    );
    return container.firstChild as HTMLElement;
  };

  it("opens on pointerEnter (mouse)", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, mouse);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("stays open when the pointer moves trigger->menu within the grace", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, mouse);
    // Leave the container (queues a close)...
    fireEvent.pointerLeave(root, mouse);
    // ...but re-enter before the grace elapses cancels the close. (The menu is
    // a container descendant, so trigger->menu travel never leaves the container
    // in real use; here we re-enter the container itself to model that.)
    act(() => vi.advanceTimersByTime(HOVER_CLOSE_GRACE_MS - 50));
    fireEvent.pointerEnter(root, mouse);
    act(() => vi.advanceTimersByTime(HOVER_CLOSE_GRACE_MS));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes after the grace on pointerLeave", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, mouse);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.pointerLeave(root, mouse);
    act(() => vi.advanceTimersByTime(HOVER_CLOSE_GRACE_MS));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does NOT hover-open for touch pointers", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, { pointerType: "touch" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("still closes on Escape with openOnHover on", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, mouse);
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("still selects (and closes) on item click with openOnHover on", () => {
    const onSelect = vi.fn();
    const root = renderHover(onSelect);
    fireEvent.pointerEnter(root, mouse);
    fireEvent.click(screen.getByText("Edit"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit" }),
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("click still toggles a hover-opened menu closed", () => {
    const root = renderHover();
    fireEvent.pointerEnter(root, mouse);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Open"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
