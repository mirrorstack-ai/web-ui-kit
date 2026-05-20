import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Navigation/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "Dev Modules", href: "#" },
      { label: "Acme Module", href: "#" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {};

export const Single: Story = {
  args: {
    items: [{ label: "Billing", href: "#" }],
  },
};

export const Deep: Story = {
  args: {
    items: [
      { label: "Dev Modules", href: "#" },
      { label: "Acme Module", href: "#" },
      { label: "Versions", href: "#" },
      { label: "v1.2.0", href: "#" },
    ],
  },
};
