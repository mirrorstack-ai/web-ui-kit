import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { createRef, StrictMode, useState } from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Dialog } from "./Dialog";

afterEach(cleanup);

describe("Dialog", () => {
  it("focuses an explicitly requested element inside the dialog", () => {
    const input = createRef<HTMLInputElement>();
    render(
      <Dialog open initialFocusRef={input} title="Initial focus">
        <input ref={input} aria-label="Preferred field" />
      </Dialog>,
    );

    expect(document.activeElement).toBe(
      screen.getByRole("textbox", { name: "Preferred field" }),
    );
  });

  it("keeps the built-in close button inside the dialog boundary", () => {
    render(<Dialog open onClose={() => {}} title="Closable dialog" />);

    const dialog = screen.getByRole("dialog", { name: "Closable dialog" });
    expect(within(dialog).getByRole("button", { name: "Close" })).toBeTruthy();
  });

  it("wraps Shift+Tab from the focused dialog root to its last control", () => {
    render(
      <Dialog
        open
        hideCloseButton
        onClose={() => {}}
        title="Root focus"
        actions={[
          { label: "First action", onClick: () => {} },
          { label: "Last action", onClick: () => {} },
        ]}
      />,
    );

    const dialog = screen.getByRole("dialog", { name: "Root focus" });
    const last = within(dialog).getByRole("button", { name: "Last action" });
    expect(document.activeElement).toBe(dialog);

    const allowed = fireEvent.keyDown(document, {
      key: "Tab",
      shiftKey: true,
    });

    expect(allowed).toBe(false);
    expect(document.activeElement).toBe(last);
  });

  it("sends Escape only to the topmost dialog and does not let a lower close steal focus", () => {
    const closeFirst = vi.fn();
    const closeSecond = vi.fn();
    const { rerender } = render(
      <>
        <Dialog open onClose={closeFirst} title="First dialog" />
        <Dialog open onClose={closeSecond} title="Second dialog" />
      </>,
    );

    const second = screen.getByRole("dialog", { name: "Second dialog" });
    expect(document.activeElement).toBe(second);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(closeSecond).toHaveBeenCalledOnce();
    expect(closeFirst).not.toHaveBeenCalled();

    rerender(
      <>
        <Dialog open={false} onClose={closeFirst} title="First dialog" />
        <Dialog open onClose={closeSecond} title="Second dialog" />
      </>,
    );
    expect(document.activeElement).toBe(second);
  });

  it("traps focus in the topmost nested dialog and restores its opener", () => {
    const closeBase = vi.fn();
    const closeNested = vi.fn();

    function NestedDialogs() {
      const [nestedOpen, setNestedOpen] = useState(false);
      return (
        <Dialog open hideCloseButton onClose={closeBase} title="Base dialog">
          <button type="button" onClick={() => setNestedOpen(true)}>
            Open nested
          </button>
          <button type="button">Base control</button>
          <Dialog
            open={nestedOpen}
            hideCloseButton
            title="Nested dialog"
            onClose={() => {
              closeNested();
              setNestedOpen(false);
            }}
          >
            <button type="button">Nested first</button>
            <button type="button">Nested last</button>
          </Dialog>
        </Dialog>
      );
    }

    render(<NestedDialogs />);
    const opener = screen.getByRole("button", { name: "Open nested" });
    opener.focus();
    fireEvent.click(opener);

    const nested = screen.getByRole("dialog", { name: "Nested dialog" });
    const nestedFirst = within(nested).getByRole("button", {
      name: "Nested first",
    });
    expect(document.activeElement).toBe(nested);

    screen.getByRole("button", { name: "Base control" }).focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(nestedFirst);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(closeNested).toHaveBeenCalledOnce();
    expect(closeBase).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: "Nested dialog" })).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("renders nothing when closed", () => {
    render(<Dialog open={false} title="Test" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(<Dialog open title="Test Dialog" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("calls onClose on backdrop click", () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Test" />);
    // No module mount is present, so the owning body is the portal fallback.
    const backdrop = document.body.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Test" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders action buttons", () => {
    const onClick = vi.fn();
    render(
      <Dialog
        open
        title="Test"
        actions={[{ label: "Confirm", onClick }]}
      />,
    );
    const btn = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders children content", () => {
    render(
      <Dialog open title="Test">
        <p>Dialog body</p>
      </Dialog>,
    );
    expect(screen.getByText("Dialog body")).toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<Dialog open title="Accessible Dialog" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
  });

  it("compensates scrollbar gutter with paddingRight when locking scroll", () => {
    // Simulate a vertical scrollbar: viewport is 1024px wide but
    // the document only has 1009px of usable width (15px gutter).
    const originalInnerWidth = window.innerWidth;
    const originalClientWidth = document.documentElement.clientWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1009,
    });
    try {
      const { rerender } = render(<Dialog open title="Test" />);
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.paddingRight).toBe("15px");
      rerender(<Dialog open={false} title="Test" />);
      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: originalClientWidth,
      });
    }
  });

  it("skips paddingRight when there's no scrollbar gutter", () => {
    // Page already has scrollbar-gutter: stable (or no scrollbar at
    // all), so innerWidth === clientWidth and locking scroll
    // shouldn't add padding.
    const originalInnerWidth = window.innerWidth;
    const originalClientWidth = document.documentElement.clientWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1024,
    });
    try {
      render(<Dialog open title="Test" />);
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: originalClientWidth,
      });
    }
  });

  it("keeps the owning document locked until its last dialog closes", () => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "clip";
    document.body.style.paddingRight = "7px";

    try {
      const { rerender } = render(
        <>
          <Dialog open title="First" />
          <Dialog open title="Second" />
        </>,
      );
      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <>
          <Dialog open={false} title="First" />
          <Dialog open title="Second" />
        </>,
      );
      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <>
          <Dialog open={false} title="First" />
          <Dialog open={false} title="Second" />
        </>,
      );
      expect(document.body.style.overflow).toBe("clip");
      expect(document.body.style.paddingRight).toBe("7px");
    } finally {
      cleanup();
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    }
  });
});

