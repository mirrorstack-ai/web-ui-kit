import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideGroup",
  description:
    "Editor for the Graph's colored groups — each row binds a name and a color used to tint nodes that belong to the group.",
};

export interface GraphSideGroupItem {
  id: string;
  name: string;
  color: string;
}

export interface GraphSideGroupProps {
  groups: GraphSideGroupItem[];
  onChange: (groups: GraphSideGroupItem[]) => void;
  /** Color picked by "+ Add group" when no group is selected. */
  defaultNewColor?: string;
  className?: string;
}

export function GraphSideGroup({
  groups,
  onChange,
  defaultNewColor = "#1976d2",
  className,
}: GraphSideGroupProps) {
  const update = (id: string, patch: Partial<GraphSideGroupItem>) =>
    onChange(groups.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const remove = (id: string) => onChange(groups.filter((g) => g.id !== id));

  const add = () =>
    onChange([
      ...groups,
      {
        id: `g-${Date.now()}`,
        name: `Group ${groups.length + 1}`,
        color: defaultNewColor,
      },
    ]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {groups.map((g) => (
        <div key={g.id} className="flex items-center gap-2">
          <label
            className="relative w-7 h-7 rounded-full border border-outline-variant cursor-pointer shrink-0"
            style={{ backgroundColor: g.color }}
            aria-label={`${g.name} color`}
          >
            <input
              type="color"
              value={g.color}
              onChange={(e) => update(g.id, { color: e.target.value })}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          <input
            type="text"
            value={g.name}
            onChange={(e) => update(g.id, { name: e.target.value })}
            className="flex-1 min-w-0 px-2 py-1 text-sm bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <IconButton
            icon="delete"
            aria-label={`Delete ${g.name}`}
            tooltip="Delete group"
            size="sm"
            variant="text"
            color="error"
            onClick={() => remove(g.id)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center gap-1 text-sm text-primary py-2 rounded-lg cursor-pointer hover:bg-primary/8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="material-symbols-rounded text-base">add</span>
        Add group
      </button>
    </div>
  );
}
