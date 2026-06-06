import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "DataTable",
  description:
    "Compact mini table for structured data in NotchGrid tiles — sticky header, truncated cells, optional monospace and right-alignment per column.",
};

export interface DataTableColumn {
  key: string;
  label: string;
  /** CSS width, e.g. `"80px"` or `"30%"`. */
  width?: string;
  /** Text alignment. Default `"left"`. */
  align?: "left" | "right";
  /** Render cell text in a monospace font. */
  mono?: boolean;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, string | undefined>[];
  /** Tighter vertical padding on data rows. */
  compact?: boolean;
  className?: string;
}

export function DataTable({ columns, rows, compact = false, className }: DataTableProps) {
  if (isDev && columns.length === 0) {
    console.warn("[DataTable] `columns` is empty — nothing to render");
  }

  if (rows.length === 0) return null;

  return (
    <div className={cn("h-full w-full overflow-y-auto [scrollbar-width:thin]", className)}>
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-inherit">
          <tr className="border-b border-current/10">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-1.5 py-1 text-[10px] font-medium uppercase tracking-wider opacity-40",
                  col.align === "right" && "text-right",
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "text-xs",
                i < rows.length - 1 && "border-b border-current/5",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-1.5",
                    compact ? "py-0.5" : "py-1",
                    col.align === "right" && "text-right",
                    col.mono && "font-mono text-[11px]",
                  )}
                >
                  <div className="truncate">{row[col.key]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
