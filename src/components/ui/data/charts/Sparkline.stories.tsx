import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const climbing = [10, 12, 11, 14, 17, 16, 18, 21, 22, 25];
const dipping = [22, 21, 19, 20, 16, 14, 15, 13, 11, 10];

const meta: Meta<typeof Sparkline> = {
  title: "UI/Data/Charts/Sparkline",
  component: Sparkline,
  args: {
    values: climbing,
    width: 80,
    height: 32,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3">
        <span className="text-sm font-medium text-on-surface">Requests</span>
        <Story />
        <span className="text-xs text-on-surface-variant ml-auto tabular-nums">
          25 / min
        </span>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Basic: Story = {};

export const Trending: Story = {
  args: { values: dipping, color: "var(--color-error)" },
};

export const Themed: Story = {
  args: {
    values: climbing,
    color: "var(--color-tertiary)",
    width: 120,
    height: 36,
  },
};
