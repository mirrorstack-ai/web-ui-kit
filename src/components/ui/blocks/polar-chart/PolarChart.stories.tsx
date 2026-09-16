import type { Meta, StoryObj } from "@storybook/react";
import { PolarChart } from "./PolarChart";

const meta: Meta<typeof PolarChart> = {
  title: "UI/Blocks/PolarChart",
  component: PolarChart,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof PolarChart>;

const wrap = (children: React.ReactNode) => (
  <div className="w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface">{children}</div>
);

/**
 * quiz-core 統計: correct rate per question, the figure that was going through
 * TrendChart — a smooth curve drawn over question index, which invents a trend
 * between categories that have no order. `max={100}` is what keeps a percentage
 * a percentage.
 */
export const CorrectRatePerQuestion: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="每題答對率"
        max={100}
        formatValue={(value) => `${Math.round(value)}%`}
        data={[
          { key: "q1", label: "第 1 題", value: 92 },
          { key: "q2", label: "第 2 題", value: 74 },
          { key: "q3", label: "第 3 題", value: 41 },
          { key: "q4", label: "第 4 題", value: 88 },
          { key: "q5", label: "第 5 題", value: 63 },
          { key: "q6", label: "第 6 題", value: 12 },
        ]}
      />,
    ),
};

/**
 * 🔴 The same data WITHOUT `max`: every wedge is scaled to the best category,
 * so a quiz where nothing exceeds 41% looks like one with a top score. Kept as
 * a story because it is the mistake the prop exists to prevent, and it is only
 * visible side by side.
 */
export const RateWithoutAMaximum: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="每題答對率（無 max，示警用）"
        formatValue={(value) => `${Math.round(value)}%`}
        data={[
          { key: "q1", label: "第 1 題", value: 41 },
          { key: "q2", label: "第 2 題", value: 33 },
          { key: "q3", label: "第 3 題", value: 28 },
          { key: "q4", label: "第 4 題", value: 19 },
        ]}
      />,
    ),
};

/**
 * ad-core's analytics block: CTR by placement. A ring would be wrong here —
 * rates are not parts of a whole, and stacking them would add up to nothing
 * meaningful.
 */
export const CtrByPlacement: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="各版位點擊率"
        max={5}
        formatValue={(value) => `${value.toFixed(2)}%`}
        data={[
          { key: "home-top", label: "首頁上方", value: 3.82 },
          { key: "list-inline", label: "列表插入", value: 2.41 },
          { key: "detail-side", label: "詳情側欄", value: 1.15 },
          { key: "footer", label: "頁尾", value: 0.34 },
        ]}
      />,
    ),
};

/** Counts rather than rates: no ceiling to declare, so the largest sets the rim. */
export const RawCounts: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="Clicks by placement"
        formatValue={(value) => value.toLocaleString("en-US")}
        data={[
          { key: "a", label: "首頁上方", value: 1842 },
          { key: "b", label: "列表插入", value: 726 },
          { key: "c", label: "詳情側欄", value: 143 },
        ]}
      />,
    ),
};

/** One category: a wedge, not a full-circle degenerate arc. */
export const SingleCategory: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="每題答對率"
        max={100}
        formatValue={(value) => `${value}%`}
        data={[{ key: "q1", label: "第 1 題", value: 76 }]}
      />,
    ),
};

/** Nobody has answered anything yet: guides and hub, no wedges, a dash. */
export const Empty: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="每題答對率"
        max={100}
        emptyLabel="尚無作答"
        data={[
          { key: "q1", label: "第 1 題", value: 0 },
          { key: "q2", label: "第 2 題", value: 0 },
        ]}
      />,
    ),
};

/** Twelve categories, to see where the wedges stop being readable. */
export const ManyCategories: Story = {
  render: () =>
    wrap(
      <PolarChart
        title="每題答對率"
        max={100}
        legend={false}
        formatValue={(value) => `${value}%`}
        data={Array.from({ length: 12 }, (_, index) => ({
          key: `q${index}`,
          label: `第 ${index + 1} 題`,
          value: 30 + ((index * 17) % 70),
        }))}
      />,
    ),
};
