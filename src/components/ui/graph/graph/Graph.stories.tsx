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

const meta: Meta<typeof Graph> = {
  title: "UI/Data/Graph",
  component: Graph,
  args: {
    nodes: sampleNodes,
    edges: sampleEdges,
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Graph>;

export const Default: Story = {};

export const Empty: Story = {
  args: { nodes: [], edges: [] },
};
