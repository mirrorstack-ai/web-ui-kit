import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle, type ThemeMode } from "./ThemeToggle";
import { Button } from "@/components/ui/actions/button/Button";


const meta: Meta<typeof ThemeToggle> = {
  title: "UI/Actions/ThemeToggle",
  component: ThemeToggle,
  args: {
    theme: "auto",
    variant: "tonal",
    color: "secondary",
    size: "md",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["auto", "light", "dark"],
    },
    variant: {
      control: "select",
      options: ["filled", "tonal", "outline", "text"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

/** Interactive playground — click to cycle through auto → light → dark */
export const Playground: Story = {
  render: (args) => {
    function PlaygroundDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");
      return (
        <div className="w-80 rounded-2xl bg-surface-container shadow-lg">
          <div className="flex items-center justify-between border-b border-outline-variant/30 px-5 py-4">
            <p className="text-sm font-semibold text-on-surface">Theme</p>
            <ThemeToggle {...args} theme={theme} onChangeTheme={setTheme} />
          </div>

          <div className="flex gap-2 p-4">
            {(["auto", "light", "dark"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl py-4 transition-all ${
                  theme === t
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-surface ring-1 ring-outline-variant/40 hover:ring-outline-variant"
                }`}
              >
                <span
                  className={`material-symbols-rounded ${
                    theme === t ? "text-primary" : "text-on-surface-variant"
                  }`}
                  aria-hidden="true"
                  style={{ fontSize: 24 }}
                >
                  {t === "auto"
                    ? "brightness_auto"
                    : t === "light"
                      ? "light_mode"
                      : "dark_mode"}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    theme === t ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {t === "auto" ? "Auto" : t === "light" ? "Light" : "Dark"}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-outline-variant/30 px-5 py-3">
            <p className="text-xs text-on-surface-variant">
              Currently:{" "}
              <span className="font-medium capitalize text-on-surface">
                {theme}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return <PlaygroundDemo />;
  },
};

/** Theme preference cards — select your preferred appearance */
export const ThemePreference: Story = {
  render: (args) => {
    function PreferenceDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");

      const options = [
        {
          mode: "light" as const,
          label: "Light",
          preview: (
            <div className="flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-white">
              <div className="h-5 bg-[#e8e8e8]" />
              <div className="flex flex-1 gap-1.5 p-2">
                <div className="w-6 rounded bg-[#e0e0e0]" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-2 w-3/4 rounded-sm bg-[#d0d0d0]" />
                  <div className="h-2 w-1/2 rounded-sm bg-[#e0e0e0]" />
                </div>
              </div>
            </div>
          ),
        },
        {
          mode: "dark" as const,
          label: "Dark",
          preview: (
            <div className="flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-[#1e1e1e]">
              <div className="h-5 bg-[#2d2d2d]" />
              <div className="flex flex-1 gap-1.5 p-2">
                <div className="w-6 rounded bg-[#383838]" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-2 w-3/4 rounded-sm bg-[#484848]" />
                  <div className="h-2 w-1/2 rounded-sm bg-[#383838]" />
                </div>
              </div>
            </div>
          ),
        },
        {
          mode: "auto" as const,
          label: "System",
          preview: (
            <div className="flex h-24 overflow-hidden rounded-lg border border-outline-variant/60">
              <div className="flex flex-1 flex-col bg-white">
                <div className="h-5 bg-[#e8e8e8]" />
                <div className="flex flex-1 gap-1 p-1.5">
                  <div className="w-4 rounded-sm bg-[#e0e0e0]" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-[#d0d0d0]" />
                    <div className="h-1.5 w-1/2 rounded-sm bg-[#e0e0e0]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col bg-[#1e1e1e]">
                <div className="h-5 bg-[#2d2d2d]" />
                <div className="flex flex-1 gap-1 p-1.5">
                  <div className="w-4 rounded-sm bg-[#383838]" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-[#484848]" />
                    <div className="h-1.5 w-1/2 rounded-sm bg-[#383838]" />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ];

      return (
        <div className="w-[480px] rounded-2xl bg-surface-container p-6 shadow-lg">
          <h3 className="text-base font-semibold text-on-surface">
            Appearance
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant">
            Choose how the interface looks to you
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {options.map(({ mode, label, preview }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  theme === mode
                    ? "border-primary shadow-md"
                    : "border-transparent hover:border-outline-variant"
                }`}
              >
                <div className="p-2 pb-0">{preview}</div>
                <div className="flex items-center justify-center gap-2 py-3">
                  <ThemeToggle
                    {...args}
                    theme={mode}
                    onChangeTheme={() => setTheme(mode)}
                    variant="text"
                    size="sm"
                  />
                  <span
                    className={`text-sm font-medium ${theme === mode ? "text-primary" : "text-on-surface"}`}
                  >
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }
    return <PreferenceDemo />;
  },
};


/** User profile dropdown with theme toggle */
export const ProfileDropdown: Story = {
  render: (args) => {
    function DropdownDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");
      return (
        <div className="w-[280px] overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-outline-variant/20">
          {/* User header with gradient */}
          <div className="bg-gradient-to-br from-primary/10 via-surface-container to-tertiary/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-md">
                JD
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-on-surface">
                  Jane Doe
                </p>
                <p className="truncate text-xs text-on-surface-variant">
                  jane@mirrorstack.io
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col px-2 py-1.5">
            {[
              { icon: "person", label: "Profile" },
              { icon: "settings", label: "Settings" },
              { icon: "notifications", label: "Notifications" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-on-surface/5"
              >
                <span
                  className="material-symbols-rounded text-on-surface-variant"
                  aria-hidden="true"
                  style={{ fontSize: 20 }}
                >
                  {icon}
                </span>
                <span className="text-sm text-on-surface">{label}</span>
              </div>
            ))}

            {/* Theme row */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-rounded text-on-surface-variant"
                  aria-hidden="true"
                  style={{ fontSize: 20 }}
                >
                  contrast
                </span>
                <span className="text-sm text-on-surface">Theme</span>
              </div>
              <ThemeToggle
                {...args}
                theme={theme}
                onChangeTheme={setTheme}
                variant="outline"
                size="sm"
              />
            </div>
          </div>

          {/* Sign out */}
          <div className="border-t border-outline-variant/30 px-2 py-1.5">
            <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-error transition-colors hover:bg-error/5">
              <span
                className="material-symbols-rounded"
                aria-hidden="true"
                style={{ fontSize: 20 }}
              >
                logout
              </span>
              <span className="text-sm font-medium">Sign out</span>
            </div>
          </div>
        </div>
      );
    }
    return <DropdownDemo />;
  },
};
