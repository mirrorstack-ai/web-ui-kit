import { useCallback, useState } from "react";

/**
 * Tracks which named fields in a form are currently in edit mode.
 *
 * Centralized state for forms with per-field read↔edit toggles —
 * `<EditableField>` consumes the helpers this returns. Lives in the kit
 * so the form-hook layer (consumers' `useUpdateXForm`) doesn't have to
 * re-implement the Set logic.
 *
 * Usage:
 *
 *   const fields = useEditableFields();
 *   <EditableField
 *     editing={fields.isEditing("name")}
 *     onEdit={() => fields.startEdit("name")}
 *     ...
 *   />
 *   // call fields.reset() to exit all fields (e.g. on save / cancel).
 */
export function useEditableFields() {
  const [editing, setEditing] = useState<Set<string>>(new Set());

  const isEditing = useCallback(
    (field: string) => editing.has(field),
    [editing],
  );

  const startEdit = useCallback((field: string) => {
    setEditing((prev) => (prev.has(field) ? prev : new Set(prev).add(field)));
  }, []);

  const reset = useCallback(() => {
    setEditing(new Set());
  }, []);

  return { isEditing, startEdit, reset };
}
