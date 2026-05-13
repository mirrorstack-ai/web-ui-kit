import type { Meta, StoryObj } from "@storybook/react";
import { NightingaleChart } from "./NightingaleChart";

const WEEKDAYS = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 410 },
  { label: "Wed", value: 480 },
  { label: "Thu", value: 390 },
  { label: "Fri", value: 520 },
  { label: "Sat", value: 180 },
  { label: "Sun", value: 140 },
];

const meta: Meta<typeof NightingaleChart> = {
  title: "UI/Chart/NightingaleChart",
  component: NightingaleChart,
  args: { data: WEEKDAYS, size: 220, scale: "area", legend: true },
  argTypes: {
    size: { control: { type: "range", min: 140, max: 320, step: 10 } },
    scale: { control: { type: "inline-radio" }, options: ["area", "radius"] },
  },
};

export default meta;
type Story = StoryObj<typeof NightingaleChart>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background p-6">
    <div className="inline-block rounded-2xl border border-outline-variant p-5">{children}</div>
  </div>
);

/** Equal-angle sectors, radius ∝ √value (so area tracks the value). Hover a
 *  sector for a chip. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <NightingaleChart {...args} />
    </Frame>
  ),
};

/** `scale="radius"` makes the radius linear in the value — differences read
 *  bigger. */
export const RadiusScale: Story = {
  render: () => (
    <Frame>
      <NightingaleChart data={WEEKDAYS} size={220} scale="radius" />
    </Frame>
  ),
};

/** `legend={false}` with custom per-datum colours. */
export const Bare: Story = {
  render: () => (
    <Frame>
      <NightingaleChart
        size={200}
        legend={false}
        data={[
          { label: "Compute", value: 62, color: "var(--color-primary)" },
          { label: "Storage", value: 28, color: "var(--color-tertiary)" },
          { label: "Egress", value: 41, color: "var(--color-secondary)" },
          { label: "DB", value: 19, color: "var(--color-success)" },
          { label: "Other", value: 8, color: "var(--color-warning)" },
        ]}
      />
    </Frame>
  ),
};
