import { type ReactElement } from "react";
declare const process: any;
import { ENV } from "@/utils/env";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/actions/button/Button";

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
  if (process.env.NODE_ENV === ENV.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1.5 p-1.5 bg-surface backdrop-blur-md border border-outline-variant shadow-md rounded-full text-on-surface">
      <div className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = item.value === value;
          return (
            <Button
              key={item.value}
              variant={isActive ? "tonal" : "text"}
              color="primary"
              size="sm"
              onClick={() => onChange(item.value)}
              className={cn(
                "rounded-full h-8 px-4 font-medium text-sm transition-colors",
                !isActive && "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {item.label}
            </Button>
          );
        })}
      </div>

      {onToggleError && (
        <>
          <div className="w-px h-5 bg-outline-variant mx-1" />
          <Button
            variant={showError ? "filled" : "text"}
            color="error"
            size="sm"
            onClick={onToggleError}
            className="rounded-full h-8 px-4 font-medium text-sm transition-colors"
          >
            {showError ? "Hide Error" : "Show Error"}
          </Button>
        </>
      )}
    </div>
  );
}
