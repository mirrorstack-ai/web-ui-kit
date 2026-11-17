import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgentSidebarPlanCard, isSafeConfirmHref } from "./AgentSidebarPlanCard";

afterEach(cleanup);

const HREF = "https://account.mirrorstack.ai/approvals/p-1";
const steps = [
  { id: "s1", title: "Install quiz", category: "module", state: "draft" },
  { id: "s2", title: "Add DNS record", category: "dns", state: "edit_text" },
  { id: "s3", title: "Pay invoice", category: "billing", state: "pending" },
];
const base = { planId: "p-1", state: "proposed", steps, confirmHref: HREF };

describe("AgentSidebarPlanCard", () => {
  it("shows Approve only on draft and edit_text steps, and only with a handler", async () => {
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
    const labels = { plan: "計畫", review: "檢視並確認", planStates: { proposed: "待確認" }, stepStates: { draft: "草稿" } };
    render(<AgentSidebarPlanCard {...base} labels={labels} />);
    expect(screen.getByRole("group", { name: "計畫" })).toBeInTheDocument();
    for (const t of ["計畫 · 待確認", "檢視並確認", "草稿"]) expect(screen.getByText(t)).toBeInTheDocument();
  });
});
