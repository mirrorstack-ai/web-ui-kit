import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { AgentSidebarMessages } from "../messages/AgentSidebarMessages";
import { AgentSidebarMultiQuestion, type AgentSidebarQuestion } from "./AgentSidebarMultiQuestion";

afterEach(cleanup);
beforeAll(() => {
  Element.prototype.scrollIntoView = () => {};
});

const questions: AgentSidebarQuestion[] = [
  { id: "q1", type: "text", label: "Name" },
  { id: "q2", type: "toggle", label: "Notify" },
];
const zh = {
  answerToContinue: "請回答以繼續", submit: "送出", submitted: "已送出", enabled: "已啟用", notEnabled: "未啟用",
  notAnswered: "未回答", selectQuestion: "選擇問題", review: "檢閱", prev: "上一題", next: "下一題",
};

describe("AgentSidebarMultiQuestion labels and seeded answers", () => {
  it("defaults stay English (hosts that pass nothing render as before)", () => {
    render(<AgentSidebarMultiQuestion title="T" questions={questions} />);
    for (const t of ["Answer to continue", "Review", "Prev", "Next"]) expect(screen.getByText(t)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("localizes every baked-in string", () => {
    render(<AgentSidebarMultiQuestion title="T" questions={questions} labels={zh} />);
    for (const t of ["請回答以繼續", "檢閱", "上一題", "下一題", "送出"]) expect(screen.getByText(t)).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "選擇問題" })).toBeInTheDocument();
    cleanup();
    render(<AgentSidebarMultiQuestion title="T" questions={questions} labels={zh} status="submitted" answers={{ q1: "Ada", q2: true }} />);
    for (const t of ["已送出", "已啟用", "Ada"]) expect(screen.getByText(t)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "送出" })).toBeNull(); // read-only
  });

});

describe("AgentSidebarMessages plan row", () => {
  const row = {
    id: "plan:p-1", role: "agent" as const, kind: "plan" as const, planId: "p-1", state: "proposed", confirmPath: "/approvals/p-1",
    steps: [{ id: "s1", title: "Install quiz", category: "module", state: "pending" }],
  };

  it("builds the confirm link through the host's resolver, and shows none without one", () => {
    const { rerender } = render(
      <AgentSidebarMessages messages={[row]} resolvePlanHref={(p) => `https://account.mirrorstack.ai${p}`} />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://account.mirrorstack.ai/approvals/p-1");
    rerender(<AgentSidebarMessages messages={[row]} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
