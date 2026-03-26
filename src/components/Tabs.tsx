"use client";

import { cn } from "../utils/cn";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  /** Material Symbols icon name */
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Visual variant */
  variant?: "underline" | "pill";
  "aria-label"?: string;
  className?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  value,
  onChange,
  variant = "underline",
  "aria-label": ariaLabel,
  className,
}: TabsProps<T>) {
  if (variant === "pill") {
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn("flex gap-2", className)}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={value === tab.value}
            onClick={() => onChange(tab.value)}
            disabled={tab.disabled}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              value === tab.value
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
              tab.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
            )}
          >
            {tab.icon && (
              <span className="material-symbols-rounded !text-base mr-1.5 align-middle">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex border-b border-outline-variant",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          disabled={tab.disabled}
          className={cn(
            "relative px-4 py-3 text-sm font-medium transition-colors",
            value === tab.value
              ? "text-primary"
              : "text-on-surface-variant hover:text-on-surface",
            tab.disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer",
          )}
        >
          <span className="flex items-center gap-1.5">
            {tab.icon && (
              <span className="material-symbols-rounded !text-base">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </span>
          {value === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
