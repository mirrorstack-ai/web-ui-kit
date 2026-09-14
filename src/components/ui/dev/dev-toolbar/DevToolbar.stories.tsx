import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DevToolbar } from "./DevToolbar";

const meta = {
  title: "Ui/State/DevToolbar",
  component: DevToolbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DevToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    items: [],
    value: "",
    onChange: () => {},
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("a");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showError, setShowError] = useState(false);

    return (
      <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar
          items={[
            { label: "State A", value: "a" },
            { label: "State B", value: "b" },
            { label: "State C", value: "c" },
          ]}
          value={value}
          onChange={setValue}
          showError={showError}
          onToggleError={() => setShowError((prev) => !prev)}
        />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">Main Content Area</h2>
          <p className="text-on-surface-variant">
            Current selected state value: <strong className="text-primary">{value}</strong>
          </p>
          <p className="text-on-surface-variant">
            Error mode: <strong className={showError ? "text-error font-medium" : ""}>{showError ? "Active" : "Inactive"}</strong>
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Three axes in ONE bar — the shape a module preview needs.
 *
 * Before `axes`, this took two DevToolbars (which overlap, both being `fixed`
 * and centred) or folding theme and locale into the scene's own `items`, which
 * is what quiz-core and ai-assistant each worked around differently.
 */
export const MultiAxis: Story = {
  args: {
    items: [],
    value: "",
    onChange: () => {},
  },
  render: () => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [scene, setScene] = useState("empty");
    const [theme, setTheme] = useState("light");
    const [locale, setLocale] = useState("zh-TW");
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar
          axes={[
            {
              label: "Scene",
              items: [
                { label: "Empty", value: "empty" },
                { label: "Loaded", value: "loaded" },
                { label: "Error", value: "error" },
              ],
              value: scene,
              onChange: setScene,
            },
            {
              label: "Theme",
              items: [
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ],
              value: theme,
              onChange: setTheme,
            },
            {
              label: "Locale",
              items: [
                { label: "zh-TW", value: "zh-TW" },
                { label: "en", value: "en" },
              ],
              value: locale,
              onChange: setLocale,
            },
          ]}
        />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">Preview Target</h2>
          <p className="text-on-surface-variant">
            scene <strong className="text-primary">{scene}</strong> · theme{" "}
            <strong className="text-primary">{theme}</strong> · locale{" "}
            <strong className="text-primary">{locale}</strong>
          </p>
          <p className="text-xs text-on-surface-variant">
            Narrow the viewport to 400px: the bar wraps instead of running off both edges.
          </p>
        </div>
      </div>
    );
  },
};
