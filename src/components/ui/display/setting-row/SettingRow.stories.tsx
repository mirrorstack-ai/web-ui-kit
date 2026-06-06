import type { Meta, StoryObj } from "@storybook/react";
import { SettingRow } from "./SettingRow";
import { Switch } from "@/components/ui/inputs/switch/Switch";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof SettingRow> = {
  title: "UI/Data/SettingRow",
  component: SettingRow,
  args: {
    title: "Developer mode",
    description:
      "Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",
    control: <Switch checked={false} onChange={() => {}} aria-label="Developer mode" />,
  },
  argTypes: {
    tone: {
      control: "select",
      options: [undefined, "primary", "secondary", "tertiary", "error", "warning", "success", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SettingRow>;

export const Playground: Story = {};

export const Warning: Story = {
  args: { tone: "warning" },
};

export const Error: Story = {
  args: {
    title: "Disable account",
    description:
      "Sign out and put your account in a suspended state. Use the email link to restore later.",
    tone: "error",
    control: (
      <Button variant="filled" color="error" size="sm" onClick={() => {}}>
        Disable
      </Button>
    ),
  },
};

export const Success: Story = {
  args: { tone: "success", title: "Two-factor authentication", description: "Enabled with an authenticator app." },
};

export const NoDescription: Story = {
  args: { description: undefined },
};
