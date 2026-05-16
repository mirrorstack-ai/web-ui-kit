import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";
import { OptionList } from "@/components/ui/surfaces/option-list/OptionList";

export const meta: ComponentMeta = {
  name: "AgentGreeting",
  description:
    "Hero greeting plus chat input used to open a fresh agent-sidebar conversation. Drop it on init, return, app-creation, and overview surfaces.",
};

export interface AgentGreetingModel {
  id: string;
  label: string;
}

export interface AgentGreetingProps {
  /** Main heading, e.g. "Welcome back, Nothing Chang". */
  greeting: string;
  /** Optional secondary line beneath the greeting. */
  subtitle?: string;
  placeholder?: string;
  onSend?: (message: string) => void;
  onAttachFile?: () => void;
  onMic?: () => void;
  /** Available models for the picker. Omit or pass an empty array to hide it. */
  models?: AgentGreetingModel[];
  /** Selected model id. Falls back to the first model when omitted. */
  selectedModelId?: string;
  onSelectModel?: (modelId: string) => void;
  className?: string;
}

const MAX_TEXTAREA_HEIGHT = 200;

export function AgentGreeting({
  greeting,
  subtitle,
  placeholder = "plan something?",
  onSend,
  onAttachFile,
  onMic,
  models,
  selectedModelId,
  onSelectModel,
  className,
}: AgentGreetingProps) {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelTriggerRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [text]);

  useEffect(() => {
    if (!modelMenuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modelTriggerRef.current?.contains(target)) return;
      if (modelMenuRef.current?.contains(target)) return;
      setModelMenuOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setModelMenuOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [modelMenuOpen]);

  const canSend = text.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    onSend?.(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing || e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const activeModel =
    models?.find((m) => m.id === selectedModelId) ?? models?.[0];
  const showModels = !!models?.length && !!activeModel;
  const modelOptions =
    models?.map((m) => ({
      value: m.id,
      label: (
        <span className="flex items-center gap-1.5">
          <Icon
            name="check"
            size={14}
            className={cn(
              "shrink-0",
              m.id === activeModel?.id
                ? "text-on-surface"
                : "text-transparent",
            )}
          />
          {m.label}
        </span>
      ),
    })) ?? [];
  const activeModelIndex =
    models?.findIndex((m) => m.id === activeModel?.id) ?? -1;

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto flex flex-col items-center gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-on-surface">
          {greeting}
        </h1>
        {subtitle && (
          <p className="text-base text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      <div className="flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-2 transition-colors focus-within:border-primary">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
          placeholder={placeholder}
          aria-label="Start a conversation with the agent"
          rows={1}
        />
        <div className="flex w-full items-center gap-0.5 px-1 pb-0.5">
          <IconButton
            icon="attach_file_add"
            variant="text"
            size="sm"
            className="text-on-surface-variant hover:text-on-surface"
            onClick={onAttachFile}
            aria-label="Attach file"
          />
          <IconButton
            icon="mic"
            variant="text"
            size="sm"
            className="text-on-surface-variant hover:text-on-surface"
            onClick={onMic}
            aria-label="Voice input"
          />
          <div className="flex-1" />
          {showModels && activeModel && (
            <div className="relative mr-2">
              <button
                ref={modelTriggerRef}
                type="button"
                onClick={() => setModelMenuOpen((open) => !open)}
                className="flex h-8 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface"
                aria-label={`Model: ${activeModel.label}`}
                aria-haspopup="listbox"
                aria-expanded={modelMenuOpen}
              >
                <span className="max-w-[140px] truncate">
                  {activeModel.label}
                </span>
                <Icon name="expand_more" size={16} />
              </button>
              {modelMenuOpen && (
                <div
                  ref={modelMenuRef}
                  className="absolute right-0 bottom-full z-50 mb-2 min-w-[160px]"
                >
                  <OptionList
                    items={modelOptions}
                    activeIndex={activeModelIndex}
                    onSelect={(item) => {
                      onSelectModel?.(item.value);
                      setModelMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <IconButton
            icon="arrow_upward"
            variant="filled"
            color="primary"
            size="sm"
            onClick={send}
            disabled={!canSend}
            aria-label="Send message"
          />
        </div>
      </div>
    </div>
  );
}
