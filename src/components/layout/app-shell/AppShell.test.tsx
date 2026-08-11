import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeAll, afterAll } from "vitest";
import { AppShell } from "./AppShell";

afterEach(cleanup);

describe("AppShell mobile navigation", () => {
  it("hosts mobileNavigation as a pinned bar by default", () => {
    render(
      <AppShell mobileNavigation={<span>Bottom bar</span>}>content</AppShell>,
    );
    expect(screen.getByText("Bottom bar")).toBeInTheDocument();
    expect(screen.queryByLabelText("Open navigation")).not.toBeInTheDocument();
  });

  it("drawer variant renders a menu trigger and opens the drawer on click", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<span>Drawer nav</span>}
      >
        content
      </AppShell>,
    );
    // Side nav markup exists (hidden via CSS below lg); the drawer is closed.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open navigation"));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("Drawer nav");
  });

  // The nav rail's hover label overflows the rail and must paint above the
  // content column — which is position:relative and comes LATER in DOM order.
  // The z-index has to live on THIS column: putting it on NavigationRail only
  // orders it inside this (static) column, so the label still painted under
  // content. Verified in a live page before this test was written.
  it("gives the desktop nav column a stacking context above the content column", () => {
    const { container } = render(
      <AppShell navigation={<span>Desktop nav</span>}>content</AppShell>,
    );
    const column = container.querySelector("div.lg\\:flex.shrink-0");

    expect(column).not.toBeNull();
    expect(column).toHaveClass("relative");
    expect(column).toHaveClass("z-30");
  });

  it("drawer prefers mobileNavigation content over navigation", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<span>Desktop nav</span>}
        mobileNavigation={<span>Mobile nav</span>}
      >
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    expect(screen.getByRole("dialog")).toHaveTextContent("Mobile nav");
    expect(screen.getByRole("dialog")).not.toHaveTextContent("Desktop nav");
  });

  it("closes the drawer when a nav control inside is activated", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<button type="button">Profile</button>}
      >
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Profile" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the drawer on Escape", () => {
    render(
      <AppShell mobileNavigationVariant="drawer" navigation={<span>Nav</span>}>
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("AppShell agent sidebar pass-through", () => {
  // jsdom reports clientWidth 0, which would collapse the tab strip to a
  // single visible tab. Report a real width so both tabs render inline.
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 400,
    });
  });
  afterAll(() => {
    Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
  });

  const openSidebar = () => fireEvent.click(screen.getByLabelText("Open agent"));

  it("forwards controlled tabs to the agent header", () => {
    const onSelectTab = vi.fn();
    const onCloseTab = vi.fn();
    render(
      <AppShell
        agentTabs={[
          { id: "t1", title: "First chat" },
          { id: "t2", title: "Second chat" },
        ]}
        activeAgentTabId="t1"
        onSelectAgentTab={onSelectTab}
        onCloseAgentTab={onCloseTab}
        onNewAgentTab={() => {}}
      >
        content
      </AppShell>,
    );
    openSidebar();

    // Name regexes: a tab's accessible name folds in its close button's label.
    const second = screen.getByRole("tab", { name: /^Second chat/ });
    expect(screen.getByRole("tab", { name: /^First chat/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.click(second);
    expect(onSelectTab).toHaveBeenCalledWith("t2");

    fireEvent.click(screen.getByLabelText("Close Second chat"));
    expect(onCloseTab).toHaveBeenCalledWith("t2");
  });

  it("forwards rename/delete handlers to the history rows", () => {
    const onRename = vi.fn();
    const onDelete = vi.fn();
    render(
      <AppShell
        agentHistory={[
          { label: "Today", items: [{ id: "h1", title: "Old title", updatedAt: "2026-06-12T00:00:00Z" }] },
        ]}
        onRenameAgentConversation={onRename}
        onDeleteAgentConversation={onDelete}
      >
        content
      </AppShell>,
    );
    openSidebar();
    fireEvent.click(screen.getByLabelText("Chat history"));

    fireEvent.click(screen.getByLabelText("Rename conversation"));
    const input = screen.getByLabelText("Rename conversation: Old title");
    fireEvent.change(input, { target: { value: "New title" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onRename).toHaveBeenCalledWith("h1", "New title");

    // Delete opens a confirmation dialog first; the forwarded handler fires
    // only after the user clicks the destructive confirm button.
    fireEvent.click(screen.getByLabelText("Delete conversation"));
    expect(onDelete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith("h1");
  });

  it("forwards queued messages to the agent input", () => {
    const onCancel = vi.fn();
    render(
      <AppShell
        agentQueuedMessages={[{ id: "q1", text: "Queued question" }]}
        onCancelAgentQueued={onCancel}
      >
        content
      </AppShell>,
    );
    openSidebar();

    expect(screen.getByText("Queued question")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Cancel queued message"));
    expect(onCancel).toHaveBeenCalledWith("q1");
  });

  it("forwards label overrides and placeholder to the header and input", () => {
    render(
      <AppShell
        agentHeaderLabels={{ historyButtonLabel: "歷史紀錄", newChatLabel: "新對話" }}
        agentInputLabels={{ queuedPrefix: "排隊中", cancelQueuedLabel: "取消排隊訊息" }}
        agentInputPlaceholder="輸入訊息…"
        agentQueuedMessages={[{ id: "q1", text: "Queued question" }]}
      >
        content
      </AppShell>,
    );
    openSidebar();

    expect(screen.getByLabelText("歷史紀錄")).toBeInTheDocument();
    expect(screen.getByLabelText("新對話")).toBeInTheDocument();
    expect(screen.getByText("排隊中")).toBeInTheDocument();
    expect(screen.getByLabelText("取消排隊訊息")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("輸入訊息…")).toBeInTheDocument();
  });

  it("keeps the EN label defaults when no label props are wired", () => {
    render(<AppShell>content</AppShell>);
    openSidebar();
    expect(screen.getByLabelText("Chat history")).toBeInTheDocument();
    expect(screen.getByLabelText("New chat")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument();
  });

  it("keeps the uncontrolled tab fallback when no tab props are wired", () => {
    render(<AppShell>content</AppShell>);
    openSidebar();
    expect(screen.getByRole("tab", { name: /^Chat 1/ })).toBeInTheDocument();
  });

  it("renders agentEmptyState in the agent body when no content is wired", () => {
    render(
      <AppShell agentEmptyState={<p>Hi, Sam, ask me anything.</p>}>
        content
      </AppShell>,
    );
    openSidebar();
    expect(screen.getByText("Hi, Sam, ask me anything.")).toBeInTheDocument();
  });

  it("prefers agentSidebarContent over agentEmptyState when both are set", () => {
    render(
      <AppShell
        agentSidebarContent={<p>Live chat surface</p>}
        agentEmptyState={<p>Empty opener</p>}
      >
        content
      </AppShell>,
    );
    openSidebar();
    expect(screen.getByText("Live chat surface")).toBeInTheDocument();
    expect(screen.queryByText("Empty opener")).not.toBeInTheDocument();
  });

  // Decorative wrapper is aria-hidden, so query hidden elements.
  const emptyLogo = () =>
    screen.queryAllByRole("img", { name: "MirrorStack Logo", hidden: true });

  it("paints the MirrorStack logo above agentEmptyState by default", () => {
    render(
      <AppShell agentEmptyState={<p>Hi, Sam.</p>}>content</AppShell>,
    );
    openSidebar();
    expect(emptyLogo()).toHaveLength(1);
    expect(screen.getByText("Hi, Sam.")).toBeInTheDocument();
  });

  it("hides the logo when hideAgentEmptyStateLogo is set", () => {
    render(
      <AppShell agentEmptyState={<p>Hi, Sam.</p>} hideAgentEmptyStateLogo>
        content
      </AppShell>,
    );
    openSidebar();
    expect(emptyLogo()).toHaveLength(0);
    expect(screen.getByText("Hi, Sam.")).toBeInTheDocument();
  });

  it("paints no empty-state logo when agentSidebarContent is wired", () => {
    render(
      <AppShell agentSidebarContent={<p>Live chat surface</p>}>
        content
      </AppShell>,
    );
    openSidebar();
    expect(emptyLogo()).toHaveLength(0);
  });
});

describe("AppShell controlled sidebar open", () => {
  // jsdom reports clientWidth 0; give the strip a real width so the header
  // renders (same fixup the pass-through suite uses).
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 400,
    });
  });
  afterAll(() => {
    Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
  });

  it("paints the sidebar open (no FAB) when open is true, without a click", () => {
    render(
      <AppShell open onOpenChange={() => {}}>
        content
      </AppShell>,
    );
    // The controlled-open effect seeds the width, so the agent header shows and
    // the open FAB is gone — the persisted open flag drove it open on mount.
    expect(screen.getByLabelText("Chat history")).toBeInTheDocument();
    expect(screen.queryByLabelText("Open agent")).not.toBeInTheDocument();
  });

  it("observes the body height on a reload-restore open, so the background paints", async () => {
    // Regression for "sometimes the sidebar has no background": the body's
    // height feeds AgentSidebarHeader's single full-window shape (the fill).
    // On the reload-restore path open stays true from mount while the width
    // seeds 0 → >0, so isOpen NEVER transitions. The body height observer must
    // still attach when the body node mounts, or agentBodyH is stuck at 0, the
    // header drops to its body-less cap, and the panel paints with no
    // background. A callback ref (not a [isOpen]-keyed effect) attaches on the
    // actual mount; pre-fix, that mount was missed and the body went unobserved.
    const observed: Element[] = [];
    class MockResizeObserver {
      constructor(_cb: ResizeObserverCallback) {}
      observe(el: Element) {
        observed.push(el);
      }
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    try {
      render(
        <AppShell open onOpenChange={() => {}}>
          content
        </AppShell>,
      );
      await act(async () => {
        await Promise.resolve();
      });
      const body = document.querySelector(".flex-1.min-h-0.flex.flex-col");
      expect(body).not.toBeNull();
      expect(observed).toContain(body);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("paints closed (FAB shown) when open is false", () => {
    render(
      <AppShell open={false} onOpenChange={() => {}}>
        content
      </AppShell>,
    );
    expect(screen.getByLabelText("Open agent")).toBeInTheDocument();
    expect(screen.queryByLabelText("Chat history")).not.toBeInTheDocument();
  });

  it("fires onOpenChange(true) when the FAB opens the sidebar", () => {
    const onOpenChange = vi.fn();
    render(
      <AppShell open={false} onOpenChange={onOpenChange}>
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open agent"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("fires onOpenChange(false) when the sidebar is closed", () => {
    const onOpenChange = vi.fn();
    render(
      <AppShell open onOpenChange={onOpenChange}>
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Close sidebar"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("AppShell sidebar width persistence", () => {
  // Width now lives in the INJECTED server persistence (docs 12.4 + 13b), ONE
  // shared per-user value across every host — NOT per-origin localStorage. The
  // host wires `sidebarWidthPersistence`; the rail reads it on mount and writes
  // it on resize-end.

  it("restores the server-persisted width on reload (reconciled into rendered state)", async () => {
    // Simulate a prior session that drag-resized to 500px, persisted to the
    // user's shared sidebar-state row. jsdom's window.innerWidth is 1024, so
    // 500 is well within [350, 1004].
    const widthPersistence = { get: () => 500, set: () => {} };

    render(
      <AppShell sidebarWidthPersistence={widthPersistence}>content</AppShell>,
    );
    // The mount read resolves asynchronously (get() may be a promise) — wait
    // for it to land. The fetch now reconciles into the RENDERED width (not
    // just the reopen memory), so the sidebar repaints at the user's size on
    // reload without a manual open gesture — the fix for defect #1 (width
    // stranded in lastOpenWidth until the next open click).
    await act(async () => {
      await Promise.resolve();
    });

    // The agent inner panel width reflects the rehydrated 500, not the 350
    // floor — the persisted size survived the "reload".
    expect(document.querySelector('[style*="width: 500px"]')).not.toBeNull();
  });

  it("ignores an out-of-range server width and uses the default reopen behavior", async () => {
    // A bad/oversized stored width (here below the open floor) is ignored; the
    // provider clamps to [minOpenWidth, viewport] and falls back to the default.
    const widthPersistence = { get: () => 100, set: () => {} };
    render(
      <AppShell sidebarWidthPersistence={widthPersistence}>content</AppShell>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    fireEvent.click(screen.getByLabelText("Open agent"));
    // No 500px panel — reopen fell back to the 30%-of-viewport default.
    expect(document.querySelector('[style*="width: 500px"]')).toBeNull();
  });

  it("writes the dragged width back through the injected persistence", async () => {
    const originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 2000,
    });

    try {
      const set = vi.fn();
      const widthPersistence = { get: () => 0, set };
      render(
        <AppShell sidebarWidthPersistence={widthPersistence}>content</AppShell>,
      );
      await act(async () => {
        await Promise.resolve();
      });
      // Open the sidebar — 30% of the 2000 viewport = 600, safely above the
      // 350 floor.
      fireEvent.click(screen.getByLabelText("Open agent"));
      expect(set).toHaveBeenCalledWith(600);
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
    }
  });

  it("works with no persistence injected (in-memory only, never touches localStorage)", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<AppShell>content</AppShell>);
    fireEvent.click(screen.getByLabelText("Open agent"));
    // Sidebar still opens; nothing is written to localStorage (the per-origin
    // path is gone).
    expect(
      setItem.mock.calls.some(([key]) => key === "ms.agentSidebar.width"),
    ).toBe(false);
    setItem.mockRestore();
  });
});
