import { useCallback, useState } from "react";

/**
 * Tracks which named fields in a form are currently in edit mode.
 *
 * Centralized state for forms with per-field read↔edit toggles —
 * `<EditableField>` consumes the helpers this returns. Lives in the kit
 * so the form-hook layer (consumers' `useUpdateXForm`) doesn't have to
 * re-implement the Set + toggle logic.
 *
 * Usage:
 *
 *   const fields = useEditableFields();
 *   <EditableField
 *     editing={fields.isEditing("name")}
 *     onEditToggle={() => fields.toggleEdit("name")}
 *     ...
 *   />
 */
export function useEditableFields() {
  const [editing, setEditing] = useState<Set<string>>(new Set());

  const isEditing = useCallback(
    (field: string) => editing.has(field),
    [editing],
  );

  const toggleEdit = useCallback((field: string) => {
    setEditing((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  }, []);

  const startEdit = useCallback((field: string) => {
    setEditing((prev) => (prev.has(field) ? prev : new Set(prev).add(field)));
  }, []);

  const endEdit = useCallback((field: string) => {
    setEditing((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setEditing(new Set());
  }, []);

  return { isEditing, toggleEdit, startEdit, endEdit, reset };
}
