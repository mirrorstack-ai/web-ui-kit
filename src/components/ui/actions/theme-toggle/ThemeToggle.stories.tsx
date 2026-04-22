import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle, type Theme } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/Actions/ThemeToggle",
  component: ThemeToggle,
  argTypes: {
    theme: { control: "select", options: ["auto", "light", "dark"] },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Playground: Story = {
  args: {
    theme: "auto",
    onToggle: () => {},
  },
};

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "auto" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

export const Interactive: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>("auto");

    useEffect(() => {
      applyTheme(theme);
    }, [theme]);

    return (
      <div className="flex items-center gap-4">
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme(ThemeToggle.next(theme))}
        />
        <span className="text-sm text-on-surface-variant">
          Current: {theme}
        </span>
      </div>
    );
  },
};
