import type { Meta, StoryObj } from "@storybook/react";
import { ErrorScene } from "./ErrorScene";

const meta: Meta<typeof ErrorScene> = {
  title: "UI/Feedback/ErrorScene",
  component: ErrorScene,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ErrorScene>;

export const Playground: Story = {};

export const WithRetryAndDigest: Story = {
  args: {
    onRetry: () => {},
    digest: "1234567890abcdef",
  },
};

export const CustomCode: Story = {
  args: { code: "503" },
};

export const ZhTW: Story = {
  args: {
    onRetry: () => {},
    retryLabel: "再試一次",
    digest: "1234567890abcdef",
    digestLabel: (digest) => `錯誤代碼：${digest}`,
    strings: {
      title: "哎呀！出了點問題！",
      blame: "我們的開發團隊剛剛把正式環境弄壞了！",
      pick: "選一位開除吧⋯⋯",
      chose: (name) => `你選擇了工程師「${name}」，回到首頁時送出答案`,
      cruel: "還是你覺得這樣太殘忍了⋯⋯",
      cancel: "取消選擇",
      home: "回到首頁",
    },
  },
};
