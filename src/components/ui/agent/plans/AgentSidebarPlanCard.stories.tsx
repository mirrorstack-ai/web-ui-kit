import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarPlanCard } from "./AgentSidebarPlanCard";
import { AgentSidebarMessages, type AgentSidebarMessage } from "../messages/AgentSidebarMessages";

const meta: Meta = {
  title: "UI/Agent/Cards",
  decorators: [(Story) => <div className="w-full bg-on-background p-4"><Story /></div>],
};
export default meta;
const HREF = "https://account.mirrorstack.ai/approvals/p-1";
const step = (id: string, title: string, category: string, state: string) => ({ id, title, category, state });
const EN_STEPS = [
  step("s1", "Install quiz-core on Spring Campaign", "module", "draft"),
  step("s2", "Add DNS record learn.example.com", "dns", "edit_text"),
  step("s3", "Charge the monthly base fee", "billing", "pending"),
];
const ZH_STEPS = [
  step("s1", "在「春季活動」安裝測驗模組", "模組", "draft"),
  step("s2", "新增 DNS 紀錄 learn.example.com", "網域", "edit_text"),
  step("s3", "收取每月基本費", "帳務", "pending"),
];
const LOCALES = {
  en: {
    steps: EN_STEPS,
    plan: { stepStates: { draft: "Draft", edit_text: "Editable", pending: "Pending" } }, question: undefined,
    texts: ["Site name", "Send notification mail", "Two quick questions", "An answered card", "e.g. Spring Campaign"],
  },
  "zh-TW": {
    steps: ZH_STEPS,
    plan: {
      plan: "計畫", approve: "核准", review: "檢視並確認", planStates: { proposed: "待確認" },
      stepStates: { draft: "草稿", edit_text: "可編輯", pending: "待處理" },
    },
    question: {
      answerToContinue: "請回答以繼續", submit: "送出", submitted: "已送出", enabled: "已啟用", notEnabled: "未啟用",
      notAnswered: "未回答", selectQuestion: "選擇問題", review: "檢閱", prev: "上一題", next: "下一題",
    },
    texts: ["網站名稱", "寄送通知信", "先確認兩件事", "已回答的問題", "例如：春季活動"],
  },
};
/** The sidebar column: a pending question card, an answered one and a plan card. */
function Scene({ locale }: { locale: keyof typeof LOCALES }) {
  const l = LOCALES[locale];
  const [name, mail, pending, answered, placeholder] = l.texts;
  const questions = [{ id: "name", type: "text" as const, label: name, placeholder }, { id: "mail", type: "toggle" as const, label: mail }];
  const messages: AgentSidebarMessage[] = [
    { id: "q1", role: "agent", kind: "multi-question", title: pending, questions },
    { id: "q2", role: "agent", kind: "multi-question", title: answered, questions, status: "submitted", answers: { name: "Spring", mail: true } },
    { id: "p1", role: "agent", kind: "plan", planId: "p-1", state: "proposed", confirmPath: "/approvals/p-1", steps: l.steps },
  ];
  return (
    <AgentSidebarMessages messages={messages} questionLabels={l.question} planLabels={l.plan} autoScroll={false}
      resolvePlanHref={(path) => `https://account.mirrorstack.ai${path}`} />
  );
}
export const SidebarCardsEnglish: StoryObj = { render: () => <Scene locale="en" /> };
export const SidebarCardsZhTW: StoryObj = { render: () => <Scene locale="zh-TW" /> };
const LONG = step("s1", "Install quiz-core on the Spring Campaign application https://learn.example.com/a/very/long/path/that/never/breaks", "module", "pending");
export const PlanEveryStateAndLongTitle: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      {["proposed", "approved", "executing", "done", "failed", "expired", "cancelled"].map((state) => (
        <AgentSidebarPlanCard key={state} planId="p-1" state={state} confirmHref={HREF}
          steps={state === "proposed" ? [...EN_STEPS, LONG] : EN_STEPS}
          onApproveStep={state === "proposed" ? (p, s) => console.log("approve", p, s) : undefined} />
      ))}
    </div>
  ),
};
