"use client";

import { IconButton, type IconButtonProps } from "./icon-button";
import type { Theme } from "../context/ThemeContext";

const ICON: Record<Theme, string> = {
  auto: "brightness_auto",
  light: "light_mode",
  dark: "dark_mode",
};

const NEXT: Record<Theme, Theme> = {
  auto: "light",
  light: "dark",
  dark: "auto",
};

const ARIA: Record<Theme, string> = {
  auto: "Switch to light mode",
  light: "Switch to dark mode",
  dark: "Switch to auto mode",
};

export interface ThemeToggleProps
  extends Omit<IconButtonProps, "icon" | "aria-label"> {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({
  theme,
  onToggle,
  variant = "tonal",
  color = "secondary",
  size = "md",
  ...props
}: ThemeToggleProps) {
  return (
    <IconButton
      icon={ICON[theme]}
      variant={variant}
      color={color}
      size={size}
      onClick={onToggle}
      aria-label={ARIA[theme]}
      {...props}
    />
  );
}

/** Get the next theme in the cycle: auto → light → dark → auto */
ThemeToggle.next = (current: Theme): Theme => NEXT[current];
