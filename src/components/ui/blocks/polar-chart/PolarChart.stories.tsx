import type { Meta, StoryObj } from "@storybook/react";
import { PolarChart } from "./PolarChart";

const meta: Meta<typeof PolarChart> = {
  title: "UI/Blocks/PolarChart",
  component: PolarChart,
  parameters: { layout: "centered" },
  // 🔴 EVERY STORY RENDERS FROM ARGS, or the Controls panel is empty and trying
  // a different corner radius costs a code round trip (owner, 2026-09-16). A
  // `render` that ignores its args looks identical on the canvas and silently
  // disables every knob, which is exactly what was shipped here.
  render: (args) => wrap(<PolarChart {...args} />),
  argTypes: {
    corner: {
      control: { type: "range", min: 0, max: 12, step: 0.5 },
      description:
        "Corner rounding in chart units (the chart's radius is 43). 0 is square.",
    },
    max: { control: { type: "number" } },
    measure: { control: { type: "inline-radio" }, options: ["count", "rate"] },
    legend: { control: { type: "boolean" } },
    title: { control: { type: "text" } },
    emptyLabel: { control: { type: "text" } },
    data: { control: false },
    formatValue: { control: false },
    className: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof PolarChart>;

const wrap = (children: React.ReactNode) => (
  <div className="w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface">
    {children}
  </div>
);

/**
 * quiz-core 統計: correct rate per question, the figure that was going through
 * TrendChart — a smooth curve drawn over question index, which invents a trend
 * between categories that have no order. `max={100}` is what keeps a percentage
 * a percentage.
 */
export const CorrectRatePerQuestion: Story = {
  args: {
    title: "每題答對率",
    max: 100,
    formatValue: (value) => `${Math.round(value)}%`,
    data: [
      { key: "q1", label: "第 1 題", value: 92 },
      { key: "q2", label: "第 2 題", value: 74 },
      { key: "q3", label: "第 3 題", value: 41 },
      { key: "q4", label: "第 4 題", value: 88 },
      { key: "q5", label: "第 5 題", value: 63 },
      { key: "q6", label: "第 6 題", value: 12 },
    ],
  },
};

/**
 * 🔴 The same data WITHOUT `max`: every wedge is scaled to the best category,
 * so a quiz where nothing exceeds 41% looks like one with a top score. Kept as
 * a story because it is the mistake the prop exists to prevent, and it is only
 * visible side by side.
 */
export const RateWithoutAMaximum: Story = {
  args: {
    title: "每題答對率（無 max，示警用）",
    formatValue: (value) => `${Math.round(value)}%`,
    data: [
      { key: "q1", label: "第 1 題", value: 41 },
      { key: "q2", label: "第 2 題", value: 33 },
      { key: "q3", label: "第 3 題", value: 28 },
      { key: "q4", label: "第 4 題", value: 19 },
    ],
  },
};

/**
 * ad-core's analytics block: CTR by placement. A ring would be wrong here —
 * rates are not parts of a whole, and stacking them would add up to nothing
 * meaningful.
 */
export const CtrByPlacement: Story = {
  args: {
    title: "各版位點擊率",
    measure: "rate",
    max: 0.05,
    data: [
      { key: "home-top", label: "首頁上方", value: 0.0382 },
      { key: "list-inline", label: "列表插入", value: 0.0241 },
      { key: "detail-side", label: "詳情側欄", value: 0.0115 },
      { key: "footer", label: "頁尾", value: 0.0034 },
    ],
  },
};

/**
 * The same CTR with NO max: `measure="rate"` alone scales against a whole of 1,
 * which is honest but squashes four placements into stubs. The `max={0.05}`
 * above is the readable version — and the two together are the argument for
 * declaring a ceiling in the units the DATA is in, not the units it prints in.
 */
export const RateAgainstItsWhole: Story = {
  args: {
    title: "各版位點擊率（以 100% 為尺規）",
    measure: "rate",
    data: [
      { key: "home-top", label: "首頁上方", value: 0.0382 },
      { key: "list-inline", label: "列表插入", value: 0.0241 },
      { key: "detail-side", label: "詳情側欄", value: 0.0115 },
      { key: "footer", label: "頁尾", value: 0.0034 },
    ],
  },
};

/**
 * ad-core's first day: every placement is configured and nothing has been
 * clicked. Not an edge case — it is what the block shows until a campaign runs.
 */
export const DayOneAllZero: Story = {
  args: {
    title: "各版位點擊率",
    measure: "rate",
    emptyLabel: "尚無點擊",
    data: [
      { key: "home-top", label: "首頁上方", value: 0 },
      { key: "list-inline", label: "列表插入", value: 0 },
      { key: "footer", label: "頁尾", value: 0 },
    ],
  },
};

/**
 * A creative that was deleted: ad_daily_stats outlives the ad on purpose, so
 * the row survives with no label. The kit falls back to the key — it will not
 * write "Deleted", because one page over the same blank means a placement
 * nobody has named.
 */
export const DeletedCreative: Story = {
  args: {
    title: "各廣告點擊率",
    measure: "rate",
    max: 0.05,
    data: [
      { key: "ad_0f21c8", label: "春季招生", value: 0.0402 },
      { key: "ad_7f3ab1", label: "", value: 0.0188 },
    ],
  },
};

/** Counts rather than rates: no ceiling to declare, so the largest sets the rim. */
export const RawCounts: Story = {
  args: {
    title: "Clicks by placement",
    formatValue: (value) => value.toLocaleString("en-US"),
    data: [
      { key: "a", label: "首頁上方", value: 1842 },
      { key: "b", label: "列表插入", value: 726 },
      { key: "c", label: "詳情側欄", value: 143 },
    ],
  },
};

/** One category: a wedge, not a full-circle degenerate arc. */
export const SingleCategory: Story = {
  args: {
    title: "每題答對率",
    max: 100,
    formatValue: (value) => `${value}%`,
    data: [{ key: "q1", label: "第 1 題", value: 76 }],
  },
};

/** Nobody has answered anything yet: guides and hub, no wedges, a dash. */
export const Empty: Story = {
  args: {
    title: "每題答對率",
    max: 100,
    emptyLabel: "尚無作答",
    data: [
      { key: "q1", label: "第 1 題", value: 0 },
      { key: "q2", label: "第 2 題", value: 0 },
    ],
  },
};

/** Twelve categories, to see where the wedges stop being readable. */
export const ManyCategories: Story = {
  args: {
    title: "每題答對率",
    max: 100,
    legend: false,
    formatValue: (value: number) => `${value}%`,
    data: Array.from({ length: 12 }, (_, index) => ({
      key: `q${index}`,
      label: `第 ${index + 1} 題`,
      value: 30 + ((index * 17) % 70),
    })),
  },
};
