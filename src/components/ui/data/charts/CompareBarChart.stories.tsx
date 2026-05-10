import type { Meta, StoryObj } from "@storybook/react";
import { CompareBarChart } from "./CompareBarChart";

const profitable = [
  { label: "DB", cost: 1.2, charge: 2.4 },
  { label: "Lambda", cost: 0.8, charge: 1.6 },
  { label: "S3", cost: 0.4, charge: 0.7 },
  { label: "CDN", cost: 0.6, charge: 0.95 },
  { label: "Queue", cost: 0.3, charge: 0.55 },
];

const mixed = [
  { label: "DB", cost: 1.2, charge: 2.4 },
  { label: "Lambda", cost: 0.8, charge: 0.7 },
  { label: "S3", cost: 0.4, charge: 0.7 },
  { label: "CDN", cost: 0.6, charge: 0.5 },
  { label: "Queue", cost: 0.3, charge: 0.55 },
];

const meta: Meta<typeof CompareBarChart> = {
  title: "UI/Data/Charts/CompareBarChart",
  component: CompareBarChart,
  args: {
    data: profitable,
    height: 140,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
        <p className="text-xs font-medium text-on-surface-variant mb-3">
          Cost vs charge
        </p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompareBarChart>;

export const Basic: Story = {};

export const Mixed: Story = {
  args: { data: mixed },
};

export const Themed: Story = {
  args: {
    data: profitable,
    costColor: "var(--color-tertiary)",
    chargeColor: () => "var(--color-primary)",
  },
};
