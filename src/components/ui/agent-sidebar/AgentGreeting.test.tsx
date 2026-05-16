import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { AgentGreeting } from "./AgentGreeting";

const MODELS = [
  { id: "fast", label: "Fast" },
  { id: "balanced", label: "Balanced" },
];

const TEXTAREA_LABEL = "Start a conversation with the agent";

afterEach(cleanup);

describe("AgentGreeting", () => {
  it("renders greeting and subtitle", () => {
    render(
      <AgentGreeting
        greeting="Welcome Back, Nothing Chang"
        subtitle="Pick up where you left off."
      />,
    );
    expect(
      screen.getByRole("heading", { name: /welcome back, nothing chang/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/pick up where you left off/i)).toBeInTheDocument();
  });

  it("disables send when input is empty", () => {
    render(<AgentGreeting greeting="Welcome" />);
    expect(screen.getByLabelText("Send message")).toBeDisabled();
  });

  it("calls onSend with the trimmed message on Enter", () => {
    const onSend = vi.fn();
    render(<AgentGreeting greeting="Welcome" onSend={onSend} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL);
    fireEvent.change(textarea, { target: { value: "  hello  " } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("does not send on Shift+Enter", () => {
    const onSend = vi.fn();
    render(<AgentGreeting greeting="Welcome" onSend={onSend} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL);
    fireEvent.change(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not send empty/whitespace input on click", () => {
    const onSend = vi.fn();
    render(<AgentGreeting greeting="Welcome" onSend={onSend} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL);
    fireEvent.change(textarea, { target: { value: "   " } });
    fireEvent.click(screen.getByLabelText("Send message"));
    expect(onSend).not.toHaveBeenCalled();
  });

  it("clears the input after a successful send", () => {
    render(<AgentGreeting greeting="Welcome" onSend={() => {}} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "hi" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(textarea.value).toBe("");
  });

  it("ignores Enter while composing (IME)", () => {
    const onSend = vi.fn();
    render(<AgentGreeting greeting="Welcome" onSend={onSend} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL);
    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: "你好" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("sends on Enter after IME composition ends", () => {
    const onSend = vi.fn();
    render(<AgentGreeting greeting="Welcome" onSend={onSend} />);
    const textarea = screen.getByLabelText(TEXTAREA_LABEL);
    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: "你好" } });
    fireEvent.compositionEnd(textarea);
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("你好");
  });

  it("hides the model picker when no models are provided", () => {
    render(<AgentGreeting greeting="Welcome" />);
    expect(screen.queryByLabelText(/^Model:/)).not.toBeInTheDocument();
  });

  it("hides the model picker when models is an empty array", () => {
    render(<AgentGreeting greeting="Welcome" models={[]} />);
    expect(screen.queryByLabelText(/^Model:/)).not.toBeInTheDocument();
  });

  it("shows the selected model label", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={MODELS}
        selectedModelId="balanced"
      />,
    );
    expect(screen.getByLabelText("Model: Balanced")).toBeInTheDocument();
  });

  it("falls back to the first model when selectedModelId is undefined", () => {
    render(<AgentGreeting greeting="Welcome" models={MODELS} />);
    expect(screen.getByLabelText("Model: Fast")).toBeInTheDocument();
  });

  it("falls back to the first model when selectedModelId is unknown", () => {
    render(
      <AgentGreeting greeting="Welcome" models={MODELS} selectedModelId="???" />,
    );
    expect(screen.getByLabelText("Model: Fast")).toBeInTheDocument();
  });

  it("opens the picker on click and exposes a listbox", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={MODELS}
        selectedModelId="fast"
      />,
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Model: Fast"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("calls onSelectModel and closes the picker when an option is chosen", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentGreeting
        greeting="Welcome"
        models={MODELS}
        selectedModelId="fast"
        onSelectModel={onSelectModel}
      />,
    );
    fireEvent.click(screen.getByLabelText("Model: Fast"));
    // OptionList commits selection on mouseDown to beat blur from the trigger.
    fireEvent.mouseDown(
      screen.getByRole("option", { name: /balanced/i }),
    );
    expect(onSelectModel).toHaveBeenCalledWith("balanced");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes the picker on Escape", () => {
    render(<AgentGreeting greeting="Welcome" models={MODELS} />);
    fireEvent.click(screen.getByLabelText("Model: Fast"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("calls onAttachFile and onMic", () => {
    const onAttachFile = vi.fn();
    const onMic = vi.fn();
    render(
      <AgentGreeting
        greeting="Welcome"
        onAttachFile={onAttachFile}
        onMic={onMic}
      />,
    );
    fireEvent.click(screen.getByLabelText("Attach file"));
    fireEvent.click(screen.getByLabelText("Voice input"));
    expect(onAttachFile).toHaveBeenCalledOnce();
    expect(onMic).toHaveBeenCalledOnce();
  });
});
