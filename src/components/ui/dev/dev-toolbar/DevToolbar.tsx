import { type ReactElement } from "react";
import { isProd, isStorybook } from "@/utils/env";
import { cn } from "@/utils/cn";

export const meta = {
  name: "DevToolbar",
  description:
    "Fixed floating toolbar for switching dev states/views along one or several independent axes (scene, theme, locale)",
};

export interface DevToolbarItem {
  label: string;
  value: string;
}

/**
 * One independent dimension of a preview — a scene, a theme, a locale.
 *
 * 🔴 AXES EXIST BECAUSE THE BAR IS `fixed` AND CENTRED. Two DevToolbars do not
 * sit side by side, they sit ON each other, so a preview that needed a second
 * dimension could not add a second bar — it had to either fold the extra values
 * into this one's `items` (quiz-core, ms-app-modules#449) or pair the bar with a
 * ThemeToggle and a SegmentedButton of its own (ai-assistant, #441). Two
 * conventions, neither of them the kit's, both restyling the toolbar from
 * outside. One bar that knows about several axes is what lets them converge
 * (web-ui-kit#408, core-v2#1483).
 */
export interface DevToolbarAxis {
  /**
   * Short name shown before this axis's pills, e.g. "Scene", "Theme".
   *
   * Optional, and worth omitting for a single-axis bar where the `DEV:` prefix
   * already says what the pills are. With two or more axes it stops being
   * decoration: three rows of unlabelled pills are three rows of guesses.
   */
  label?: string;
  items: DevToolbarItem[];
  value: string;
  onChange: (value: string) => void;
}

interface DevToolbarBaseProps {
  showError?: boolean;
  onToggleError?: () => void;
}

/** The original shape: one axis, passed flat. Still the right call for one. */
interface DevToolbarSingleAxisProps extends DevToolbarBaseProps {
  items: DevToolbarItem[];
  value: string;
  onChange: (value: string) => void;
  axes?: never;
}

/** Two or more axes in one bar. */
interface DevToolbarMultiAxisProps extends DevToolbarBaseProps {
  axes: DevToolbarAxis[];
  items?: never;
  value?: never;
  onChange?: never;
}

/**
 * Deliberately a UNION rather than four optional props. Passing `items` and
 * `axes` together is a mistake with no sensible reading — is the flat one the
 * first axis, or ignored? — and the union makes it a compile error instead of a
 * silent choice made in here.
 */
export type DevToolbarProps =
  | DevToolbarSingleAxisProps
  | DevToolbarMultiAxisProps;

export function DevToolbar(props: DevToolbarProps): ReactElement | null {
  const { showError, onToggleError } = props;
  if (isProd && !isStorybook) return null;

  const axes: DevToolbarAxis[] = props.axes ?? [
    { items: props.items, value: props.value, onChange: props.onChange },
  ];

  return (
    // 🔴 `flex-wrap` plus a viewport-bounded width, because three axes do not
    // fit on a phone. The bar used to be a single nowrap row, which at 400px
    // ran off both edges of a centred, `fixed` element — unreachable pills, and
    // nothing to scroll because the body is not what overflowed. Wrapping keeps
    // every pill reachable at every width; the pills themselves stay `shrink-0`
    // so a long label never collapses into unreadability.
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] flex bg-surface-container border border-outline-variant rounded-2xl px-4 py-2 shadow-xl">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-on-surface-variant shrink-0">DEV:</span>
        {axes.map((axis, index) => (
          <div
            key={axis.label ?? `axis-${index}`}
            className="flex items-center gap-2"
            role="group"
            aria-label={axis.label}
          >
            {axis.label && (
              <span className="text-xs font-mono text-on-surface-variant shrink-0">
                {axis.label}
              </span>
            )}
            {axis.items.map((item) => (
              <button
                key={item.value}
                onClick={() => axis.onChange(item.value)}
                aria-pressed={axis.value === item.value}
                className={cn(
                  "px-2 py-1 text-xs rounded shrink-0 transition-colors",
                  axis.value === item.value
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                )}
              >
                {item.label}
              </button>
            ))}
            {/* 🔴 THE DIVIDER TRAILS ITS OWN AXIS, it does not lead the next
                one. Both render identically on one line, but at 400px the bar
                WRAPS — and a leading divider becomes an orphan `|` at the start
                of a row, reading as a stray glyph rather than a separator.
                Trailing, it ends a row the way a comma does. */}
            {index < axes.length - 1 && (
              <span className="w-px h-4 bg-outline-variant shrink-0" />
            )}
          </div>
        ))}
        {onToggleError && (
          <>
            <span className="w-px h-4 bg-outline-variant shrink-0" />
            <button
              onClick={onToggleError}
              aria-pressed={Boolean(showError)}
              className={cn(
                "px-2 py-1 whitespace-nowrap text-xs rounded shrink-0 transition-colors",
                showError
                  ? "bg-error text-on-error"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {showError ? "Error ON" : "Error OFF"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
