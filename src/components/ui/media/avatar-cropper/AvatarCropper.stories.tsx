import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCropper } from "./AvatarCropper";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof AvatarCropper> = {
  title: "UI/Media/AvatarCropper",
  component: AvatarCropper,
};

export default meta;
type Story = StoryObj<typeof AvatarCropper>;

export const Playground: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    return (
      <div className="space-y-4">
        <p className="text-sm text-on-surface-variant">
          Pick an image to open the cropper. Save logs the cropped Blob to the console.
        </p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button variant="outline" onClick={() => setFile(null)}>
          Reset
        </Button>
        <AvatarCropper
          file={file}
          saving={saving}
          onCancel={() => setFile(null)}
          onSave={async (blob) => {
            setSaving(true);
            // Simulate an upload roundtrip so the loading state is visible.
            await new Promise((r) => setTimeout(r, 800));
            // eslint-disable-next-line no-console
            console.log("cropped blob", blob);
            setSaving(false);
            setFile(null);
          }}
        />
      </div>
    );
  },
};
