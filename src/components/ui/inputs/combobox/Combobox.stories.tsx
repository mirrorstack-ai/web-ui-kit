import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "UI/Inputs/Combobox",
  component: Combobox,
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    freeform: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan"];

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm">
        <Combobox
          {...args}
          label="Country"
          value={value}
          onChange={setValue}
          options={countries}
        />
      </div>
    );
  },
};

export const WithObjects: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm">
        <Combobox
          label="Language"
          value={value}
          onChange={setValue}
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
            { value: "ja", label: "Japanese" },
          ]}
        />
      </div>
    );
  },
};

export const Freeform: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm">
        <Combobox
          label="Tag"
          value={value}
          onChange={setValue}
          options={["bug", "feature", "docs", "refactor"]}
          freeform
          helperText="Type a new tag or select an existing one"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm">
        <Combobox
          label="Region"
          value={value}
          onChange={setValue}
          options={["us-east-1", "us-west-2", "eu-west-1"]}
          error
          helperText="Region is required"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <Combobox
        label="Region"
        value="us-east-1"
        onChange={() => {}}
        options={["us-east-1", "us-west-2"]}
        disabled
      />
    </div>
  ),
};