// The bug this guards, verified against the Tailwind v4 source: `space-y-*`
// compiles to `:where(& > :not(:last-child)) { margin-block-end: … }` — margin
// on every child EXCEPT the last. A dialog rendered as a layout child therefore
// changes WHICH element matches `:last-child`, and the element that used to be
// last silently gains bottom margin the moment the dialog opens. The container
// grows and the page shifts, with nothing in the dialog's own styles to blame.
//
// jsdom computes no layout, so asserting heights would be vacuous. These assert
// the structural precondition instead, which is the actual mechanism: opening a
// dialog must not change the parent's child list or which child is last.
describe("Dialog does not participate in its parent's layout", () => {
  function Host({ open }: { open: boolean }) {
    return (
      <div data-testid="stack" className="space-y-6">
        <div data-testid="first">first</div>
        <div data-testid="tail">tail</div>
        <Dialog open={open} onClose={() => {}} title="t">
          body
        </Dialog>
      </div>
    );
  }

  it("leaves the parent's child count and :last-child unchanged when opened", () => {
    const { rerender } = render(<Host open={false} />);
    const stack = screen.getByTestId("stack");
    const closedCount = stack.children.length;
    const closedLast = stack.lastElementChild;

    rerender(<Host open />);

    expect(screen.getByText("body")).toBeInTheDocument(); // it really did open
    expect(stack.children.length).toBe(closedCount);
    expect(stack.lastElementChild).toBe(closedLast);
    expect(stack.lastElementChild).toBe(screen.getByTestId("tail"));
    // and `tail` keeps matching :last-child, which is what carries the margin
    expect(screen.getByTestId("tail").matches(":last-child")).toBe(true);
  });

  it("renders into document.body, outside the host container", () => {
    render(<Host open />);
    const stack = screen.getByTestId("stack");
    expect(stack.contains(screen.getByText("body"))).toBe(false);
  });
});

