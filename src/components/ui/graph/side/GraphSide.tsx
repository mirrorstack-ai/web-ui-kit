import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSide",
  description:
    "Slide-in side panel showing details for a selected Graph node. Renders inside a relative-positioned parent (e.g. GraphLayout's side slot).",
};

/**
 * Minimal node shape the panel needs. Structurally compatible with
 * Graph's GraphNode so the same value can be passed to both.
 */
export interface GraphSideNode {
  id: string;
  label: string;
  tag?: string;
}

export interface GraphSideProps<T extends GraphSideNode = GraphSideNode> {
  node: T | null;
  /** Force-control open state. Defaults to `node != null`. */
  open?: boolean;
  onClose: () => void;
  renderDetails: (node: T) => ReactNode;
  /** Panel width — number for pixels, string for any CSS value. Default 260. */
  width?: number | string;
  className?: string;
}

export function GraphSide<T extends GraphSideNode = GraphSideNode>({
  node,
  open,
  onClose,
  renderDetails,
  width = 260,
  className,
}: GraphSideProps<T>) {
  // Remember the last non-null node so the close animation keeps showing
  // its label/tag while sliding out, instead of snapping to an empty header.
  const lastNodeRef = useRef<T | null>(node);
  if (node) lastNodeRef.current = node;
  const display = node ?? lastNodeRef.current;
  const isOpen = open ?? Boolean(node);

  return (
    <div
      className={cn(
        "absolute inset-y-1.5 right-1.5 bg-surface-container-low border border-outline-variant rounded-xl shadow-xl transition-transform duration-200 ease-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-[calc(100%+0.375rem)]",
        className,
      )}
      style={{ width }}
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between gap-2 p-3 border-b border-outline-variant">
        <div className="min-w-0">
          <div className="text-sm font-medium text-on-surface truncate">
            {display?.label ?? ""}
          </div>
          {display?.tag && (
            <div className="text-xs text-on-surface-variant mt-0.5 truncate">
              {display.tag}
            </div>
          )}
        </div>
        <IconButton
          icon="close"
          aria-label="Close details"
          tooltip="Close"
          size="sm"
          variant="text"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        {isOpen && display ? renderDetails(display) : null}
      </div>
    </div>
  );
}
