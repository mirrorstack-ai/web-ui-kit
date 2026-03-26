import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Feedback/Progress",
  component: Progress,
  args: {
    type: "linear",
    color: "primary",
    variant: "wave",
    size: "md",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["linear", "circular"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "error", "warning", "four-color", "current"],
    },
    variant: {
      control: "select",
      options: ["normal", "wave"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    progressive: { control: "boolean" },
    intermediate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/** Interactive playground */
export const Playground: Story = {};

/** Linear indeterminate — wave and normal */
export const LinearIndeterminate: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Wave (default)</p>
        <Progress {...args} type="linear" variant="wave" />
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Normal</p>
        <Progress {...args} type="linear" variant="normal" />
      </div>
    </div>
  ),
};

/** Linear determinate — wave and normal at 60% */
export const LinearDeterminate: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Wave 60%</p>
        <Progress {...args} type="linear" variant="wave" value={60} />
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Normal 60%</p>
        <Progress {...args} type="linear" variant="normal" value={60} />
      </div>
    </div>
  ),
};

/** Circular indeterminate — wave and normal */
export const CircularIndeterminate: Story = {
  render: (args) => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <Progress {...args} type="circular" variant="wave" />
        <p className="text-xs text-on-surface-variant mt-2">Wave</p>
      </div>
      <div className="text-center">
        <Progress {...args} type="circular" variant="normal" />
        <p className="text-xs text-on-surface-variant mt-2">Normal</p>
      </div>
    </div>
  ),
};

/** Circular determinate — wave and normal at 75% */
export const CircularDeterminate: Story = {
  render: (args) => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <Progress {...args} type="circular" variant="wave" value={75} />
        <p className="text-xs text-on-surface-variant mt-2">Wave 75%</p>
      </div>
      <div className="text-center">
        <Progress {...args} type="circular" variant="normal" value={75} />
        <p className="text-xs text-on-surface-variant mt-2">Normal 75%</p>
      </div>
    </div>
  ),
};

/** All sizes */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Linear</p>
        <div className="flex flex-col gap-4 max-w-md">
          <Progress {...args} type="linear" size="sm" />
          <Progress {...args} type="linear" size="md" />
          <Progress {...args} type="linear" size="lg" />
        </div>
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Circular</p>
        <div className="flex gap-6 items-center">
          <Progress {...args} type="circular" size="sm" />
          <Progress {...args} type="circular" size="md" />
          <Progress {...args} type="circular" size="lg" />
        </div>
      </div>
    </div>
  ),
};

/** All colors */
export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-md">
      <Progress {...args} type="linear" color="primary" />
      <Progress {...args} type="linear" color="secondary" />
      <Progress {...args} type="linear" color="tertiary" />
      <Progress {...args} type="linear" color="error" />
      <Progress {...args} type="linear" color="warning" />
      <Progress {...args} type="linear" color="four-color" />
    </div>
  ),
};

/** Four-color circular */
export const FourColor: Story = {
  render: (args) => (
    <div className="flex gap-8 items-center">
      <Progress {...args} type="circular" color="four-color" />
      <Progress {...args} type="linear" color="four-color" className="max-w-md flex-1" />
    </div>
  ),
};
