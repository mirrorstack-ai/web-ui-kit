// Theme token resolution for notch-grid items.
//
// Maps the dynamic-ui item-schema `theme` field (type × variant × gradient)
// to CSS values referencing the kit's tokens. Renderers apply the result as
// inline `style` (or by spreading into a `style` prop). See
// `mirrorstack-docs/architecture/notch-grid-v2/03-theme-tokens.md`.

export type ThemeType = "filled" | "outlined" | "elevated" | "ghost" | "auto";
export type ThemeVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "surface"
  | "neutral"
  | "warn"
  | "error"
  | "auto";

export interface NotchTheme {
  type?: ThemeType;
  variant?: ThemeVariant;
  /** Tonal-overlay intensity, 0–1. Ignored when fill is transparent. */
  gradient?: number;
}

export interface ResolvedTheme {
  /** CSS `background` — token reference, gradient, or `"transparent"`. */
  background: string;
  /** CSS `color` — always a token reference. */
  color: string;
  /** CSS `border` — `"1px solid var(...)"` or `"none"`. */
  border: string;
  /** CSS `border-left` for elevated warn/error (color cue layered on lift). */
  borderLeft?: string;
  /** CSS `box-shadow` — rectangular shadow on the bounding box. Kept for
   *  consumers that want bounding-box shadows. */
  boxShadow: string;
  /** CSS `filter` — drop-shadow chain that traces the actual rendered shape
   *  (SVG paths, notches). Use this on a wrapper around the painted content
   *  for accurate-to-outline shadows. `"none"` when no lift is intended. */
  filter: string;
}

const DEFAULT_VARIANT: Exclude<ThemeVariant, "auto"> = "neutral";

/** Resolved (non-`auto`) variant. */
type ConcreteVariant = Exclude<ThemeVariant, "auto">;
/** Resolved (non-`auto`) type. */
type ConcreteType = Exclude<ThemeType, "auto">;

/** Per-variant fill background token. Schema `warn` aliases to kit `warning`;
 *  `neutral` maps to the lowest-emphasis surface tone. */
const FILL_BG: Record<ConcreteVariant, string> = {
  primary: "var(--color-primary-container)",
  secondary: "var(--color-secondary-container)",
  tertiary: "var(--color-tertiary-container)",
  surface: "var(--color-surface-container)",
  neutral: "var(--color-surface-container-low)",
  warn: "var(--color-warning-container)",
  error: "var(--color-error-container)",
};

/** Per-variant on-fill text token (paired with FILL_BG). */
const FILL_FG: Record<ConcreteVariant, string> = {
  primary: "var(--color-on-primary-container)",
  secondary: "var(--color-on-secondary-container)",
  tertiary: "var(--color-on-tertiary-container)",
  surface: "var(--color-on-surface)",
  neutral: "var(--color-on-surface-variant)",
  warn: "var(--color-on-warning-container)",
  error: "var(--color-on-error-container)",
};

/** Per-variant accent color for outlined / ghost text and outlined border. */
const ACCENT: Record<ConcreteVariant, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  surface: "var(--color-on-surface)",
  neutral: "var(--color-on-surface-variant)",
  warn: "var(--color-warning)",
  error: "var(--color-error)",
};

/** Border color for outlined chrome (surface/neutral fall back to outline-variant). */
const OUTLINE_BORDER: Record<ConcreteVariant, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  surface: "var(--color-outline-variant)",
  neutral: "var(--color-outline-variant)",
  warn: "var(--color-warning)",
  error: "var(--color-error)",
};

/** Background for the elevated chrome (raised card look). Neutral drops one
 *  surface tier lower than the rest so the lift reads even on a busy page. */
const ELEVATED_BG: Record<ConcreteVariant, string> = {
  primary: "var(--color-surface-container-low)",
  secondary: "var(--color-surface-container-low)",
  tertiary: "var(--color-surface-container-low)",
  surface: "var(--color-surface-container-low)",
  neutral: "var(--color-surface-container-lowest)",
  warn: "var(--color-surface-container-low)",
  error: "var(--color-surface-container-low)",
};

/** Resolve `auto` knobs to concrete values:
 *  - `variant: auto` falls to `neutral`
 *  - `type: auto` becomes `filled` when a variant is set, `ghost` otherwise */
function resolveAuto(theme: NotchTheme): { type: ConcreteType; variant: ConcreteVariant } {
  const rawVariant = theme.variant ?? "auto";
  const variant: ConcreteVariant = rawVariant === "auto" ? DEFAULT_VARIANT : rawVariant;
  const rawType = theme.type ?? "auto";
  const type: ConcreteType =
    rawType === "auto"
      ? rawVariant === "auto"
        ? "ghost"
        : "filled"
      : rawType;
  return { type, variant };
}

/** Apply a tonal gradient overlay to a fill token. `gradient = 0` returns the
 *  raw token; `gradient = 1` mixes ~12% white at the top. The overlay only
 *  applies to filled chromes — transparent backgrounds are returned unchanged. */
function applyGradient(bg: string, gradient: number): string {
  if (gradient <= 0 || bg === "transparent") return bg;
  const pct = Math.min(1, gradient) * 12;
  return `linear-gradient(180deg, color-mix(in oklab, ${bg}, white ${pct}%) 0%, ${bg} 100%)`;
}

/**
 * Resolve a `NotchTheme` to CSS values referencing `web-ui-kit` tokens.
 *
 * Schema-to-kit aliases:
 * - `warn` → `warning` family (kit token name)
 * - `neutral` → low-emphasis surface chrome (kit has no `neutral` family)
 *
 * `auto` resolution is deterministic:
 * - `variant: auto` → `neutral`
 * - `type: auto` + variant set → `filled`
 * - `type: auto` + `variant: auto` → `ghost`
 */
export function resolveNotchTheme(theme?: NotchTheme): ResolvedTheme {
  const t = theme ?? {};
  const { type, variant } = resolveAuto(t);
  const gradient = t.gradient ?? 0;

  switch (type) {
    case "filled": {
      const bg = applyGradient(FILL_BG[variant], gradient);
      return {
        background: bg,
        color: FILL_FG[variant],
        border: "none",
        boxShadow: "none",
        filter: "none",
      };
    }
    case "outlined": {
      return {
        background: "transparent",
        color: ACCENT[variant],
        border: `1px solid ${OUTLINE_BORDER[variant]}`,
        boxShadow: "none",
        filter: "none",
      };
    }
    case "elevated": {
      const isAlert = variant === "warn" || variant === "error";
      return {
        background: applyGradient(ELEVATED_BG[variant], gradient),
        color: "var(--color-on-surface)",
        border: "none",
        ...(isAlert ? { borderLeft: `4px solid ${ACCENT[variant]}` } : {}),
        boxShadow: "var(--shadow-m3-1)",
        filter: "var(--filter-m3-1)",
      };
    }
    case "ghost": {
      return {
        background: "transparent",
        color: ACCENT[variant],
        border: "none",
        boxShadow: "none",
        filter: "none",
      };
    }
  }
}
