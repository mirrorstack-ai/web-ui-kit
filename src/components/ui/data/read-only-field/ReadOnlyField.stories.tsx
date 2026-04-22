import type { Meta, StoryObj } from "@storybook/react";
import { ReadOnlyField } from "./ReadOnlyField";
import { Badge } from "@/components/ui/feedback/badge/Badge";

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
