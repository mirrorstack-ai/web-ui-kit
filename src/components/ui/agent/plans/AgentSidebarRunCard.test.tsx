import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AgentSidebarRunCard } from "./AgentSidebarRunCard";
import { AgentSidebarMessages, type AgentSidebarMessage } from "../messages/AgentSidebarMessages";

afterEach(cleanup);

const HREF = "https://apps.mirrorstack.ai/org/o-1/candidates/c-1";

describe("AgentSidebarRunCard", () => {
  it("shows the server state, status and last event as plain text", () => {
    render(<AgentSidebarRunCard state="running" status="Building the module" lastEvent="sandbox_started" />);
    expect(screen.getByRole("group", { name: "Build" })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("Build · Running");
    expect(screen.getByText("Building the module")).toBeTruthy();
    expect(screen.getByText("Last event: sandbox_started")).toBeTruthy();
  });

  it("shows an unknown state as the server sent it", () => {
    render(<AgentSidebarRunCard state="mystery_state" />);
    expect(screen.getByRole("status").textContent).toBe("Build · mystery_state");
  });

  it("uses the host's locale labels", () => {
    render(<AgentSidebarRunCard state="done" lastEvent="candidate_ready" candidateId="c-1" candidateHref={HREF}
      labels={{ run: "建置", lastEvent: "最後事件", openCandidate: "開啟候選版本", runStates: { done: "已完成" } }} />);
    expect(screen.getByRole("status").textContent).toBe("建置 · 已完成");
    expect(screen.getByText("最後事件: candidate_ready")).toBeTruthy();
    expect(screen.getByRole("link", { name: /開啟候選版本/ })).toBeTruthy();
  });

  it("renders hostile status and event text as text: no markup, no link, no image", () => {
    const hostile = '<img src=x onerror=alert(1)> [click](https://evil.example) **bold** <a href="https://evil.example">x</a>';
    const { container } = render(<AgentSidebarRunCard state="failed" status={hostile} lastEvent={hostile} />);
    expect(container.querySelector("img, a, strong, b")).toBeNull();
    expect(container.textContent).toContain(hostile);
  });

  it("the link slot is empty without a candidate id, even when a href is given", () => {
    render(<AgentSidebarRunCard state="running" candidateHref={HREF} />);
    expect(screen.queryByRole("link")).toBeNull();
    cleanup();
    render(<AgentSidebarRunCard state="running" candidateId="" candidateHref={HREF} />);
    expect(screen.queryByRole("link")).toBeNull();
    cleanup();
    render(<AgentSidebarRunCard state="running" candidateId={null} candidateHref={HREF} />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("with a candidate id the link goes to the host's href and never prints the id", () => {
    const { container } = render(<AgentSidebarRunCard state="done" candidateId="cand-secret-123" candidateHref={HREF} />);
    expect(screen.getByRole("link", { name: /Open the candidate/ }).getAttribute("href")).toBe(HREF);
    expect(container.textContent).not.toContain("cand-secret-123");
  });

  it.each(["javascript:alert(1)", "data:text/html,x", "//evil.example/x", "http://insecure.example/x", undefined])(
    "a candidate id with an unsafe or missing href (%s) draws no link", (href) => {
      render(<AgentSidebarRunCard state="done" candidateId="c-1" candidateHref={href} />);
      expect(screen.queryByRole("link")).toBeNull();
    });

  it("a same-origin path is a safe link", () => {
    render(<AgentSidebarRunCard state="done" candidateId="c-1" candidateHref="/org/o-1/candidates/c-1" />);
    expect(screen.getByRole("link").getAttribute("href")).toBe("/org/o-1/candidates/c-1");
  });
});

describe("AgentSidebarMessages: run card beside the plan card", () => {
  const plan = (run?: { state: string; status?: string; lastEvent?: string; candidateId?: string }): AgentSidebarMessage => ({
    id: "p1", role: "agent", kind: "plan", planId: "p-1", state: "executing", run,
    steps: [{ id: "s1", title: "Author the quiz module", category: "module", state: "running" }],
  });

  it("draws the run card after the plan card when the plan message carries a run", () => {
    render(<AgentSidebarMessages autoScroll={false} messages={[plan({ state: "running", lastEvent: "sandbox_started" })]} />);
    const groups = screen.getAllByRole("group");
    expect(groups.map((g) => g.getAttribute("aria-label"))).toEqual(["Plan", "Build"]);
    expect(screen.getByText("Last event: sandbox_started")).toBeTruthy();
  });

  it("draws no run card when the plan message has no run", () => {
    render(<AgentSidebarMessages autoScroll={false} messages={[plan()]} />);
    expect(screen.queryByRole("group", { name: "Build" })).toBeNull();
  });

  it("builds the link only through resolveCandidateHref and only with a candidate id", () => {
    const calls: string[] = [];
    const resolve = (id: string) => { calls.push(id); return HREF; };
    render(<AgentSidebarMessages autoScroll={false} resolveCandidateHref={resolve} messages={[plan({ state: "running" })]} />);
    expect(screen.queryByRole("link", { name: /Open the candidate/ })).toBeNull();
    expect(calls).toEqual([]);
    cleanup();
    render(<AgentSidebarMessages autoScroll={false} resolveCandidateHref={resolve} messages={[plan({ state: "done", candidateId: "c-1" })]} />);
    expect(calls).toEqual(["c-1"]);
    expect(screen.getByRole("link", { name: /Open the candidate/ }).getAttribute("href")).toBe(HREF);
  });

  it("without resolveCandidateHref the run card has no link", () => {
    render(<AgentSidebarMessages autoScroll={false} messages={[plan({ state: "done", candidateId: "c-1" })]} />);
    expect(screen.queryByRole("link", { name: /Open the candidate/ })).toBeNull();
  });
});
