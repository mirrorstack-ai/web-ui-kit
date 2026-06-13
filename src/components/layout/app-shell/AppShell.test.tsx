import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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

    fireEvent.click(screen.getByLabelText("Delete conversation"));
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
});

describe("AppShell sidebar width persistence", () => {
  afterEach(() => localStorage.clear());

  it("reopens to the persisted width after reload (clamped to the viewport)", () => {
    // Simulate a prior session that drag-resized to 500px. jsdom's
    // window.innerWidth is 1024, so 500 is well within [350, 1004].
    localStorage.setItem("ms.agentSidebar.width", "500");

    render(<AppShell>content</AppShell>);
    // Sidebar starts closed (toggle button shown), not auto-opened.
    fireEvent.click(screen.getByLabelText("Open agent"));

    // The agent inner panel width reflects the rehydrated 500, not the 350
    // floor — the persisted size survived the "reload".
    expect(document.querySelector('[style*="width: 500px"]')).not.toBeNull();
  });

  it("ignores a corrupt persisted value and uses the default reopen behavior", () => {
    localStorage.setItem("ms.agentSidebar.width", "garbage");
    render(<AppShell>content</AppShell>);
    fireEvent.click(screen.getByLabelText("Open agent"));
    // No 500px panel — reopen fell back to the 50%-of-viewport default.
    expect(document.querySelector('[style*="width: 500px"]')).toBeNull();
  });
});
