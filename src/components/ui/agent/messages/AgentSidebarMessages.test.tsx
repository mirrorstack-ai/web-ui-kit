import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  AgentSidebarMessages,
  type AgentSidebarMessage,
} from "./AgentSidebarMessages";

beforeAll(() => {
  // jsdom doesn't implement scrollIntoView (used by the auto-scroll effect).
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(cleanup);

type AgentTextMessage = Extract<
  AgentSidebarMessage,
  { role: "agent"; content: string }
>;

const agentMsg = (over: Partial<AgentTextMessage> = {}): AgentSidebarMessage => ({
  id: "a-1",
  role: "agent",
  content: "Done.",
  ...over,
});

const allCallbacks = () => ({
  onCopyMessage: vi.fn(),
  onRateMessage: vi.fn(),
  onRerunMessage: vi.fn(),
});

describe("AgentSidebarMessages action row", () => {
  it("renders all four actions on a finished agent message", () => {
    render(<AgentSidebarMessages messages={[agentMsg()]} {...allCallbacks()} />);
    expect(screen.getByLabelText("Copy")).toBeInTheDocument();
    expect(screen.getByLabelText("Good response")).toBeInTheDocument();
    expect(screen.getByLabelText("Bad response")).toBeInTheDocument();
    expect(screen.getByLabelText("Rerun")).toBeInTheDocument();
  });

  it("hides the row while the message is streaming", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ streaming: true })]}
        {...allCallbacks()}
      />,
    );
    expect(screen.queryByLabelText("Copy")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Good response")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Rerun")).not.toBeInTheDocument();
  });

  it("hides the row when no callbacks are provided", () => {
    render(<AgentSidebarMessages messages={[agentMsg()]} />);
    expect(screen.queryByLabelText("Copy")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Rerun")).not.toBeInTheDocument();
  });

  it("renders no row on user messages", () => {
    render(
      <AgentSidebarMessages
        messages={[{ id: "u-1", role: "user", content: "Hi" }, agentMsg()]}
        {...allCallbacks()}
      />,
    );
    expect(screen.getAllByLabelText("Copy")).toHaveLength(1);
  });

  it("renders only the buttons whose callbacks are provided", () => {
    render(
      <AgentSidebarMessages messages={[agentMsg()]} onRerunMessage={vi.fn()} />,
    );
    expect(screen.getByLabelText("Rerun")).toBeInTheDocument();
    expect(screen.queryByLabelText("Copy")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Good response")).not.toBeInTheDocument();
  });

  it("copy fires onCopyMessage and flashes a check for 1.5s", async () => {
    vi.useFakeTimers();
    try {
      const callbacks = allCallbacks();
      render(<AgentSidebarMessages messages={[agentMsg()]} {...callbacks} />);
      fireEvent.click(screen.getByLabelText("Copy"));
      expect(callbacks.onCopyMessage).toHaveBeenCalledWith("a-1");
      await act(async () => {}); // flush the async success gate
      expect(screen.getByLabelText("Copied")).toHaveTextContent("check");
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(screen.getByLabelText("Copy")).toHaveTextContent("content_copy");
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not flash success when onCopyMessage returns false", async () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg()]}
        onCopyMessage={vi.fn(() => false)}
      />,
    );
    fireEvent.click(screen.getByLabelText("Copy"));
    await act(async () => {});
    expect(screen.queryByLabelText("Copied")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Copy")).toBeInTheDocument();
  });

  it("clicking a thumb reports the rating with the message id", () => {
    const callbacks = allCallbacks();
    render(<AgentSidebarMessages messages={[agentMsg()]} {...callbacks} />);
    fireEvent.click(screen.getByLabelText("Good response"));
    expect(callbacks.onRateMessage).toHaveBeenCalledWith("a-1", "up");
    fireEvent.click(screen.getByLabelText("Bad response"));
    expect(callbacks.onRateMessage).toHaveBeenCalledWith("a-1", "down");
  });

  it("clicking the selected thumb toggles it off; the other switches", () => {
    const callbacks = allCallbacks();
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ feedback: "up" })]}
        {...callbacks}
      />,
    );
    const up = screen.getByLabelText("Good response");
    expect(up).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(up);
    expect(callbacks.onRateMessage).toHaveBeenCalledWith("a-1", null);
    fireEvent.click(screen.getByLabelText("Bad response"));
    expect(callbacks.onRateMessage).toHaveBeenCalledWith("a-1", "down");
  });

  it("rerun fires onRerunMessage with the message id", () => {
    const callbacks = allCallbacks();
    render(<AgentSidebarMessages messages={[agentMsg()]} {...callbacks} />);
    fireEvent.click(screen.getByLabelText("Rerun"));
    expect(callbacks.onRerunMessage).toHaveBeenCalledWith("a-1");
  });

  it("uses provided actionLabels", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg()]}
        onCopyMessage={vi.fn()}
        actionLabels={{ copy: "複製" }}
      />,
    );
    expect(screen.getByLabelText("複製")).toBeInTheDocument();
  });
});

