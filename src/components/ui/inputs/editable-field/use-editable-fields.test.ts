import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEditableFields } from "./use-editable-fields";

describe("useEditableFields", () => {
  it("starts with no fields editing", () => {
    const { result } = renderHook(() => useEditableFields());
    expect(result.current.isEditing("name")).toBe(false);
  });

  it("startEdit is idempotent", () => {
    const { result } = renderHook(() => useEditableFields());
    act(() => result.current.startEdit("name"));
    act(() => result.current.startEdit("name"));
    expect(result.current.isEditing("name")).toBe(true);
  });

  it("multiple fields can edit concurrently", () => {
    const { result } = renderHook(() => useEditableFields());
    act(() => {
      result.current.startEdit("name");
      result.current.startEdit("slug");
    });
    expect(result.current.isEditing("name")).toBe(true);
    expect(result.current.isEditing("slug")).toBe(true);
  });

  it("reset clears all editing fields", () => {
    const { result } = renderHook(() => useEditableFields());
    act(() => {
      result.current.startEdit("name");
      result.current.startEdit("slug");
    });
    act(() => result.current.reset());
    expect(result.current.isEditing("name")).toBe(false);
    expect(result.current.isEditing("slug")).toBe(false);
  });
});
