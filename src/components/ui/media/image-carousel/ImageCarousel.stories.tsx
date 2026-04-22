import type { Meta, StoryObj } from "@storybook/react";
import { ImageCarousel } from "./ImageCarousel";

const sampleImages = [
  {
    src: "https://picsum.photos/seed/a/400/533",
    alt: "Sample image 1",
    title: "Mountain Vista",
    description: "A breathtaking mountain landscape at dawn",
  },
  {
    src: "https://picsum.photos/seed/b/400/533",
    alt: "Sample image 2",
    title: "Ocean Sunset",
    description: "Golden light reflecting off calm waters",
  },
  {
    src: "https://picsum.photos/seed/c/400/533",
    alt: "Sample image 3",
    title: "Forest Trail",
    description: "A winding path through ancient trees",
  },
  {
    src: "https://picsum.photos/seed/d/400/533",
    alt: "Sample image 4",
    title: "City Lights",
    description: "A vibrant cityscape after dark",
  },
];

const meta: Meta<typeof ImageCarousel> = {
  title: "UI/Media/ImageCarousel",
  component: ImageCarousel,
  args: {
    images: sampleImages,
  },
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

export const Playground: Story = {};
