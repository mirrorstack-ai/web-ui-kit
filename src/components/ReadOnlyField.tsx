"use client";

import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface ReadOnlyFieldProps {
  /** Field label */
  label: string;
  /** Display value */
  value: string;
  /** Use monospace font for value */
  mono?: boolean;
  /** Show a copy button that copies `value` to clipboard */
  copyable?: boolean;
  /** Callback after value is copied to clipboard */
  onCopy?: () => void;
  /** Extra content after the value (e.g. badge) */
  suffix?: ReactNode;
  className?: string;
}

export function ReadOnlyField({
  label,
  value,
  mono = false,
  copyable = false,
  onCopy,
  suffix,
  className,
}: ReadOnlyFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-on-surface mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2 min-h-8">
        <span
          className={cn(
            "text-sm truncate",
            mono ? "font-mono text-on-surface-variant" : "text-on-surface",
          )}
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(value).then(() => onCopy?.()).catch(() => {});
            }}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors shrink-0"
            aria-label={`Copy ${label}`}
          >
            <span className="material-symbols-rounded !text-base">
              content_copy
            </span>
          </button>
        )}
        {suffix}
      </div>
    </div>
  );
}
