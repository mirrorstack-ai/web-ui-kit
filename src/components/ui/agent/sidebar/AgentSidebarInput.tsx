import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Notch } from "@/components/ui/surfaces/notch/Notch";
import { useAutoGrowTextarea } from "@/hooks/useAutoGrowTextarea";
import { useComposerSubmit } from "@/hooks/useComposerSubmit";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMenuKeyNav } from "@/hooks/useMenuKeyNav";
import { useModelSelection } from "@/hooks/useModelSelection";

export interface AgentSidebarInputModel {
  id: string;
  label: string;
  /** Render the entry visible but non-selectable, with a trailing info icon. */
  disabled?: boolean;
  /** One-liner revealed when a disabled entry is hovered or keyboard-focused.
   *  Also exposed to assistive tech via aria-describedby. */
  disabledHint?: string;
}

export interface AgentSidebarInputProps {
  onSend?: (message: string) => void;
  onAttachFile?: () => void;
  onMic?: () => void;
  placeholder?: string;
  /** Available models for the picker. Omit or pass an empty array to hide it. */
  models?: AgentSidebarInputModel[];
  /** Selected model id. Falls back to the first enabled model when omitted. */
  selectedModelId?: string;
  onSelectModel?: (modelId: string) => void;
}

// Model menu geometry — mirrors AgentGreeting's selector, flipped upward:
// the input is pinned to the sidebar's bottom edge, so the menu opens up.
const MENU_W = 240;
const MENU_R = 14;
const MENU_IR = 8;
// The notch tab bleeds this far past the trigger pill on each side…
const TAB_BLEED_X = 6;
// …and extends this far above it, hooking into the dropdown body.
const TAB_BLEED_TOP = 6;
// Drop the whole card so the tab wraps around the trigger pill.
const MENU_SHIFT_DOWN = 8;

