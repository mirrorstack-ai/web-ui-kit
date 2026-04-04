import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, useTheme, type Theme } from "./ThemeProvider";
import { Button } from "@/components/ui/actions/button/Button";

function ThemeDemo() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const themes: Theme[] = ["light", "dark", "auto"];

  return (
    <div className="flex w-80 flex-col gap-5 rounded-2xl bg-surface-container p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
          Theme
        </p>
        <p className="mt-1 text-sm text-on-surface">
          Current: <strong>{theme}</strong>
        </p>
        <p className="text-sm text-on-surface-variant">
          Resolved: <strong>{resolvedTheme}</strong>
        </p>
      </div>

      <div className="flex gap-2">
        {themes.map((t) => (
          <Button
            key={t}
            variant={theme === t ? "filled" : "outline"}
            size="sm"
            onClick={() => setTheme(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-surface p-4">
        <p className="text-sm font-medium text-on-surface">Preview</p>
        <p className="text-xs text-on-surface-variant">
          This card reflects the current theme. Toggle between light, dark, and
          auto to see the change.
        </p>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Context/ThemeProvider",
  decorators: [
    (Story) => (
      <ThemeProvider apiEndpoint="">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/** Toggle between light, dark, and auto themes */
export const Playground: Story = {
  render: () => <ThemeDemo />,
};
