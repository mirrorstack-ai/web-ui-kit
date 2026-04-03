import { type ReactNode, useState } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "ReadOnlyField",
  description:
    "Label/value pair display with optional copy-to-clipboard button and suffix slot",
};

export interface ReadOnlyFieldProps {
  readonly label: string;
  readonly value: string;
  readonly mono?: boolean;
  readonly copyable?: boolean;
  readonly onCopy?: () => void;
  readonly suffix?: ReactNode;
  readonly className?: string;
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
  const [copied, setCopied] = useState(false);

  if (isDev) {
    if (!label) {
      console.warn("[ReadOnlyField] label should not be empty");
    }
    if (copyable && !value) {
      console.warn(
        "[ReadOnlyField] copyable is true but value is empty — nothing to copy",
      );
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-on-surface">
        {label}
      </label>
      <div className="flex min-h-8 items-center gap-2">
        <span
          className={cn(
            "truncate text-sm",
            mono
              ? "font-mono text-on-surface-variant"
              : "text-on-surface",
          )}
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 cursor-pointer p-1 text-on-surface-variant transition-colors hover:text-primary"
            aria-label={`Copy ${label}`}
          >
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
              style={{ fontSize: 16 }}
            >
              {copied ? "check" : "content_copy"}
            </span>
          </button>
        )}
        {suffix}
      </div>
    </div>
  );
}
