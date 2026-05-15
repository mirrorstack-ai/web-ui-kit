import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideSearch",
  description:
    "Compact search input for the GraphSide panel — a single line input with a leading search icon. Place at the top of GraphSideContent.",
};

export interface GraphSideSearchProps {
  value: string;
  onChange: (value: string) => void;
  /** Placeholder + accessible label. Defaults to "Search". */
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
    <div
      className={cn(
        "flex items-center gap-2 mx-2 mt-4 mb-2 border border-outline-variant rounded-lg bg-transparent focus-within:ring-2 focus-within:ring-primary",
        className,
      )}
    >
      <Icon
        name="search"
        size={16}
        className="ml-2 text-on-surface-variant shrink-0"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 min-w-0 px-2 py-1.5 text-sm bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none"
      />
    </div>
  );
}
