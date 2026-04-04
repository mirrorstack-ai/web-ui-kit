import type { Meta, StoryObj } from "@storybook/react";
import { SectionLabel } from "./SectionLabel";

const meta: Meta<typeof SectionLabel> = {
  title: "UI/Data/SectionLabel",
  component: SectionLabel,
  args: {
    children: "Section Title",
  },
  argTypes: {
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SectionLabel>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Multiple labels showing typical section headings */
export const SectionHeadings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel {...args}>Account Details</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Manage your personal information and preferences.
        </p>
      </div>
      <div>
        <SectionLabel {...args}>Security</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Password, two-factor authentication, and sessions.
        </p>
      </div>
      <div>
        <SectionLabel {...args}>Danger Zone</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Irreversible actions like account deletion.
        </p>
      </div>
    </div>
  ),
};
