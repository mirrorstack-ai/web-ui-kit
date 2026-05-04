import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Button } from "@/components/ui/actions/button/Button";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { SegmentedButton } from "@/components/ui/inputs/segmented-button/SegmentedButton";
import { Switch } from "@/components/ui/inputs/switch/Switch";

interface QuestionBase {
  id: string;
  label: string;
  /** Extra explanatory text shown prominently in tabs layout, and below the label in list layout. */
  description?: string;
  /** Short label used on the tab pill in tabs layout. Defaults to `label`. */
  tabLabel?: string;
}

export type AgentSidebarChoiceStyle = "segmented" | "cards";

export type AgentSidebarQuestion =
  | (QuestionBase & {
      type: "text";
      /** When true, renders as a textarea. */
      multiline?: boolean;
      placeholder?: string;
      defaultValue?: string;
    })
  | (QuestionBase & {
      type: "toggle";
      defaultValue?: boolean;
    })
  | (QuestionBase & {
      type: "choice";
      /** "segmented" — all options visible inline as a pill row (use for short labels, no descriptions).
       *  "cards" — radio-card list with title + description per option (use for weighted decisions). */
      style: AgentSidebarChoiceStyle;
      /** When true the user can pick more than one option; the answer is an array of values.
       *  Renders square check indicators (cards) or independently-toggling chips (segmented). */
      multiple?: boolean;
      options: {
        value: string;
        label: string;
        description?: string;
      }[];
      defaultValue?: string | string[];
    });

export type AgentSidebarMultiQuestionStatus = "pending" | "submitted";

export type AgentSidebarMultiQuestionAnswer = string | boolean | string[];

export type AgentSidebarMultiQuestionLayout = "list" | "tabs";

export interface AgentSidebarMultiQuestionProps {
  title: string;
  description?: string;
  questions: AgentSidebarQuestion[];
  submitLabel?: string;
  status?: AgentSidebarMultiQuestionStatus;
  onSubmit?: (answers: Record<string, AgentSidebarMultiQuestionAnswer>) => void;
  className?: string;
  /** "tabs" (default) shows one question at a time with a tab pill row + description.
   *  "list" stacks all fields vertically with compact labels. */
  layout?: AgentSidebarMultiQuestionLayout;
}

const REVIEW_TAB_ID = "__review__";

const borderByStatus: Record<AgentSidebarMultiQuestionStatus, string> = {
  pending: "border-outline-variant/30",
  submitted: "border-inverse-primary/40",
};

const headerByStatus: Record<
  AgentSidebarMultiQuestionStatus,
  { text: string; color: string; icon: string }
> = {
  pending: {
    text: "Answer to continue",
    color: "text-inverse-on-surface/55",
    icon: "edit_note",
  },
  submitted: { text: "Submitted", color: "text-inverse-primary", icon: "check_circle" },
};

function initialAnswers(
  questions: AgentSidebarQuestion[],
): Record<string, AgentSidebarMultiQuestionAnswer> {
  const out: Record<string, AgentSidebarMultiQuestionAnswer> = {};
  for (const q of questions) {
    if (q.type === "toggle") {
      out[q.id] = q.defaultValue ?? false;
    } else if (q.type === "choice" && q.multiple) {
      out[q.id] = Array.isArray(q.defaultValue) ? q.defaultValue : [];
    } else {
      out[q.id] = typeof q.defaultValue === "string" ? q.defaultValue : "";
    }
  }
  return out;
}

function isAnswered(
  q: AgentSidebarQuestion,
  value: AgentSidebarMultiQuestionAnswer,
): boolean {
  if (q.type === "toggle") return true;
  if (q.type === "choice" && q.multiple) {
    return Array.isArray(value) && value.length > 0;
  }
  if (typeof value !== "string") return false;
  if (q.type === "choice") return value.length > 0;
  return value.trim().length > 0;
}

function formatAnswer(
  q: AgentSidebarQuestion,
  value: AgentSidebarMultiQuestionAnswer,
): string {
  if (q.type === "toggle") return value ? "Enabled" : "Not enabled";
  if (q.type === "choice" && q.multiple) {
    if (!Array.isArray(value) || value.length === 0) return "";
    return value
      .map((v) => q.options.find((o) => o.value === v)?.label ?? v)
      .join(", ");
  }
  if (typeof value !== "string" || value.length === 0) return "";
  if (q.type === "choice") {
    const opt = q.options.find((o) => o.value === value);
    return opt?.label ?? value;
  }
  return value;
}

