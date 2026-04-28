import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "UI/Feedback/EmptyState",
  component: EmptyState,
  args: {
    icon: "folder_open",
    title: "No items yet",
  },
  argTypes: {
    icon: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: {
    icon: "search_off",
    title: "No results found",
    description: "Try adjusting your search or filters to find what you need.",
  },
};

export const WithAction: Story = {
  args: {
    icon: "add_circle",
    title: "No projects yet",
    description: "Get started by creating your first project.",
    action: <Button variant="filled">Create project</Button>,
  },
};

export const NoDescription: Story = {
  args: {
    icon: "inbox",
    title: "Your inbox is empty",
  },
};
