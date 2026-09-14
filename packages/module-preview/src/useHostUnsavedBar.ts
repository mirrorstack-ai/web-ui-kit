import { useCallback, useMemo, useRef } from "react";
import { useSnackbar, type SnackbarOptions } from "@mirrorstack-ai/web-ui-kit";
import type { PlatformUnsaved, UnsavedBarState } from "./hostTypes.js";

/**
 * The platform's unsaved-changes bar, rendered the way the console renders it.
 *
 * 🔴 THIS IS A COPY OF THE HOST, AND IT IS THE COPY EVERY PREVIEW WOULD
 * OTHERWISE MAKE FOR ITSELF. web-applications' ModuleMount builds the bar from
 * a module's `unsaved.set(...)` exactly like this — same kit Snackbar, same
 * "unsave" variant, same `duration: 0`, same confirmation afterwards.
 * Reproducing it, instead of inventing a nicer bar for the preview, is what
 * makes a verdict about the bar here a verdict about the bar in production.
 *
 * Two bugs are already baked out of it, both found by reviewing the invention
 * instead of the product:
 *
 * 1. The confirmation is armed by the SAVE BUTTON, not by the page going clean
 *    (the host tracks this as `saveArmedOwnerRef`). Without `armed`, a page
 *    that reports itself clean — on mount, on a scene that saved nothing —
 *    toasts "Saved" at a reviewer who saved nothing.
 * 2. The bridge's identity must be STABLE. It is part of the mount context, so
 *    a bridge rebuilt on every render remounts the surface: raising the bar
 *    re-rendered the harness, the module was unmounted and remounted, and the
 *    page under review went blank.
 *
 * @param savedMessage - The confirmation the HOST shows after a save. It comes
 *   from the console's catalog (`moduleMount.saved`), not from the module, so a
 *   preview must show the console's wording rather than a nicer sentence
 *   nobody will read in production.
 * @returns A bridge a mount can be handed as `context.unsaved`.
 */
export function useHostUnsavedBar(savedMessage: string): PlatformUnsaved {
  const { showSnackbar, dismissSnackbar } = useSnackbar();
  const armed = useRef(false);

  const raise = useCallback(
    (state: UnsavedBarState) => {
      const options: SnackbarOptions = {
        message: state.message,
        variant: "unsave",
        duration: 0,
        action:
          state.canSave === false
            ? undefined
            : {
                label: state.saveLabel,
                onClick: () => {
                  armed.current = true;
                  state.onSave();
                },
              },
        secondaryAction: {
          label: state.resetLabel,
          onClick: () => {
            armed.current = false;
            state.onReset();
          },
        },
      };
      showSnackbar(options);
    },
    [showSnackbar],
  );

  return useMemo<PlatformUnsaved>(
    () => ({
      set: (state) => {
        if (state === null) {
          dismissSnackbar();
          if (armed.current) {
            armed.current = false;
            setTimeout(() => showSnackbar({ message: savedMessage, variant: "success" }), 50);
          }
          return;
        }
        raise(state);
      },
    }),
    [dismissSnackbar, raise, savedMessage, showSnackbar],
  );
}
