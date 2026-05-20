import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Breadcrumb",
  description:
    "Navigable path trail showing the user's location in the app hierarchy. Prefixed with a back arrow; segments separated by slashes; each segment is an anchor link.",
};

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  /**
   * Ordered list of trail segments, root-first. Every segment renders
   * as a clickable anchor; the rightmost segment is the next level up
   * from the current page (the current page itself is owned by the
   * page heading, not the breadcrumb).
   */
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-sm text-on-surface-variant",
        className,
      )}
    >
      <Icon name="arrow_back" size={16} className="shrink-0" />
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.href}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden className="text-on-surface-variant/60">
                /
              </span>
            )}
            <a
              href={item.href}
              className="rounded-sm transition-colors hover:text-on-surface hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
