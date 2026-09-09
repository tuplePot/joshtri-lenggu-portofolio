import type { ReactNode } from "react";

type Level = "h1" | "h2" | "h3" | "h4";

const sizeMap: Record<Level, string> = {
	h1: "text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight",
	h2: "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight",
	h3: "text-2xl sm:text-3xl font-semibold",
	h4: "text-xl sm:text-2xl font-semibold",
};

export function Heading({
	level = "h1",
	className = "",
	children,
}: {
	level?: Level;
	className?: string;
	children: ReactNode;
}) {
	const Tag = level;
	return <Tag className={`${sizeMap[level]} ${className}`}>{children}</Tag>;
}
