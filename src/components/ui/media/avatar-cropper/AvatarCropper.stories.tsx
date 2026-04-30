import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCropper } from "./AvatarCropper";
import { Avatar } from "@/components/ui/media/avatar/Avatar";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof AvatarCropper> = {
  title: "UI/Media/AvatarCropper",
  component: AvatarCropper,
};

export default meta;
type Story = StoryObj<typeof AvatarCropper>;

export const Playground: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    // Object URL for the result preview — revoke on replacement / unmount
    // so we don't leak Blob references in long-running dev sessions.
    useEffect(() => {
      if (!resultUrl) return;
      return () => URL.revokeObjectURL(resultUrl);
    }, [resultUrl]);

    const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setPendingFile(file);
      e.target.value = "";
    };

    return (
      <div className="space-y-6">
        <p className="text-sm text-on-surface-variant">
          Pick a photo, drag/zoom to crop, then Save. The cropped result renders
          below — same flow a consuming app would wire to an upload endpoint.
        </p>

        <div className="flex items-center gap-4">
          <Avatar
            src={resultUrl ?? undefined}
            fallback="A"
            size="xl"
          />
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              loading={saving}
            >
              {resultUrl ? "Replace photo" : "Choose photo"}
            </Button>
            {resultUrl && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setResultUrl(null)}
                disabled={saving}
              >
                Reset
              </Button>
            )}
            <p className="text-xs text-on-surface-variant">
              JPEG, PNG, or WebP · Max 5 MB
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onPick}
          className="hidden"
        />

        <AvatarCropper
          file={pendingFile}
          saving={saving}
          onCancel={() => setPendingFile(null)}
          onSave={async (blob) => {
            setSaving(true);
            try {
              // Simulate an upload roundtrip so the loading state is visible.
              await new Promise((r) => setTimeout(r, 600));
              setResultUrl(URL.createObjectURL(blob));
              setPendingFile(null);
            } finally {
              setSaving(false);
            }
          }}
        />
      </div>
    );
  },
};
