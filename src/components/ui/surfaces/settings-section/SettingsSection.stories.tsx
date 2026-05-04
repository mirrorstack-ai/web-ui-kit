import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "@/components/ui/data/read-only-field/ReadOnlyField";
import { SettingRow } from "@/components/ui/data/setting-row/SettingRow";
import { Button } from "@/components/ui/actions/button/Button";
import { SettingsSection } from "./SettingsSection";

const meta: Meta<typeof SettingsSection> = {
  title: "UI/Surfaces/SettingsSection",
  component: SettingsSection,
  args: {
    title: "Info",
  },
};

export default meta;
type Story = StoryObj<typeof SettingsSection>;

export const Playground: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
    ),
  },
};

export const Tones: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <SettingsSection title="Info">
        <ReadOnlyField label="Module ID" value="m_abc" mono />
      </SettingsSection>
      <SettingsSection title="Advanced" tone="warning">
        <ReadOnlyField label="Beta program" value="Enabled" />
      </SettingsSection>
      <SettingsSection title="Danger zone" tone="error">
        <SettingRow
          tone="error"
          title="Delete module"
          description="Permanently delete. Cannot be undone."
          control={
            <Button color="error" variant="filled" size="sm">
              Delete
            </Button>
          }
        />
      </SettingsSection>
    </div>
  ),
};

export const SurfaceClassNameOverride: Story = {
  args: {
    title: "Danger zone",
    tone: "error",
    surfaceClassName: "px-6 py-4",
    children: (
      <SettingRow
        tone="error"
        title="Delete account"
        description="Sign out and put your account in a suspended state."
        control={
          <Button color="error" variant="filled" size="sm">
            Disable
          </Button>
        }
      />
    ),
  },
};
