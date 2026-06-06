import type { Meta, StoryObj } from "@storybook/react";
import { MetricBlock } from "./MetricBlock";

const meta: Meta<typeof MetricBlock> = {
  title: "UI/Blocks/Metric",
  component: MetricBlock,
  args: {
    icon: "apps",
    label: "Installs",
    value: "1,240",
    delta: "+18%",
    tone: "surface",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["surface", "primary"] },
    deltaTrend: { control: "inline-radio", options: [undefined, "up", "down"] },
    icon: { control: "text" },
    delta: { control: "text" },
    hint: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof MetricBlock>;

/** Standalone, in a 96px (`size-24`) box — the natural 1×1 footprint. */
export const Playground: Story = {
  render: (args) => (
    <div className="bg-background p-6">
      <div className="size-24 rounded-2xl bg-surface-container-low p-4">
        <MetricBlock {...args} />
      </div>
    </div>
  ),
};

// Build a sparkline from real values: bar heights are scaled to the max, and
// each point carries a label so hovering shows the actual figure.
const spark = (values: number[], label: (v: number, week: number) => string) => {
  const max = Math.max(...values);
  return values.map((v, i) => ({ value: Math.round((v / max) * 100), label: label(v, i + 1) }));
};
const INSTALLS = spark(
  [470, 760, 600, 950, 680, 870, 1100, 740, 920, 1180, 1050, 1240],
  (v, w) => `Wk ${w} · ${v.toLocaleString()} installs`,
);
const REVENUE = spark(
  [3.8, 5.1, 4.4, 6.8, 5.2, 7.0, 9.2, 6.1, 7.8, 9.9, 8.7, 12.4],
  (v, w) => `Wk ${w} · $${v}k`,
);
const REQ_MIN = spark(
  [1.2, 1.6, 1.4, 1.9, 1.7, 2.0, 1.8, 2.3, 2.0, 2.5, 2.2, 2.1],
  (v, w) => `Wk ${w} · ${v}k req/min`,
);

// A 96px-cell grid that mirrors the NotchGrid sizing the component targets.
// (Replaced with plain CSS Grid here so the demo doesn't depend on NotchGrid.)
const Cell = ({
  cols = 1,
  rows = 1,
  pad = 4,
  tone = "surface",
  children,
}: {
  cols?: number;
  rows?: number;
  pad?: 4 | 6;
  tone?: "surface" | "primary";
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-2xl ${tone === "primary" ? "bg-primary-container" : "bg-surface-container-low"} ${pad === 6 ? "p-6" : "p-4"}`}
    style={{ gridColumn: `span ${cols}`, gridRow: `span ${rows}` }}
  >
    {children}
  </div>
);

/** Every footprint side by side: 1×1 tiles, a 1×2 (`chart` fills the extra
 *  height), a 2×1 (`layout="wide"`, no room for a chart), a 3×1 (`wide` +
 *  sparkline on the right), a 2×2 (`layout="card"`), and a 3×2 (`bigcard` —
 *  header, big value beside the sparkline, sub-stats row). */
export const Sizes: Story = {
  render: () => (
    <div className="bg-background p-6">
      <div className="grid auto-rows-[96px] grid-cols-[repeat(6,96px)] gap-2">
        {/* 3×2 — bigcard: header · big number · chart · sub-stats */}
        <Cell cols={3} rows={2} pad={6} tone="primary">
          <MetricBlock
            layout="bigcard"
            icon="apps"
            label="Installs"
            value="1,240"
            delta="+18%"
            chart={INSTALLS}
            stats={[
              { label: "This week", value: "1,240", delta: "+18%" },
              { label: "MTD", value: "4,180", delta: "+11%" },
              { label: "Conversion", value: "3.2%", delta: "-0.4%" },
            ]}
            tone="primary"
          />
        </Cell>
        {/* 2×2 — card: header + big value + chart filling the rest */}
        <Cell cols={2} rows={2} pad={6}>
          <MetricBlock layout="card" icon="payments" label="Revenue" value="$12.4k" delta="+22%" hint="vs $10.2k / 30d ago" chart={REVENUE} />
        </Cell>
        {/* 3×1 — wide with the sparkline on the right */}
        <Cell cols={3}>
          <MetricBlock layout="wide" icon="speed" label="Throughput" value="2.1k/s" delta="+9%" chart={REQ_MIN} />
        </Cell>
        {/* 1×1 */}
        <Cell>
          <MetricBlock icon="error" label="Churn" value="3" delta="-12%" />
        </Cell>
        {/* 2×1 — wide, no chart: delta sits next to the label */}
        <Cell cols={2}>
          <MetricBlock layout="wide" icon="schedule" label="Avg latency" value="142ms" delta="-8%" hint="p99 312ms" />
        </Cell>
        {/* 1×2 — sparkline fills the second row */}
        <Cell rows={2}>
          <MetricBlock icon="trending_up" label="Req / min" value="2.1k" delta="+9%" chart={REQ_MIN} />
        </Cell>
        <Cell>
          <MetricBlock icon="groups" label="Tenants" value="37" delta="+2" />
        </Cell>
        <Cell>
          <MetricBlock icon="bolt" label="Cold starts" value="3" delta="-1" />
        </Cell>
        <Cell>
          <MetricBlock icon="new_releases" label="Version" value="v0.3.1" />
        </Cell>
      </div>
    </div>
  ),
};

/** `layout="chart"` for 3×3 and larger — chart-led: header (label · trend), a
 *  full-width sparkline filling the middle, and a stats row underneath. No big
 *  value — the chart and stats carry it. Hover a bar for its labelled value. */
export const BigCard: Story = {
  render: () => (
    <div className="bg-background p-6">
      <div className="grid auto-rows-[96px] grid-cols-[repeat(7,96px)] gap-2">
        {/* 3×3 */}
        <Cell cols={3} rows={3} pad={6}>
          <MetricBlock
            layout="chart"
            icon="payments"
            label="Revenue"
            delta="+22%"
            chart={REVENUE}
            stats={[
              { label: "This week", value: "$12.4k", delta: "+22%" },
              { label: "MTD", value: "$41.8k", delta: "+9%" },
              { label: "ARPU", value: "$8.40", delta: "+3%" },
            ]}
          />
        </Cell>
        {/* 4×3 */}
        <Cell cols={4} rows={3} pad={6} tone="primary">
          <MetricBlock
            layout="chart"
            icon="apps"
            label="Installs"
            delta="+18%"
            chart={INSTALLS}
            stats={[
              { label: "This week", value: "1,240", delta: "+18%" },
              { label: "Month-to-date", value: "4,180", delta: "+11%" },
              { label: "Conversion", value: "3.2%", delta: "-0.4%" },
              { label: "Per tenant", value: "33.5", delta: "+2%" },
            ]}
            tone="primary"
          />
        </Cell>
      </div>
    </div>
  ),
};
