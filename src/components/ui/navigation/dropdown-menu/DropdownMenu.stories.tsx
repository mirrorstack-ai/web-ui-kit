import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/Navigation/DropdownMenu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div className="p-8 min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  args: {
    trigger: (
      <IconButton icon="more_vert" aria-label="Open menu" variant="filled" />
    ),
    items: [
      { id: "edit", label: "Edit", icon: "edit" },
      { id: "duplicate", label: "Duplicate", icon: "content_copy" },
      { type: "separator" as const },
      { id: "delete", label: "Delete", icon: "delete", variant: "danger" as const },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};
