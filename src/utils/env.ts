export const ENV = {
  PROD: "production",
  DEV: "development",
} as const;

export const isProd = process.env.NODE_ENV === ENV.PROD;
export const isDev = process.env.NODE_ENV === ENV.DEV;

// IMPORTANT: include this (maintainer added it)
export const isStorybook =
  process.env.STORYBOOK === "true" ||
  process.env.NODE_ENV === "test";