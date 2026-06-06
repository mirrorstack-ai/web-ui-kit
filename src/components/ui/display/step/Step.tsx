import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Button } from "@/components/ui/actions/button/Button";

export const meta: ComponentMeta = {
  name: "Step",
  description:
    "Numbered wizard step with a spine line on the left. Status drives the circle styling (active / complete / pending). When complete, an optional `onEdit` surfaces an Edit affordance next to the title so the user can jump back.",
};

export type StepStatus = "active" | "complete" | "pending";

export interface StepProps {
  /** 1-based step number rendered inside the circle. */
  n: number;
  title: string;
  status: StepStatus;
  /** Suppress the connecting spine line below this step (use on the last step). */
  isLast?: boolean;
  /** Surfaces an Edit button next to the title when status is "complete". */
  onEdit?: () => void;
  children?: ReactNode;
  className?: string;
}

export function Step({
  n,
  title,
  status,
  isLast,
  onEdit,
  children,
  className,
}: StepProps) {
  return (
    <section className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center w-7 shrink-0">
        <div className="h-10 flex items-center shrink-0">
          <div
            className={cn(
              "size-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
              status === "pending"
                ? "bg-surface-container text-on-surface-variant"
                : "bg-primary text-on-primary",
            )}
          >
            {status === "complete" ? <Icon name="check" size={16} /> : n}
          </div>
        </div>
        {!isLast && <div className="w-px flex-1 bg-outline-variant/40" />}
      </div>
      <div className="flex-1 pb-6 min-w-0">
        <div className="flex items-center gap-3 h-10">
          <span
            className={cn(
              "text-base font-medium",
              status === "pending" ? "text-on-surface-variant" : "text-on-surface",
            )}
          >
            {title}
          </span>
          {status === "complete" && onEdit && (
            <Button variant="text" size="sm" leftIcon="edit" onClick={onEdit}>
              Edit
            </Button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