describe("AgentSidebarMessages markdown rendering", () => {
  it("renders agent markdown (bold, list, inline code)", () => {
    const { container } = render(
      <AgentSidebarMessages
        messages={[
          agentMsg({ content: "Changed **username** to `alice2`:\n\n- done" }),
        ]}
      />,
    );
    expect(screen.getByText("username").tagName).toBe("STRONG");
    expect(screen.getByText("alice2").tagName).toBe("CODE");
    expect(container.querySelector("ul > li")).toHaveTextContent("done");
  });

  it("renders fenced code blocks inside a pre", () => {
    const { container } = render(
      <AgentSidebarMessages
        messages={[agentMsg({ content: "```bash\nmirrorstack deploy\n```" })]}
      />,
    );
    expect(container.querySelector("pre > code")).toHaveTextContent(
      "mirrorstack deploy",
    );
  });

  it("opens links in a new tab with rel noopener noreferrer", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ content: "See [docs](https://example.com)" })]}
      />,
    );
    const link = screen.getByRole("link", { name: "docs" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render raw HTML from the model", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ content: "hi <img src=x onerror=alert(1)>" })]}
      />,
    );
    expect(document.querySelector("img")).not.toBeInTheDocument();
  });

  it("keeps user messages as plain text", () => {
    render(
      <AgentSidebarMessages
        messages={[{ id: "u-1", role: "user", content: "use **bold** here" }]}
      />,
    );
    // Raw asterisks survive — no markdown parsing on user input.
    expect(screen.getByText("use **bold** here")).toBeInTheDocument();
    expect(document.querySelector("strong")).not.toBeInTheDocument();
  });

  it("survives an unterminated code fence mid-stream", () => {
    const { container } = render(
      <AgentSidebarMessages
        messages={[
          agentMsg({ content: "Running:\n\n```bash\nmirrorstack au", streaming: true }),
        ]}
      />,
    );
    expect(container.querySelector("pre > code")).toHaveTextContent(
      "mirrorstack au",
    );
  });

  // Regression lock for the 2026-06-12 report: every construct a real
  // streamed reply carries must render as markup, not raw text, while the
  // message is still streaming.
  it("renders headings, lists, code, links and bold in a streamed-style reply", () => {
    const streamed = [
      "## Audit summary",
      "",
      "Changed **username** to `alice2`:",
      "",
      "- [audit log](https://docs.mirrorstack.ai/audit)",
      "- dark mode enabled",
      "",
      "```bash",
      "mirrorstack account au", // fence still open mid-stream
    ].join("\n");
    const { container } = render(
      <AgentSidebarMessages messages={[agentMsg({ content: streamed, streaming: true })]} />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Audit summary",
    );
    expect(screen.getByText("username").tagName).toBe("STRONG");
    expect(screen.getByText("alice2").tagName).toBe("CODE");
    expect(screen.getByRole("link", { name: "audit log" })).toHaveAttribute(
      "href",
      "https://docs.mirrorstack.ai/audit",
    );
    expect(container.querySelectorAll("ul > li")).toHaveLength(2);
    expect(container.querySelector("pre > code")).toHaveTextContent(
      "mirrorstack account au",
    );
    // None of the raw sigils leak through as literal text.
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toContain("## ");
  });
});

describe("AgentSidebarMessages showLogo", () => {
  // The logo wrapper is aria-hidden (decorative), so opt into hidden elements.
  const logo = () =>
    screen.queryAllByRole("img", { name: "MirrorStack Logo", hidden: true });

  it("renders exactly one static logo when the last message is a finished agent message", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ id: "a-1" }), agentMsg({ id: "a-2" })]}
        showLogo
      />,
    );
    expect(logo()).toHaveLength(1);
    expect(logo()[0]).not.toHaveAttribute("aria-busy");
  });

  it("renders the logo in its loading state while the last message is streaming", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg({ streaming: true })]}
        showLogo
      />,
    );
    expect(logo()).toHaveLength(1);
    expect(logo()[0]).toHaveAttribute("aria-busy", "true");
  });

  it("renders no logo when the last message is a user message", () => {
    render(
      <AgentSidebarMessages
        messages={[agentMsg(), { id: "u-1", role: "user", content: "Hi" }]}
        showLogo
      />,
    );
    expect(logo()).toHaveLength(0);
  });

  it("renders no logo when showLogo is omitted", () => {
    render(<AgentSidebarMessages messages={[agentMsg()]} />);
    expect(logo()).toHaveLength(0);
  });
});
