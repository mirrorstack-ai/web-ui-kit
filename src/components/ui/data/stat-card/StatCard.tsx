import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Card } from "@/components/ui/surfaces/card/Card";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "StatCard",
  description:
    "Compact stat tile — material-symbol icon on the left, small label above a single value on the right. Drop into a grid for overview pages.",
};

export interface StatCardProps {
  /** Material symbol icon name. */
  icon: string;
  /** Short label shown above the value (e.g. \"Installs\"). */
  label: string;
  /** The headline value. */
  value: ReactNode;
  className?: string;
}

export function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-3">
        <Icon name={icon} size={20} className="text-primary shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-on-surface-variant">{label}</p>
          <p
            className={cn(
              "text-sm font-medium text-on-surface",
              typeof value === "string" && "truncate",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}
