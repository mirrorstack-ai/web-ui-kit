import {
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "FloatingLabelInput",
  description:
    "Text input or textarea with floating label animation, password toggle, and character counter.",
};

export type FloatingLabelInputSize = "xs" | "sm" | "md";

type BaseProps = {
  label: string;
  containerClassName?: string;
  error?: boolean;
  helperText?: string;
  size?: FloatingLabelInputSize;
  /** Hide the floating label (useful for compact inline inputs) */
  hideLabel?: boolean;
  /** Use inverse-themed tokens (for placement on inverse surfaces such as
   *  the agent sidebar where the surrounding bg is `on-background`). */
  inverse?: boolean;
};

type InputModeProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "size"> & {
    multiline?: false;
    showPasswordToggle?: boolean;
    rows?: never;
    maxLength?: number;
  };

type TextareaModeProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder" | "size"> & {
    multiline: true;
    showPasswordToggle?: never;
    rows?: number;
    maxLength?: number;
  };

export type FloatingLabelInputProps = InputModeProps | TextareaModeProps;

export function FloatingLabelInput(props: FloatingLabelInputProps) {
  const {
    label,
    id,
    containerClassName,
    className,
    error = false,
    helperText,
    disabled,
    size = "md",
    hideLabel = false,
    inverse = false,
    multiline,
    maxLength,
  } = props;

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle =
    !multiline && (props as InputModeProps).showPasswordToggle;
  const type = !multiline
    ? ((props as InputModeProps).type ?? "text")
    : undefined;

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const value = props.value;
  const charCount = typeof value === "string" ? value.length : 0;
  const showCounter = multiline && maxLength != null;
  const counterId = showCounter && id ? `${id}-counter` : undefined;

  const userPlaceholder = (props as { placeholder?: string }).placeholder;
  const hasValue = typeof value === "string" ? value.length > 0 : !!value;
  const visiblePlaceholder = hideLabel
    ? (userPlaceholder || label)
    : (focused && !hasValue && userPlaceholder ? userPlaceholder : " ");

  const originalOnFocus = (props as { onFocus?: (e: React.FocusEvent) => void }).onFocus;
  const originalOnBlur = (props as { onBlur?: (e: React.FocusEvent) => void }).onBlur;

  const handleFocus = (e: React.FocusEvent) => {
    setFocused(true);
    originalOnFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent) => {
    setFocused(false);
    originalOnBlur?.(e);
  };

  const isXs = size === "xs";
  const isSmall = size === "sm";

  const fieldClassName = cn(
    "peer w-full rounded-lg bg-transparent border-0 outline-none transition-colors disabled:cursor-not-allowed",
    // Hide the native WebKit search-cancel button (the 3D-looking `x` that
    // appears on `<input type="search">` when it has text). Consumers can
    // render their own flat clear button if needed.
    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
    inverse
      ? "text-inverse-on-surface placeholder:text-inverse-on-surface/40"
      : "text-on-surface",
    error
      ? "focus:text-error"
      : inverse
        ? "focus:text-inverse-on-surface"
        : "focus:text-primary",
    isXs ? "px-2 text-sm" : isSmall ? "px-3 text-sm" : "px-4",
    multiline
      ? showCounter
        ? "pt-3 pb-6 resize-none"
        : "pt-3 pb-2 resize-none"
      : isXs ? "py-1.5" : isSmall ? "py-2.5" : "py-4",
    !multiline && showPasswordToggle && type === "password" && "pr-12",
    className,
  );

  const borderClassName = cn(
    "relative flex border rounded-lg transition-colors",
    inverse ? "bg-inverse-on-surface/[0.06]" : "bg-surface-container-low",
    multiline ? "items-start" : "items-center",
    error
      ? "border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error"
      : inverse
        ? "border-inverse-on-surface/30 hover:border-inverse-on-surface/50 focus-within:ring-2 focus-within:ring-inverse-primary/30 focus-within:border-inverse-primary/60"
        : "border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",
    disabled && "opacity-50 cursor-not-allowed",
  );

  const labelClassName = cn(
    "absolute z-10 font-normal px-1 rounded-md transition-all duration-200 ease-in-out",
    "origin-top-left pointer-events-none",
    inverse ? "bg-inverse-surface" : "bg-surface-container-low",
    isXs
      ? "text-sm left-2 top-1.5 peer-focus:scale-90 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2"
      : isSmall
        ? "text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5"
        : "text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",
    error
      ? "text-error peer-focus:text-error"
      : inverse
        ? "text-inverse-on-surface/55 peer-focus:text-inverse-primary"
        : "text-on-surface-variant peer-focus:text-primary",
  );

  return (
    <div className={cn("relative", containerClassName)}>
      <div className={borderClassName}>
        {multiline ? (
          <textarea
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            value={value as string}
            onChange={(props as TextareaModeProps).onChange}
            rows={(props as TextareaModeProps).rows}
            className={fieldClassName}
            placeholder={visiblePlaceholder}
            aria-label={hideLabel ? label : undefined}
            aria-describedby={counterId}
            onFocus={handleFocus as React.FocusEventHandler<HTMLTextAreaElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLTextAreaElement>}
          />
        ) : (
          <input
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            value={value as string}
            onChange={(props as InputModeProps).onChange}
            type={inputType}
            className={fieldClassName}
            placeholder={visiblePlaceholder}
            aria-label={hideLabel ? label : undefined}
            onFocus={handleFocus as React.FocusEventHandler<HTMLInputElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLInputElement>}
          />
        )}
        {!hideLabel && (
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
        {showPasswordToggle && type === "password" && (
          <IconButton
            icon={showPassword ? "visibility_off" : "visibility"}
            variant="text"
            size="sm"
            className="absolute right-2 text-on-surface-variant hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
            type="button"
          />
        )}
        {showCounter && (
          <span
            id={counterId}
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "absolute bottom-2 right-3 text-xs pointer-events-none",
              maxLength && charCount > maxLength * 0.875
                ? "text-error"
                : "text-on-surface-variant",
            )}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      {helperText && (
        <p
          className={cn(
            "text-xs mt-1 px-4",
            error ? "text-error" : "text-on-surface-variant",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
