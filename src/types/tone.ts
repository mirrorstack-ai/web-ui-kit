// Tone is the shared severity/emphasis vocabulary across components
// that change border / text / background color to convey state. Each
// value maps to a corresponding theme token (e.g. `primary` →
// `--color-primary`).
//
// Component-specific color props (SwitchColor, ButtonColor) stay
// separate when they carry different valid sets — Tone is the
// superset useful for surfaces that don't have role-specific
// constraints.
export type Tone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "warning"
  | "success"
  | "info";

// Each map uses Tailwind's `<color>/40` opacity for borders so the
// accent stays subtle against the surface background; text maps keep
// full opacity for readability.
export const toneBorderClass: Record<Tone, string> = {
  primary: "border-primary/40",
  secondary: "border-secondary/40",
  tertiary: "border-tertiary/40",
  error: "border-error/40",
  warning: "border-warning/40",
  success: "border-success/40",
  info: "border-info/40",
};

export const toneTextClass: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  warning: "text-warning",
  success: "text-success",
  info: "text-info",
};
