import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

const meta: Meta<typeof Surface> = {
	title: "UI/Surfaces/Surface",
	component: Surface,
	args: {
		children: "Content inside surface",
	},
	argTypes: {
		children: { control: "text" },
	},
};

export default meta;
type Story = StoryObj<typeof Surface>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Surface with custom padding and content */
export const WithCustomContent: Story = {
	render: (args) => (
		<Surface {...args} className="p-6 max-w-md">
			<div>
				<h3 className="text-lg font-semibold mb-2">Card Title</h3>
				<p className="text-on-surface-variant">
					This is a surface component with custom content inside. It provides a
					subtle background and rounded corners.
				</p>
			</div>
		</Surface>
	),
};

/** Nested surfaces showing layering */
export const NestedSurfaces: Story = {
	render: (args) => (
		<Surface {...args} className="p-6 space-y-4">
			<Surface className="p-4">
				<p>Nested surface 1</p>
			</Surface>
			<Surface className="p-4">
				<p>Nested surface 2</p>
			</Surface>
		</Surface>
	),
};

/** Different sizes */
export const Sizes: Story = {
	render: (args) => (
		<div className="flex gap-4 items-end">
			<Surface {...args} className="p-3 w-24 h-24">
				<p className="text-sm">Small</p>
			</Surface>
			<Surface {...args} className="p-4 w-32 h-32">
				<p>Medium</p>
			</Surface>
			<Surface {...args} className="p-6 w-40 h-40">
				<p className="text-lg">Large</p>
			</Surface>
		</div>
	),
};

/** Surface as a card wrapper */
export const AsCard: Story = {
	render: (args) => (
		<Surface {...args} className="p-6 max-w-sm">
			<div className="flex flex-col gap-3">
				<div className="h-32 bg-surface-container-highest rounded-lg" />
				<h4 className="font-semibold">Card Title</h4>
				<p className="text-sm text-on-surface-variant">
					Card description goes here. The surface provides a clean container.
				</p>
				<div className="flex gap-2 mt-2">
					<button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm">
						Primary Action
					</button>
					<button className="px-4 py-2 text-primary text-sm">
						Secondary
					</button>
				</div>
			</div>
		</Surface>
	),
};