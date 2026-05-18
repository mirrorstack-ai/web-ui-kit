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
import { Logo } from "@/components/ui/media/logo-mirrorstack/LogoMirrorStack";
import { Notch } from "@/components/ui/surfaces/notch/Notch";

export const meta: ComponentMeta = {
  name: "AgentGreeting",
  description:
    "Hero greeting plus chat input used to open a fresh agent conversation. Drop it on init, return, app-creation, and overview surfaces.",
};

export interface AgentGreetingModel {
  id: string;
  label: string;
  /** Optional one-line tagline shown under the label inside the dropdown
   *  (e.g. "Adaptive" for "Opus 4.7"). The trigger pill only shows label. */
  description?: string;
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
  /** Hide the MirrorStack logo above the greeting. Defaults to false. */
  hideLogo?: boolean;
  /** Hide the chat input row — render greeting + logo only. */
  hideInput?: boolean;
  className?: string;
}

const MIN_TEXTAREA_HEIGHT = 80;
const MAX_TEXTAREA_HEIGHT = 200;
const MENU_W = 220;
const MENU_R = 14;
const MENU_IR = 8;
// Extra breathing room INSIDE the notch on the left of the trigger pill.
// Right side stays flush — the send button sits there, so we don't intrude.
const NOTCH_PADDING_LEFT = 12;
// Extends the notch tab BELOW the trigger so the tab reads as a deeper
// "hook" into the dropdown body (rather than ending flush at the trigger's
// bottom edge).
const NOTCH_PADDING_BOTTOM = 6;
// Optical nudge: shift the entire notch + dropdown right so the
// notch tab visually rests inside the trigger's rounded-full silhouette.
const NOTCH_SHIFT_RIGHT = 6;
// Lift the entire dropdown so the notch tab tucks above the trigger pill
// — gives the trigger a "tab attached" look rather than just floating
// above the body.
const NOTCH_SHIFT_UP = 8;

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
  hideLogo = false,
  hideInput = false,
  className,
}: AgentGreetingProps) {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [menuH, setMenuH] = useState(0);
  const [notchX, setNotchX] = useState(0);
  const [notchTabWidth, setNotchTabWidth] = useState(0);
  const [notchTabHeight, setNotchTabHeight] = useState(0);
  // Controlled if parent wires `onSelectModel`; otherwise the component
  // owns the selection and `selectedModelId` acts as the initial value.
  // This lets the trigger update on click even when the consumer doesn't
  // bother with state plumbing.
  const isControlledModel = onSelectModel !== undefined;
  const [internalModelId, setInternalModelId] = useState(selectedModelId);
  const activeModelId = isControlledModel ? selectedModelId : internalModelId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelTriggerRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const modelContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT), MAX_TEXTAREA_HEIGHT)}px`;
  }, [text]);

  // Measure the trigger pill so the notch tab sits directly under it —
  // mirrors AgentSidebarHeader's overflow-dropdown measurement pattern.
  // NOTCH_PADDING_LEFT extends the tab leftward for breathing room; the
  // right side stays flush with the trigger so the dropdown doesn't
  // intrude on the send button's territory.
  useLayoutEffect(() => {
    if (!modelMenuOpen) return;
    const trigger = modelTriggerRef.current;
    const menu = modelMenuRef.current;
    const content = modelContentRef.current;
    if (!trigger || !menu || !content) return;
    const tRect = trigger.getBoundingClientRect();
    const mRect = menu.getBoundingClientRect();
    setNotchTabWidth(tRect.width + NOTCH_PADDING_LEFT);
    setNotchTabHeight(tRect.height + NOTCH_PADDING_BOTTOM);
    setNotchX(tRect.left - mRect.left - NOTCH_PADDING_LEFT + NOTCH_SHIFT_RIGHT);
    setMenuH(content.offsetHeight);
  }, [modelMenuOpen, activeModelId, models]);

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
    models?.find((m) => m.id === activeModelId) ?? models?.[0];
  const showModels = !!models?.length && !!activeModel;

  const handleSelectModel = (id: string) => {
    if (!isControlledModel) setInternalModelId(id);
    onSelectModel?.(id);
    setModelMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto flex flex-col items-center gap-10",
        className,
      )}
    >
      <div className={cn("flex gap-2", subtitle ? "items-start" : "items-center")}>
        {!hideLogo && (
          <div className={cn("size-14 shrink-0", subtitle && "-mt-2")}>
            <Logo />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium tracking-tight text-on-surface">
            {greeting}
          </h1>
          {subtitle && (
            <p className="text-base text-on-surface-variant">{subtitle}</p>
          )}
        </div>
      </div>

      {!hideInput && (
      <div className="flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-3 transition-colors focus-within:border-primary">
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
        <div className="flex w-full items-center gap-1 px-1 pb-0.5">
          <IconButton
            icon="attach_file_add"
            variant="text"
            size="md"
            className="text-on-surface-variant hover:text-on-surface"
            onClick={onAttachFile}
            aria-label="Attach file"
          />
          <IconButton
            icon="mic"
            variant="text"
            size="md"
            className="text-on-surface-variant hover:text-on-surface"
            onClick={onMic}
            aria-label="Voice input"
          />
          <div className="flex-1" />
          {showModels && activeModel && (
            <div className="relative mr-4">
              <button
                ref={modelTriggerRef}
                type="button"
                onClick={() => setModelMenuOpen((open) => !open)}
                className="relative z-[51] flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface"
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
                  className="absolute z-50 overflow-visible"
                  style={{
                    right: -NOTCH_SHIFT_RIGHT,
                    top: -NOTCH_SHIFT_UP,
                    filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))",
                  }}
                >
                  {menuH > 0 && notchTabWidth > 0 && (
                    <Notch
                      width={MENU_W}
                      height={menuH}
                      notchWidth={notchTabWidth}
                      notchHeight={notchTabHeight}
                      notchSide="bottom"
                      notchOffset={notchX}
                      radius={MENU_R}
                      inverseRadius={MENU_IR}
                      stroke="var(--color-primary)"
                      strokeWidth={1.5}
                      className="absolute top-0 left-0"
                    />
                  )}
                  <div
                    ref={modelContentRef}
                    role="listbox"
                    aria-label="Model"
                    className="relative z-10 flex flex-col gap-1 p-2"
                    style={{
                      marginTop: notchTabHeight || 32,
                      width: MENU_W,
                    }}
                  >
                    {models.map((m) => {
                      const selected = m.id === activeModel.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => handleSelectModel(m.id)}
                          className={cn(
                            "flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                            selected
                              ? "bg-on-surface/8 text-on-surface"
                              : "text-on-surface hover:bg-on-surface/8",
                          )}
                        >
                          <Icon
                            name="check"
                            size={16}
                            className={cn(
                              "shrink-0 translate-y-0.5",
                              selected ? "text-on-surface" : "text-transparent",
                            )}
                          />
                          <span className={cn(selected && "font-medium")}>
                            {m.label}
                          </span>
                          {m.description && (
                            <span className="text-xs text-on-surface-variant">
                              {m.description}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          <IconButton
            icon="arrow_upward"
            variant="filled"
            color="primary"
            size="md"
            className="rounded-xl"
            onClick={send}
            disabled={!canSend}
            aria-label="Send message"
          />
        </div>
      </div>
      )}
    </div>
  );
}
