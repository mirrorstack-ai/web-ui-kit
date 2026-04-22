import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "VerificationCodeInput",
  description: "6-digit code input with individual boxes, auto-advance, paste support, and auto-submit",
};

export interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Called when all 6 digits are entered */
  onComplete?: (code: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function VerificationCodeInput({
  value,
  onChange,
  onComplete,
  length = 6,
  disabled = false,
  error = false,
  className,
}: VerificationCodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.padEnd(length, "").slice(0, length).split("");

  const focusInput = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
  }, []);

  const updateValue = useCallback(
    (newDigits: string[]) => {
      const code = newDigits.join("").slice(0, length);
      onChange(code);
      if (code.length === length && /^\d+$/.test(code)) {
        onComplete?.(code);
      }
    },
    [onChange, onComplete, length],
  );

  const handleInput = useCallback(
    (index: number, char: string) => {
      if (!/^\d$/.test(char)) return;
      const next = [...digits];
      next[index] = char;
      updateValue(next);
      if (index < length - 1) {
        focusInput(index + 1);
      }
    },
    [digits, updateValue, focusInput, length],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = [...digits];
        if (digits[index]) {
          next[index] = "";
          updateValue(next);
        } else if (index > 0) {
          next[index - 1] = "";
          updateValue(next);
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [digits, updateValue, focusInput, length],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (!pasted) return;
      const next = pasted.padEnd(length, "").split("").slice(0, length);
      // Keep empty strings for unfilled positions
      const filled = next.map((d) => (d === " " ? "" : d));
      updateValue(filled);
      const focusIdx = Math.min(pasted.length, length - 1);
      focusInput(focusIdx);
    },
    [updateValue, focusInput, length],
  );

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digits[i] || ""}
          disabled={disabled}
          onChange={(e) => {
            const char = e.target.value.slice(-1);
            if (char) handleInput(i, char);
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "w-10 h-12 text-center text-lg font-semibold rounded-lg border bg-surface-container-low outline-none transition-colors",
            "focus:ring-2 focus:border-primary focus:ring-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-error focus:border-error focus:ring-error"
              : "border-outline-variant",
          )}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