// Override FloatingLabelInput / Combobox internals for the inverse-themed
// agent sidebar. Targets the components' bordered wrapper (`bg-surface-container-low`
// → inverse fill) and the input/textarea element text/placeholder colors.
const inverseFieldContainer = cn(
  "[&>div]:bg-inverse-on-surface/[0.06]!",
  "[&>div]:border-outline-variant/30!",
  "[&>div]:hover:border-outline-variant/50!",
  "[&>div]:focus-within:border-inverse-primary/60!",
  "[&>div]:focus-within:ring-inverse-primary/30!",
);

const inverseFieldInput = cn(
  "text-inverse-on-surface!",
  "placeholder:text-inverse-on-surface/40!",
  "focus:text-inverse-on-surface!",
  "py-1.5!",
);

// Override SegmentedButton's per-button bg/text on the inverse-themed sidebar
// so single-select segmented matches the inverse-primary chip palette used
// by multi-select segmented above.
const inverseSegmentedClass = cn(
  "[&>button[aria-pressed=true]]:bg-inverse-primary!",
  "[&>button[aria-pressed=true]]:text-inverse-surface!",
  "[&>button[aria-pressed=false]]:bg-inverse-on-surface/[0.06]!",
  "[&>button[aria-pressed=false]]:text-inverse-on-surface/70!",
  "[&>button[aria-pressed=false]]:hover:bg-inverse-on-surface/[0.12]!",
  "[&>button[aria-pressed=false]]:hover:text-inverse-on-surface!",
);

const inverseSwitchClass = cn(
  "aria-checked:bg-inverse-primary!",
  "aria-[checked=false]:bg-inverse-on-surface/20!",
  "[&>span]:bg-inverse-surface!",
);

