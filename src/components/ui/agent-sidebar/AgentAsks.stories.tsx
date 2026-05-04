import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarMultiQuestion } from "./AgentSidebarMultiQuestion";

const meta: Meta = {
  title: "Agent/Asks",
  decorators: [
    (Story) => (
      <div className="h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4 overflow-y-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// Tabs layout is for *decisions* — multiple sections, each with weighted
// trade-offs. Example: scaffolding a new service. Each tab is one decision,
// each option is a multi-choice card with an explanation to help pick.
export const MultiQuestionTabs: StoryObj = {
  render: () => {
    const [status, setStatus] = useState<"pending" | "submitted">("pending");
    return (
      <AgentSidebarMultiQuestion
        title="Scaffold a new service"
        description="Pick the building blocks. The agent will generate the project skeleton from your choices."
        status={status}
        onSubmit={(answers) => {
          console.log("submitted", answers);
          setStatus("submitted");
        }}
        questions={[
          {
            id: "database",
            type: "choice",
            label: "Primary database",
            tabLabel: "Database",
            description:
              "Where the service stores its core records. You can add a cache or analytics store later.",
            options: [
              {
                value: "postgres",
                label: "PostgreSQL",
                description:
                  "Battle-tested, ACID, JSON support, large extension ecosystem. Best general-purpose default.",
              },
              {
                value: "mysql",
                label: "MySQL",
                description:
                  "Wide hosting support, mature replication, ubiquitous tooling. Smaller feature surface than Postgres.",
              },
              {
                value: "sqlite",
                label: "SQLite",
                description:
                  "Zero-config, single-file. Great for embedded, local-first, or sub-1k QPS workloads.",
              },
            ],
          },
          {
            id: "auth",
            type: "choice",
            label: "Authentication strategy",
            tabLabel: "Auth",
            description:
              "How users prove who they are. Affects token storage, refresh flow, and which middleware ships.",
            options: [
              {
                value: "session",
                label: "Server sessions",
                description:
                  "HTTP-only cookies, server-side store. Simplest model. Best for first-party web apps.",
              },
              {
                value: "jwt",
                label: "Stateless JWT",
                description:
                  "Self-contained signed tokens. No session table, but harder to revoke. Common for APIs and mobile.",
              },
              {
                value: "oauth",
                label: "OAuth / OIDC",
                description:
                  "Delegate to an identity provider (Google, Okta, Auth0). Best for enterprise SSO requirements.",
              },
            ],
          },
          {
            id: "hosting",
            type: "choice",
            label: "Deploy target",
            tabLabel: "Hosting",
            description:
              "Drives the Dockerfile, IaC scaffold, and CI workflow generated for you.",
            options: [
              {
                value: "aws-lambda",
                label: "AWS Lambda",
                description:
                  "Pay-per-request, fast cold-starts on small services, great for spiky traffic.",
              },
              {
                value: "aws-ecs",
                label: "AWS ECS Fargate",
                description:
                  "Long-running containers, no cold starts, easier WebSockets. Higher idle cost than Lambda.",
              },
              {
                value: "vercel",
                label: "Vercel",
                description:
                  "Push-to-deploy with edge runtime. Best for frontends and lightweight Node APIs.",
              },
            ],
          },
        ]}
      />
    );
  },
};

// List layout is for simple, low-stakes preference forms — short labels, no
// per-question explanation needed.
export const MultiQuestionList: StoryObj = {
  render: () => {
    const [status, setStatus] = useState<"pending" | "submitted">("pending");
    return (
      <AgentSidebarMultiQuestion
        layout="list"
        title="Customize your experience"
        description="Pick a few defaults. You can change these any time from preferences."
        status={status}
        onSubmit={(answers) => {
          console.log("submitted", answers);
          setStatus("submitted");
        }}
        questions={[
          {
            id: "theme",
            type: "select",
            label: "Theme",
            options: [
              { value: "system", label: "Match system" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ],
            defaultValue: "system",
          },
          {
            id: "marketing",
            type: "toggle",
            label: "Send product update emails",
            defaultValue: false,
          },
          {
            id: "displayName",
            type: "text",
            label: "Display name",
            placeholder: "Alice",
            defaultValue: "Alice",
          },
        ]}
      />
    );
  },
};
