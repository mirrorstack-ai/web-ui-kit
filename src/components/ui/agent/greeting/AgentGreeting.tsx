import { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Logo } from "@/components/ui/media/logo/Logo";
import { Notch } from "@/components/ui/surfaces/notch/Notch";
import { useAutoGrowTextarea } from "@/hooks/useAutoGrowTextarea";
import { useComposerSubmit } from "@/hooks/useComposerSubmit";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useModelSelection } from "@/hooks/useModelSelection";

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
  /** `"hero"` (default) is the full-page welcome surface — centered, large
   *  type, tall input. `"compact"` scales everything down and left-aligns to
   *  fit inside dashboard tiles and other dense containers. */
  size?: "hero" | "compact";
  className?: string;
}

/** Auto-grow bounds for the message textarea, per size. */
const TEXTAREA_BOUNDS = {
  hero: { min: 80, max: 200 },
  compact: { min: 40, max: 112 },
} as const;
const MENU_W = 200;
const MENU_R = 12;
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
  size = "hero",
  className,
}: AgentGreetingProps) {
  const compact = size === "compact";
  const [text, setText] = useState("");
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [menuH, setMenuH] = useState(0);
  const [notchX, setNotchX] = useState(0);
  const [notchTabWidth, setNotchTabWidth] = useState(0);
  const [notchTabHeight, setNotchTabHeight] = useState(0);
  // Controlled if parent wires `onSelectModel`; otherwise the hook owns the
  // selection and `selectedModelId` acts as the initial value.
  const { activeModel, activeModelId, selectModel } = useModelSelection({
    models,
    selectedModelId,
    onSelectModel,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelTriggerRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const modelContentRef = useRef<HTMLDivElement>(null);

  useAutoGrowTextarea(textareaRef, text, TEXTAREA_BOUNDS[size]);

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

  useClickOutside({
    refs: [modelTriggerRef, modelMenuRef],
    onDismiss: () => setModelMenuOpen(false),
    enabled: modelMenuOpen,
  });

  const canSend = text.trim().length > 0;

  const { send, handleKeyDown, handleChange, onCompositionStart, onCompositionEnd } =
    useComposerSubmit({ value: text, onSend }, setText);

  const showModels = !!models?.length && !!activeModel;

  const handleSelectModel = (id: string) => {
    selectModel(id);
    setModelMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col",
        compact
          ? "items-stretch gap-3"
          : "max-w-2xl mx-auto items-center gap-10",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {!hideLogo && (
          <div
            className={cn(
              "shrink-0",
              compact ? "size-9" : "size-14",
              !compact && (subtitle ? "-mt-2" : "-mt-4"),
            )}
          >
            <Logo />
          </div>
        )}
        <div className="flex flex-col">
          <h1
            className={cn(
              "font-medium tracking-tight text-on-surface",
              compact ? "text-lg" : "text-3xl",
            )}
          >
            {greeting}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "text-on-surface-variant",
                compact ? "text-sm" : "text-base",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {!hideInput && (
      <div
        className={cn(
          "flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low transition-colors focus-within:border-primary",
          compact ? "p-2" : "p-3",
        )}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          className={cn(
            "w-full resize-none rounded-lg bg-transparent text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",
            compact ? "px-2.5 py-1.5 text-sm" : "px-3 py-2 text-base",
          )}
          placeholder={placeholder}
          aria-label="Start a conversation with the agent"
          rows={1}
        />
        <div className="flex w-full items-center gap-1 px-1 pb-0.5">
          <IconButton
            icon="attach_file_add"
            variant="text"
            size={compact ? "sm" : "md"}
            className="text-on-surface-variant hover:text-on-surface"
            onClick={onAttachFile}
            aria-label="Attach file"
          />
          <IconButton
            icon="mic"
            variant="text"
            size={compact ? "sm" : "md"}
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
                className={cn(
                  "relative z-[51] flex cursor-pointer items-center gap-1.5 rounded-full text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface",
                  compact ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-[13px]",
                )}
                aria-label={`Model: ${activeModel.label}`}
                aria-haspopup="listbox"
                aria-expanded={modelMenuOpen}
              >
                <span className="max-w-[120px] truncate">
                  {activeModel.label}
                </span>
                <Icon name="expand_more" size={14} />
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
                    className="relative z-10 flex flex-col gap-0.5 p-1.5"
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
                            "flex items-baseline gap-2 rounded-lg px-2 py-1 text-left text-[13px] transition-colors",
                            selected
                              ? "bg-on-surface/8 text-on-surface"
                              : "text-on-surface hover:bg-on-surface/8",
                          )}
                        >
                          <Icon
                            name="check"
                            size={14}
                            className={cn(
                              "shrink-0 translate-y-0.5",
                              selected ? "text-on-surface" : "text-transparent",
                            )}
                          />
                          <span className={cn(selected && "font-medium")}>
                            {m.label}
                          </span>
                          {m.description && (
                            <span className="text-[11px] text-on-surface-variant">
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
            size={compact ? "sm" : "md"}
            className={compact ? "rounded-lg" : "rounded-xl"}
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