function renderField(
  q: AgentSidebarQuestion,
  value: AgentSidebarMultiQuestionAnswer,
  setAnswer: (id: string, v: AgentSidebarMultiQuestionAnswer) => void,
  submitted: boolean,
): ReactNode {
  const fieldId = `mq-${q.id}`;
  if (q.type === "text") {
    if (q.multiline) {
      return (
        <FloatingLabelInput
          id={fieldId}
          label={q.placeholder ?? q.label}
          hideLabel
          multiline
          size="sm"
          rows={3}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          disabled={submitted}
          containerClassName={inverseFieldContainer}
          className={inverseFieldInput}
        />
      );
    }
    return (
      <FloatingLabelInput
        id={fieldId}
        label={q.placeholder ?? q.label}
        hideLabel
        size="sm"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => setAnswer(q.id, e.target.value)}
        disabled={submitted}
        containerClassName={inverseFieldContainer}
        className={inverseFieldInput}
      />
    );
  }
  if (q.type === "toggle") {
    return (
      <Switch
        checked={!!value}
        onChange={(checked) => setAnswer(q.id, checked)}
        aria-label={q.label}
        disabled={submitted}
        className={inverseSwitchClass}
      />
    );
  }
  if (q.type === "choice") {
  const isMulti = q.multiple === true;
  const selectedValues = isMulti
    ? new Set(Array.isArray(value) ? value : [])
    : new Set<string>();
  const singleCurrent = !isMulti && typeof value === "string" ? value : "";

  const toggleMulti = (optValue: string) => {
    const arr = Array.isArray(value) ? [...value] : [];
    if (selectedValues.has(optValue)) {
      setAnswer(
        q.id,
        arr.filter((v) => v !== optValue),
      );
    } else {
      setAnswer(q.id, [...arr, optValue]);
    }
  };

  if (q.style === "segmented") {
    if (!isMulti) {
      return (
        <SegmentedButton
          size="sm"
          aria-label={q.label}
          value={singleCurrent}
          disabled={submitted}
          onChange={(v) => setAnswer(q.id, v === singleCurrent ? "" : v)}
          options={q.options.map((o) => ({ value: o.value, label: o.label }))}
          className={inverseSegmentedClass}
        />
      );
    }
    return (
      <div
        role="group"
        aria-label={q.label}
        className="flex flex-wrap gap-1.5"
      >
        {q.options.map((opt) => {
          const selected = selectedValues.has(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              disabled={submitted}
              onClick={() => toggleMulti(opt.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
                selected
                  ? "bg-inverse-primary text-inverse-surface"
                  : "bg-inverse-on-surface/[0.06] text-inverse-on-surface/70 hover:bg-inverse-on-surface/[0.12] hover:text-inverse-on-surface",
              )}
            >
              <Icon
                name={selected ? "check_box" : "check_box_outline_blank"}
                size={14}
              />
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  // cards
  return (
    <div
      role={isMulti ? "group" : "radiogroup"}
      aria-labelledby={fieldId}
      className="flex flex-col gap-1.5"
    >
      {q.options.map((opt) => {
        const selected = isMulti
          ? selectedValues.has(opt.value)
          : opt.value === singleCurrent;
        const handleClick = () => {
          if (isMulti) {
            toggleMulti(opt.value);
          } else {
            setAnswer(q.id, selected ? "" : opt.value);
          }
        };
        return (
          <button
            key={opt.value}
            type="button"
            role={isMulti ? "checkbox" : "radio"}
            aria-checked={selected}
            disabled={submitted}
            onClick={handleClick}
            className={cn(
              "group flex items-start gap-2.5 rounded-md border px-3 py-2.5 text-left transition-colors disabled:opacity-50",
              selected
                ? "border-inverse-primary/60 bg-inverse-primary/[0.08]"
                : "border-outline-variant/25 bg-inverse-on-surface/[0.03] hover:border-outline-variant/50 hover:bg-inverse-on-surface/[0.06]",
            )}
          >
            <Icon
              name={
                isMulti
                  ? selected
                    ? "check_box"
                    : "check_box_outline_blank"
                  : selected
                    ? "radio_button_checked"
                    : "radio_button_unchecked"
              }
              size={20}
              className={cn(
                "shrink-0 mt-0.5 transition-colors",
                selected
                  ? "text-inverse-primary"
                  : "text-inverse-on-surface/45 group-hover:text-inverse-on-surface/65",
              )}
            />
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-inverse-on-surface">
                {opt.label}
              </span>
              {opt.description && (
                <span className="block text-xs text-inverse-on-surface/60 mt-0.5 leading-relaxed">
                  {opt.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
  }
  const _exhaustive: never = q;
  return _exhaustive;
}

export function AgentSidebarMultiQuestion({
  title,
  description,
  questions,
  submitLabel = "Submit",
  status = "pending",
  onSubmit,
  className,
  layout = "tabs",
}: AgentSidebarMultiQuestionProps) {
  const [answers, setAnswers] = useState(() => initialAnswers(questions));
  const [activeTabId, setActiveTabId] = useState<string>(
    questions[0]?.id ?? REVIEW_TAB_ID,
  );
  const submitted = status === "submitted";
  const header = headerByStatus[status];

  const setAnswer = (id: string, value: AgentSidebarMultiQuestionAnswer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => onSubmit?.(answers);

  const isReview = activeTabId === REVIEW_TAB_ID;
  const activeIdx = questions.findIndex((q) => q.id === activeTabId);
  const active = activeIdx >= 0 ? questions[activeIdx] : null;

  const summaries = questions.map((q) => {
    const value = answers[q.id];
    const answered = isAnswered(q, value);
    const ans = formatAnswer(q, value);
    return { q, value, answered, ans, filled: answered && !!ans };
  });

  const renderSummary = () => (
    <div className="mt-3 flex flex-col gap-2">
      {summaries.map(({ q, ans, filled }) => (
        <div
          key={q.id}
          className="flex flex-col gap-0.5 rounded-md bg-inverse-on-surface/[0.04] px-3 py-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-inverse-on-surface/55">
            {q.label}
          </span>
          {filled ? (
            <span className="text-sm text-inverse-on-surface">{ans}</span>
          ) : (
            <span className="text-sm italic text-warning-container">
              Not answered
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-lg border bg-inverse-on-surface/[0.03] transition-colors",
        borderByStatus[status],
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
        <Icon name={header.icon} size={12} className={header.color} />
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.08em]",
            header.color,
          )}
        >
          {header.text}
        </span>
      </div>

      <div className="px-3 pb-3">
        <div className="text-sm font-medium text-inverse-on-surface leading-snug">
          {title}
        </div>
        {description && (
          <div className="text-xs text-inverse-on-surface/55 mt-0.5 leading-snug">
            {description}
          </div>
        )}

        {layout === "tabs" && !submitted ? (
          <>
            <div className="mt-3">
              <SegmentedButton
                aria-label="Select a question"
                size="sm"
                value={activeTabId}
                onChange={(id) => setActiveTabId(id)}
                className="flex-wrap"
                options={[
                  ...summaries.map(({ q, answered }) => ({
                    value: q.id,
                    label: q.tabLabel ?? q.label,
                    tone: (answered ? "muted" : "warning") as
                      | "muted"
                      | "warning",
                  })),
                  { value: REVIEW_TAB_ID, label: "Review" },
                ]}
              />
            </div>

            {isReview ? (
              renderSummary()
            ) : active ? (
              <div className="mt-3 rounded-md border border-outline-variant/20 px-3 py-3 flex flex-col gap-2">
                <div className="text-sm font-medium text-inverse-on-surface leading-snug">
                  {active.label}
                </div>
                {active.description && (
                  <div className="text-xs text-inverse-on-surface/65 leading-relaxed">
                    {active.description}
                  </div>
                )}
                <div className={cn(active.type === "toggle" && "flex justify-end")}>
                  {renderField(active, answers[active.id], setAnswer, submitted)}
                </div>
              </div>
            ) : null}
          </>
        ) : submitted ? (
          renderSummary()
        ) : (
          <div className="mt-2.5 flex flex-col gap-2">
            {questions.map((q) => {
              const value = answers[q.id];
              const fieldId = `mq-${q.id}`;
              if (q.type === "toggle") {
                return (
                  <div
                    key={q.id}
                    className="rounded-md border border-outline-variant/20 px-3 py-2.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={fieldId}
                        className="text-sm font-medium text-inverse-on-surface block leading-snug"
                      >
                        {q.label}
                      </label>
                      {q.description && (
                        <span className="text-xs text-inverse-on-surface/55 block mt-0.5 leading-relaxed">
                          {q.description}
                        </span>
                      )}
                    </div>
                    {renderField(q, value, setAnswer, submitted)}
                  </div>
                );
              }
              return (
                <div
                  key={q.id}
                  className="rounded-md border border-outline-variant/20 px-3 py-2.5 flex flex-col gap-2"
                >
                  <div>
                    <label
                      htmlFor={fieldId}
                      className="text-sm font-medium text-inverse-on-surface block leading-snug"
                    >
                      {q.label}
                    </label>
                    {q.description && (
                      <span className="text-xs text-inverse-on-surface/55 block mt-0.5 leading-relaxed">
                        {q.description}
                      </span>
                    )}
                  </div>
                  {renderField(q, value, setAnswer, submitted)}
                </div>
              );
            })}
          </div>
        )}

        {!submitted && (
          <div className="mt-3 flex items-center justify-between gap-2">
            {layout === "tabs" && questions.length > 1 && !isReview ? (
              <div className="flex gap-1">
                <Button
                  variant="text"
                  size="sm"
                  disabled={activeIdx === 0}
                  onClick={() => {
                    const next = questions[Math.max(0, activeIdx - 1)];
                    if (next) setActiveTabId(next.id);
                  }}
                  leftIcon="arrow_back"
                  className="text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/10"
                >
                  Prev
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  disabled={activeIdx === questions.length - 1}
                  onClick={() => {
                    const next =
                      questions[Math.min(questions.length - 1, activeIdx + 1)];
                    if (next) setActiveTabId(next.id);
                  }}
                  rightIcon="arrow_forward"
                  className="text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/10"
                >
                  Next
                </Button>
              </div>
            ) : (
              <span />
            )}
            <Button
              variant="tonal"
              color="primary"
              size="sm"
              onClick={handleSubmit}
              rightIcon="check"
              className="bg-inverse-primary/15! text-inverse-primary! hover:bg-inverse-primary! hover:text-inverse-surface!"
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
