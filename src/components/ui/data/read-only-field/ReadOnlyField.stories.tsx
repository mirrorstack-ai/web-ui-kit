import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "./ReadOnlyField";

const meta: Meta<typeof ReadOnlyField> = {
  title: "UI/Data/ReadOnlyField",
  component: ReadOnlyField,
  args: {
    label: "API Key",
    value: "sk-proj-abc123def456ghi789",
    mono: false,
    copyable: false,
  },
  argTypes: {
    mono: { control: "boolean" },
    copyable: { control: "boolean" },
    label: { control: "text" },
    value: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ReadOnlyField>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Monospace value with copy button */
export const MonoCopyable: Story = {
  args: {
    label: "API Key",
    value: "sk-proj-abc123def456ghi789jkl012mno345",
    mono: true,
    copyable: true,
  },
};

/** Multiple fields stacked */
export const FieldGroup: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-sm">
      <ReadOnlyField
        {...args}
        label="Name"
        value="Jane Doe"
      />
      <ReadOnlyField
        {...args}
        label="Email"
        value="jane@example.com"
        copyable
      />
      <ReadOnlyField
        {...args}
        label="User ID"
        value="usr_2f8a9c1b3d4e5f6a"
        mono
        copyable
      />
    </div>
  ),
};

/** With suffix slot */
export const WithSuffix: Story = {
  args: {
    label: "Status",
    value: "Active",
    suffix: (
      <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
        Verified
      </span>
    ),
  },
};

/** Long value truncated */
export const Truncated: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <ReadOnlyField
        {...args}
        label="Webhook URL"
        value="https://api.example.com/webhooks/v2/ingest/events/abc123def456ghi789"
        mono
        copyable
      />
    </div>
  ),
};
