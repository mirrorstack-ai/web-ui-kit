import type { Meta, StoryObj } from "@storybook/react";
import { SettingRow } from "./SettingRow";
import { Switch } from "@/components/ui/inputs/switch/Switch";
import { Button } from "@/components/ui/actions/button/Button";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";

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

/**
 * 🔴 THE CASE THE ROW USED TO SQUEEZE, kept as a story so it is renderable at
 * 400px instead of being rediscovered on a module's PR.
 *
 * A long description AND a control wider than a Switch. `control` is
 * `shrink-0`, so before the row could wrap, the text column was the only thing
 * able to give: it collapsed to a ribbon and broke this description across four
 * or five lines. Reported on ai-assistant's Model and Token-ceiling rows and
 * quiz-core's "Show the answer key" (f5, 2026-09-14).
 *
 * Review it at 400px, not at the default viewport — at a comfortable width
 * there was never anything wrong with this row.
 */
export const LongDescriptionWithWideControl: Story = {
  args: {
    title: "Token ceiling",
    description:
      "The largest number of tokens one assistant reply may spend. Replies that would exceed it are cut at the boundary rather than refused.",
    control: (
      <div className="w-32">
        <FloatingLabelInput
          label="Tokens"
          size="sm"
          inputMode="numeric"
          value="4096"
          onChange={() => {}}
        />
      </div>
    ),
  },
};

/** The same row with a Switch: narrow enough that it never reaches the wrap
 *  point, so this is the check that the fix left the already-fitting rows
 *  exactly where they were. */
export const NarrowControlDoesNotWrap: Story = {
  args: {
    title: "Show the answer key",
    description:
      "Reveal correct answers after a learner submits, instead of keeping them hidden until the exam closes.",
  },
};
