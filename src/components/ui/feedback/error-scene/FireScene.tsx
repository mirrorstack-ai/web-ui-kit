import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/actions/button/Button";
import {
  buttonBaseClass,
  variantMap,
} from "@/components/ui/actions/shared/button-styles";
import { Logo } from "@/components/ui/media/logo/Logo";
import { ClaudeMark, GeminiMark, GrokMark, OpenAIMark } from "./ai-logos";

/**
 * Shared base for NotFoundScene and ErrorScene: the full-page
 * "pick who to FIRE" scene. Internal — consumers use the two scenes.
 */

export interface FireSceneMember {
  /** Display name — rendered under the avatar and passed to `strings.chose`. */
  name: string;
  /** The avatar glyph, rendered inside the 96px circle. */
  icon: ReactNode;
  /** CSS color for the avatar circle. */
  iconBg: string;
}

export interface NotFoundSceneStrings {
  /** Big heading under the status code. */
  title: string;
  /** First lede line — who is to blame. */
  blame: string;
  /** Second lede line — the call to action. */
  pick: string;
  /** Verdict line shown after picking a member. */
  chose: (name: string) => string;
  /** Lead-in before the cancel button. */
  cruel: string;
  /** Cancel button label. */
  cancel: string;
  /** Home link label. */
  home: string;
}

/** English defaults for the 404 scene; ErrorScene overrides title + blame. */
export const NOT_FOUND_STRINGS: NotFoundSceneStrings = {
  title: "Oops! Page Not Found!",
  blame: "One of our Development Team must be punished for this unacceptable failure!",
  pick: "Pick who to FIRE . . .",
  chose: (name) => `You chose the engineer “${name}”, submit the answer when you return to home`,
  cruel: "Or you think it’s too cruel...",
  cancel: "Cancel Select",
  home: "Return to Home",
};

/** The built-in development team. Owner-approved brand usage. */
export const DEFAULT_MEMBERS: FireSceneMember[] = [
  { name: "Claude", icon: <ClaudeMark />, iconBg: "#d97757" },
  { name: "Gemini", icon: <GeminiMark />, iconBg: "#ffffff" },
  { name: "GPT", icon: <OpenAIMark />, iconBg: "#10a37f" },
  { name: "Grok", icon: <GrokMark />, iconBg: "#17181c" },
];

/**
 * Verdict reveal/dismiss animations. Scene-specific motion lives here (same
 * pattern as Logo). Under prefers-reduced-motion both are disabled — the JS
 * side then hides immediately instead of waiting for `animationend`.
 */
const SCENE_CSS = `
.ms-fire-verdict--reveal { animation: ms-fire-fade-slide .3s ease-out; }
.ms-fire-verdict--dismiss { animation: ms-fire-fade-slide-out .3s ease-in forwards; }
@keyframes ms-fire-fade-slide {
  from { opacity: 0; transform: translateY(20px); }
}
@keyframes ms-fire-fade-slide-out {
  to { opacity: 0; transform: translateY(20px); }
}
@media (prefers-reduced-motion: reduce) {
  .ms-fire-verdict--reveal, .ms-fire-verdict--dismiss { animation: none; }
}
`;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface FireSceneProps {
  /** Big status code ("404", "500", ...). */
  code: string;
  /** Fully-resolved strings (scenes merge partials over their defaults). */
  strings: NotFoundSceneStrings;
  homeHref: string;
  members: FireSceneMember[];
  className?: string;
  /** When set, renders a filled retry button and demotes home to a text link. */
  onRetry?: () => void;
  retryLabel?: string;
  /** Extra node after the actions (ErrorScene's digest line). */
  footer?: ReactNode;
}

export function FireScene({
  code,
  strings,
  homeHref,
  members,
  className,
  onRetry,
  retryLabel,
  footer,
}: FireSceneProps) {
  // The vote is local state only — it never leaves the page.
  // `seq` keys the verdict block so a re-select restarts the reveal animation.
  const [selection, setSelection] = useState<{ name: string; seq: number } | null>(null);
  const [dismissing, setDismissing] = useState(false);

  const pick = (name: string) => {
    setDismissing(false);
    setSelection((prev) => ({ name, seq: (prev?.seq ?? 0) + 1 }));
  };

  const cancel = () => {
    if (prefersReducedMotion()) {
      // No dismiss animation will run — hide immediately rather than
      // waiting for an `animationend` that never fires.
      setSelection(null);
      return;
    }
    setDismissing(true);
  };

  const handleVerdictAnimationEnd = () => {
    if (!dismissing) return; // the reveal animation also ends here
    setSelection(null);
    setDismissing(false);
  };

  return (
    // No viewport-height claim: the scene renders inside AppShell's inner
    // scroll container (main is viewport MINUS shell chrome + gutters), where
    // `min-h-screen` guaranteed ~9rem of phantom scroll on a page that fits.
    // Natural height composes anywhere; a standalone full-page consumer can
    // pass `className="min-h-screen"` (cn/tailwind-merge lets it win).
    <main className={cn("flex items-center justify-center p-6", className)}>
      <style>{SCENE_CSS}</style>
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <span className="text-7xl leading-none">{code}</span>
            <Logo className="-mt-3 h-16 w-16" />
          </div>
          <h1 className="mb-6 text-2xl font-bold text-balance">{strings.title}</h1>
        </div>

        <div className="flex flex-col gap-2 text-lg text-on-surface">
          <span>{strings.blame}</span>
          <span>{strings.pick}</span>
        </div>

        <div className="mt-8 mb-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {members.map((member) => {
            const pressed = !dismissing && selection?.name === member.name;
            return (
              <button
                key={member.name}
                type="button"
                aria-pressed={pressed}
                onClick={() => pick(member.name)}
                className={cn(
                  "flex flex-col items-center rounded-2xl border-2 p-6 transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  pressed
                    ? "cursor-default border-primary bg-surface-container-highest text-on-surface"
                    : "cursor-pointer border-transparent bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim active:scale-[0.97]",
                )}
              >
                <span
                  className={cn(
                    "flex h-24 w-24 items-center justify-center rounded-full border-2 border-secondary transition-[filter] duration-300",
                    pressed && "grayscale",
                  )}
                  style={{ backgroundColor: member.iconBg }}
                >
                  <span className="flex h-13 w-13 items-center justify-center" aria-hidden="true">
                    {member.icon}
                  </span>
                </span>
                <span className="mt-3 text-sm font-medium">{member.name}</span>
              </button>
            );
          })}
        </div>

        {selection && (
          <div
            key={selection.seq}
            onAnimationEnd={handleVerdictAnimationEnd}
            className={cn(
              "ms-fire-verdict mb-6 flex flex-col gap-1 text-on-surface",
              dismissing ? "ms-fire-verdict--dismiss" : "ms-fire-verdict--reveal",
            )}
          >
            <span>{strings.chose(selection.name)}</span>
            <div className="flex flex-wrap items-center gap-2">
              <span>{strings.cruel}</span>
              <Button variant="text" size="sm" onClick={cancel}>
                {strings.cancel}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {onRetry && <Button onClick={onRetry}>{retryLabel}</Button>}
          <a
            href={homeHref}
            className={cn(
              buttonBaseClass,
              "px-4 py-3 font-medium", // Button md sizing
              variantMap[onRetry ? "text" : "filled"].primary,
            )}
          >
            {strings.home}
          </a>
        </div>

        {footer}
      </div>
    </main>
  );
}
