import type { Meta, StoryObj } from "@storybook/react";
import { Gauge } from "./Gauge";

const meta: Meta<typeof Gauge> = {
  title: "UI/Notch/Blocks/Gauge",
  component: Gauge,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Gauge>;

const wrap = (children: React.ReactNode) => (
  <div className="h-[200px] w-[200px] rounded-xl border border-outline-variant p-2 text-on-surface">
    {children}
  </div>
);

/** High uptime with custom format string. */
export const Uptime: Story = {
  render: () =>
    wrap(
      <Gauge
        value={99.94}
        label="Uptime"
        format="99.94%"
        thresholds={{ warn: 99, error: 95 }}
      />,
    ),
};

/** Docs coverage sitting below the warn threshold. */
export const DocsScore: Story = {
  render: () =>
    wrap(
      <Gauge
        value={72}
        label="Docs coverage"
        thresholds={{ warn: 80, error: 50 }}
      />,
    ),
};

/** Error budget in the warning zone. */
export const ErrorBudget: Story = {
  render: () =>
    wrap(
      <Gauge
        value={34}
        label="Error budget"
        format="34%"
        thresholds={{ warn: 50, error: 20 }}
      />,
    ),
};

/** Full health, no thresholds needed. */
export const Full: Story = {
  render: () => wrap(<Gauge value={100} label="Health" />),
};

/** Critical SLA below the error threshold. */
export const Critical: Story = {
  render: () =>
    wrap(
      <Gauge
        value={12}
        label="SLA"
        thresholds={{ warn: 50, error: 25 }}
      />,
    ),
};
