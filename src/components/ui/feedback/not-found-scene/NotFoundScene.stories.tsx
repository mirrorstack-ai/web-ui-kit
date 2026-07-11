import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundScene } from "./NotFoundScene";

const meta: Meta<typeof NotFoundScene> = {
  title: "UI/Feedback/NotFoundScene",
  component: NotFoundScene,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof NotFoundScene>;

export const Playground: Story = {};

export const CustomHome: Story = {
  args: { homeHref: "/apps" },
};

export const ZhTW: Story = {
  args: {
    strings: {
      title: "哎呀！找不到頁面！",
      blame: "這次不可饒恕的失敗，開發團隊必須有人出來負責！",
      pick: "選一位開除吧⋯⋯",
      chose: (name) => `你選擇了工程師「${name}」，回到首頁時送出答案`,
      cruel: "還是你覺得這樣太殘忍了⋯⋯",
      cancel: "取消選擇",
      home: "回到首頁",
    },
  },
};
