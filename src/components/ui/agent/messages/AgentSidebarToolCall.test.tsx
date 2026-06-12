import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AgentSidebarToolCall } from "./AgentSidebarToolCall";
import { AgentSidebarMessages } from "./AgentSidebarMessages";

beforeAll(() => {
  // jsdom doesn't implement scrollIntoView (used by AgentSidebarMessages).
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(cleanup);

describe("AgentSidebarToolCall", () => {
  it("renders module · tool label in started state", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "started" }}
      />,
    );
    expect(screen.getByText("cms · get_page")).toBeInTheDocument();
  });

  it("renders app · module · tool label when appSlug present", () => {
    render(
      <AgentSidebarToolCall
        tool={{ appSlug: "my-app", moduleSlug: "cms", tool: "get_page", status: "done" }}
      />,
    );
    expect(screen.getByText("my-app · cms · get_page")).toBeInTheDocument();
  });

  it("formats durations of 1s and over as seconds", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", durationMs: 1234 }}
      />,
    );
    expect(screen.getByText("1.2s")).toBeInTheDocument();
  });

  it("formats durations under 1s as milliseconds", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", durationMs: 842 }}
      />,
    );
    expect(screen.getByText("842ms")).toBeInTheDocument();
  });

  it("is collapsed by default", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", args: { slug: "home" } }}
      />,
    );
    expect(screen.queryByText(/"slug"/)).not.toBeInTheDocument();
  });

  it("expands the detail panel on click when args exist", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", args: { slug: "home" } }}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/"slug"/)).toBeInTheDocument();
  });

  it("collapses the panel on second click", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", args: { slug: "home" } }}
      />,
    );
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText(/"slug"/)).not.toBeInTheDocument();
  });

  it("aria-expanded reflects open state", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done", result: { ok: true } }}
      />,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("renders a non-interactive row when there is no detail", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "done" }}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the error text in the detail panel", () => {
    render(
      <AgentSidebarToolCall
        tool={{
          moduleSlug: "cms",
          tool: "create_post",
          status: "error",
          error: "permission_denied",
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("permission_denied")).toBeInTheDocument();
  });

  it("shows args and result sections with headers when both present", () => {
    render(
      <AgentSidebarToolCall
        tool={{
          moduleSlug: "cms",
          tool: "get_page",
          status: "done",
          args: { slug: "home" },
          result: { title: "Home" },
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("args")).toBeInTheDocument();
    expect(screen.getByText("result")).toBeInTheDocument();
  });

  it("announces a non-expandable error row as an alert, not a status", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "create_post", status: "error" }}
      />,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("alert").getAttribute("aria-label")).toContain(
      "Failed",
    );
  });

  it("uses custom toolLabels for the status aria text", () => {
    render(
      <AgentSidebarToolCall
        tool={{ moduleSlug: "cms", tool: "get_page", status: "started" }}
        toolLabels={{ running: "En cours" }}
      />,
    );
    expect(screen.getByRole("status").getAttribute("aria-label")).toContain(
      "En cours",
    );
  });
});

describe("AgentSidebarMessages tool rows", () => {
  it("renders role:'tool' items as tool-call rows, not bubbles", () => {
    render(
      <AgentSidebarMessages
        messages={[
          { id: "u1", role: "user", content: "Do it" },
          {
            id: "t1",
            role: "tool",
            tool: { moduleSlug: "cms", tool: "publish_post", status: "done", durationMs: 120 },
          },
          { id: "a1", role: "agent", content: "Published." },
        ]}
      />,
    );
    expect(screen.getByText("cms · publish_post")).toBeInTheDocument();
    expect(screen.getByText("120ms")).toBeInTheDocument();
  });

  it("collapses consecutive tool rows into a single gap-1 group", () => {
    const { container } = render(
      <AgentSidebarMessages
        autoScroll={false}
        messages={[
          {
            id: "t1",
            role: "tool",
            tool: { moduleSlug: "cms", tool: "get_page", status: "done" },
          },
          {
            id: "t2",
            role: "tool",
            tool: { moduleSlug: "cms", tool: "publish_post", status: "done" },
          },
          { id: "a1", role: "agent", content: "Done." },
        ]}
      />,
    );
    // One gap-1 group + the agent bubble + the scroll anchor — the two tool
    // rows must NOT be direct children of the gap-4 list.
    const list = container.firstElementChild!;
    expect(list.children).toHaveLength(3);
    const group = list.children[0]!;
    expect(group.className).toContain("gap-1");
    expect(group.children).toHaveLength(2);
  });

  it("passes the list-level toolLabels down to tool rows", () => {
    render(
      <AgentSidebarMessages
        toolLabels={{ running: "執行中" }}
        messages={[
          {
            id: "t1",
            role: "tool",
            tool: { moduleSlug: "cms", tool: "get_page", status: "started" },
          },
        ]}
      />,
    );
    expect(screen.getByRole("status").getAttribute("aria-label")).toContain(
      "執行中",
    );
  });
});
