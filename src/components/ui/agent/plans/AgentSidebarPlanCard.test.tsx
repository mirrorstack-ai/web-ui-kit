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
    expect(screen.getByText("安裝模組")).toBeInTheDocument(); // kind label is the heading
    expect(screen.getByText("server title one")).toBeInTheDocument(); // …and the server title stays visible under it
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

  it("the Approve button is named after the server title (not the kind label) when the step has a kind", async () => {
    const onApprove = vi.fn();
    render(
      <AgentSidebarPlanCard
        {...base} onApproveStep={onApprove} kindLabels={{ install_module: "安裝模組" }}
        steps={[{ id: "k", kind: "install_module", title: "server title", category: "module", state: "pending" }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Approve: server title" }));
    expect(onApprove).toHaveBeenCalledWith("p-1", "k");
  });

  it("a labelled step shows the label as heading and the server title under it as plain text; a step with no label shows the title alone", () => {
    const title = "Install **quiz-core** [x](https://evil.example) into the Spring site";
    render(
      <AgentSidebarPlanCard
        {...base} kindLabels={{ install_module: "Install a module" }}
        steps={[
          { id: "a", kind: "install_module", title, category: "module", state: "pending" },
          { id: "b", kind: "unlabelled", title: "Only the title", category: "module", state: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("Install a module")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument(); // one text node: no markdown, no link built from it
    expect(screen.queryByRole("link", { name: /x/ })).toBeNull();
    expect(screen.getAllByText("Only the title")).toHaveLength(1);
    expect(screen.queryByText("unlabelled")).toBeNull();
  });

  it("Approve names the server title, so the control says what it approves (kind with and without a label)", () => {
    render(
      <AgentSidebarPlanCard
        {...base} onApproveStep={vi.fn()} kindLabels={{ install_module: "Install a module" }}
        steps={[
          { id: "a", kind: "install_module", title: "Install quiz-core on Spring", category: "module", state: "pending" },
          { id: "b", kind: "add_dns", title: "Add DNS record www", category: "dns", state: "pending" },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: "Approve: Install quiz-core on Spring" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve: Add DNS record www" })).toBeInTheDocument();
  });

  it("a title equal to the kind code is not shown under the label and does not name Approve", () => {
    render(
      <AgentSidebarPlanCard
        {...base} onApproveStep={vi.fn()} kindLabels={{ install_module: "Install a module" }}
        steps={[{ id: "a", kind: "install_module", title: "install_module", category: "module", state: "pending" }]}
      />,
    );
    expect(screen.getByText("Install a module")).toBeInTheDocument();
    expect(screen.queryByText("install_module")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve: Install a module" })).toBeInTheDocument();
  });

  it("a title equal to the kind code with no label for that kind still shows once and names Approve", () => {
    render(
      <AgentSidebarPlanCard
        {...base} onApproveStep={vi.fn()}
        steps={[{ id: "a", kind: "add_dns", title: "add_dns", category: "dns", state: "pending" }]}
      />,
    );
    expect(screen.getAllByText("add_dns")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Approve: add_dns" })).toBeInTheDocument();
  });

  // pending = the state a step is inserted with; no step waits behind another in `pending`
  // (see the comment at APPROVABLE_STEP_STATES), so Approve shows on every pending step.
  describe("targets (kit#437h)", () => {
    const TYPES = { app: "App", module: "Module" };
    const one = (targets?: AgentPlanStep["targets"], over = {}) => (
      <AgentSidebarPlanCard planId="p-1" state="proposed" onApproveStep={vi.fn()} targetTypeLabels={TYPES}
        labels={{ targetNewApp: "New app", targetUnavailable: "Unavailable" }}
        steps={[{ id: "s1", title: "Install", category: "module", state: "pending", kind: "install_module", targets, ...over }]} />
    );

    it("shows one app target under the heading as one text node, and Approve names it", () => {
      render(one([{ type: "app", id: "a-1", name: "Spring Campaign" }]));
      const line = screen.getByText("App: Spring Campaign");
      expect(line.childNodes).toHaveLength(1);
      expect(screen.getByRole("button", { name: "Approve: Install — Spring Campaign" })).toBeInTheDocument();
    });

    it("shows an app and a module, and Approve names both", () => {
      render(one([{ type: "app", name: "Spring Campaign" }, { type: "module", name: "quiz-core" }]));
      expect(screen.getByText("App: Spring Campaign")).toBeInTheDocument();
      expect(screen.getByText("Module: quiz-core")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Approve: Install — Spring Campaign, quiz-core" })).toBeInTheDocument();
    });

    it("a new app (ref, no name) shows the host text, never the id or the ref", () => {
      const { container } = render(one([{ type: "app", id: "a-secret-id", ref: "new-app-ref" }]));
      expect(screen.getByText("App: New app")).toBeInTheDocument();
      expect(container.textContent).not.toMatch(/a-secret-id|new-app-ref/);
    });

    it("an unavailable target shows the host text and the step has no Approve", () => {
      const { container } = render(one([{ type: "module", id: "m-secret", unavailable: true }]));
      expect(screen.getByText("Module: Unavailable")).toBeInTheDocument();
      expect(container.textContent).not.toContain("m-secret");
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("an unknown target type with no label shows the raw type", () => {
      render(one([{ type: "workspace", name: "Acme" }]));
      expect(screen.getByText("workspace: Acme")).toBeInTheDocument();
    });

    it("no targets, an empty list or a malformed value renders as before", () => {
      const before = render(one(undefined)).container.innerHTML;
      cleanup();
      expect(render(one([])).container.innerHTML).toBe(before);
      cleanup();
      // @ts-expect-error a malformed wire value must not break the card
      expect(render(one("oops")).container.innerHTML).toBe(before);
      cleanup();
      render(one(undefined));
      expect(screen.getByRole("button", { name: "Approve: Install" })).toBeInTheDocument();
    });

    it("a name with markdown or a URL renders as text: no link, image or element", () => {
      const name = "**bold** [x](https://evil.test) <img src=x onerror=alert(1)> https://evil.test";
      const { container } = render(one([{ type: "app", name }]));
      expect(screen.getByText(`App: ${name}`)).toBeInTheDocument();
      expect(container.querySelector("img, a, strong")).toBeNull();
    });
  });

  it("Approve shows on every pending step of a plan, not only the first", () => {
    render(<AgentSidebarPlanCard {...base} onApproveStep={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
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
