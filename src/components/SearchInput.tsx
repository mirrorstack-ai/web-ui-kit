import type { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Called when the clear button is clicked */
  onClear?: () => void;
}

export function SearchInput({
  value,
  onClear,
  className,
  ...props
}: SearchInputProps) {
  const hasValue = typeof value === "string" ? value.length > 0 : !!value;

  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
          search
        </span>
      </span>
      <input
        type="search"
        value={value}
        className="w-full h-10 pl-10 pr-10 rounded-lg bg-surface-container border border-outline-variant text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        {...props}
      />
      {hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 18 }}
          >
            close
          </span>
        </button>
      )}
    </div>
  );
}
