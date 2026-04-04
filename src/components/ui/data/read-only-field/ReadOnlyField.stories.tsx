import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "./ReadOnlyField";

const meta: Meta<typeof ReadOnlyField> = {
  title: "UI/Data/ReadOnlyField",
  component: ReadOnlyField,
  args: {
    label: "API Key",
    value: "sk-proj-abc123def456ghi789",
    mono: true,
    copyable: true,
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

/** Account details card with multiple fields */
export const AccountDetails: Story = {
  render: (args) => (
    <div className="max-w-md rounded-xl bg-surface-container p-5">
      <p className="mb-4 text-sm font-semibold text-on-surface">
        Account Details
      </p>
      <div className="flex flex-col gap-4">
        <ReadOnlyField {...args} label="Name" value="Jane Doe" mono={false} copyable={false} />
        <ReadOnlyField {...args} label="Email" value="jane@example.com" mono={false} copyable />
        <ReadOnlyField
          {...args}
          label="User ID"
          value="usr_2f8a9c1b3d4e5f6a"
          mono
          copyable
        />
        <ReadOnlyField
          {...args}
          label="API Key"
          value="sk-proj-abc123def456ghi789jkl012mno345"
          mono
          copyable
        />
        <ReadOnlyField
          {...args}
          label="Status"
          value="Active"
          mono={false}
          copyable={false}
          suffix={
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              Verified
            </span>
          }
        />
      </div>
    </div>
  ),
};

/** Long values truncated inside a narrow container */
export const Truncated: Story = {
  render: (args) => (
    <div className="max-w-xs rounded-xl bg-surface-container p-5">
      <p className="mb-4 text-sm font-semibold text-on-surface">
        Webhook Config
      </p>
      <div className="flex flex-col gap-4">
        <ReadOnlyField
          {...args}
          label="Endpoint URL"
          value="https://api.example.com/webhooks/v2/ingest/events/abc123def456"
          mono
          copyable
        />
        <ReadOnlyField
          {...args}
          label="Secret"
          value="whsec_MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ"
          mono
          copyable
        />
      </div>
    </div>
  ),
};
