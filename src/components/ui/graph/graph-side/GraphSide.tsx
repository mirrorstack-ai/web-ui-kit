import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { GraphSideHeader } from "./GraphSideHeader";
import type { GraphSideNode } from "./types";

// GraphSideNode lives in ./types so siblings can import it without cycling back
// through GraphSide. Re-exported here for back-compat.
export type { GraphSideNode } from "./types";

export const meta: ComponentMeta = {
  name: "GraphSide",
  description:
    "Slide-in side panel showing details for a selected Graph node. Renders inside a relative-positioned parent (e.g. GraphLayout's side slot).",
};

export interface GraphSideProps<T extends GraphSideNode = GraphSideNode> {
  node: T | null;
  /** Force-control open state. Defaults to `node != null`. */
  open?: boolean;
  onClose: () => void;
  renderDetails: (node: T) => ReactNode;
  /** Panel width — number for pixels, string for any CSS value. Default 260. */
  width?: number | string;
  className?: string;
  /** Class passed straight to the auto-rendered GraphSideHeader.
      Useful for theming the header per node — e.g. swapping the
      surface to a success / warning / error tint while the details
      body keeps its default styling. */
  headerClassName?: string;
}

export function GraphSide<T extends GraphSideNode = GraphSideNode>({
  node,
  open,
  onClose,
  renderDetails,
  width = 260,
  className,
  headerClassName,
}: GraphSideProps<T>) {
  // Remember the last non-null node so the close animation keeps showing
  // its label/tags while sliding out, instead of snapping to an empty header.
  const lastNodeRef = useRef<T | null>(node);
  if (node) lastNodeRef.current = node;
  const display = node ?? lastNodeRef.current;
  const isOpen = open ?? Boolean(node);

  return (
    <div
      className={cn(
        "absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "translate-x-[calc(100%+0.375rem)]",
        className,
      )}
      style={{ width }}
      aria-hidden={!isOpen}
    >
      <GraphSideHeader node={display} onClose={onClose} className={headerClassName} />
      <div className="flex-1 min-h-0 overflow-hidden">
        {isOpen && display ? renderDetails(display) : null}
      </div>
    </div>
  );
}
