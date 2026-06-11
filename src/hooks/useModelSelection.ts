import { useState } from "react";

export interface UseModelSelectionOptions<T> {
  /** Available models; may be undefined or empty when the picker is hidden. */
  models: T[] | undefined;
  /** Selected model id (controlled), or the initial value (uncontrolled). */
  selectedModelId: string | undefined;
  /** Presence of this callback makes the selection controlled. */
  onSelectModel: ((modelId: string) => void) | undefined;
}

/**
 * Optionally-controlled model selection shared by the agent surfaces' model
 * pickers (AgentGreeting, AgentSidebarInput): controlled if the parent wires
 * `onSelectModel`; otherwise the hook owns the selection and `selectedModelId`
 * acts as the initial value. This lets the trigger update on click even when
 * the consumer doesn't bother with state plumbing.
 *
 * `activeModel` resolves the active id against `models`, falling back to the
 * first enabled entry, then the first entry.
 */
export function useModelSelection<
  T extends { id: string; disabled?: boolean },
>({ models, selectedModelId, onSelectModel }: UseModelSelectionOptions<T>) {
  const isControlled = onSelectModel !== undefined;
  const [internalModelId, setInternalModelId] = useState(selectedModelId);
  const activeModelId = isControlled ? selectedModelId : internalModelId;

  const activeModel =
    models?.find((m) => m.id === activeModelId) ??
    models?.find((m) => !m.disabled) ??
    models?.[0];

  /** Write-through select: updates internal state (uncontrolled) and notifies
   *  the parent. Closing the menu / focus return stays with the caller. */
  const selectModel = (id: string) => {
    if (!isControlled) setInternalModelId(id);
    onSelectModel?.(id);
  };

  return { activeModel, activeModelId, selectModel };
}
