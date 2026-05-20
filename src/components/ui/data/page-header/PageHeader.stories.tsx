import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Breadcrumb } from "@/components/ui/navigation/breadcrumb/Breadcrumb";
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
    path: <Breadcrumb items={[{ label: "Billing", href: "#" }]} />,
  },
};

/**
 * Deeper trail — drill from a versions list into a specific version.
 * Each segment is the next level up; the current page (e.g. "v1.2.0")
 * lives in the h1, not the breadcrumb.
 */
export const ModulePage: Story = {
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    path: (
      <Breadcrumb
        items={[
          { label: "Dev Modules", href: "#" },
          { label: "Versions", href: "#" },
        ]}
      />
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
