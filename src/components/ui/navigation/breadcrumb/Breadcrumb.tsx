import type { MouseEvent } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Breadcrumb",
  description:
    "Navigable path trail showing the user's location in the app hierarchy. Prefixed with a back arrow that links to the first (root) segment; segments separated by slashes; each segment is an anchor link.",
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
  /**
   * Called when a segment (or the back arrow) is clicked, with the target
   * href and the click event, *before* the browser follows the link. Call
   * `event.preventDefault()` to intercept navigation — e.g. to confirm
   * discarding unsaved changes, then route yourself — otherwise the anchor
   * navigates as normal. When omitted, every segment is a plain link.
   */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function Breadcrumb({ items, onNavigate, className }: BreadcrumbProps) {
  // The back arrow links to the first (root) segment — a quick jump to the
  // top of the trail, matching the arrow's "go back" affordance.
  const root = items[0];
  if (!root) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-sm text-on-surface-variant",
        className,
      )}
    >
      <a
        href={root.href}
        aria-label={`Back to ${root.label}`}
        onClick={onNavigate ? (e) => onNavigate(root.href, e) : undefined}
        className="inline-flex shrink-0 items-center leading-none rounded-sm transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        {/* 1em = the breadcrumb's own font size, so the arrow matches the
            segment text exactly; inline-flex + items-center centers the glyph. */}
        <Icon name="arrow_back" size="1em" />
      </a>
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
              onClick={onNavigate ? (e) => onNavigate(item.href, e) : undefined}
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
