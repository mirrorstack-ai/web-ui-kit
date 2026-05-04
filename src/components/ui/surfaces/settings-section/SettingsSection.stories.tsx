import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "@/components/ui/data/read-only-field/ReadOnlyField";
import { SectionLabel } from "@/components/ui/data/section-label/SectionLabel";
import { SettingRow } from "@/components/ui/data/setting-row/SettingRow";
import { Switch } from "@/components/ui/inputs/switch/Switch";
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

/**
 * Tone-coloured groups (Advanced=warning, Danger zone=error) do NOT use
 * SettingsSection. They render SectionLabel above a naked stack of
 * SettingRow rows (each row carries its own border) with no enclosing
 * Surface. Shown here for contrast with the boxed sections above.
 */
export const ToneColouredGroupsAreNotSettingsSection: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <SectionLabel className="mb-2 text-warning">Advanced</SectionLabel>
        <div className="space-y-2">
          <SettingRow
            tone="warning"
            title="Developer mode"
            description="Show the developer rail."
            className="px-6 py-4"
            control={
              <Switch
                checked
                onChange={() => {}}
                color="warning"
                aria-label="developer"
              />
            }
          />
        </div>
      </div>
      <div>
        <SectionLabel className="mb-2 text-error">Danger zone</SectionLabel>
        <div className="space-y-2">
          <SettingRow
            tone="error"
            title="Delete module"
            description="Permanently delete. Cannot be undone."
            className="px-6 py-4"
            control={
              <Button color="error" variant="filled" size="sm">
                Delete
              </Button>
            }
          />
        </div>
      </div>
    </div>
  ),
};
