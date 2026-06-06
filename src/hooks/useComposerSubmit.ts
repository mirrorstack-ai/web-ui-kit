import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

export interface UseComposerSubmitOptions {
  /** Current textarea value (controlled). */
  value: string;
  /** Called with the TRIMMED text when the user submits a non-empty message. */
  onSend?: (message: string) => void;
}

export interface UseComposerSubmit {
  /** True while an IME composition session is active — Enter must not submit. */
  isComposing: boolean;
  /** Submit the trimmed value (guards empty), then clear via the consumer's setter. */
  send: () => void;
  /** Enter (without Shift) submits; respects the IME guard. */
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  /** Wire to the textarea `onChange` to keep the controlled value in sync. */
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /** Wire to `onCompositionStart`. */
  onCompositionStart: () => void;
  /** Wire to `onCompositionEnd`. */
  onCompositionEnd: () => void;
}

/**
 * Shared chat-composer submit behavior: IME-safe Enter-to-send (Shift+Enter
 * inserts a newline), trim-guard, and value clearing. Always sends the TRIMMED
 * text. The consumer owns the value state and supplies `setValue`.
 */
export function useComposerSubmit(
  { value, onSend }: UseComposerSubmitOptions,
  setValue: (value: string) => void,
): UseComposerSubmit {
  const [isComposing, setIsComposing] = useState(false);

  const send = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing || e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return {
    isComposing,
    send,
    handleKeyDown,
    handleChange,
    onCompositionStart: () => setIsComposing(true),
    onCompositionEnd: () => setIsComposing(false),
  };
}
