import type { Meta, StoryObj } from "@storybook/react";
import { TrendChart } from "./TrendChart";

const LABELS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

function series(base: number, wobble: number, seed = 1) {
  return LABELS.map((_, i) => Math.max(0, base + Math.sin((i + seed) / 2.3) * wobble + ((i * seed) % 5)));
}

const REQUESTS = series(220, 90, 1);
const P95 = series(140, 40, 2);
const P50 = series(80, 20, 3);
const COLD_START = series(180, 120, 4);
const RATE_4XX = series(3, 2, 5);
const RATE_5XX = series(0.8, 0.6, 6);

const meta: Meta<typeof TrendChart> = {
  title: "UI/Blocks/TrendChart",
  component: TrendChart,
  args: {
    values: REQUESTS,
    labels: LABELS,
    color: "text-primary",
    fillId: "trend-chart-story-fill",
  },
  argTypes: {
    values: { control: "object" },
    labels: { control: "object" },
    height: { control: { type: "number", min: 80, max: 320, step: 10 } },
    unit: { control: "text" },
    showArea: { control: "boolean" },
    showXAxisLabels: { control: "boolean" },
    labelEvery: { control: { type: "number", min: 1, max: 12, step: 1 } },
    thresholdY: { control: { type: "number", min: 0, max: 400, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof TrendChart>;

/** The base chart — a smooth line with an area fill and x-axis labels. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-[520px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
  ),
};

/** A single dashed overlay sharing the main series' auto-scaled axis (e.g.
 *  p50 read alongside p95, both in ms). */
export const WithOverlay: Story = {
  args: {
    values: P95,
    color: "text-primary",
    unit: "ms",
    showArea: false,
    fillId: "trend-chart-story-p95",
    overlays: [{ values: P50, color: "text-secondary", label: "p50" }],
  },
  render: (args) => (
    <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
  ),
};

/** Multiple overlays, each pinned to its own `fixedMax` — 4xx/5xx rates (%)
 *  overlaid on a request-count chart. Auto-scaling a stable ~1-3% rate to
 *  fill the whole height would exaggerate it into a dramatic-looking wave. */
export const WithFixedMaxOverlays: Story = {
  args: {
    values: REQUESTS,
    color: "text-primary",
    fillId: "trend-chart-story-requests",
    overlays: [
      { values: RATE_4XX, color: "text-warning", label: "4xx", fixedMax: 10, unit: "%" },
      { values: RATE_5XX, color: "text-error", label: "5xx", fixedMax: 10, unit: "%" },
    ],
  },
  render: (args) => (
    <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
  ),
};

/** A dashed threshold line with red-tinted shading above it — the shading
 *  only renders when `showArea` is also true; the line itself always renders. */
export const WithThreshold: Story = {
  args: {
    values: COLD_START,
    color: "text-warning",
    unit: "ms",
    thresholdY: 300,
    fillId: "trend-chart-story-cold-start",
  },
  render: (args) => (
    <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-warning">
      <TrendChart {...args} />
    </div>
  ),
};

/** Compact tile look: no x-axis labels, tighter bottom margin. Used by
 *  dashboard tiles where axis labels would add noise without information. */
export const NoAxisLabels: Story = {
  args: {
    values: REQUESTS,
    color: "text-primary",
    height: 100,
    showXAxisLabels: false,
    fillId: "trend-chart-story-compact",
  },
  render: (args) => (
    <div className="w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
  ),
};

/** Fewer than 2 points (e.g. data still loading) renders an empty chart
 *  frame instead of throwing. */
export const EmptyData: Story = {
  args: {
    values: [],
    labels: [],
    color: "text-primary",
    fillId: "trend-chart-story-empty",
  },
  render: (args) => (
    <div className="w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
  ),
};
