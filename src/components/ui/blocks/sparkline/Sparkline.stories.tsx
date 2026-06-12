import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "UI/Blocks/Sparkline",
  component: Sparkline,
  args: { data: [38, 62, 50, 78, 55, 70, 90, 60, 75, 95, 85, 100] },
  argTypes: {
    data: { control: "object" },
    variant: { control: "inline-radio", options: ["bar", "line", "area"] },
    strokeWidth: { control: { type: "number", min: 0.5, max: 8, step: 0.5 } },
    opacity: { control: { type: "number", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

const LABELLED = [470, 760, 600, 950, 680, 870, 1100, 740, 920, 1180, 1050, 1240].map(
  (n, i) => ({ value: Math.round((n / 1240) * 100), label: `Wk ${i + 1} · ${n.toLocaleString()}` }),
);

/** A `Sparkline` fills its container — drop it in any sized box. Hover a bar. */
export const Playground: Story = {
  render: (args) => (
    <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
  ),
};

/** Bar / hover colours are passed via `barClassName` / `barActiveClassName`, so
 *  a sparkline reads well on whatever surface it sits on. (Give it a height —
 *  it fills its container; here via `className="h-full"`.) */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="h-24 w-64 rounded-2xl bg-surface-container-low p-3">
        <Sparkline data={LABELLED} className="h-full" />
      </div>
      <div className="h-24 w-64 rounded-2xl bg-primary-container p-3">
        <Sparkline
          data={LABELLED}
          className="h-full"
          barClassName="bg-on-primary-container/25"
          barActiveClassName="bg-on-primary-container/55"
        />
      </div>
      <div className="h-40 w-80 rounded-2xl bg-surface-container p-4">
        <Sparkline data={LABELLED} className="h-full" barClassName="bg-primary/40" barActiveClassName="bg-primary/70" />
      </div>
    </div>
  ),
};

/** Smooth line — no hover chips, just a stroke that follows the data. */
export const Line: Story = {
  args: { variant: "line" },
  render: (args) => (
    <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
  ),
};

/** Filled area beneath the line for at-a-glance trend weight. */
export const Area: Story = {
  args: { variant: "area" },
  render: (args) => (
    <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
  ),
};

/** `strokeWidth` (px, non-scaling) and `opacity` (0–1) tune the line stroke.
 *  Defaults match the previous hardcoded look (`1.5` / `0.6` line, `0.5` area);
 *  the area fill keeps its fixed `0.15` opacity regardless. */
export const StrokeAndOpacity: Story = {
  args: { variant: "line", strokeWidth: 3, opacity: 1 },
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Defaults</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="line" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">strokeWidth=3, opacity=1</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline {...args} data={LABELLED} className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Area · strokeWidth=2.5, opacity=0.9</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="area" strokeWidth={2.5} opacity={0.9} className="h-full" />
        </div>
      </div>
    </div>
  ),
};

/** All three variants side-by-side for comparison. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Bar</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3">
          <Sparkline data={LABELLED} variant="bar" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Line</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="line" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Area</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="area" className="h-full" />
        </div>
      </div>
    </div>
  ),
};
