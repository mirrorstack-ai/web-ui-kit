import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarPlanCard, type AgentPlanTarget } from "./AgentSidebarPlanCard";
import { AgentSidebarMessages, type AgentSidebarMessage } from "../messages/AgentSidebarMessages";

const meta: Meta = {
  title: "UI/Agent/Cards",
  decorators: [(Story) => <div className="w-full bg-on-background p-4"><Story /></div>],
};
export default meta;
const HREF = "https://account.mirrorstack.ai/approvals/p-1";
const step = (id: string, title: string, category: string, state: string, kind?: string, targets?: AgentPlanTarget[]) => ({ id, title, category, state, kind, targets });
const EN_LONG_APP = "Spring Campaign Learning Portal for the very-long-organisation-name-example-edu-tw workspace";
const ZH_LONG_APP = "春季活動學習入口網站（超級長的組織名稱範例教育機構專用工作區）";
const EN_STEPS = [
  step("s1", "Install the quiz-core module (version 1.4.2-rc.1) on the Spring Campaign Learning Portal app for the very-long-organisation-name-example-edu-tw workspace", "module", "pending", "install_module", [
    { type: "app", id: "a-1", name: EN_LONG_APP }, { type: "module", id: "m-1", name: "quiz-core-with-an-extremely-long-module-name-for-overflow-checks" },
  ]),
  step("s2", "Add DNS record learn.example.com", "dns", "pending"),
  step("s3", "Charge the monthly base fee", "billing", "approved"),
  step("s4", "Create the Spring Campaign app", "app", "running", "create_app", [{ type: "app", ref: "new-1" }]),
  step("s7", "Install the review module", "module", "pending", "install_module", [{ type: "module", id: "m-gone", unavailable: true }]),
  step("s5", "Update the app spec", "app", "done", "update_app_spec"),
  step("s6", "Author the review module", "mystery_category", "failed", "unknown_kind"),
];
const EN_CATEGORIES = { module: "Module", dns: "Domain", billing: "Billing", app: "App" };
const EN_TARGET_TYPES = { app: "App", module: "Module" };
const EN_KINDS = { install_module: "Install a module", create_app: "Create an app", update_app_spec: "Update the app spec" };
const ZH_STEPS = [
  step("s1", "在「春季活動學習入口網站」應用程式為「超級長的組織名稱範例教育機構」工作區安裝測驗核心模組（版本 1.4.2-rc.1）並完成所有必要的設定", "module", "pending", "install_module", [
    { type: "app", id: "a-1", name: ZH_LONG_APP }, { type: "module", id: "m-1", name: "測驗核心模組（名稱非常非常非常長的版本用來檢查是否溢出版面）" },
  ]),
  step("s2", "新增 DNS 紀錄 learn.example.com", "dns", "pending"),
  step("s3", "收取每月基本費", "billing", "approved"),
  step("s4", "建立「春季活動」應用程式", "app", "running", "create_app", [{ type: "app", ref: "new-1" }]),
  step("s7", "安裝評論模組", "module", "pending", "install_module", [{ type: "module", id: "m-gone", unavailable: true }]),
  step("s5", "更新應用程式規格", "app", "done", "update_app_spec"),
  step("s6", "撰寫評論模組", "mystery_category", "failed", "unknown_kind"),
];
const ZH_CATEGORIES = { module: "模組", dns: "網域", billing: "帳務", app: "應用程式" };
const ZH_TARGET_TYPES = { app: "應用程式", module: "模組" };
const ZH_KINDS = { install_module: "安裝模組", create_app: "建立應用程式", update_app_spec: "更新應用程式規格" };
const LOCALES = {
  en: {
    steps: EN_STEPS, categories: EN_CATEGORIES, kinds: EN_KINDS, targetTypes: EN_TARGET_TYPES,
    plan: { targetNewApp: "New app", targetUnavailable: "Unavailable", stepStates: { pending: "Pending", approved: "Approved", running: "Running", done: "Done", failed: "Failed" } }, question: undefined,
    texts: ["Site name", "Send notification mail", "Two quick questions", "An answered card", "e.g. Spring Campaign"],
  },
  "zh-TW": {
    steps: ZH_STEPS, categories: ZH_CATEGORIES, kinds: ZH_KINDS, targetTypes: ZH_TARGET_TYPES,
    plan: {
      plan: "計畫", approve: "核准", review: "檢視並確認", planStates: { proposed: "待確認" },
      targetNewApp: "新的應用程式", targetUnavailable: "無法使用",
      stepStates: { pending: "待處理", approved: "已核准", running: "執行中", done: "已完成", failed: "失敗" },
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
    <AgentSidebarMessages messages={messages} questionLabels={l.question} planLabels={l.plan} planCategoryLabels={l.categories} planKindLabels={l.kinds} planTargetTypeLabels={l.targetTypes} autoScroll={false}
      resolvePlanHref={(path) => `https://account.mirrorstack.ai${path}`} />
  );
}
export const SidebarCardsEnglish: StoryObj = { render: () => <Scene locale="en" /> };
export const SidebarCardsZhTW: StoryObj = { render: () => <Scene locale="zh-TW" /> };
const LONG = step("s1", "Install quiz-core on the Spring Campaign application https://learn.example.com/a/very/long/path/that/never/breaks", "module", "pending", "install_module");
export const PlanEveryStateAndLongTitle: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      {["proposed", "approved", "executing", "done", "failed", "expired", "cancelled"].map((state) => (
        <AgentSidebarPlanCard key={state} planId="p-1" state={state} confirmHref={HREF} categoryLabels={EN_CATEGORIES} kindLabels={EN_KINDS} targetTypeLabels={EN_TARGET_TYPES} labels={LOCALES.en.plan}
          steps={state === "proposed" ? [...EN_STEPS, LONG] : EN_STEPS}
          onApproveStep={state === "proposed" ? (p, s) => console.log("approve", p, s) : undefined} />
      ))}
    </div>
  ),
};
