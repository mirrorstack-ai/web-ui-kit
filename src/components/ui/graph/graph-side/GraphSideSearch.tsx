import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideSearch",
  description:
    "Compact search input for the GraphSide panel — a sm FloatingLabelInput with its floating label visible. Place at the top of GraphSideContent via its `prepend` slot.",
};

export interface GraphSideSearchProps {
  value: string;
  onChange: (value: string) => void;
  /** Visible floating label. Defaults to "Search". */
  label?: string;
  className?: string;
}

export function GraphSideSearch({
  value,
  onChange,
  label = "Search",
  className,
}: GraphSideSearchProps) {
  return (
    <FloatingLabelInput
      label={label}
      size="sm"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      containerClassName={cn("my-1.5", className)}
    />
  );
}
