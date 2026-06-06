import { type ReactElement } from "react";
import { isProd, isStorybook } from "@/utils/env";
import { cn } from "@/utils/cn";

export const meta = {
  name: "DevToolbar",
  description: "Fixed floating toolbar for switching between dev states/views",
};

export interface DevToolbarItem {
  label: string;
  value: string;
}

export interface DevToolbarProps {
  items: DevToolbarItem[];
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
  onToggleError?: () => void;
}

export function DevToolbar({
  items,
  value,
  onChange,
  showError,
  onToggleError,
}: DevToolbarProps): ReactElement | null {
  if (isProd && !isStorybook) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex bg-surface-container border border-outline-variant rounded-2xl px-4 py-2 shadow-xl">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-xs font-mono text-on-surface-variant shrink-0">DEV:</span>
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              "px-2 py-1 text-xs rounded shrink-0 transition-colors",
              value === item.value
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            )}
          >
            {item.label}
          </button>
        ))}
        {onToggleError && (
          <>
            <span className="w-px h-4 bg-outline-variant shrink-0" />
            <button
              onClick={onToggleError}
              className={cn(
                "px-2 py-1 whitespace-nowrap text-xs rounded shrink-0 transition-colors",
                showError
                  ? "bg-error text-on-error"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {showError ? "Error ON" : "Error OFF"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
