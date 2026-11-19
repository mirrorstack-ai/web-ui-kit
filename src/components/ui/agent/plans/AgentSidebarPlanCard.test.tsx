import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AgentSidebarPlanCard, isSafeConfirmHref, APPROVABLE_STEP_STATES, PLAN_STEP_STATES, type AgentPlanStepState,
} from "./AgentSidebarPlanCard";
import type { AgentPlanStep } from "@/hooks/agent-chat/client";

afterEach(cleanup);

const HREF = "https://account.mirrorstack.ai/approvals/p-1";
const steps = [
  { id: "s1", title: "Install quiz", category: "module", state: "pending" },
  { id: "s2", title: "Add DNS record", category: "dns", state: "pending" },
  { id: "s3", title: "Pay invoice", category: "billing", state: "approved" },
];
const base = { planId: "p-1", state: "proposed", steps, confirmHref: HREF };

describe("AgentSidebarPlanCard", () => {
  it("shows Approve only on pending steps, and only with a handler", async () => {
    const onApprove = vi.fn();
    const { rerender } = render(<AgentSidebarPlanCard {...base} onApproveStep={onApprove} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
    await userEvent.click(screen.getByRole("button", { name: /Install quiz/ }));
    expect(onApprove).toHaveBeenCalledWith("p-1", "s1");
    rerender(<AgentSidebarPlanCard {...base} />); // control: no handler, no button, link stays
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByRole("link", { name: "Review and confirm" })).toHaveAttribute("href", HREF);
  });

  it("shows the link only when a step cannot be approved here", () => {
    const { rerender } = render(<AgentSidebarPlanCard {...base} steps={steps.slice(0, 2)} onApproveStep={vi.fn()} />);
    expect(screen.queryByRole("link")).toBeNull();
    rerender(<AgentSidebarPlanCard {...base} onApproveStep={vi.fn()} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it.each(["done", "failed", "expired", "cancelled"])("a %s plan has no button and no link", (state) => {
    render(<AgentSidebarPlanCard {...base} state={state} onApproveStep={vi.fn()} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders step text as plain text: no markdown, HTML, image or link", () => {
    const title = "![leak](https://evil.test/p.png) <img src=x onerror=1> https://evil.test";
    const { container } = render(
      <AgentSidebarPlanCard {...base} steps={[{ id: "x", title, category: "<b>c</b>", state: "pending" }]} />,
    );
    expect(container.querySelector("img, b")).toBeNull();
    expect(container.querySelectorAll("a")).toHaveLength(1); // only the confirm link
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("rejects a confirmHref that is not https or a same-origin path", () => {
    for (const bad of ["javascript:alert(1)", "data:text/html,x", "http://a.test", "//evil.test/x", undefined]) {
      expect(isSafeConfirmHref(bad)).toBe(false);
    }
    expect(isSafeConfirmHref("/approvals/p-1")).toBe(true);
    render(<AgentSidebarPlanCard {...base} confirmHref="javascript:alert(1)" />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("takes every label as a prop", () => {
    const labels = { plan: "計畫", review: "檢視並確認", planStates: { proposed: "待確認" }, stepStates: { pending: "草稿" } };
    render(<AgentSidebarPlanCard {...base} labels={labels} />);
    expect(screen.getByRole("group", { name: "計畫" })).toBeInTheDocument();
    for (const t of ["計畫 · 待確認", "檢視並確認"]) expect(screen.getByText(t)).toBeInTheDocument();
    expect(screen.getAllByText("草稿")).toHaveLength(2);
  });

  it("shows host labels for category and kind, and falls back to the raw category and the given title", () => {
    const withKind = [
      { id: "k1", kind: "install_module", title: "server title one", category: "module", state: "pending" },
      { id: "k2", kind: "mystery_kind", title: "server title two", category: "mystery_cat", state: "pending" },
      { id: "k3", title: "server title three", category: "module", state: "pending" },
    ];
    render(
      <AgentSidebarPlanCard {...base} steps={withKind}
        categoryLabels={{ module: "模組" }} kindLabels={{ install_module: "安裝模組" }} />,
    );
    expect(screen.getByText("安裝模組")).toBeInTheDocument(); // kind label replaces the title
    expect(screen.queryByText("server title one")).toBeNull();
    expect(screen.getByText("server title two")).toBeInTheDocument(); // kind without a label → given title
    expect(screen.getByText("server title three")).toBeInTheDocument(); // no kind → given title
    expect(screen.getAllByText("模組")).toHaveLength(2); // labelled category
    expect(screen.getByText("mystery_cat")).toBeInTheDocument(); // unlabelled category → raw value
  });

  it("holds no fixed text for category or kind: without maps the raw value shows", () => {
    render(<AgentSidebarPlanCard {...base} steps={[{ id: "r", kind: "install_module", title: "T", category: "module", state: "pending" }]} />);
    expect(screen.getByText("module")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  // The plan contract: `agent_plan_steps.status` CHECK in api-platform migration
  // 117_agent_plans.up.sql. Copied here on purpose so a change to PLAN_STEP_STATES alone fails.
  const CONTRACT_STEP_STATES = ["pending", "approved", "running", "done", "failed"];

  it("the kit's step-state list equals the plan contract's", () => {
    expect([...PLAN_STEP_STATES].sort()).toEqual([...CONTRACT_STEP_STATES].sort());
  });

  it("the Approve set holds only contract states, and not a legacy draft/edit_text", () => {
    for (const s of APPROVABLE_STEP_STATES) expect(CONTRACT_STEP_STATES).toContain(s);
    expect(APPROVABLE_STEP_STATES.has("pending")).toBe(true);
    expect(APPROVABLE_STEP_STATES.has("draft" as AgentPlanStepState)).toBe(false);
    expect(APPROVABLE_STEP_STATES.has("edit_text" as AgentPlanStepState)).toBe(false);
  });

  it("an unknown or legacy step state renders as sent and never shows Approve", () => {
    render(<AgentSidebarPlanCard {...base} onApproveStep={vi.fn()} steps={[{ id: "z", title: "Z", category: "module", state: "draft" }]} />);
    expect(screen.getByText("draft")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Approve/ })).toBeNull();
  });

  it("the Approve button is named after the labelled title when the step has a kind", async () => {
    const onApprove = vi.fn();
    render(
      <AgentSidebarPlanCard
        {...base} onApproveStep={onApprove} kindLabels={{ install_module: "安裝模組" }}
        steps={[{ id: "k", kind: "install_module", title: "server title", category: "module", state: "pending" }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Approve: 安裝模組" }));
    expect(onApprove).toHaveBeenCalledWith("p-1", "k");
  });

  // Type-level (checked by `pnpm typecheck`, which covers *.test.tsx): the Approve set and the
  // wire type are typed from PLAN_STEP_STATES, so a state the contract list lacks does not compile.
  it("types: the contract states are the state type", () => {
    // @ts-expect-error "draft" is not a state of the plan contract
    const draft: AgentPlanStepState = "draft";
    // @ts-expect-error a set naming a state the type does not have does not type-check
    const bad: ReadonlySet<AgentPlanStepState> = new Set<AgentPlanStepState>(["pending", "edit_text"]);
    const ok: AgentPlanStep = { id: "a", kind: "k", category: "c", title: "t", state: "running" };
    const open: AgentPlanStep = { id: "a", kind: "k", category: "c", title: "t", state: "anything_else" };
    expect([draft, bad, ok, open]).toBeDefined();
  });
});
