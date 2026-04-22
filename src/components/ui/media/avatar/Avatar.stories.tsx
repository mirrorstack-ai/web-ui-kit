import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarSize } from "./Avatar";
import { Progress } from "@/components/ui/feedback/progress/Progress";

const meta: Meta<typeof Avatar> = {
  title: "UI/Media/Avatar",
  component: Avatar,
  args: {
    fallback: "A",
    size: "lg",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    fallback: { control: "text" },
    src: { control: "text" },
    editable: { control: "boolean" },
    square: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map((size) => (
        <Avatar key={size} size={size} fallback="M" />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl",
  },
};

export const Editable: Story = {
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: (file) => console.log("Selected:", file.name),
  },
};

export const Square: Story = {
  args: {
    square: true,
    size: "xl",
    fallback: "S",
  },
};

export const WithOverlay: Story = {
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="primary" />,
  },
};
