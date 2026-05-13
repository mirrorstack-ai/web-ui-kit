import type { Meta, StoryObj } from "@storybook/react";
import { SparklineLine } from "./SparklineLine";

const seed = (n: number) => {
  const x = Math.sin(n + 1) * 10_000;
  return x - Math.floor(x);
};
const series = (count: number, base: number, variance: number) =>
  Array.from({ length: count }, (_, i) => Math.max(0, base + (seed(i) - 0.5) * variance * 2));

const LABELLED = series(14, 60, 36).map((value, i) => ({ value: Math.round(value), label: `Wk ${i + 1} · ${Math.round(value)}` }));

const meta: Meta<typeof SparklineLine> = {
  title: "UI/Chart/SparklineLine",
  component: SparklineLine,
  args: { data: LABELLED, endDot: true },
};

export default meta;
type Story = StoryObj<typeof SparklineLine>;

/** Drop it into any sized box — values auto-scale to the height. Hover for a
 *  chip; the end-dot marks the latest value. */
export const Playground: Story = {
  render: (args) => (
    <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3">
        <SparklineLine {...args} />
      </div>
    </div>
  ),
};

/** `areaClassName="fill-primary/15"` paints a tinted area under the line. */
export const WithArea: Story = {
  render: () => (
    <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3">
        <SparklineLine data={LABELLED} areaClassName="fill-primary/15" />
      </div>
    </div>
  ),
};

/** The line + dot colour follow the wrapper's `text-…`, so a sparkline reads
 *  well on whatever surface it sits on. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="h-24 w-64 rounded-2xl bg-surface-container-low p-3">
        <SparklineLine data={LABELLED} />
      </div>
      <div className="h-24 w-64 rounded-2xl bg-primary-container p-3">
        <SparklineLine data={LABELLED} className="text-on-primary-container" areaClassName="fill-on-primary-container/15" />
      </div>
      <div className="h-40 w-80 rounded-2xl bg-surface-container p-4">
        <SparklineLine data={LABELLED} className="text-tertiary" areaClassName="fill-tertiary/15" />
      </div>
    </div>
  ),
};
