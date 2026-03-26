"use client";

import {
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";

type BaseProps = {
  /** Label text shown as floating label */
  label: string;
  /** Extra classes on the outer wrapper */
  containerClassName?: string;
  /** Show error state with red border */
  error?: boolean;
  /** Helper text or error message shown below input */
  helperText?: string;
};

type InputModeProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
    /** Render as textarea */
    multiline?: false;
    /** Show a password visibility toggle button */
    showPasswordToggle?: boolean;
    /** Number of rows (only for multiline) */
    rows?: never;
    /** Max character count -- shows counter below field */
    maxLength?: number;
  };

type TextareaModeProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder"> & {
    /** Render as textarea */
    multiline: true;
    /** Show a password visibility toggle button */
    showPasswordToggle?: never;
    /** Number of visible rows */
    rows?: number;
    /** Max character count -- shows counter below field */
    maxLength?: number;
  };

export type FloatingLabelInputProps = InputModeProps | TextareaModeProps;

export function Input(props: FloatingLabelInputProps) {
  const {
    label,
    id,
    containerClassName,
    className,
    error = false,
    helperText,
    disabled,
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

  // Extract value for character counter
  const value = props.value;
  const charCount = typeof value === "string" ? value.length : 0;
  const showCounter = multiline && maxLength != null;
  const counterId = showCounter && id ? `${id}-counter` : undefined;

  // Separate known props from rest to avoid overriding computed values
  const {
    label: _l,
    id: _id,
    containerClassName: _cc,
    className: _cls,
    error: _e,
    helperText: _ht,
    disabled: _dis,
    multiline: _m,
    maxLength: _mx,
    showPasswordToggle: _spt,
    type: _type,
    placeholder: _userPlaceholder,
    onFocus: _onFocus,
    onBlur: _onBlur,
    ...rest
  } = props as Record<string, unknown>;

  const userPlaceholder = _userPlaceholder as string | undefined;

  // Show user placeholder only when focused (label has floated up)
  const hasValue = typeof value === "string" ? value.length > 0 : !!value;
  const visiblePlaceholder =
    focused && !hasValue && userPlaceholder ? userPlaceholder : " ";

  const handleFocus = (e: React.FocusEvent) => {
    setFocused(true);
    (_onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
  };
  const handleBlur = (e: React.FocusEvent) => {
    setFocused(false);
    (_onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
  };

  const sharedClassName = cn(
    "peer w-full rounded-lg px-4 bg-transparent border-0 outline-none text-on-surface transition-colors disabled:cursor-not-allowed",
    error ? "focus:text-error" : "focus:text-primary",
    multiline
      ? showCounter
        ? "pt-3 pb-6 resize-none"
        : "pt-3 pb-2 resize-none"
      : "py-4",
    !multiline && showPasswordToggle && type === "password" && "pr-12",
    className,
  );

  return (
    <div className={cn("relative", containerClassName)}>
      <div
        className={cn(
          "relative flex border rounded-lg transition-colors bg-surface-container-low",
          multiline ? "items-start" : "items-center",
          error
            ? "border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error"
            : "border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",
          disabled &&
            "opacity-50 cursor-not-allowed hover:border-outline-variant",
        )}
      >
        {multiline ? (
          <textarea
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            className={sharedClassName}
            placeholder={visiblePlaceholder}
            aria-describedby={counterId}
            onFocus={
              handleFocus as React.FocusEventHandler<HTMLTextAreaElement>
            }
            onBlur={
              handleBlur as React.FocusEventHandler<HTMLTextAreaElement>
            }
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            type={inputType}
            disabled={disabled}
            maxLength={maxLength}
            className={sharedClassName}
            placeholder={visiblePlaceholder}
            onFocus={
              handleFocus as React.FocusEventHandler<HTMLInputElement>
            }
            onBlur={
              handleBlur as React.FocusEventHandler<HTMLInputElement>
            }
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label
          htmlFor={id}
          className={cn(
            "absolute text-base z-10 font-normal left-4 top-4 px-1 bg-surface-container-low rounded-md transition-all duration-200 ease-in-out origin-top-left pointer-events-none",
            "peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3",
            "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",
            error
              ? "text-error peer-focus:text-error"
              : "text-on-surface-variant peer-focus:text-primary",
          )}
        >
          {label}
        </label>
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute right-2 h-8 w-8 rounded-lg inline-flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 20 }}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
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

// Re-export with the legacy name for compatibility
export { Input as FloatingLabelInput };
