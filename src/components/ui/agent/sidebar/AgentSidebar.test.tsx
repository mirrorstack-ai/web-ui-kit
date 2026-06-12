import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeAll, afterAll } from "vitest";
import { AgentSidebarHeader } from "./AgentSidebarHeader";
import { AgentSidebarInput } from "./AgentSidebarInput";
import type { AgentSidebarHistoryGroup, ChatTab } from "./types";

afterEach(cleanup);

describe("AgentSidebarHeader", () => {
  it("renders with default tab", () => {
    render(
      <AgentSidebarHeader sidebarWidth={400} onToggleCollapse={() => {}} onClose={() => {}} />,
    );
    expect(screen.getByText("Chat 1")).toBeInTheDocument();
  });

  it("adds a new tab", () => {
    render(
      <AgentSidebarHeader sidebarWidth={400} onToggleCollapse={() => {}} onClose={() => {}} />,
    );
    fireEvent.click(screen.getByLabelText("New chat"));
    expect(screen.getByText("Chat 2")).toBeInTheDocument();
  });

  it("calls onClose", () => {
    const onClose = vi.fn();
    render(
      <AgentSidebarHeader sidebarWidth={400} onToggleCollapse={() => {}} onClose={onClose} />,
    );
    fireEvent.click(screen.getByLabelText("Close sidebar"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe("AgentSidebarHeader controlled tabs", () => {
  // jsdom reports clientWidth 0, which would collapse the strip to a single
  // visible tab and swap the + button for the overflow trigger. Report a
  // real width so both tabs render inline.
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 400,
    });
  });
  afterAll(() => {
    Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
  });

  const makeTabs = (): ChatTab[] => [
    { id: "a", title: "New chat" },
    { id: "b", title: "Settings help" },
  ];

  const renderControlled = (overrides: Partial<Parameters<typeof AgentSidebarHeader>[0]> = {}) =>
    render(
      <AgentSidebarHeader
        sidebarWidth={400}
        onToggleCollapse={() => {}}
        onClose={() => {}}
        tabs={makeTabs()}
        activeTabId="a"
        onSelectTab={() => {}}
        onCloseTab={() => {}}
        onNewTab={() => {}}
        {...overrides}
      />,
    );

  it("renders supplied tab titles instead of internal labels", () => {
    renderControlled();
    expect(screen.getByText("New chat")).toBeInTheDocument();
    expect(screen.getByText("Settings help")).toBeInTheDocument();
    expect(screen.queryByText("Chat 1")).not.toBeInTheDocument();
  });

  it("collapses tabs into the overflow dropdown when the strip is narrow", () => {
    // 280 clientWidth − 46 strip padding = 234 available; three 100px tabs
    // (312 with gaps) don't fit → 1 visible + 2 in the ⋯ dropdown. Before the
    // padding fix the math compared against the raw 280 and squeezed tabs
    // inline instead of overflowing.
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 280,
    });
    try {
      renderControlled({
        tabs: [
          { id: "a", title: "New chat" },
          { id: "b", title: "Settings help" },
          { id: "c", title: "Update display name" },
        ],
      });
      expect(screen.getAllByRole("tab")).toHaveLength(1);
      expect(screen.getByLabelText("2 more tabs")).toBeInTheDocument();
      expect(screen.queryByLabelText("New chat")).not.toBeInTheDocument();
    } finally {
      Object.defineProperty(HTMLElement.prototype, "clientWidth", {
        configurable: true,
        value: 400,
      });
    }
  });

  it("calls onNewTab when + is clicked instead of adding an internal tab", () => {
    const onNewTab = vi.fn();
    renderControlled({ onNewTab });
    fireEvent.click(screen.getByLabelText("New chat"));
    expect(onNewTab).toHaveBeenCalledOnce();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("calls onSelectTab with the clicked tab id", () => {
    const onSelectTab = vi.fn();
    renderControlled({ onSelectTab });
    fireEvent.click(screen.getByText("Settings help"));
    expect(onSelectTab).toHaveBeenCalledWith("b");
  });

  it("calls onCloseTab with the closed tab id", () => {
    const onCloseTab = vi.fn();
    renderControlled({ onCloseTab });
    fireEvent.click(screen.getByLabelText("Close Settings help"));
    expect(onCloseTab).toHaveBeenCalledWith("b");
  });

  it("marks the controlled active tab as selected", () => {
    renderControlled({ activeTabId: "b" });
    expect(screen.getByRole("tab", { name: /Settings help/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("AgentSidebarHeader history rename", () => {
  const historyData: AgentSidebarHistoryGroup[] = [
    {
      label: "Today",
      items: [{ id: "h-1", title: "My conversation", updatedAt: "2026-06-12T10:00:00Z" }],
    },
  ];

  const renderHistory = (onRename?: (id: string, title: string) => void) =>
    render(
      <AgentSidebarHeader
        sidebarWidth={400}
        onToggleCollapse={() => {}}
        onClose={() => {}}
        history={historyData}
        onSelectHistoryItem={() => {}}
        onRenameConversation={onRename}
      />,
    );

  const openHistory = () => fireEvent.click(screen.getByLabelText("Chat history"));

  it("shows the rename button when onRenameConversation is provided", () => {
    renderHistory(() => {});
    openHistory();
    expect(screen.getByLabelText("Rename conversation")).toBeInTheDocument();
  });

  it("hides the rename button when onRenameConversation is absent", () => {
    renderHistory();
    openHistory();
    expect(screen.queryByLabelText("Rename conversation")).not.toBeInTheDocument();
  });

  it("entering edit mode swaps the row to an input labeled with the title", () => {
    renderHistory(() => {});
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    expect(screen.getByLabelText("Rename conversation: My conversation")).toBeInstanceOf(
      HTMLInputElement,
    );
  });

  it("Enter commits the trimmed rename", () => {
    const onRename = vi.fn();
    renderHistory(onRename);
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    const input = screen.getByLabelText(/^Rename conversation:/);
    fireEvent.change(input, { target: { value: "  New title  " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onRename).toHaveBeenCalledWith("h-1", "New title");
  });

  it("Esc cancels without calling onRenameConversation", () => {
    const onRename = vi.fn();
    renderHistory(onRename);
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    fireEvent.keyDown(screen.getByLabelText(/^Rename conversation:/), { key: "Escape" });
    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByText("My conversation")).toBeInTheDocument();
  });

  it("does not commit an empty rename", () => {
    const onRename = vi.fn();
    renderHistory(onRename);
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    const input = screen.getByLabelText(/^Rename conversation:/);
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onRename).not.toHaveBeenCalled();
  });

  it("exits edit mode when the dropdown is dismissed while renaming", () => {
    renderHistory(() => {});
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    fireEvent.change(screen.getByLabelText(/^Rename conversation:/), {
      target: { value: "half-typed" },
    });
    // Click-outside dismissal while the rename is in progress.
    fireEvent.mouseDown(document.body);
    openHistory();
    expect(screen.getByText("My conversation")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("does not open the conversation when entering edit mode", () => {
    const onSelect = vi.fn();
    render(
      <AgentSidebarHeader
        sidebarWidth={400}
        onToggleCollapse={() => {}}
        onClose={() => {}}
        history={historyData}
        onSelectHistoryItem={onSelect}
        onRenameConversation={() => {}}
      />,
    );
    openHistory();
    fireEvent.click(screen.getByLabelText("Rename conversation"));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("AgentSidebarHeader history delete", () => {
  const historyData: AgentSidebarHistoryGroup[] = [
    {
      label: "Today",
      items: [{ id: "h-1", title: "My conversation", updatedAt: "2026-06-12T10:00:00Z" }],
    },
  ];

  const renderHistory = (props?: {
    onDelete?: (id: string) => void;
    onSelect?: (id: string) => void;
  }) =>
    render(
      <AgentSidebarHeader
        sidebarWidth={400}
        onToggleCollapse={() => {}}
        onClose={() => {}}
        history={historyData}
        onSelectHistoryItem={props?.onSelect ?? (() => {})}
        onDeleteConversation={props?.onDelete}
      />,
    );

  const openHistory = () => fireEvent.click(screen.getByLabelText("Chat history"));

  it("shows the delete button when onDeleteConversation is provided", () => {
    renderHistory({ onDelete: () => {} });
    openHistory();
    expect(screen.getByLabelText("Delete conversation")).toBeInTheDocument();
  });

  it("hides the delete button when onDeleteConversation is absent", () => {
    renderHistory();
    openHistory();
    expect(screen.queryByLabelText("Delete conversation")).not.toBeInTheDocument();
  });

  it("calls onDeleteConversation with the row id, without opening the conversation", () => {
    const onDelete = vi.fn();
    const onSelect = vi.fn();
    renderHistory({ onDelete, onSelect });
    openHistory();
    fireEvent.click(screen.getByLabelText("Delete conversation"));
    expect(onDelete).toHaveBeenCalledWith("h-1");
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("AgentSidebarInput", () => {
  it("renders textarea", () => {
    render(<AgentSidebarInput />);
    expect(screen.getByLabelText("Message to agent")).toBeInTheDocument();
  });

  it("calls onSend on Enter", () => {
    const onSend = vi.fn();
    render(<AgentSidebarInput onSend={onSend} />);
    const textarea = screen.getByLabelText("Message to agent");
    fireEvent.change(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("does not send on Shift+Enter", () => {
    const onSend = vi.fn();
    render(<AgentSidebarInput onSend={onSend} />);
    const textarea = screen.getByLabelText("Message to agent");
    fireEvent.change(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not send empty message", () => {
    const onSend = vi.fn();
    render(<AgentSidebarInput onSend={onSend} />);
    fireEvent.click(screen.getByLabelText("Send message"));
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe("AgentSidebarInput queued messages", () => {
  const queue = (...texts: string[]) =>
    texts.map((text, i) => ({ id: `q-${i + 1}`, text }));

  it("renders each row with full text in the title attr", () => {
    render(<AgentSidebarInput queuedMessages={queue("Summarize the logs", "List new members")} />);
    expect(screen.getByTitle("Summarize the logs")).toBeInTheDocument();
    expect(screen.getByTitle("List new members")).toBeInTheDocument();
    expect(screen.getAllByLabelText("Cancel queued message")).toHaveLength(2);
  });

  it("shows the queued prefix on the first row only", () => {
    render(<AgentSidebarInput queuedMessages={queue("First", "Second")} />);
    expect(screen.getAllByText("Queued")).toHaveLength(1);
  });

  it("does not render rows when the queue is absent or empty", () => {
    const { rerender } = render(<AgentSidebarInput />);
    expect(screen.queryByLabelText("Cancel queued message")).not.toBeInTheDocument();
    rerender(<AgentSidebarInput queuedMessages={[]} />);
    expect(screen.queryByLabelText("Cancel queued message")).not.toBeInTheDocument();
  });

  it("calls onCancelQueued with the clicked row's id", () => {
    const onCancel = vi.fn();
    render(
      <AgentSidebarInput queuedMessages={queue("First", "Second")} onCancelQueued={onCancel} />,
    );
    fireEvent.click(screen.getAllByLabelText("Cancel queued message")[1]);
    expect(onCancel).toHaveBeenCalledExactlyOnceWith("q-2");
  });

  it("keeps the textarea usable while rows are shown", () => {
    const onSend = vi.fn();
    render(<AgentSidebarInput queuedMessages={queue("A queued message")} onSend={onSend} />);
    const textarea = screen.getByLabelText("Message to agent");
    fireEvent.change(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("uses custom labels overrides", () => {
    render(
      <AgentSidebarInput
        queuedMessages={queue("Something")}
        onCancelQueued={() => {}}
        labels={{ cancelQueuedLabel: "Remove queued", queuedPrefix: "Next up" }}
      />,
    );
    expect(screen.getByLabelText("Remove queued")).toBeInTheDocument();
    expect(screen.getByText("Next up")).toBeInTheDocument();
  });
});

describe("AgentSidebarInput model selector", () => {
  const roster = [
    { id: "sonnet", label: "Claude Sonnet 4.6" },
    { id: "haiku", label: "Claude Haiku 4.5" },
    {
      id: "gemini",
      label: "Gemini 3.5 Flash",
      disabled: true,
      disabledHint: "Supported in the future",
    },
  ];

  const openMenu = () => {
    fireEvent.click(screen.getByRole("button", { name: /^Model:/ }));
    return screen.getByRole("listbox", { name: "Model" });
  };

  it("renders no trigger when models is omitted", () => {
    render(<AgentSidebarInput />);
    expect(screen.queryByRole("button", { name: /^Model:/ })).not.toBeInTheDocument();
  });

  it("shows the selected model label on the trigger", () => {
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={() => {}} />,
    );
    expect(
      screen.getByRole("button", { name: "Model: Claude Haiku 4.5" }),
    ).toBeInTheDocument();
  });

  it("falls back to the first enabled model when selectedModelId is omitted", () => {
    render(
      <AgentSidebarInput
        models={[roster[2], roster[0], roster[1]]}
        onSelectModel={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Model: Claude Sonnet 4.6" }),
    ).toBeInTheDocument();
  });

  it("selects an enabled model and closes the menu", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={onSelectModel} />,
    );
    openMenu();
    fireEvent.click(screen.getByRole("option", { name: "Claude Sonnet 4.6" }));
    expect(onSelectModel).toHaveBeenCalledWith("sonnet");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not select a disabled model on click", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={onSelectModel} />,
    );
    openMenu();
    fireEvent.click(screen.getByRole("option", { name: "Gemini 3.5 Flash" }));
    expect(onSelectModel).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("marks disabled models aria-disabled with an accessible hint", () => {
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={() => {}} />,
    );
    openMenu();
    const option = screen.getByRole("option", { name: "Gemini 3.5 Flash" });
    expect(option).toHaveAttribute("aria-disabled", "true");
    const hintId = option.getAttribute("aria-describedby");
    expect(hintId).toBeTruthy();
    expect(document.getElementById(hintId!)).toHaveTextContent(
      "Supported in the future",
    );
  });

  it("keyboard: arrows reach disabled entries but Enter does not activate them", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={onSelectModel} />,
    );
    const listbox = openMenu();
    // Opens with the selected model (haiku, index 1) active; down → gemini.
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    const gemini = screen.getByRole("option", { name: "Gemini 3.5 Flash" });
    expect(listbox).toHaveAttribute("aria-activedescendant", gemini.id);
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onSelectModel).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    // Back up to haiku and select it.
    fireEvent.keyDown(listbox, { key: "ArrowUp" });
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onSelectModel).toHaveBeenCalledWith("haiku");
  });

  it("Escape closes the menu and returns focus to the trigger", () => {
    render(
      <AgentSidebarInput models={roster} selectedModelId="haiku" onSelectModel={() => {}} />,
    );
    const listbox = openMenu();
    fireEvent.keyDown(listbox, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Model:/ })).toHaveFocus();
  });

  it("updates the trigger without onSelectModel (uncontrolled)", () => {
    render(<AgentSidebarInput models={roster} selectedModelId="haiku" />);
    openMenu();
    fireEvent.click(screen.getByRole("option", { name: "Claude Sonnet 4.6" }));
    expect(
      screen.getByRole("button", { name: "Model: Claude Sonnet 4.6" }),
    ).toBeInTheDocument();
  });
});
