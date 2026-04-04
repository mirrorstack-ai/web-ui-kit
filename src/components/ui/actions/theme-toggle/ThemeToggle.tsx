import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "ThemeToggle",
  description:
    "Cycles through auto/light/dark theme modes via an icon button",
};

export type ThemeMode = "auto" | "light" | "dark";

type ThemeToggleVariant = "filled" | "tonal" | "outline" | "text";
type ThemeToggleColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "warning";
type ThemeToggleSize = "sm" | "md" | "lg";

export interface ThemeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Current theme mode */
  readonly theme: ThemeMode;
  /** Callback when the toggle is clicked */
  readonly onChangeTheme: (next: ThemeMode) => void;
  /** Button variant */
  readonly variant?: ThemeToggleVariant;
  /** Button color */
  readonly color?: ThemeToggleColor;
  /** Button size */
  readonly size?: ThemeToggleSize;
}

const themeIcons: Record<ThemeMode, string> = {
  auto: "brightness_auto",
  light: "light_mode",
  dark: "dark_mode",
};

const themeLabels: Record<ThemeMode, string> = {
  auto: "Auto theme",
  light: "Light theme",
  dark: "Dark theme",
};

const CYCLE: readonly ThemeMode[] = ["auto", "light", "dark"];

function nextTheme(current: ThemeMode): ThemeMode {
  const index = CYCLE.indexOf(current);
  return CYCLE[(index + 1) % CYCLE.length];
}

const variantStyles: Record<ThemeToggleVariant, Record<ThemeToggleColor, string>> = {
  filled: {
    primary: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
    secondary: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
    tertiary: "bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container",
    error: "bg-error text-on-error hover:bg-error-container hover:text-on-error-container",
    warning: "bg-warning text-on-warning hover:bg-warning-container hover:text-on-warning-container",
  },
  tonal: {
    primary: "bg-primary-container text-on-primary-container hover:bg-primary/20",
    secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary/20",
    tertiary: "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary/20",
    error: "bg-error-container text-on-error-container hover:bg-error/20",
    warning: "bg-warning-container text-on-warning-container hover:bg-warning/20",
  },
  outline: {
    primary: "border border-outline-variant text-primary hover:bg-primary/8",
    secondary: "border border-outline-variant text-secondary hover:bg-secondary/8",
    tertiary: "border border-outline-variant text-tertiary hover:bg-tertiary/8",
    error: "border border-error/50 text-error hover:bg-error/8",
    warning: "border border-warning/50 text-warning hover:bg-warning/8",
  },
  text: {
    primary: "text-primary hover:bg-primary/8",
    secondary: "text-secondary hover:bg-secondary/8",
    tertiary: "text-tertiary hover:bg-tertiary/8",
    error: "text-error hover:bg-error/8",
    warning: "text-warning hover:bg-warning/8",
  },
};

const sizeStyles: Record<ThemeToggleSize, { button: string; icon: number }> = {
  sm: { button: "h-8 w-8", icon: 18 },
  md: { button: "h-10 w-10", icon: 22 },
  lg: { button: "h-12 w-12", icon: 26 },
};

export function ThemeToggle({
  theme,
  onChangeTheme,
  variant = "tonal",
  color = "secondary",
  size = "md",
  className,
  ...props
}: ThemeToggleProps) {
  const next = nextTheme(theme);
  const { button, icon } = sizeStyles[size];

  return (
    <button
      type="button"
      aria-label={`${themeLabels[theme]} — click to switch to ${next}`}
      onClick={() => onChangeTheme(next)}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant][color],
        button,
        className,
      )}
      {...props}
    >
      <span
        className="material-symbols-rounded"
        aria-hidden="true"
        style={{ fontSize: icon }}
      >
        {themeIcons[theme]}
      </span>
    </button>
  );
}

/** Static helper: returns the next theme in the auto → light → dark cycle */
ThemeToggle.next = nextTheme;
