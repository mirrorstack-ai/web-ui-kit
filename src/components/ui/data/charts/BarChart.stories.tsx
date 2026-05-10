import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const trend = months.map((label, i) => ({
  label,
  value: 420 + Math.round(Math.sin(i / 2) * 80) + i * 6,
}));

const meta: Meta<typeof BarChart> = {
  title: "UI/Data/Charts/BarChart",
  component: BarChart,
  args: {
    data: trend,
    height: 120,
    highlightLast: false,
    unitPrefix: "$",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
        <p className="text-xs font-medium text-on-surface-variant mb-3">
          Monthly revenue
        </p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Basic: Story = {};

export const HighlightLast: Story = {
  args: { highlightLast: true },
};

export const Themed: Story = {
  args: {
    color: "var(--color-success)",
    highlightLast: true,
  },
};
