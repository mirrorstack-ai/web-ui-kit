import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "StatusIndicator",
  description:
    "Card-style status indicator with colored dot or icon, label, and optional subtitle.",
};

export type StatusLevel =
  | "online"
  | "offline"
  | "warning"
  | "error"
  | "unknown";

export interface StatusIndicatorProps {
  status: StatusLevel;
  label: string;
  sub?: string;
  /** Material Symbols icon name — replaces the status dot */
  icon?: string;
  /** Animate the dot. Defaults to true for online and warning. */
  pulse?: boolean;
  className?: string;
}

const colorMap: Record<StatusLevel, string> = {
  online: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  offline: "currentColor",
  unknown: "currentColor",
};

const defaultPulse: Record<StatusLevel, boolean> = {
  online: true,
  warning: true,
  error: false,
  offline: false,
  unknown: false,
};

export function StatusIndicator({
  status,
  label,
  sub,
  icon,
  pulse,
  className,
}: StatusIndicatorProps) {
  const color = colorMap[status];
  const shouldPulse = pulse ?? defaultPulse[status];

  return (
    <div className={cn("h-full w-full flex flex-col justify-between p-1", className)}>
      {/* Top section: dot or icon */}
      <div>
        {icon ? (
          <span style={{ color }}>
            <Icon name={icon} size={20} />
          </span>
        ) : (
          <div className="relative h-4 w-4">
            {shouldPulse && (
              <span
                className="absolute inset-0 rounded-full animate-pulse"
                style={{ backgroundColor: color, opacity: 0.3 }}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "absolute top-1 left-1 h-2 w-2 rounded-full",
                status === "offline" && "opacity-30",
                status === "unknown" && "opacity-20",
              )}
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Bottom section: label + sub */}
      <div className="min-w-0">
        <p className="text-xs opacity-60 truncate">{label}</p>
        {sub && <p className="text-[10px] opacity-40 truncate">{sub}</p>}
      </div>
    </div>
  );
}
