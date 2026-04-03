import type { ComponentMeta } from "@/types/component-meta";
import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

export const meta: ComponentMeta = {
	name: "Surface",
	description: "Container div with rounded corners, low-elevation background, and outline border",
};

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

export function Surface({ children, className, ...props }: SurfaceProps) {
	return (
		<div
			className={cn(
				"bg-surface-container-low rounded-2xl border border-outline-variant",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}