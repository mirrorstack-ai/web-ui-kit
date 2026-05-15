import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Badge } from "@/components/ui/feedback/badge/Badge";
import type { ComponentMeta } from "@/types/component-meta";
import type { GraphSideNode } from "./GraphSide";
import { SIDE_CARD_CLS } from "./styles";

export const meta: ComponentMeta = {
  name: "GraphSideHeader",
  description:
    "Header card for GraphSide — close button on the left, title + optional badges in a vertically-centered right column.",
};

export interface GraphSideHeaderProps {
  node: Pick<GraphSideNode, "label" | "tag" | "tags"> | null;
  onClose: () => void;
  className?: string;
}

export function GraphSideHeader({
  node,
  onClose,
  className,
}: GraphSideHeaderProps) {
  const tagList: string[] = [];
  if (node?.tags) tagList.push(...node.tags);
  if (node?.tag) tagList.push(node.tag);
  const hasTags = tagList.length > 0;

  return (
    <div
      className={cn(
        SIDE_CARD_CLS,
        "flex items-center gap-3 p-3",
        className,
      )}
    >
      <IconButton
        icon="close"
        aria-label="Close details"
        tooltip="Close"
        size="sm"
        variant="outline"
        onClick={onClose}
      />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-sm font-medium text-on-surface truncate">
          {node?.label ?? ""}
        </span>
        {hasTags && (
          <div className="flex flex-wrap items-center gap-1">
            {tagList.map((t) => (
              <Badge key={t} size="sm">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
