import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "UI/Blocks/Table",
  component: DataTable,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

const ROUTE_COLUMNS = [
  { key: "method", label: "Method", width: "60px", mono: true },
  { key: "path", label: "Path", mono: true },
  { key: "scope", label: "Scope", width: "70px" },
] as const;

const ROUTE_ROWS = [
  { method: "GET", path: "/platform/providers", scope: "public" },
  { method: "POST", path: "/internal/sessions", scope: "internal" },
  { method: "GET", path: "/account/orgs", scope: "account" },
  { method: "PUT", path: "/account/orgs/:id", scope: "account" },
  { method: "DELETE", path: "/internal/cache", scope: "internal" },
  { method: "POST", path: "/platform/modules", scope: "platform" },
];

/** Six API routes with method, path, and scope columns. */
export const Routes: Story = {
  render: () => (
    <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} />
    </div>
  ),
};

/** Four permission rows — name (mono) and description. */
export const Permissions: Story = {
  render: () => (
    <div className="h-[200px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable
        columns={[
          { key: "name", label: "Name", mono: true },
          { key: "description", label: "Description" },
        ]}
        rows={[
          { name: "read:modules", description: "List and inspect modules" },
          { name: "write:modules", description: "Create and update modules" },
          { name: "read:orgs", description: "View organisation details" },
          { name: "admin:billing", description: "Manage billing settings" },
        ]}
      />
    </div>
  ),
};

/** Same as Routes but with `compact` enabled for tighter row padding. */
export const Compact: Story = {
  render: () => (
    <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} compact />
    </div>
  ),
};
