import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const seed = (n: number) => {
  const x = Math.sin(n + 1) * 10_000;
  return x - Math.floor(x);
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DATA = months.map((label, i) => ({ label, value: Math.round(80 + seed(i) * 320 + i * 18) }));

const meta: Meta<typeof BarChart> = {
  title: "UI/Chart/BarChart",
  component: BarChart,
  args: { data: DATA, height: 150 },
  argTypes: {
    height: { control: { type: "range", min: 80, max: 280, step: 10 } },
    highlightIndex: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background p-6">
    <div className="max-w-lg rounded-2xl border border-outline-variant p-4">{children}</div>
  </div>
);

/** The last bar is highlighted by default; hover a bar for its label + value chip. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <BarChart {...args} />
    </Frame>
  ),
};

/** `unitPrefix` / `precision` for the Y axis (e.g. dollars), and a chosen
 *  `highlightIndex`. */
export const Money: Story = {
  render: () => (
    <Frame>
      <BarChart
        data={months.map((label, i) => ({ label, value: Math.round((2 + seed(i) * 8 + i) * 100) / 100 }))}
        unitPrefix="$"
        precision={2}
        highlightIndex={9}
        height={150}
      />
    </Frame>
  ),
};
