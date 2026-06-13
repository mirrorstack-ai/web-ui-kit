import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// react-markdown / remark-gfm pull in an ESM-only chain that the unit env
// doesn't need for these structural assertions — stub them to passthrough so
// the test exercises segment ORDER, not markdown parsing (covered elsewhere).
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <span>{children}</span>,
}));
vi.mock("remark-gfm", () => ({ default: () => {} }));

import {
  AgentSidebarAgentMessage,
  type AgentMessageSegment,
} from "./AgentSidebarMessage";

afterEach(cleanup);

describe("AgentSidebarAgentMessage interleaved segments", () => {
  const interleaved: AgentMessageSegment[] = [
    { type: "text", text: "Let me check your account." },
    {
      type: "tool",
      id: "t-1",
      tool: { moduleSlug: "analytics", tool: "summarize_views", status: "done", durationMs: 120 },
    },
    { type: "text", text: "Here is what I found." },
  ];

  it("renders text and tool segments in occurrence order, not tools-first", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="Let me check your account.Here is what I found." segments={interleaved} />,
    );

    // The tool row sits BETWEEN the two text runs in DOM order — the bug was
    // every tool call hoisting to the top of the message.
    const text = container.textContent ?? "";
    const firstText = text.indexOf("Let me check your account.");
    const toolPos = text.indexOf("analytics");
    const secondText = text.indexOf("Here is what I found.");
    expect(firstText).toBeGreaterThanOrEqual(0);
    expect(toolPos).toBeGreaterThan(firstText);
    expect(secondText).toBeGreaterThan(toolPos);
  });

  it("shows the tool-call status row for an interleaved tool segment", () => {
    render(<AgentSidebarAgentMessage content="x" segments={interleaved} />);
    expect(
      screen.getByRole("status", { name: /analytics · summarize_views/ }),
    ).toBeInTheDocument();
  });

  it("rides the blinking caret on the final text segment only while streaming", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="x" segments={interleaved} streaming />,
    );
    // One caret (animate-pulse w-[2px]) trailing the last text run.
    const carets = container.querySelectorAll("span.animate-pulse.w-\\[2px\\]");
    expect(carets).toHaveLength(1);
  });

  it("drops the caret when a trailing tool segment is the last segment", () => {
    const trailingTool: AgentMessageSegment[] = [
      { type: "text", text: "Working on it." },
      { type: "tool", id: "t-2", tool: { moduleSlug: "cms", tool: "publish", status: "started" } },
    ];
    const { container } = render(
      <AgentSidebarAgentMessage content="Working on it." segments={trailingTool} streaming />,
    );
    // The running tool spinner is the live indicator — no text caret after it.
    const carets = container.querySelectorAll("span.animate-pulse.w-\\[2px\\]");
    expect(carets).toHaveLength(0);
    expect(within(container).getByRole("status", { name: /cms · publish/ })).toBeInTheDocument();
  });

  it("falls back to flat content when no segments are provided", () => {
    render(<AgentSidebarAgentMessage content="Just a plain reply." />);
    expect(screen.getByText("Just a plain reply.")).toBeInTheDocument();
  });
});
