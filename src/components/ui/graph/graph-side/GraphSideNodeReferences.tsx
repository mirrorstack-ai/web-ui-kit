import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideNodeReferences",
  description:
    "Compact list of references from a graph node to other nodes. Each row is a leading dot + a text-style label. When `onSelect` is provided the label becomes a clickable link so the host can navigate the graph to the referenced node. Designed to stay tight as the list grows long.",
};

export interface GraphSideNodeReference {
  id: string;
  label: string;
}

export interface GraphSideNodeReferencesProps {
  items: GraphSideNodeReference[];
  onSelect?: (id: string) => void;
  /** Text shown when `items` is empty. Pass `null` to hide the empty state. */
  emptyText?: string | null;
  className?: string;
}

export function GraphSideNodeReferences({
  items,
  onSelect,
  emptyText = "No references",
  className,
}: GraphSideNodeReferencesProps) {
  if (items.length === 0) {
    if (emptyText === null) return null;
    return (
      <div
        className={cn(
          "px-2 py-1 text-xs text-on-surface-variant",
          className,
        )}
      >
        {emptyText}
      </div>
    );
  }

  const interactive = Boolean(onSelect);

  return (
    <ul className={cn("flex flex-col px-2", className)}>
      {items.map((ref) => (
        <li
          key={ref.id}
          className="flex items-center gap-2 py-0.5 text-sm leading-tight"
        >
          <span
            aria-hidden
            className="w-1 h-1 rounded-full bg-on-surface-variant shrink-0"
          />
          {interactive ? (
            <button
              type="button"
              onClick={() => onSelect?.(ref.id)}
              title={ref.label}
              className="truncate text-left text-primary hover:underline cursor-pointer focus:outline-none focus-visible:underline"
            >
              {ref.label}
            </button>
          ) : (
            <span title={ref.label} className="truncate text-on-surface">
              {ref.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
