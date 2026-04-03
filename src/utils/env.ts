export const ENV = {
  PROD: "production",
  DEV: "development",
} as const;

export const isProd = process.env.NODE_ENV === ENV.PROD;
export const isDev = process.env.NODE_ENV === ENV.DEV;
export const isStorybook = Boolean(import.meta.env?.STORYBOOK);