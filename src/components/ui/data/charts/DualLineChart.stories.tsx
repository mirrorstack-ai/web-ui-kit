import type { Meta, StoryObj } from "@storybook/react";
import { DualLineChart } from "./DualLineChart";

const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

const trend = days.map((label, i) => ({
  label,
  a: 320 + Math.round(Math.sin(i / 3) * 60) + i * 2,
  b: 460 + Math.round(Math.cos(i / 4) * 80) + i * 3,
}));

const meta: Meta<typeof DualLineChart> = {
  title: "UI/Data/Charts/DualLineChart",
  component: DualLineChart,
  args: {
    data: trend,
    height: 160,
    fillUnderB: true,
    labelA: "Cost",
    labelB: "Income",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
        <p className="text-xs font-medium text-on-surface-variant mb-3">
          Cost vs income
        </p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DualLineChart>;

export const Basic: Story = {};

export const NoFill: Story = {
  args: { fillUnderB: false },
};

export const Themed: Story = {
  args: {
    colorA: "var(--color-warning)",
    colorB: "var(--color-primary)",
  },
};
