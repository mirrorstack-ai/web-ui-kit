import { useState, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "ReadOnlyField",
  description:
    "Label/value pair display with optional copy-to-clipboard button, prefix/suffix slots, and stacked or inline layout.",
};

export type ReadOnlyFieldLayout = "stacked" | "inline";

export interface ReadOnlyFieldProps {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
  /** Slot rendered before the value (e.g. small icon). */
  prefix?: ReactNode;
  /** Slot rendered after the value (e.g. status badge). */
  suffix?: ReactNode;
  /** "stacked" puts label above value (default). "inline" puts them on one row. */
  layout?: ReadOnlyFieldLayout;
  className?: string;
}

export function ReadOnlyField({
  label,
  value,
  mono = false,
  copyable = false,
  onCopy,
  prefix,
  suffix,
  layout = "stacked",
  className,
}: ReadOnlyFieldProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    }).catch(() => {});
  }, [value, onCopy]);

  const valueRow = (
    <div className="flex items-center gap-2 min-h-8 min-w-0">
      {prefix}
      <span
        className={cn(
          "text-sm truncate",
          mono ? "font-mono text-on-surface-variant" : "text-on-surface",
        )}
      >
        {value}
      </span>
      {copyable && (
        <IconButton
          icon={copied ? "check" : "content_copy"}
          variant="text"
          size="sm"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : `Copy ${label}`}
          className={cn(
            "shrink-0",
            copied ? "text-success" : "text-on-surface-variant",
          )}
        />
      )}
      {suffix}
    </div>
  );

  if (layout === "inline") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <label className="text-sm font-medium text-on-surface shrink-0">
          {label}
        </label>
        <div className="flex-1 min-w-0">{valueRow}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-on-surface mb-1">
        {label}
      </label>
      {valueRow}
    </div>
  );
}
