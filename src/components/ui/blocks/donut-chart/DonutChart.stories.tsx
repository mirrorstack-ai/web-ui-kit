import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "UI/Blocks/DonutChart",
  component: DonutChart,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const wrap = (children: React.ReactNode) => (
  <div className="w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface">{children}</div>
);

/**
 * quiz-core 統計, the shape it actually holds: attempts split into passed,
 * failed and still open. The ring answers "how did this quiz go", which the
 * pass-rate Gauge could only answer for one number at a time.
 */
export const QuizOutcomes: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Attempts"
        centerLabel="attempts"
        data={[
          { key: "passed", label: "通過", value: 184, tone: "success" },
          { key: "failed", label: "未通過", value: 63, tone: "error" },
          { key: "open", label: "未提交", value: 22, tone: "warning" },
        ]}
      />,
    ),
};

/**
 * ad-core's analytics block: impressions by placement. The tones are left unset
 * because one placement is not better than another — the palette orders them,
 * nothing more.
 */
export const ImpressionShare: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Impressions"
        centerLabel="impressions"
        formatValue={(value) => value.toLocaleString("en-US")}
        data={[
          { key: "home-top", label: "首頁上方", value: 48210 },
          { key: "list-inline", label: "列表插入", value: 30140 },
          { key: "detail-side", label: "詳情側欄", value: 12480 },
          { key: "footer", label: "頁尾", value: 4310 },
        ]}
      />,
    ),
};

/**
 * One category holding everything. The segment is drawn as a full circle: an
 * SVG arc between two identical points draws nothing, so the naive version of
 * this renders an empty ring and reads as missing data.
 */
export const SingleCategory: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Attempts"
        centerLabel="attempts"
        data={[{ key: "passed", label: "通過", value: 40, tone: "success" }]}
      />,
    ),
};

/**
 * An explicit total larger than the slices: three placements of forty-seven
 * carry every impression so far. The ring stays a share of the real
 * denominator instead of implying the three are all there is.
 */
export const PartialOfKnownWhole: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Impressions"
        centerLabel="of 47 placements"
        total={120000}
        formatValue={(value) => value.toLocaleString("en-US")}
        data={[
          { key: "a", label: "首頁上方", value: 41000 },
          { key: "b", label: "列表插入", value: 22500 },
          { key: "c", label: "詳情側欄", value: 9100 },
        ]}
      />,
    ),
};

/** A quiz nobody has attempted: the ring stays, the figure is a dash. */
export const Empty: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Attempts"
        centerLabel="attempts"
        emptyLabel="尚無資料"
        data={[
          { key: "passed", label: "通過", value: 0, tone: "success" },
          { key: "failed", label: "未通過", value: 0, tone: "error" },
        ]}
      />,
    ),
};

/** Seven categories: the palette cycles rather than inventing a seventh token. */
export const PaletteCycles: Story = {
  render: () =>
    wrap(
      <DonutChart
        title="Placements"
        data={Array.from({ length: 7 }, (_, index) => ({
          key: `p${index}`,
          label: `版位 ${index + 1}`,
          value: 70 - index * 8,
        }))}
      />,
    ),
};

/** Without the legend, for a narrow cell that carries its labels elsewhere. */
export const RingOnly: Story = {
  render: () => (
    <div className="w-full max-w-[200px] rounded-xl border border-outline-variant p-4 text-on-surface">
      <DonutChart
        title="Attempts"
        legend={false}
        centerLabel="attempts"
        data={[
          { key: "passed", label: "通過", value: 184, tone: "success" },
          { key: "failed", label: "未通過", value: 63, tone: "error" },
        ]}
      />
    </div>
  ),
};
