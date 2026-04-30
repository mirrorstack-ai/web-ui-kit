import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AvatarCropper, meta } from "./AvatarCropper";

// jsdom doesn't implement URL.createObjectURL/revokeObjectURL — stub them
// so the lifecycle effect runs without throwing.
beforeAll(() => {
  if (!URL.createObjectURL) {
    URL.createObjectURL = vi.fn(() => "blob:mock");
  }
  if (!URL.revokeObjectURL) {
    URL.revokeObjectURL = vi.fn();
  }
});

afterEach(cleanup);

// react-easy-crop renders a Cropper component that needs a layout-aware
// environment; jsdom doesn't supply that, but we can still verify the
// surface contract: open/closed states, action handlers, and the meta
// export. The Cropper internals are exercised end-to-end in the
// consuming app's manual smoke tests.
vi.mock("react-easy-crop", () => ({
  default: () => <div data-testid="cropper-mock" />,
}));

describe("AvatarCropper", () => {
  it("exports a ComponentMeta", () => {
    expect(meta.name).toBe("AvatarCropper");
    expect(typeof meta.description).toBe("string");
  });

  it("renders nothing when file is null", () => {
    render(<AvatarCropper file={null} onCancel={() => {}} onSave={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when file is provided", () => {
    const file = new File([new Uint8Array(64)], "x.jpg", { type: "image/jpeg" });
    render(<AvatarCropper file={file} onCancel={() => {}} onSave={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Adjust avatar")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("respects custom title prop", () => {
    const file = new File([new Uint8Array(64)], "x.jpg", { type: "image/jpeg" });
    render(
      <AvatarCropper file={file} onCancel={() => {}} onSave={() => {}} title="Pick crop" />,
    );
    expect(screen.getByText("Pick crop")).toBeInTheDocument();
  });

  it("Save button starts disabled (image not yet decoded in jsdom)", () => {
    const file = new File([new Uint8Array(64)], "x.jpg", { type: "image/jpeg" });
    render(<AvatarCropper file={file} onCancel={() => {}} onSave={() => {}} />);
    // jsdom doesn't fire <img> onload, so imageReady stays false.
    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
  });

  it("Cancel button reflects saving prop", () => {
    const file = new File([new Uint8Array(64)], "x.jpg", { type: "image/jpeg" });
    render(<AvatarCropper file={file} saving onCancel={() => {}} onSave={() => {}} />);
    const cancel = screen.getByRole("button", { name: "Cancel" });
    expect(cancel).toBeDisabled();
  });
});
