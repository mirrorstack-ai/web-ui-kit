import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Inputs/Slider",
  component: Slider,
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

const Controlled = ({
  initial,
  min,
  max,
  step,
}: {
  initial: number;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-on-surface-variant text-right tabular-nums">
        {value}
      </div>
      <Slider
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        aria-label="Demo slider"
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <Controlled initial={40} />,
};

export const WithBounds: Story = {
  render: () => <Controlled initial={8} min={4} max={20} step={1} />,
};

export const FloatStep: Story = {
  render: () => <Controlled initial={1} min={0.5} max={3} step={0.1} />,
};

export const Disabled: Story = {
  render: () => (
    <Slider value={30} onChange={() => {}} disabled aria-label="Disabled" />
  ),
};
