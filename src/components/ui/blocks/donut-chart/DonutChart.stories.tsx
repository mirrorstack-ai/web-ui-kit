import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "UI/Blocks/DonutChart",
  component: DonutChart,
  parameters: { layout: "centered" },
  // Args-driven for the same reason as PolarChart: a `render` that ignores its
  // args leaves the Controls panel inert.
  render: (args) => wrap(<DonutChart {...args} />),
  argTypes: {
    thickness: {
      control: { type: "range", min: 0.05, max: 0.9, step: 0.01 },
      description: "Ring thickness as a share of its radius.",
    },
    total: { control: { type: "number" } },
    measure: { control: { type: "inline-radio" }, options: ["count", "rate"] },
    legend: { control: { type: "boolean" } },
    title: { control: { type: "text" } },
    centerLabel: { control: { type: "text" } },
    emptyLabel: { control: { type: "text" } },
    data: { control: false },
    formatValue: { control: false },
    className: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const wrap = (children: React.ReactNode) => (
  <div className="w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface">
    {children}
  </div>
);

/**
 * quiz-core 統計, the shape it actually holds: attempts split into passed,
 * failed and still open. The ring answers "how did this quiz go", which the
 * pass-rate Gauge could only answer for one number at a time.
 */
export const QuizOutcomes: Story = {
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    data: [
      { key: "passed", label: "通過", value: 184, tone: "success" },
      { key: "failed", label: "未通過", value: 63, tone: "error" },
      { key: "open", label: "未提交", value: 22, tone: "warning" },
    ],
  },
};

/**
 * ad-core's analytics block: impressions by placement. The tones are left unset
 * because one placement is not better than another — the palette orders them,
 * nothing more.
 */
export const ImpressionShare: Story = {
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    data: [
      { key: "home-top", label: "首頁上方", value: 48210 },
      { key: "list-inline", label: "列表插入", value: 30140 },
      { key: "detail-side", label: "詳情側欄", value: 12480 },
      { key: "footer", label: "頁尾", value: 4310 },
    ],
  },
};

/**
 * One category holding everything. The segment is drawn as a full circle: an
 * SVG arc between two identical points draws nothing, so the naive version of
 * this renders an empty ring and reads as missing data.
 */
export const SingleCategory: Story = {
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    data: [{ key: "passed", label: "通過", value: 40, tone: "success" }],
  },
};

/**
 * An explicit total larger than the slices: three placements of forty-seven
 * carry every impression so far. The ring stays a share of the real
 * denominator instead of implying the three are all there is.
 */
export const PartialOfKnownWhole: Story = {
  args: {
    title: "Impressions",
    centerLabel: "of 47 placements",
    total: 120000,
    measure: "count",
    data: [
      { key: "a", label: "首頁上方", value: 41000 },
      { key: "b", label: "列表插入", value: 22500 },
      { key: "c", label: "詳情側欄", value: 9100 },
    ],
  },
};

/**
 * ad-core's first day: every placement configured, nothing served yet. The ring
 * stays and the figure is a dash — never one placement taking 100% of nothing.
 * This is the state the block shows until a campaign runs, not an edge case.
 */
export const DayOneAllZero: Story = {
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    emptyLabel: "尚無曝光",
    data: [
      { key: "home-top", label: "首頁上方", value: 0 },
      { key: "list-inline", label: "列表插入", value: 0 },
      { key: "footer", label: "頁尾", value: 0 },
    ],
  },
};

/** A quiz nobody has attempted: the same state from the other consumer. */
export const Empty: Story = {
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    emptyLabel: "尚無資料",
    data: [
      { key: "passed", label: "通過", value: 0, tone: "success" },
      { key: "failed", label: "未通過", value: 0, tone: "error" },
    ],
  },
};

/**
 * A deleted creative keeps its totals — ad_daily_stats outlives the ad on
 * purpose — and arrives with no label. The legend shows its key rather than a
 * word the kit invented, because one page over the same blank means a placement
 * nobody has named yet.
 */
export const DeletedCreative: Story = {
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    data: [
      { key: "ad_0f21c8", label: "春季招生", value: 31200 },
      { key: "ad_7f3ab1", label: "", value: 12480 },
    ],
  },
};

/** Seven categories: the palette cycles rather than inventing a seventh token. */
export const PaletteCycles: Story = {
  args: {
    title: "Placements",
    data: Array.from({ length: 7 }, (_, index) => ({
      key: `p${index}`,
      label: `版位 ${index + 1}`,
      value: 70 - index * 8,
    })),
  },
};

/** Without the legend, for a narrow cell that carries its labels elsewhere. */
export const RingOnly: Story = {
  // Its own narrow frame, but still args-driven so the controls work here too.
  render: (args) => (
    <div className="w-full max-w-[200px] rounded-xl border border-outline-variant p-4 text-on-surface">
      <DonutChart {...args} />
    </div>
  ),
  args: {
    title: "Attempts",
    legend: false,
    centerLabel: "attempts",
    data: [
      { key: "passed", label: "通過", value: 184, tone: "success" },
      { key: "failed", label: "未通過", value: 63, tone: "error" },
    ],
  },
};
