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
