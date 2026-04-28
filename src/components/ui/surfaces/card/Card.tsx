import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Card",
  description:
    "Card layout with optional media area, content, and action buttons built on Surface",
};

export interface CardProps {
  /** Content area — title, description, etc. */
  children: ReactNode;
  /** Optional top area for images, video, or color blocks. */
  media?: ReactNode;
  /** Optional bottom area with action buttons. */
  actions?: ReactNode;
  /** Delegates to Surface's interactive prop for hover styles. */
  interactive?: boolean;
  /** Applied to the outer Surface. */
  className?: string;
}

export function Card({
  children,
  media,
  actions,
  interactive,
  className,
}: CardProps) {
  return (
    <Surface
      interactive={interactive}
      className={cn("p-0 overflow-hidden", className)}
    >
      {media}
      <div className="p-4">{children}</div>
      {actions && (
        <div className="flex justify-end gap-2 px-4 pb-4">{actions}</div>
      )}
    </Surface>
  );
}
