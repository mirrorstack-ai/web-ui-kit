import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "UI/Chart/Sparkline",
  component: Sparkline,
  args: { data: [38, 62, 50, 78, 55, 70, 90, 60, 75, 95, 85, 100] },
  argTypes: { data: { control: "object" } },
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
