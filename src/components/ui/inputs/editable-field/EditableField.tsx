import { type ChangeEvent } from "react";
import type { ComponentMeta } from "@/types/component-meta";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { ReadOnlyField } from "@/components/ui/data/read-only-field/ReadOnlyField";

export const meta: ComponentMeta = {
  name: "EditableField",
  description:
    "Per-field read↔edit toggle for plain text values. Read mode shows ReadOnlyField with an edit IconButton; edit mode shows FloatingLabelInput with a check IconButton. Pair with `useEditableFields()` for centralized form state. For fields with bespoke display (e.g. slug with `@user/` prefix) keep inline JSX.",
};

export interface EditableFieldProps {
  /** Stable id used by `useEditableFields().isEditing(id)`. */
  id: string;
  /** Field label, shown in both read and edit modes. */
  label: string;
  /** Current value. */
  value: string;
  /** Whether the field is currently in edit mode (controlled). */
  editing: boolean;
  /** Toggle edit mode. Caller decides whether toggling exits / commits. */
  onEditToggle: () => void;
  /** Update the value while in edit mode. */
  onChange: (value: string) => void;
  /** Show value as monospace in read mode. */
  mono?: boolean;
  /** Validation error to surface below the input in edit mode. */
  error?: string | null;
  /** Class on the outer wrapper. */
  className?: string;
}

export function EditableField({
  id,
  label,
  value,
  editing,
  onEditToggle,
  onChange,
  mono,
  error,
  className,
}: EditableFieldProps) {
  if (!editing) {
    return (
      <ReadOnlyField
        className={className}
        label={label}
        value={value || "—"}
        mono={mono}
        suffix={
          <IconButton
            icon="edit"
            aria-label={`Edit ${label}`}
            variant="text"
            size="sm"
            onClick={onEditToggle}
          />
        }
      />
    );
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-on-surface mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <FloatingLabelInput
          id={id}
          label={label}
          size="sm"
          hideLabel
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          error={!!error}
          autoFocus
          containerClassName="flex-1"
        />
        <IconButton
          icon="check"
          aria-label={`Done editing ${label}`}
          variant="text"
          size="sm"
          onClick={onEditToggle}
        />
      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}