describe("Dialog DOM ownership", () => {
  it("portals inside the nearest module mount boundary", () => {
    const mount = document.createElement("section");
    mount.setAttribute("data-ms-mount", "user-core");
    const container = document.createElement("div");
    mount.append(container);
    const otherMount = document.createElement("section");
    otherMount.setAttribute("data-ms-mount", "another-module");
    const outsideTrigger = document.createElement("button");
    otherMount.append(outsideTrigger);
    document.body.append(mount, otherMount);
    outsideTrigger.focus();

    try {
      render(
        <div data-testid="module-layout">
          <div data-testid="module-tail">tail</div>
          <Dialog open title="Scoped dialog">
            scoped body
          </Dialog>
        </div>,
        { container },
      );

      const dialog = within(mount).getByRole("dialog", {
        name: "Scoped dialog",
      });
      const backdrop = mount.querySelector('[aria-hidden="true"]');
      expect(dialog.closest("[data-ms-mount]")).toBe(mount);
      expect(container.contains(dialog)).toBe(false);
      expect(backdrop?.parentElement).toBe(mount);
      expect(screen.getByTestId("module-layout").lastElementChild).toBe(
        screen.getByTestId("module-tail"),
      );
    } finally {
      cleanup();
      mount.remove();
      otherMount.remove();
    }
  });

  it("uses a foreign document for its portal, focus, listener, and scroll lock", () => {
    const frame = document.createElement("iframe");
    document.body.append(frame);
    const foreignDocument = frame.contentDocument;
    if (!foreignDocument) throw new Error("iframe document is unavailable");
    const foreignView = foreignDocument.defaultView;
    if (!foreignView) throw new Error("iframe window is unavailable");

    const trigger = foreignDocument.createElement("button");
    trigger.textContent = "Open";
    const container = foreignDocument.createElement("div");
    foreignDocument.body.append(trigger, container);
    trigger.focus();

    const onClose = vi.fn();
    const mainBodyOverflow = document.body.style.overflow;
    const mainBodyPaddingRight = document.body.style.paddingRight;
    const originalForeignInnerWidth = foreignView.innerWidth;
    const originalForeignClientWidth =
      foreignDocument.documentElement.clientWidth;
    Object.defineProperty(foreignView, "innerWidth", {
      configurable: true,
      value: 900,
    });
    Object.defineProperty(foreignDocument.documentElement, "clientWidth", {
      configurable: true,
      value: 880,
    });
    try {
      const rendered = render(
        <StrictMode>
          <Dialog open onClose={onClose} title="Foreign dialog">
            foreign body
          </Dialog>
        </StrictMode>,
        { container, baseElement: foreignDocument.body },
      );

      const dialog = within(foreignDocument.body).getByRole("dialog", {
        name: "Foreign dialog",
      });
      expect(dialog.ownerDocument).toBe(foreignDocument);
      expect(container.contains(dialog)).toBe(false);
      expect(foreignDocument.body.contains(dialog)).toBe(true);
      expect(foreignDocument.activeElement).toBe(dialog);
      expect(foreignDocument.body.style.overflow).toBe("hidden");
      expect(foreignDocument.body.style.paddingRight).toBe("20px");
      expect(document.body.style.overflow).toBe(mainBodyOverflow);
      expect(document.body.style.paddingRight).toBe(mainBodyPaddingRight);

      fireEvent.keyDown(foreignDocument, { key: "Escape" });
      expect(onClose).toHaveBeenCalledOnce();

      rendered.rerender(
        <StrictMode>
          <Dialog open={false} onClose={onClose} title="Foreign dialog" />
        </StrictMode>,
      );
      expect(foreignDocument.body.style.overflow).toBe("");
      expect(foreignDocument.body.style.paddingRight).toBe("");
      expect(foreignDocument.activeElement).toBe(trigger);
      fireEvent.keyDown(foreignDocument, { key: "Escape" });
      expect(onClose).toHaveBeenCalledOnce();

      rendered.rerender(
        <StrictMode>
          <Dialog open onClose={onClose} title="Foreign dialog" />
        </StrictMode>,
      );
      expect(foreignDocument.body.style.overflow).toBe("hidden");
      rendered.unmount();
      expect(foreignDocument.body.style.overflow).toBe("");
      expect(foreignDocument.body.style.paddingRight).toBe("");
      expect(foreignDocument.activeElement).toBe(trigger);
      fireEvent.keyDown(foreignDocument, { key: "Escape" });
      expect(onClose).toHaveBeenCalledOnce();
    } finally {
      cleanup();
      Object.defineProperty(foreignView, "innerWidth", {
        configurable: true,
        value: originalForeignInnerWidth,
      });
      Object.defineProperty(foreignDocument.documentElement, "clientWidth", {
        configurable: true,
        value: originalForeignClientWidth,
      });
      frame.remove();
    }
  });
});
