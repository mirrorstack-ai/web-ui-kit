import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Timeline",
  description:
    "Vertical chronological feed — compact alternative to ActivityList for NotchGrid tiles.",
};

export interface TimelineEntry {
  icon?: string;
  text: string;
  time: string;
  status?: "default" | "success" | "warning" | "error";
}

export interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

const statusColor: Record<string, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
};

export function Timeline({ entries, className }: TimelineProps) {
  if (entries.length === 0) return null;

  if (isDev && entries.length > 100) {
    console.warn(
      "[Timeline] Rendering more than 100 entries may impact performance.",
    );
  }

  return (
    <div
      className={cn("h-full w-full overflow-y-auto [scrollbar-width:thin]", className)}
    >
      {entries.map((entry, index) => {
        const color = entry.status && entry.status !== "default"
          ? statusColor[entry.status]
          : undefined;

        return (
          <div key={index} className="flex">
            {/* Left gutter */}
            <div className="relative w-[24px] shrink-0 ml-[7px]">
              {entries.length > 1 && (
                <div
                  className="absolute left-0 w-px bg-current/10"
                  style={{
                    top: index === 0 ? 14 : 0,
                    bottom: index === entries.length - 1 ? undefined : 0,
                    height: index === entries.length - 1 ? 14 : undefined,
                  }}
                />
              )}
              {entry.icon ? (
                <span
                  className="absolute -left-[7px] top-[7px]"
                  style={color ? { color } : { opacity: 0.5 }}
                >
                  <Icon name={entry.icon} size={14} />
                </span>
              ) : (
                <div
                  className="absolute -left-[3px] top-[9px] size-[6px] rounded-full"
                  style={
                    color
                      ? { backgroundColor: color }
                      : { backgroundColor: "currentColor", opacity: 0.4 }
                  }
                />
              )}
            </div>

            {/* Right content */}
            <div className="flex-1 min-w-0 py-1.5">
              <p className="text-xs">{entry.text}</p>
              <p className="text-[10px] opacity-40">{entry.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
