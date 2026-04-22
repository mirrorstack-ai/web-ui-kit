import type { ReactNode } from "react";
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
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => onCopy?.()).catch(() => {});
  };

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
            icon="content_copy"
            variant="text"
            size="sm"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
            className="shrink-0 text-on-surface-variant"
          />
        )}
        {suffix}
      </div>
    </div>
  );
}
