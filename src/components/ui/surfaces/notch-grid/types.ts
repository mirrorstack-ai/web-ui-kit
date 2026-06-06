import type { ComponentType } from "react";

/** Stable identity for a grid item / sub-item. */
export type ItemKey = string;

/** Map from a primitive `type` string to the component that renders it. */
export type PrimitiveRegistry = Record<
  string,
  ComponentType<Record<string, unknown>>
>;
