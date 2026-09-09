import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SettingsTransfer } from "./SettingsTransfer";

afterEach(cleanup);

const envelope = { module: "demo", version: 1, settings: { retries: 3 } };

function renderTransfer(
  overrides: Partial<React.ComponentProps<typeof SettingsTransfer<typeof envelope, { retries: number }>>> = {},
) {
  const parse = vi.fn(() => ({ ok: true as const, value: { retries: 3 } }));
  const onImport = vi.fn();
  const utils = render(
    <SettingsTransfer value={envelope} parse={parse} onImport={onImport} {...overrides} />,
  );
  return { ...utils, parse, onImport };
}

function openDialog() {
  fireEvent.click(screen.getByRole("button", { name: "Paste settings" }));
}

function paste(text: string) {
  fireEvent.change(screen.getByLabelText("Settings JSON"), { target: { value: text } });
}

describe("SettingsTransfer", () => {
  // 🔴 The property the whole component exists for. A paste that wrote through
  // to the API would be the only control on a settings page with no undo, so
  // it hands the value UP and the caller's save bar stays the last gate.
  it("hands a valid paste to onImport and never saves it itself", () => {
    const { parse, onImport } = renderTransfer();
    openDialog();
    paste('{"module":"demo","version":1,"settings":{"retries":3}}');
    fireEvent.click(screen.getByRole("button", { name: "Load" }));
    expect(parse).toHaveBeenCalledWith('{"module":"demo","version":1,"settings":{"retries":3}}');
    expect(onImport).toHaveBeenCalledWith({ retries: 3 });
  });

  // Three refusals, not one: they send an operator to three different places —
  // fix the text, paste it on the other module's page, or update the console.
  it.each([
    ["malformed", "That text is not a valid settings export."],
    ["wrongModule", "That export belongs to a different module."],
    ["unsupported", "That export was made by a newer version of this module."],
  ] as const)("names a %s refusal and keeps the dialog open", (error, message) => {
    const { onImport } = renderTransfer({ parse: () => ({ ok: false, error }) });
    openDialog();
    paste("anything");
    fireEvent.click(screen.getByRole("button", { name: "Load" }));
    expect(screen.getByRole("alert")).toHaveTextContent(message);
    expect(onImport).not.toHaveBeenCalled();
    // Still open — the operator can fix the text in place.
    expect(screen.getByLabelText("Settings JSON")).toBeInTheDocument();
  });

  it("clears the refusal as soon as the text is edited", () => {
    renderTransfer({ parse: () => ({ ok: false, error: "malformed" }) });
    openDialog();
    paste("bad");
    fireEvent.click(screen.getByRole("button", { name: "Load" }));
    expect(screen.queryByRole("alert")).toBeInTheDocument();
    paste("bad2");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  // Reopening must not show the previous paste, or the stale text is the first
  // thing the operator sees and reads as the state they are about to load.
  it("forgets the paste and the refusal when the dialog closes", () => {
    renderTransfer({ parse: () => ({ ok: false, error: "malformed" }) });
    openDialog();
    paste("bad");
    fireEvent.click(screen.getByRole("button", { name: "Load" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    openDialog();
    expect(screen.getByLabelText("Settings JSON")).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("does not arm Load until something is pasted", () => {
    renderTransfer();
    openDialog();
    expect(screen.getByRole("button", { name: "Load" })).toBeDisabled();
    paste("   ");
    expect(screen.getByRole("button", { name: "Load" })).toBeDisabled();
    paste("{}");
    expect(screen.getByRole("button", { name: "Load" })).toBeEnabled();
  });

  // Null value means the settings have not loaded. Copying "null" or pasting
  // into a form the pending fetch is about to overwrite are both wrong.
  it("disables both controls while the value is null", () => {
    renderTransfer({ value: null });
    expect(screen.getByRole("button", { name: "Copy settings" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Paste settings" })).toBeDisabled();
  });

  it("copies the value as pretty JSON and flashes the control", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    try {
      renderTransfer();
      fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
      expect(writeText).toHaveBeenCalledWith(JSON.stringify(envelope, null, 2));
      // The flash is a state change driven by the promise, so it lands a tick
      // after the click.
      await screen.findByText("check");
    } finally {
      vi.unstubAllGlobals();
    }
  });

  // 🔴 The clipboard API REJECTS on a denied permission and is ABSENT outside a
  // secure context. Either has to leave the page standing: an unhandled
  // rejection here would take down a settings surface over a copy button.
  it("survives a clipboard that rejects or is missing", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: () => Promise.reject(new Error("denied")) } });
    try {
      renderTransfer();
      fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
      await Promise.resolve();
      expect(screen.queryByText("check")).not.toBeInTheDocument();
    } finally {
      vi.unstubAllGlobals();
    }
    cleanup();
    vi.stubGlobal("navigator", {});
    try {
      renderTransfer();
      fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
      expect(screen.getByRole("button", { name: "Copy settings" })).toBeInTheDocument();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  // The kit holds no catalog. A consumer with one passes its own strings, and
  // may translate only the keys it cares about.
  it("takes caller strings per key, keeping the English default for the rest", () => {
    renderTransfer({ labels: { import: "貼上設定", load: "載入" } });
    fireEvent.click(screen.getByRole("button", { name: "貼上設定" }));
    expect(screen.getByRole("button", { name: "載入" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
