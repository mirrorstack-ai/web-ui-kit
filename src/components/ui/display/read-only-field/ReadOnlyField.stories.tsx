import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "./ReadOnlyField";
import { Badge } from "@/components/ui/feedback/badge/Badge";
import { Icon } from "@/components/ui/media/icon/Icon";

const meta: Meta<typeof ReadOnlyField> = {
  title: "UI/Data/ReadOnlyField",
  component: ReadOnlyField,
  args: {
    label: "Email",
    value: "user@example.com",
  },
  argTypes: {
    mono: { control: "boolean" },
    copyable: { control: "boolean" },
    layout: { control: "select", options: ["stacked", "inline"] },
  },
};

export default meta;
type Story = StoryObj<typeof ReadOnlyField>;

export const Playground: Story = {};

export const Copyable: Story = {
  args: {
    label: "API Key",
    value: "sk-1234567890abcdef",
    mono: true,
    copyable: true,
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Status",
    value: "Deployed",
    suffix: <Badge variant="success" size="sm">Live</Badge>,
  },
};

export const Mono: Story = {
  args: {
    label: "Module ID",
    value: "oauth-core-v2",
    mono: true,
  },
};

/**
 * `layout="inline"` puts the label on the left and the value on the right
 * of the same row — useful for footer-style label/value pairs where
 * vertical space matters.
 */
export const Inline: Story = {
  args: {
    label: "Published by",
    value: "@i-am-nothing",
    mono: true,
    layout: "inline",
  },
};

/**
 * Inline + copyable + suffix all compose. The shared `valueRow` makes
 * sure these work identically in both layouts.
 */
export const InlineWithCopy: Story = {
  args: {
    label: "API key",
    value: "sk-live-1234567890abcdef",
    mono: true,
    copyable: true,
    layout: "inline",
  },
};

/**
 * `prefix` is rendered before the value — useful for a leading icon or
 * status dot.
 */
export const WithPrefix: Story = {
  args: {
    label: "Status",
    value: "Connected",
    prefix: <span className="size-2 rounded-full bg-success" />,
  },
};

/**
 * `prefix` also works in the inline layout.
 */
export const InlineWithPrefix: Story = {
  args: {
    label: "Region",
    value: "us-east-1",
    mono: true,
    layout: "inline",
    prefix: <Icon name="public" size={16} className="text-on-surface-variant" />,
  },
};
