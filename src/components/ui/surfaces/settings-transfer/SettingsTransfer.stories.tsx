import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SettingsSection } from "@/components/ui/surfaces/settings-section/SettingsSection";
import { SettingRow } from "@/components/ui/display/setting-row/SettingRow";
import { Switch } from "@/components/ui/inputs/switch/Switch";
import { SettingsTransfer, type SettingsTransferError } from "./SettingsTransfer";

const meta: Meta<typeof SettingsTransfer> = {
  title: "UI/Surfaces/SettingsTransfer",
  component: SettingsTransfer,
};

export default meta;
type Story = StoryObj<typeof SettingsTransfer>;

interface DemoSettings {
  linkAccountsByEmail: boolean;
  sessionLifetimeDays: number;
}

const MODULE = "demo-module";
const VERSION = 1;

/**
 * The `parse` a real consumer writes: every field checked, because the text
 * came off a clipboard and is about to become an application's configuration.
 */
function parseDemo(
  raw: string,
): { ok: true; value: DemoSettings } | { ok: false; error: SettingsTransferError } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "malformed" };
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "malformed" };
  }
  const envelope = parsed as { module?: unknown; version?: unknown; settings?: unknown };
  // Module before version: pasting the neighbouring module's export is the
  // likelier mistake, and it is the more useful thing to say about it.
  if (envelope.module !== MODULE) {
    return { ok: false, error: typeof envelope.module === "string" ? "wrongModule" : "malformed" };
  }
  if (envelope.version !== VERSION) {
    return {
      ok: false,
      error:
        typeof envelope.version === "number" && envelope.version > VERSION
          ? "unsupported"
          : "malformed",
    };
  }
  const settings = envelope.settings as Partial<DemoSettings> | null;
  if (
    settings === null ||
    typeof settings !== "object" ||
    typeof settings.linkAccountsByEmail !== "boolean" ||
    typeof settings.sessionLifetimeDays !== "number" ||
    !Number.isInteger(settings.sessionLifetimeDays) ||
    settings.sessionLifetimeDays < 1 ||
    settings.sessionLifetimeDays > 365
  ) {
    return { ok: false, error: "malformed" };
  }
  return {
    ok: true,
    value: {
      linkAccountsByEmail: settings.linkAccountsByEmail,
      sessionLifetimeDays: settings.sessionLifetimeDays,
    },
  };
}

/**
 * A settings page, with the transfer pair where consumers put it: bottom of the
 * form, right-aligned. Copy, then paste the clipboard back in and watch the
 * switch move — the paste lands in the DRAFT, which is the whole design.
 *
 * Paste these to see each refusal:
 * - `not json` → malformed
 * - `{"module":"other","version":1,"settings":{}}` → wrongModule
 * - `{"module":"demo-module","version":9,"settings":{}}` → unsupported
 */
export const OnASettingsPage: Story = {
  render: () => {
    const [draft, setDraft] = useState<DemoSettings>({
      linkAccountsByEmail: true,
      sessionLifetimeDays: 30,
    });
    return (
      <div className="max-w-md space-y-3">
        <SettingsSection title="Sign-in">
          <div className="space-y-4">
            <SettingRow
              title="Link accounts by email"
              control={
                <Switch
                  checked={draft.linkAccountsByEmail}
                  onChange={(checked) => setDraft({ ...draft, linkAccountsByEmail: checked })}
                />
              }
            />
            <SettingRow
              title="Session lifetime (days)"
              control={
                <span className="text-sm text-on-surface-variant">{draft.sessionLifetimeDays}</span>
              }
            />
          </div>
        </SettingsSection>
        <SettingsTransfer
          value={{ module: MODULE, version: VERSION, settings: draft }}
          parse={parseDemo}
          onImport={setDraft}
        />
      </div>
    );
  },
};

/** Settings still loading: both controls are inert rather than absent, so the
 *  row does not reflow the moment the fetch lands. */
export const Loading: Story = {
  render: () => <SettingsTransfer value={null} parse={parseDemo} onImport={() => {}} />,
};

/** The kit holds no catalog. A consumer with one passes its own strings, and
 *  may translate only the keys it cares about. */
export const TranslatedByTheConsumer: Story = {
  render: () => {
    const [draft, setDraft] = useState<DemoSettings>({
      linkAccountsByEmail: true,
      sessionLifetimeDays: 30,
    });
    return (
      <SettingsTransfer
        value={{ module: MODULE, version: VERSION, settings: draft }}
        parse={parseDemo}
        onImport={setDraft}
        labels={{
          export: "複製設定",
          import: "貼上設定",
          cancel: "取消",
          load: "載入",
          help: "貼上設定匯出內容。它只會載入表單，尚未儲存。",
          inputLabel: "設定 JSON",
          malformed: "這段文字不是有效的設定匯出。",
          wrongModule: "這份匯出屬於其他模組。",
          unsupported: "這份匯出來自較新版本的模組。",
        }}
      />
    );
  },
};
