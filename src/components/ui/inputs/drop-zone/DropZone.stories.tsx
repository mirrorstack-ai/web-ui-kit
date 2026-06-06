import type { Meta, StoryObj } from "@storybook/react";
import { DropZone } from "./DropZone";

const meta: Meta<typeof DropZone> = {
  title: "UI/Files/DropZone",
  component: DropZone,
  args: {
    icon: "upload",
    title: "Drag and drop files here",
    description: "or click to browse",
    disabled: false,
    multiple: true,
  },
  argTypes: {
    icon: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    multiple: { control: "boolean" },
    accept: { control: "text" },
    maxSize: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof DropZone>;

/** Interactive playground — all controls work here */
export const Playground: Story = {
  args: {
    onFiles: (files) => console.log("Files:", files),
  },
};

/** Disabled state — no interaction allowed */
export const Disabled: Story = {
  args: {
    onFiles: (files) => console.log("Files:", files),
    disabled: true,
  },
};
