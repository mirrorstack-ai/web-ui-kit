export type ButtonVariant = "filled" | "tonal" | "outline" | "text";
export type ButtonColor = "primary" | "secondary" | "tertiary" | "error" | "warning";
export type ButtonSize = "sm" | "md" | "lg";

const filledStyles: Record<ButtonColor, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
  tertiary:
    "bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container",
  error:
    "bg-error text-on-error hover:bg-error-container hover:text-on-error-container",
  warning:
    "bg-warning text-on-warning hover:bg-warning-container hover:text-on-warning-container",
};

const tonalStyles: Record<ButtonColor, string> = {
  primary:
    "bg-primary-container text-on-primary-container hover:bg-primary/20",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:bg-secondary/20",
  tertiary:
    "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary/20",
  error: "bg-error-container text-on-error-container hover:bg-error/20",
  warning:
    "bg-warning-container text-on-warning-container hover:bg-warning/20",
};

const outlineStyles: Record<ButtonColor, string> = {
  primary: "border border-outline-variant text-primary hover:bg-primary/8",
  secondary:
    "border border-outline-variant text-secondary hover:bg-secondary/8",
  tertiary:
    "border border-outline-variant text-tertiary hover:bg-tertiary/8",
  error: "border border-error/50 text-error hover:bg-error/8",
  warning: "border border-warning/50 text-warning hover:bg-warning/8",
};

const textStyles: Record<ButtonColor, string> = {
  primary: "text-primary hover:bg-primary/8",
  secondary: "text-secondary hover:bg-secondary/8",
  tertiary: "text-tertiary hover:bg-tertiary/8",
  error: "text-error hover:bg-error/8",
  warning: "text-warning hover:bg-warning/8",
};

export const variantMap: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: filledStyles,
  tonal: tonalStyles,
  outline: outlineStyles,
  text: textStyles,
};

export const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 24,
  lg: 28,
};
