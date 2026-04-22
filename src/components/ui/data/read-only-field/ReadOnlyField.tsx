import { useState, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "ReadOnlyField",
  description:
    "Label/value pair display with optional copy-to-clipboard button and suffix slot",
};

export interface ReadOnlyFieldProps {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
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
          <IconButton
            icon={copied ? "check" : "content_copy"}
            variant="text"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : `Copy ${label}`}
            className={cn("shrink-0", copied ? "text-success" : "text-on-surface-variant")}
          />
        )}
        {suffix}
      </div>
    </div>
  );
}
