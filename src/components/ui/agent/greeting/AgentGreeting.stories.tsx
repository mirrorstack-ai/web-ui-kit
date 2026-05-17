import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AgentGreeting, type AgentGreetingModel } from "./AgentGreeting";

const meta: Meta<typeof AgentGreeting> = {
  title: "UI/Agent/Greeting",
  component: AgentGreeting,
  decorators: [
    (Story) => (
      <div className="min-h-[600px] w-full bg-background px-6 py-16">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AgentGreeting>;

const MODELS: AgentGreetingModel[] = [
  { id: "claude-sonnet-4-6", label: "Sonnet 4.6", description: "Balanced" },
  { id: "claude-opus-4-7", label: "Opus 4.7", description: "Adaptive" },
  { id: "claude-haiku-4-5", label: "Haiku 4.5", description: "Fast" },
];

export const WelcomeBack: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(
      args.selectedModelId ?? MODELS[0].id,
    );
    const [sent, setSent] = useState<string[]>([]);
    return (
      <div className="flex flex-col gap-8">
        <AgentGreeting
          {...args}
          selectedModelId={selected}
          onSelectModel={setSelected}
          onSend={(msg) => setSent((prev) => [...prev, msg])}
        />
        {sent.length > 0 && (
          <div className="mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm">
            <div className="mb-1 font-medium text-on-surface">Sent</div>
            <ul className="flex flex-col gap-1 text-on-surface-variant">
              {sent.map((m, i) => (
                <li key={i}>· {m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6",
  },
};

export const FirstTime: Story = {
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6",
  },
};

export const AppCreation: Story = {
  args: {
    greeting: "Let's create your app",
    subtitle:
      "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "claude-opus-4-7",
  },
};

export const Overview: Story = {
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS,
  },
};

export const NoModelPicker: Story = {
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
  },
};

export const NoLogo: Story = {
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    hideLogo: true,
  },
};