export function AgentSidebarInput({
  onSend,
  onAttachFile,
  onMic,
  placeholder = "Type a message...",
  models,
  selectedModelId,
  onSelectModel,
}: AgentSidebarInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [menuH, setMenuH] = useState(0);
  const [tabW, setTabW] = useState(0);
  const [tabH, setTabH] = useState(0);
  const modelTriggerRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const modelContentRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-opt-${index}`;

  useAutoGrowTextarea(textareaRef, text, { max: 150 });

  const { send, handleKeyDown, handleChange, onCompositionStart, onCompositionEnd } =
    useComposerSubmit({ value: text, onSend }, setText);

  // Controlled if parent wires `onSelectModel`; otherwise the hook owns the
  // selection and `selectedModelId` acts as the initial value (same contract
  // as AgentGreeting's picker).
  const { activeModel, activeModelId, selectModel } = useModelSelection({
    models,
    selectedModelId,
    onSelectModel,
  });
  const showModels = !!models?.length && !!activeModel;

  if (isDev && models?.length && selectedModelId && !models.some((m) => m.id === selectedModelId)) {
    console.warn(
      `[AgentSidebarInput] selectedModelId "${selectedModelId}" is not in models.`,
    );
  }

  // Measure the trigger pill so the notch tab wraps it — mirrors
  // AgentGreeting's measurement, minus the horizontal offset: the menu
  // wrapper is anchored at the trigger's left edge minus TAB_BLEED_X, so the
  // tab sits at notchOffset 0 (the card's left edge) by construction.
  useLayoutEffect(() => {
    if (!modelMenuOpen) return;
    const trigger = modelTriggerRef.current;
    const content = modelContentRef.current;
    if (!trigger || !content) return;
    const tRect = trigger.getBoundingClientRect();
    setTabW(tRect.width + TAB_BLEED_X * 2);
    setTabH(tRect.height + TAB_BLEED_TOP);
    setMenuH(content.offsetHeight);
  }, [modelMenuOpen, activeModelId, models]);

  useEffect(() => {
    if (!modelMenuOpen) return;
    const raf = requestAnimationFrame(() => modelContentRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [modelMenuOpen]);

  useClickOutside({
    refs: [modelTriggerRef, modelMenuRef],
    onDismiss: () => setModelMenuOpen(false),
    enabled: modelMenuOpen,
  });

  const openModelMenu = () => {
    setActiveIndex(models?.findIndex((m) => m.id === activeModel?.id) ?? -1);
    setModelMenuOpen(true);
  };

  const closeModelMenu = (returnFocus = false) => {
    setModelMenuOpen(false);
    setActiveIndex(-1);
    if (returnFocus) modelTriggerRef.current?.focus();
  };

  const handleSelectModel = (id: string) => {
    selectModel(id);
    closeModelMenu(true);
  };

  // Arrows traverse ALL entries — disabled ones stay reachable so their hint
  // is revealed on keyboard focus — but Enter/Space only activates enabled.
  const {
    activeIndex,
    setActiveIndex,
    handleKeyDown: handleModelMenuKeyDown,
  } = useMenuKeyNav({
    itemCount: models?.length ?? 0,
    canActivate: (index) => {
      const model = models?.[index];
      return !!model && !model.disabled;
    },
    onActivate: (index) => {
      const model = models?.[index];
      if (model) handleSelectModel(model.id);
    },
    onClose: closeModelMenu,
  });

  const iconBtnCls = "text-inverse-on-surface/60 hover:text-inverse-on-surface";

  return (
    <div className="p-3 pt-2 shrink-0 flex flex-col">
      <div className="w-full px-1 pb-1">
        <span className="text-inverse-on-surface/40 text-xs">
          Tip — ctrl + c to interrupt
        </span>
      </div>
      <div className="flex flex-col w-full border border-outline-variant/30 rounded-xl bg-inverse-on-surface/8 p-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          className="w-full text-inverse-on-surface placeholder:text-inverse-on-surface/30 rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent text-sm"
          placeholder={placeholder}
          aria-label="Message to agent"
          rows={1}
        />
        <div className="flex w-full gap-0.5 items-center">
          <IconButton
            icon="attach_file_add"
            variant="text"
            size="sm"
            className={iconBtnCls}
            onClick={onAttachFile}
            aria-label="Attach file"
          />
          <IconButton
            icon="mic"
            variant="text"
            size="sm"
            className={iconBtnCls}
            onClick={onMic}
            aria-label="Voice input"
          />
          {showModels && (
            <div className="relative">
              <button
                ref={modelTriggerRef}
                type="button"
                onClick={() => (modelMenuOpen ? closeModelMenu() : openModelMenu())}
                className={cn(
                  "relative z-[51] flex h-7 cursor-pointer items-center gap-1 rounded-full px-2 text-xs transition-colors",
                  "text-inverse-on-surface/60 hover:bg-inverse-on-surface/8 hover:text-inverse-on-surface",
                )}
                aria-label={`Model: ${activeModel.label}`}
                aria-haspopup="listbox"
                aria-expanded={modelMenuOpen}
                aria-controls={modelMenuOpen ? listboxId : undefined}
              >
                <span className="max-w-[120px] truncate">{activeModel.label}</span>
                <Icon
                  name="expand_more"
                  size={14}
                  className={cn("transition-transform", modelMenuOpen && "rotate-180")}
                />
              </button>
              {modelMenuOpen && (
                <div
                  ref={modelMenuRef}
                  className="absolute z-50 overflow-visible"
                  style={{
                    left: -TAB_BLEED_X,
                    bottom: -MENU_SHIFT_DOWN,
                    filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))",
                  }}
                >
                  {menuH > 0 && tabW > 0 && (
                    <Notch
                      width={MENU_W}
                      height={menuH}
                      notchWidth={tabW}
                      notchHeight={tabH}
                      notchSide="top"
                      notchOffset={0}
                      radius={MENU_R}
                      inverseRadius={MENU_IR}
                      stroke="var(--color-primary)"
                      strokeWidth={1.5}
                      className="absolute bottom-0 left-0"
                    />
                  )}
                  <div
                    ref={modelContentRef}
                    id={listboxId}
                    role="listbox"
                    aria-label="Model"
                    tabIndex={-1}
                    aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
                    onKeyDown={handleModelMenuKeyDown}
                    className="relative z-10 flex flex-col gap-1 p-2 outline-none"
                    style={{
                      marginBottom: tabH || 34,
                      width: MENU_W,
                    }}
                  >
                    {models.map((m, index) => {
                      const selected = m.id === activeModel.id;
                      const isActive = index === activeIndex;
                      const hintId =
                        m.disabled && m.disabledHint ? `${listboxId}-hint-${index}` : undefined;
                      return (
                        <div
                          key={m.id}
                          id={optionId(index)}
                          role="option"
                          aria-selected={selected}
                          aria-disabled={m.disabled || undefined}
                          aria-describedby={hintId}
                          onClick={() => {
                            if (!m.disabled) handleSelectModel(m.id);
                          }}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() =>
                            setActiveIndex((i) => (i === index ? -1 : i))
                          }
                          className={cn(
                            "relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                            m.disabled
                              ? "cursor-default text-on-surface/40"
                              : "cursor-pointer text-on-surface",
                            isActive && (m.disabled ? "bg-on-surface/5" : "bg-on-surface/8"),
                            !isActive && selected && "bg-on-surface/8",
                          )}
                        >
                          {/* Hidden from name-from-contents, but aria-describedby
                              still computes the description from it. */}
                          {hintId && (
                            <div
                              id={hintId}
                              aria-hidden="true"
                              className={cn(
                                "pointer-events-none absolute bottom-full left-0 mb-1 w-max max-w-56 rounded-md bg-inverse-surface px-2 py-1 text-xs text-inverse-on-surface transition-opacity",
                                isActive ? "opacity-100" : "opacity-0",
                              )}
                            >
                              {m.disabledHint}
                            </div>
                          )}
                          <Icon
                            name="check"
                            size={16}
                            className={cn("shrink-0", !selected && "text-transparent")}
                          />
                          <span className={cn("flex-1 truncate", selected && "font-medium")}>
                            {m.label}
                          </span>
                          {m.disabled && (
                            <Icon
                              name="info"
                              size={16}
                              className="shrink-0 text-on-surface-variant/70"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex-1" />
          <IconButton
            icon="send"
            variant="tonal"
            color="primary"
            size="sm"
            className="hover:bg-primary hover:text-on-primary"
            onClick={send}
            aria-label="Send message"
          />
        </div>
      </div>
    </div>
  );
}
