import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "./LineChart";

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const seed = (n: number) => {
  const x = Math.sin(n + 1) * 10_000;
  return x - Math.floor(x);
};
const series = (n: number, base: number, variance: number, spikes: number[] = []) =>
  Array.from({ length: n }, (_, i) => Math.max(0, base + (seed(i) - 0.5) * variance * 2 + (spikes.includes(i) ? base * 0.6 : 0)));

const meta: Meta<typeof LineChart> = {
  title: "UI/Chart/LineChart",
  component: LineChart,
  args: { values: series(24, 420, 180, [3, 14]), labels: HOURS, height: 150, showArea: true, labelEvery: 4 },
  argTypes: {
    height: { control: { type: "range", min: 80, max: 280, step: 10 } },
    labelEvery: { control: { type: "range", min: 1, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background p-6">
    <div className="max-w-xl rounded-2xl border border-outline-variant p-4">{children}</div>
  </div>
);

/** Hover the chart for the crosshair + tooltip; resize the canvas — it re-fits. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <LineChart {...args} />
    </Frame>
  ),
};

/** A dashed `overlay` line drawn behind the main one — e.g. p95 over p50. */
export const WithOverlay: Story = {
  render: () => (
    <Frame>
      <LineChart
        values={series(24, 86, 34, [3, 14])}
        labels={HOURS}
        unit="ms"
        height={150}
        overlay={{ values: series(24, 42, 18), color: "var(--color-secondary)", label: "p50" }}
      />
    </Frame>
  ),
};

/** A dashed `thresholdY` line plus a tinted band above it (uses the error tone). */
export const WithThreshold: Story = {
  render: () => (
    <Frame>
      <LineChart values={series(24, 0.4, 0.3, [14])} labels={HOURS} unit="%" thresholdY={1} height={130} />
    </Frame>
  ),
};
