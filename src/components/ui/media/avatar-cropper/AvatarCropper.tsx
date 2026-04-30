import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "AvatarCropper",
  description:
    "Modal dialog for cropping a picked image to a circular avatar. Drag to reposition, scroll/pinch to zoom. Outputs a cropped Blob via the onSave callback.",
};

export interface AvatarCropperProps {
  /**
   * The picked file. The dialog is open when this is non-null and closed
   * when null. Passing a new File resets the crop offset and re-decodes.
   */
  file: File | null;
  onCancel: () => void;
  onSave: (cropped: Blob) => void | Promise<void>;
  /**
   * When true, the dialog stays open and Save is disabled — useful while
   * the parent runs an async upload. Cancel is also disabled to avoid
   * dropping the source file mid-upload.
   */
  saving?: boolean;
  /**
   * Output dimensions in pixels (square). Defaults to 512, the standard
   * profile-photo ceiling — large enough to downscale for any UI surface,
   * small enough that JPEG @ 0.9 quality is well under typical upload caps.
   */
  outputSize?: number;
  /**
   * JPEG/WebP encoding quality (0–1). Ignored for PNG. Defaults to 0.9.
   */
  quality?: number;
  /** Optional title override. Defaults to "Adjust avatar". */
  title?: string;
}

export function AvatarCropper({
  file,
  onCancel,
  onSave,
  saving,
  outputSize = 512,
  quality = 0.9,
  title = "Adjust avatar",
}: AvatarCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  // Object URL + decoded image lifecycle.
  //
  // Both URL creation and image decode live in a single effect so the
  // cleanup closure captures the exact URL that was created (useMemo +
  // separate cleanup can leak under StrictMode's double-invoke). The
  // decoded HTMLImageElement is cached in a ref so produceCroppedBlob
  // doesn't re-decode on every Save click.
  const [imageUrl, setImageUrl] = useState("");
  const [imageReady, setImageReady] = useState(false);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!file) {
      setImageUrl("");
      setImageReady(false);
      imageElementRef.current = null;
      return;
    }
    // aborted gates the load callbacks against rapid file change.
    // Without it, an in-flight onload from a previous file can fire
    // after this effect's cleanup ran, restoring a stale (revoked-URL)
    // image element and re-enabling Save against broken bytes.
    let aborted = false;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImageReady(false);

    const img = new Image();
    img.onload = () => {
      if (aborted) return;
      imageElementRef.current = img;
      setImageReady(true);
    };
    img.onerror = () => {
      if (aborted) return;
      // Save stays disabled (imageReady false). Cancel still works.
      imageElementRef.current = null;
      if (isDev) {
        console.warn("[AvatarCropper] failed to decode image; Save is disabled");
      }
    };
    img.src = url;

    return () => {
      aborted = true;
      URL.revokeObjectURL(url);
      imageElementRef.current = null;
    };
  }, [file]);

  // Reset crop/zoom when a new file arrives — without this, opening for
  // a second file inherits the prior offset.
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  }, [file]);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    const img = imageElementRef.current;
    if (!file || !croppedArea || !img) return;
    try {
      const blob = await produceCroppedBlob(img, croppedArea, file.type, outputSize, quality);
      if (blob) await onSave(blob);
    } catch (err) {
      // onSave's lifecycle (saving prop, error UI) is the consumer's
      // contract — we catch here to keep an async rejection from
      // bubbling out of Dialog's sync onClick as an unhandled
      // rejection.
      if (isDev) {
        console.warn("[AvatarCropper] onSave threw; consumer should handle:", err);
      }
    }
  }, [file, croppedArea, onSave, outputSize, quality]);

  const saveDisabled = !!saving || !imageReady;

  return (
    <Dialog
      open={file !== null}
      onClose={saving ? undefined : onCancel}
      title={title}
      actions={[
        { label: "Cancel", variant: "text", onClick: onCancel, disabled: saving },
        {
          label: "Save",
          variant: "filled",
          onClick: handleSave,
          loading: saving,
          disabled: saveDisabled,
        },
      ]}
    >
      <div className="relative w-full h-80 bg-surface-container">
        {imageUrl && (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}
      </div>
      <p className="text-xs text-on-surface-variant mt-3">
        Drag to reposition, scroll or pinch to zoom.
      </p>
    </Dialog>
  );
}

async function produceCroppedBlob(
  img: HTMLImageElement,
  area: Area,
  mimeType: string,
  outputSize: number,
  quality: number,
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(
    img,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    outputSize,
    outputSize,
  );
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), mimeType, quality);
  });
}
