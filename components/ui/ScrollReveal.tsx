"use client";

import { type ReactNode, useEffect, useRef } from "react";

interface Props {
	children: ReactNode;
	/** Extra classes applied to the wrapper (layout, etc.). */
	className?: string;
	/** Stagger delay in seconds. */
	delay?: number;
	threshold?: number;
}

/**
 * Reveals its children with a fade/slide-up once scrolled into view — the React
 * equivalent of the IntersectionObserver `<script>` blocks the Astro sections
 * used. Wraps children in a `.reveal` element and adds `.reveal--in` on
 * intersection.
 */
export function ScrollReveal({
	children,
	className = "",
	delay = 0,
	threshold = 0.1,
}: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal--in");
						io.unobserve(entry.target);
					}
				}
			},
			{ threshold },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [threshold]);

	return (
		<div
			ref={ref}
			className={`reveal ${className}`}
			style={delay ? { transitionDelay: `${delay}s` } : undefined}
		>
			{children}
		</div>
	);
}
