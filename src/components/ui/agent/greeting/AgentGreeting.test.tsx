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
    fireEvent.click(screen.getByRole("option", { name: /balanced/i }));
    expect(onSelectModel).toHaveBeenCalledWith("balanced");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders the MirrorStack logo above the greeting by default", () => {
    render(<AgentGreeting greeting="Welcome" />);
    expect(screen.getByRole("img", { name: /mirrorstack logo/i })).toBeInTheDocument();
  });

  it("hides the logo when hideLogo is true", () => {
    render(<AgentGreeting greeting="Welcome" hideLogo />);
    expect(
      screen.queryByRole("img", { name: /mirrorstack logo/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the chat input by default", () => {
    render(<AgentGreeting greeting="Welcome" />);
    expect(
      screen.getByLabelText("Start a conversation with the agent"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Send message")).toBeInTheDocument();
  });

  it("hides the chat input when hideInput is true", () => {
    render(<AgentGreeting greeting="Welcome" hideInput />);
    expect(
      screen.queryByLabelText("Start a conversation with the agent"),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Send message")).not.toBeInTheDocument();
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

  it("renders the description tagline inside dropdown options", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[
          { id: "fast", label: "Fast", description: "Quick replies" },
          { id: "balanced", label: "Balanced", description: "Adaptive" },
        ]}
      />,
    );
    fireEvent.click(screen.getByLabelText("Model: Fast"));
    expect(screen.getByText("Quick replies")).toBeInTheDocument();
    expect(screen.getByText("Adaptive")).toBeInTheDocument();
  });

  it("renders the price detail inside dropdown rows but not the trigger", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[
          { id: "sonnet", label: "Claude Sonnet 4.6", detail: "$3/$15" },
          { id: "haiku", label: "Claude Haiku 4.5", detail: "$1/$5" },
        ]}
      />,
    );
    expect(screen.queryByText("$3/$15")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Model: Claude Sonnet 4.6"));
    expect(screen.getByText("$3/$15")).toBeInTheDocument();
    expect(screen.getByText("$1/$5")).toBeInTheDocument();
  });

  it("marks disabled models aria-disabled with an accessible hint", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[
          { id: "sonnet", label: "Claude Sonnet 4.6" },
          {
            id: "gemini",
            label: "Gemini 3.5 Flash",
            disabled: true,
            disabledHint: "Supported in the future",
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByLabelText("Model: Claude Sonnet 4.6"));
    const option = screen.getByRole("option", { name: "Gemini 3.5 Flash" });
    expect(option).toHaveAttribute("aria-disabled", "true");
    const hintId = option.getAttribute("aria-describedby");
    expect(hintId).toBeTruthy();
    expect(document.getElementById(hintId!)).toHaveTextContent(
      "Supported in the future",
    );
  });

  it("does not select a disabled model on click", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[
          { id: "sonnet", label: "Claude Sonnet 4.6" },
          { id: "gemini", label: "Gemini 3.5 Flash", disabled: true },
        ]}
        selectedModelId="sonnet"
        onSelectModel={onSelectModel}
      />,
    );
    fireEvent.click(screen.getByLabelText("Model: Claude Sonnet 4.6"));
    fireEvent.click(screen.getByRole("option", { name: "Gemini 3.5 Flash" }));
    expect(onSelectModel).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("keyboard: arrows reach disabled entries but Enter does not activate them", () => {
    const onSelectModel = vi.fn();
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[
          { id: "sonnet", label: "Claude Sonnet 4.6" },
          {
            id: "gemini",
            label: "Gemini 3.5 Flash",
            disabled: true,
            disabledHint: "Supported in the future",
          },
        ]}
        selectedModelId="sonnet"
        onSelectModel={onSelectModel}
      />,
    );
    fireEvent.click(screen.getByLabelText("Model: Claude Sonnet 4.6"));
    const listbox = screen.getByRole("listbox", { name: "Model" });
    // Opens with the selected model (sonnet, index 0) active; down → gemini.
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    const gemini = screen.getByRole("option", { name: "Gemini 3.5 Flash" });
    expect(listbox).toHaveAttribute("aria-activedescendant", gemini.id);
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onSelectModel).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    // Back up to sonnet and select it.
    fireEvent.keyDown(listbox, { key: "ArrowUp" });
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onSelectModel).toHaveBeenCalledWith("sonnet");
  });

  it("does not render description in the trigger pill", () => {
    render(
      <AgentGreeting
        greeting="Welcome"
        models={[{ id: "fast", label: "Fast", description: "Quick replies" }]}
      />,
    );
    // Description should not appear until the picker opens.
    expect(screen.queryByText("Quick replies")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Model: Fast")).toBeInTheDocument();
  });

  it("updates the trigger label in uncontrolled mode (no onSelectModel)", () => {
    // Regression: previously, when the consumer didn't wire onSelectModel
    // the trigger stayed pinned to the initial selectedModelId because the
    // prop never changed. The component should manage selection internally
    // in that case.
    render(
      <AgentGreeting
        greeting="Welcome"
        models={MODELS}
        selectedModelId="fast"
      />,
    );
    expect(screen.getByLabelText("Model: Fast")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Model: Fast"));
    fireEvent.click(screen.getByRole("option", { name: /balanced/i }));
    expect(screen.getByLabelText("Model: Balanced")).toBeInTheDocument();
  });

  it("scales typography down in compact size", () => {
    render(<AgentGreeting greeting="Welcome" size="compact" />);
    const heading = screen.getByRole("heading", { name: /welcome/i });
    expect(heading.className).toContain("text-lg");
    expect(heading.className).not.toContain("text-3xl");
  });
});
