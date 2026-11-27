import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarRunCard, type AgentSidebarRunCardLabels } from "./AgentSidebarRunCard";
import { AgentSidebarPlanCard } from "./AgentSidebarPlanCard";

const meta: Meta<typeof AgentSidebarRunCard> = {
  title: "UI/Agent/RunCard",
  component: AgentSidebarRunCard,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-full max-w-[400px] bg-on-background p-4"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof AgentSidebarRunCard>;

const HREF = "https://apps.mirrorstack.ai/org/o-1/candidates/c-1";
const ZH: Partial<AgentSidebarRunCardLabels> = {
  run: "建置", lastEvent: "最後事件", openCandidate: "開啟候選版本",
  runStates: { queued: "排隊中", running: "建置中", done: "已完成", failed: "失敗", cancelled: "已取消" },
};
const EN_RUNS = [
  { state: "queued", status: "Waiting for a build slot", lastEvent: "run_queued" },
  { state: "running", status: "Building the quiz module", lastEvent: "sandbox_started" },
  { state: "done", status: "The candidate is ready", lastEvent: "candidate_ready", candidateId: "c-1", candidateHref: HREF },
  { state: "failed", status: "The build stopped", lastEvent: "build_failed" },
  { state: "done", status: "Done, but no candidate id yet", lastEvent: "candidate_pending", candidateHref: HREF },
  { state: "running", status: "A very long status line https://learn.example.com/a/very/long/path/that/never/breaks/the/card", lastEvent: "an_event_name_that_is_extremely_long_and_has_no_break_points_at_all_so_it_must_wrap" },
];
const ZH_RUNS = [
  { state: "queued", status: "等待建置名額", lastEvent: "run_queued" },
  { state: "running", status: "正在建置測驗模組", lastEvent: "sandbox_started" },
  { state: "done", status: "候選版本已就緒", lastEvent: "candidate_ready", candidateId: "c-1", candidateHref: HREF },
  { state: "failed", status: "建置已停止", lastEvent: "build_failed" },
  { state: "done", status: "已完成，但尚無候選版本編號", lastEvent: "candidate_pending", candidateHref: HREF },
  { state: "running", status: "超級長的狀態說明文字用來檢查在窄版面是否會溢出，並且包含一個很長的網址 https://learn.example.com/a/very/long/path", lastEvent: "an_event_name_that_is_extremely_long_and_has_no_break_points_at_all_so_it_must_wrap" },
];

export const English: Story = {
  render: () => <div className="flex flex-col gap-3">{EN_RUNS.map((r, i) => <AgentSidebarRunCard key={i} {...r} />)}</div>,
};
export const ZhTW: Story = {
  render: () => <div className="flex flex-col gap-3">{ZH_RUNS.map((r, i) => <AgentSidebarRunCard key={i} {...r} labels={ZH} />)}</div>,
};

const PLAN_STEP = (title: string) => [{ id: "s1", title, category: "module", state: "running" }];
export const BesidePlanCardEnglish: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <AgentSidebarPlanCard planId="p-1" state="executing" steps={PLAN_STEP("Author the quiz module")} />
      <AgentSidebarRunCard {...EN_RUNS[2]} />
    </div>
  ),
};
export const BesidePlanCardZhTW: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <AgentSidebarPlanCard planId="p-1" state="executing" steps={PLAN_STEP("撰寫測驗模組")}
        labels={{ plan: "計畫", planStates: { executing: "執行中" }, stepStates: { running: "執行中" } }} />
      <AgentSidebarRunCard {...ZH_RUNS[2]} labels={ZH} />
    </div>
  ),
};
