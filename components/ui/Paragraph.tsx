import type { ReactNode } from "react";

type Size = "sm" | "base" | "lg";
type Color = "default" | "muted" | "subtle";

const sizeMap: Record<Size, string> = {
	sm: "text-base",
	base: "text-lg",
	lg: "text-xl sm:text-2xl",
};

const colorMap: Record<Color, string> = {
	default: "text-white",
	muted: "text-gray-400",
	subtle: "text-white/60",
};

export function Paragraph({
	size = "base",
	color = "default",
	className = "",
	children,
}: {
	size?: Size;
	color?: Color;
	className?: string;
	children: ReactNode;
}) {
	return (
		<p
			className={`leading-relaxed ${sizeMap[size]} ${colorMap[color]} ${className}`}
		>
			{children}
		</p>
	);
}
