import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button } from "@/components/ui/actions/button/Button";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import {
  OptionList,
  type OptionListItem,
} from "@/components/ui/surfaces/option-list/OptionList";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideGroup",
  description:
    "Editor for the Graph's colored groups. Each row has a query input (xs FloatingLabelInput) plus a color. Focusing the input opens a popover (portaled to body) showing filter operators; when the input starts with `source:` the popover swaps to the consumer-provided sources list. Picking an operator/source writes the query through the same `onChange` path as typing.",
};

export interface GraphSideGroupItem {
  id: string;
  /** Stable display name. Used as the fallback matching term when `query` is empty. */
  name: string;
  /** Match query; empty falls back to `name`. Operator prefixes are recognized hints — see `QUERY_OPERATORS`. */
  query?: string;
  color: string;
}

/** Default 10-color palette for new groups. */
export const DEFAULT_GROUP_PALETTE = [
  "#f5c14a", // amber
  "#a8d8a8", // mint
  "#cbb6e5", // lavender
  "#f4a8a8", // rose
  "#8db8e8", // sky
  "#6ee7b7", // teal
  "#fb923c", // orange
  "#fda4af", // coral
  "#a5b4fc", // indigo
  "#fcd34d", // yellow
];

const SOURCE_PREFIX = "source:";
const NAME_PREFIX = "name:";
const DESCRIPTION_PREFIX = "description:";
const CONTENT_PREFIX = "content:";

const QUERY_OPERATORS: OptionListItem[] = [
  { value: SOURCE_PREFIX, description: "match the node's source" },
  { value: NAME_PREFIX, description: "match the node's title" },
  { value: DESCRIPTION_PREFIX, description: "match the node's description" },
  { value: CONTENT_PREFIX, description: "match the node's content" },
];

const POPOVER_WIDTH = 280;
const POPOVER_VIEWPORT_PAD = 8;

export interface GraphSideGroupProps {
  groups: GraphSideGroupItem[];
  onChange: (groups: GraphSideGroupItem[]) => void;
  /** Override the 10-color default palette `New group` cycles through. */
  palette?: string[];
  /** Source values shown when the input starts with `source:`. */
  sources?: string[];
  className?: string;
}

export function GraphSideGroup({
  groups,
  onChange,
  palette = DEFAULT_GROUP_PALETTE,
  sources = [],
  className,
}: GraphSideGroupProps) {
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);
  const [, forceUpdate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Tick on scroll/resize while focused so the inline position math re-runs.
  useEffect(() => {
    if (!focusedRowId) return;
    const tick = () => forceUpdate((c) => c + 1);
    window.addEventListener("scroll", tick, true);
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick, true);
      window.removeEventListener("resize", tick);
    };
  }, [focusedRowId]);

  // Close on click outside the editor AND outside the portaled popover.
  // Matches the kit's existing Combobox/DropdownMenu pattern (reliable on
  // touch devices, no setTimeout race). Escape is left to the input itself.
  useClickOutside({
    refs: [containerRef, popoverRef],
    onDismiss: () => setFocusedRowId(null),
    enabled: true,
    closeOnEscape: false,
  });

  const update = (id: string, patch: Partial<GraphSideGroupItem>) =>
    onChange(groups.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const remove = (id: string) => onChange(groups.filter((g) => g.id !== id));

  const pickNextColor = (): string => {
    const used = new Set(groups.map((g) => g.color.toLowerCase()));
    return palette.find((c) => !used.has(c.toLowerCase())) ?? palette[0];
  };

  const add = () => {
    onChange([
      ...groups,
      {
        id: `g-${Date.now()}`,
        name: `Group ${groups.length + 1}`,
        query: "",
        color: pickNextColor(),
      },
    ]);
  };

  const focusedGroup = focusedRowId
    ? groups.find((g) => g.id === focusedRowId)
    : null;

  // Popover mode is derived directly from the input value — no state, no race.
  const inputValue = focusedGroup?.query ?? "";
  const isSourceMode = inputValue.toLowerCase().startsWith(SOURCE_PREFIX);

  const operatorItems = QUERY_OPERATORS.filter((op) =>
    op.value.toLowerCase().startsWith(inputValue.toLowerCase()),
  );
  const sourceItems = isSourceMode
    ? (() => {
        const term = inputValue.slice(SOURCE_PREFIX.length).toLowerCase();
        return sources
          .filter((s) => s.toLowerCase().includes(term))
          .map((s) => ({ value: s }));
      })()
    : [];

  // Always show something while focused; fall back to the full operator
  // list when nothing matches so the menu doesn't blink out.
  const popoverItems: OptionListItem[] = isSourceMode
    ? sourceItems
    : operatorItems.length > 0
      ? operatorItems
      : QUERY_OPERATORS;
  const popoverTitle = isSourceMode ? "Sources" : "Search options";

  const handleSelect = (item: OptionListItem) => {
    if (!focusedGroup) return;
    if (isSourceMode) {
      update(focusedGroup.id, { query: `${SOURCE_PREFIX}${item.value}` });
      setFocusedRowId(null);
      return;
    }
    if (item.value === SOURCE_PREFIX) {
      // Switch into sources mode by writing the prefix; the next render
      // recomputes `isSourceMode` → popover swaps to the sources list.
      update(focusedGroup.id, { query: SOURCE_PREFIX });
      return;
    }
    update(focusedGroup.id, { query: item.value });
    setFocusedRowId(null);
  };

  // Compute popover position inline from the focused row's rect.
  let popoverPos: { top: number; left: number } | null = null;
  if (focusedGroup) {
    const el = rowRefs.current.get(focusedGroup.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const left = Math.max(
        POPOVER_VIEWPORT_PAD,
        Math.min(
          rect.right - POPOVER_WIDTH,
          window.innerWidth - POPOVER_WIDTH - POPOVER_VIEWPORT_PAD,
        ),
      );
      popoverPos = { top: rect.bottom + 4, left };
    }
  }

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-1.5", className)}>
      {groups.map((g) => (
        <div
          key={g.id}
          ref={(el) => {
            if (el) rowRefs.current.set(g.id, el);
            else rowRefs.current.delete(g.id);
          }}
          className="flex items-center gap-2.5"
        >
          <FloatingLabelInput
            label={g.name}
            hideLabel
            size="xs"
            value={g.query ?? ""}
            onChange={(e) => update(g.id, { query: e.target.value })}
            onFocus={() => setFocusedRowId(g.id)}
            containerClassName="flex-1 min-w-0"
          />
          <div className="flex items-center shrink-0 gap-0.5">
            <label
              className="relative w-5 h-5 rounded-full border border-outline-variant cursor-pointer"
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
            <IconButton
              icon="close"
              aria-label={`Delete ${g.name}`}
              tooltip="Delete group"
              size="sm"
              variant="text"
              onClick={() => remove(g.id)}
            />
          </div>
        </div>
      ))}
      <Button
        variant="filled"
        color="primary"
        size="xs"
        className="w-full mt-1"
        onClick={add}
      >
        New group
      </Button>
      {focusedGroup &&
        popoverPos &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: popoverPos.top,
              left: popoverPos.left,
              width: POPOVER_WIDTH,
              zIndex: 999,
            }}
          >
            <OptionList
              title={popoverTitle}
              showInfo={!isSourceMode}
              items={popoverItems}
              onSelect={handleSelect}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
