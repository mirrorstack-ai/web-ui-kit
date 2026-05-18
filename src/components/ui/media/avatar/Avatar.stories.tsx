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

/**
 * Square avatars get a per-size radius — `sm` → `rounded-md`, `md` →
 * `rounded-lg`, `lg` → `rounded-xl`, `xl` → `rounded-2xl`. Each radius
 * is ~15-20% of the side length so the visual rounding ratio stays
 * consistent as the avatar scales.
 */
export const SquareSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map((size) => (
        <Avatar key={size} size={size} square fallback="M" />
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

/**
 * `overlay` now renders for non-editable avatars too — useful for
 * showing a material symbol icon as the avatar (e.g. a module's
 * declared icon) instead of an initials fallback.
 */
export const WithIconOverlay: Story = {
  args: {
    size: "xl",
    square: true,
    fallback: "",
    overlay: (
      <span
        className="material-symbols-rounded text-primary"
        style={{ fontSize: 40 }}
      >
        rocket_launch
      </span>
    ),
  },
};
