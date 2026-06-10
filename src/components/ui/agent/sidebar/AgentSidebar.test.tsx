import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { AgentSidebarHeader } from "./AgentSidebarHeader";
import { AgentSidebarInput } from "./AgentSidebarInput";

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
