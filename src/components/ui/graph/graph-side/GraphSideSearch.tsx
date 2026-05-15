import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideSearch",
  description:
    "Compact search input for the GraphSide panel — a single sm FloatingLabelInput with a hidden label. Place at the top of GraphSideContent.",
};

export interface GraphSideSearchProps {
  value: string;
  onChange: (value: string) => void;
  /** Visible placeholder + accessible label. Defaults to "Search". */
  placeholder?: string;
  className?: string;
}

export function GraphSideSearch({
  value,
  onChange,
  placeholder = "Search",
  className,
}: GraphSideSearchProps) {
  return (
    <FloatingLabelInput
      label={placeholder}
      hideLabel
      size="sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      containerClassName={className}
    />
  );
}
