import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const TRAFFIC = [
  { label: "Direct", value: 3800 },
  { label: "Search", value: 3000 },
  { label: "Social", value: 2300 },
  { label: "Referral", value: 1700 },
  { label: "Email", value: 1300 },
];
const total = TRAFFIC.reduce((s, d) => s + d.value, 0);

const meta: Meta<typeof DonutChart> = {
  title: "UI/Chart/DonutChart",
  component: DonutChart,
  args: { data: TRAFFIC, size: 200, legend: true },
  argTypes: { size: { control: { type: "range", min: 120, max: 320, step: 10 } } },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background p-6">
    <div className="inline-block rounded-2xl border border-outline-variant p-5">{children}</div>
  </div>
);

/** A ring with a centre total + a legend; hover a segment (or its legend row)
 *  for a chip. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <DonutChart {...args} centerLabel={total.toLocaleString()} centerSub="sessions" />
    </Frame>
  ),
};

/** `legend={false}` drops the list — just the ring (and centre text). */
export const Standalone: Story = {
  render: () => (
    <Frame>
      <DonutChart data={TRAFFIC} size={160} legend={false} centerLabel={`${(total / 1000).toFixed(1)}k`} centerSub="sessions" />
    </Frame>
  ),
};

/** Per-datum `color` + a `formatValue` (here, currency). */
export const CustomColours: Story = {
  render: () => (
    <Frame>
      <DonutChart
        size={200}
        centerLabel="$9.7k"
        centerSub="MRR"
        formatValue={(v) => `$${(v / 1000).toFixed(1)}k`}
        data={[
          { label: "Pro", value: 4500, color: "var(--color-primary)" },
          { label: "Team", value: 2900, color: "var(--color-tertiary)" },
          { label: "Free → paid", value: 1300, color: "var(--color-success)" },
          { label: "Add-ons", value: 1000, color: "var(--color-warning)" },
        ]}
      />
    </Frame>
  ),
};
