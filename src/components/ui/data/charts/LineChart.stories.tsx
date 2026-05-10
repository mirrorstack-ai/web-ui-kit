import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "./LineChart";

function seed(n: number) {
  const x = Math.sin(n + 1) * 10000;
  return x - Math.floor(x);
}

const HOURLY_LABELS = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`,
);

const requestsData = HOURLY_LABELS.map((label, i) => ({
  label,
  value: Math.max(0, 420 + (seed(i) - 0.5) * 360),
}));

const responseData = HOURLY_LABELS.map((label, i) => ({
  label,
  value: Math.max(0, 86 + (seed(i) - 0.5) * 68),
  overlay: Math.max(0, 42 + (seed(i + 7) - 0.5) * 36),
}));

const coldStartData = HOURLY_LABELS.map((label, i) => ({
  label,
  value: Math.max(0, 210 + (seed(i + 3) - 0.5) * 160),
}));

const meta: Meta<typeof LineChart> = {
  title: "UI/Data/Charts/LineChart",
  component: LineChart,
  args: {
    data: requestsData,
    height: 160,
    unit: "",
    showArea: true,
    smooth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
        <p className="text-xs font-medium text-on-surface-variant mb-3">
          Requests / min
        </p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Basic: Story = {};

export const WithOverlay: Story = {
  args: {
    data: responseData,
    unit: "ms",
    overlayLabel: "p50",
    showArea: false,
    height: 140,
  },
};

export const WithThreshold: Story = {
  args: {
    data: coldStartData,
    unit: "ms",
    thresholdY: 300,
    height: 140,
    color: "var(--color-warning)",
  },
};

export const Themed: Story = {
  args: {
    data: requestsData,
    color: "var(--color-tertiary)",
    height: 140,
  },
};
