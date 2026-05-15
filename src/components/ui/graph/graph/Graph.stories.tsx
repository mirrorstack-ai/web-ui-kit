import type { Meta, StoryObj } from "@storybook/react";
import { Graph, type GraphEdge, type GraphNode } from "./Graph";

const sampleNodes: GraphNode[] = [
  { id: "auth", label: "Auth", tag: "core" },
  { id: "users", label: "Users", tag: "core" },
  { id: "content", label: "Content", tag: "core" },
  { id: "media", label: "Media", tag: "core" },
  { id: "comments", label: "Comments", tag: "social" },
  { id: "notifications", label: "Notifications", tag: "social" },
  { id: "email", label: "Email", tag: "social" },
  { id: "products", label: "Products", tag: "commerce" },
  { id: "orders", label: "Orders", tag: "commerce" },
  { id: "stripe", label: "Stripe", tag: "commerce" },
  { id: "cart", label: "Cart", tag: "commerce" },
  { id: "search", label: "Search", tag: "discovery" },
  { id: "analytics", label: "Analytics", tag: "discovery" },
  { id: "dashboard", label: "Dashboard", tag: "admin" },
  { id: "audit-log", label: "Audit Log", tag: "admin" },
];

const sampleEdges: GraphEdge[] = [
  { source: "users", target: "auth" },
  { source: "content", target: "users" },
  { source: "content", target: "media" },
  { source: "comments", target: "users" },
  { source: "comments", target: "content" },
  { source: "notifications", target: "users" },
  { source: "notifications", target: "email" },
  { source: "email", target: "users" },
  { source: "products", target: "media" },
  { source: "orders", target: "users" },
  { source: "orders", target: "products" },
  { source: "orders", target: "stripe" },
  { source: "cart", target: "products" },
  { source: "cart", target: "users" },
  { source: "search", target: "content" },
  { source: "search", target: "products" },
  { source: "analytics", target: "users" },
  { source: "analytics", target: "orders" },
  { source: "dashboard", target: "analytics" },
  { source: "dashboard", target: "users" },
  { source: "audit-log", target: "users" },
  { source: "audit-log", target: "auth" },
];

const pinnedNodes: GraphNode[] = [
  { id: "user", label: "Nothing Chang", pin: { x: 0.5, y: 0.5 }, tag: "user" },
  { id: "account", label: "Account", tag: "core" },
  { id: "apps", label: "Apps", tag: "core" },
  { id: "projectify", label: "Projectify", tag: "project" },
  { id: "crm", label: "CRM", tag: "crm" },
  { id: "daily", label: "Daily", tag: "daily" },
  { id: "balance", label: "Balance", tag: "balance" },
  { id: "stripe-link", label: "Stripe", tag: "commerce" },
  { id: "ledger", label: "Ledger", tag: "balance" },
  { id: "notes", label: "Notes", tag: "daily" },
];

const pinnedEdges: GraphEdge[] = [
  { source: "user", target: "account" },
  { source: "user", target: "apps" },
  { source: "user", target: "projectify" },
  { source: "user", target: "crm" },
  { source: "user", target: "daily" },
  { source: "user", target: "balance" },
  { source: "balance", target: "stripe-link" },
  { source: "balance", target: "ledger" },
  { source: "daily", target: "notes" },
];

const meta: Meta<typeof Graph> = {
  title: "UI/Graph/Graph",
  component: Graph,
  args: {
    nodes: sampleNodes,
    edges: sampleEdges,
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Graph>;

export const Default: Story = {};

export const PinnedParent: Story = {
  args: {
    nodes: pinnedNodes,
    edges: pinnedEdges,
  },
};

export const TallContainer: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl h-[700px]">
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: { nodes: [], edges: [] },
};
