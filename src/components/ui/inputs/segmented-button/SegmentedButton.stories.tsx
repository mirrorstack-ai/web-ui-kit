import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedButton } from "./SegmentedButton";

const sizeOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
] as const;

const meta: Meta<typeof SegmentedButton> = {
  title: "UI/Inputs/SegmentedButton",
  component: SegmentedButton,
  args: {
    options: sizeOptions,
    value: "md",
    "aria-label": "Select size",
    disabled: false,
  },
  argTypes: {
    value: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedButton>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Controlled example with live state */
export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? "md");

    return (
      <div className="flex flex-col gap-3">
        <SegmentedButton {...args} value={selected} onChange={setSelected} />
        <p className="text-sm text-on-surface-variant">
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

/** Two options */
export const TwoOptions: Story = {
  args: {
    options: [
      { value: "list", label: "List" },
      { value: "grid", label: "Grid" },
    ],
    value: "list",
    "aria-label": "Select view",
  },
};

/** Many options */
export const ManyOptions: Story = {
  args: {
    options: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "quarter", label: "Quarter" },
      { value: "year", label: "Year" },
    ],
    value: "month",
    "aria-label": "Select time range",
  },
};

/** Disabled state */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
