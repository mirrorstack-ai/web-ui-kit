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
      className={cn(
        "h-full w-full overflow-y-auto [scrollbar-width:thin]",
        className,
      )}
    >
      {entries.map((entry, index) => {
        const color = entry.status && entry.status !== "default"
          ? statusColor[entry.status]
          : undefined;

        const isLast = index === entries.length - 1;

        return (
          <div key={index} className="flex gap-2.5">
            {/* Rail: node at top, connector flowing down to the next node.
                items-center keeps the line aligned with the node; the line is
                drawn only BELOW the node, so it links nodes without ever
                crossing a glyph. */}
            <div className="flex w-4 shrink-0 flex-col items-center">
              {entry.icon ? (
                <span
                  className="leading-none"
                  style={color ? { color } : { opacity: 0.5 }}
                >
                  <Icon name={entry.icon} size={14} />
                </span>
              ) : (
                <span
                  className="mt-[3px] block size-[7px] rounded-full"
                  style={
                    color
                      ? { backgroundColor: color }
                      : { backgroundColor: "currentColor", opacity: 0.4 }
                  }
                />
              )}
              {!isLast && <div className="mb-1 w-px flex-1 bg-current/15" />}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pb-3">
              <p className="text-xs leading-tight">{entry.text}</p>
              <p className="mt-0.5 text-[10px] opacity-40">{entry.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
