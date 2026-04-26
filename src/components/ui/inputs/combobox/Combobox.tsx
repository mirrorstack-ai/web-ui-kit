import { useState, useRef, useEffect, useMemo, useId } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Combobox",
  description:
    "Searchable dropdown with floating label, keyboard navigation, and optional free-text entry",
};

export interface ComboboxOption {
  value: string;
  label: string;
}

export type ComboboxSize = "sm" | "md";

export interface ComboboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | ComboboxOption)[];
  freeform?: boolean;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  size?: ComboboxSize;
  hideLabel?: boolean;
}

function normalizeOption(opt: string | ComboboxOption): ComboboxOption {
  return typeof opt === "string" ? { value: opt, label: opt } : opt;
}

export function Combobox({
  label,
  value,
  onChange,
  options: rawOptions,
  freeform = false,
  id,
  disabled = false,
  error = false,
  helperText,
  className,
  size = "md",
  hideLabel = false,
}: ComboboxProps) {
  const options = useMemo(() => rawOptions.map(normalizeOption), [rawOptions]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeDescendant, setActiveDescendant] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;
  const listboxId = `${inputId}-listbox`;

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setIsTyping(false);
        setSearch("");
        setActiveDescendant(-1);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const displayValue = isTyping
    ? search
    : options.find((o) => o.value === value)?.label ?? value;

  const filtered = useMemo(() => {
    if (!isTyping || !search) return options;
    const lower = search.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(lower) ||
        o.value.toLowerCase().includes(lower),
    );
  }, [options, search, isTyping]);

  useEffect(() => {
    setActiveDescendant((prev) => (prev >= filtered.length ? -1 : prev));
  }, [filtered.length]);

  useEffect(() => {
    if (activeDescendant < 0 || !listboxRef.current || !filtered[activeDescendant])
      return;
    const activeEl = listboxRef.current.querySelector<HTMLElement>(
      `[id="${listboxId}-opt-${filtered[activeDescendant].value}"]`,
    );
    if (typeof activeEl?.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeDescendant, filtered, listboxId]);

  const handleFocus = () => {
    setOpen(true);
    setIsTyping(false);
    setSearch("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);
    setIsTyping(true);
    setOpen(true);
    if (freeform) onChange(text);
  };

  const handleSelect = (opt: ComboboxOption) => {
    onChange(opt.value);
    setSearch("");
    setIsTyping(false);
    setOpen(false);
    setActiveDescendant(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      setIsTyping(false);
      setSearch("");
      setActiveDescendant(-1);
      inputRef.current?.blur();
      return;
    }

    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveDescendant((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveDescendant((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1,
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveDescendant(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveDescendant(filtered.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeDescendant >= 0 && activeDescendant < filtered.length) {
        handleSelect(filtered[activeDescendant]);
      }
    }
  };

  const activeOptionId =
    activeDescendant >= 0 && filtered[activeDescendant]
      ? `${listboxId}-opt-${filtered[activeDescendant].value}`
      : undefined;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "relative flex items-center border rounded-lg transition-colors bg-surface-container-low",
          error
            ? "border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error"
            : "border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",
          disabled &&
            "opacity-50 cursor-not-allowed hover:border-outline-variant",
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={displayValue}
          onChange={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={hideLabel ? label : " "}
          aria-label={hideLabel ? label : undefined}
          className={cn(
            "peer w-full rounded-lg bg-transparent border-0 outline-none text-on-surface transition-colors disabled:cursor-not-allowed",
            size === "sm" ? "px-3 py-2.5 text-sm" : "px-4 py-4",
            error ? "focus:text-error" : "focus:text-primary",
          )}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
        />
        {!hideLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute z-10 font-normal px-1 bg-surface-container-low rounded-md transition-all duration-200 ease-in-out origin-top-left pointer-events-none",
              size === "sm"
                ? "text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5"
                : "text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",
              error
                ? "text-error peer-focus:text-error"
                : "text-on-surface-variant peer-focus:text-primary",
            )}
          >
            {label}
          </label>
        )}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Toggle options"
          onClick={() => {
            if (open) {
              setOpen(false);
              setIsTyping(false);
              setSearch("");
              setActiveDescendant(-1);
            } else {
              inputRef.current?.focus();
            }
          }}
          className="absolute right-3 p-1 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon
            name="expand_more"
            size={16}
            className={cn(
              "transition-transform inline-block",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      <ul
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        hidden={!open || filtered.length === 0}
        className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-outline-variant bg-surface-container-low shadow-lg"
      >
        {filtered.map((opt, index) => {
          const selected = opt.value === value;
          const highlighted = index === activeDescendant;
          return (
            <li
              key={opt.value}
              id={`${listboxId}-opt-${opt.value}`}
              role="option"
              aria-selected={selected}
              onClick={() => handleSelect(opt)}
              className={cn(
                "px-4 py-2.5 text-sm cursor-pointer transition-colors",
                highlighted && "bg-surface-container",
                selected
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-on-surface hover:bg-surface-container",
              )}
            >
              <span>{opt.label}</span>
              {opt.value !== opt.label && (
                <span className="ml-2 text-xs text-on-surface-variant">
                  {opt.value}
                </span>
              )}
            </li>
          );
        })}
      </ul>

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
