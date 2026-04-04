import type { Meta, StoryObj } from "@storybook/react";
import { SectionLabel } from "./SectionLabel";
import { Button } from "@/components/ui/actions/button/Button";

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

/** Settings page with labeled sections inside cards */
export const SettingsPage: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-lg">
      {/* Profile section */}
      <div className="rounded-xl bg-surface-container p-5">
        <SectionLabel {...args}>Profile</SectionLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Display name</p>
              <p className="text-xs text-on-surface-variant">Jane Doe</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Email</p>
              <p className="text-xs text-on-surface-variant">jane@example.com</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Security section */}
      <div className="rounded-xl bg-surface-container p-5">
        <SectionLabel {...args}>Security</SectionLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Password</p>
              <p className="text-xs text-on-surface-variant">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Two-factor auth</p>
              <p className="text-xs text-on-surface-variant">Enabled via authenticator app</p>
            </div>
            <Button variant="tonal" size="sm" color="primary">
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-error/30 bg-error/5 p-5">
        <SectionLabel {...args} className="text-error">
          Danger Zone
        </SectionLabel>
        <p className="mt-2 text-sm text-on-surface-variant">
          Permanently delete your account and all associated data.
        </p>
        <div className="mt-3">
          <Button variant="filled" size="sm" color="error">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  ),
};
