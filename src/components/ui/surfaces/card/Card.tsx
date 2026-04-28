import type { ReactNode } from "react";
import type { ComponentMeta } from "@/types/component-meta";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import { Skeleton } from "@/components/ui/feedback/skeleton/Skeleton";

export const meta: ComponentMeta = {
  name: "Card",
  description: "Surface wrapper with common card patterns including loading state",
};

export interface CardProps {
  children: ReactNode;
  /** Adds hover background, transition, and pointer cursor (delegates to Surface). */
  interactive?: boolean;
  /** When true, renders Skeleton placeholders instead of children. */
  loading?: boolean;
  /** Additional classes passed through to Surface. */
  className?: string;
}

export function Card({ children, interactive, loading, className }: CardProps) {
  return (
    <Surface interactive={interactive} className={className}>
      {loading ? (
        <Skeleton lines={3} />
      ) : (
        children
      )}
    </Surface>
  );
}
