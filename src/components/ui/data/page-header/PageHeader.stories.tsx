import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Button } from "@/components/ui/actions/button/Button";
import { Icon } from "@/components/ui/media/icon/Icon";

const meta: Meta<typeof PageHeader> = {
  title: "UI/Data/PageHeader",
  component: PageHeader,
  args: {
    title: "Billing",
    description: "Charges, plan, usage, and payment for this account.",
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Playground: Story = {};

export const TitleOnly: Story = {
  args: { description: undefined },
};

export const WithTail: Story = {
  args: {
    tail: (
      <Button variant="outline" size="sm" onClick={() => {}}>
        Period: May 19 – Jun 19, 2026
      </Button>
    ),
  },
};

export const WithLeading: Story = {
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    leading: (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>
    ),
  },
};

export const WithPath: Story = {
  args: {
    title: "Usage detail",
    description: undefined,
    path: (
      <a
        href="#"
        className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface"
      >
        <Icon name="arrow_back" size={16} />
        Billing
      </a>
    ),
  },
};

/**
 * Mirrors the web-applications /dev/module/[slug] header — path
 * navigator on top, tinted-icon leading marker, name + slug, and a
 * Settings action on the right.
 */
export const ModulePage: Story = {
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    path: (
      <a
        href="#"
        className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface"
      >
        <Icon name="arrow_back" size={16} />
        Dev Modules
      </a>
    ),
    leading: (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>
    ),
    tail: (
      <Button variant="outline" size="sm" onClick={() => {}}>
        Settings
      </Button>
    ),
  },
};
