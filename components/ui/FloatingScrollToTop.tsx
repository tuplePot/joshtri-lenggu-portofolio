"use client";

import { useEffect, useRef, useState } from "react";

// Button = w-14 = 56px; SVG wraps slightly larger.
const SVG = 68;
const STROKE = 3;
const R = SVG / 2 - STROKE / 2 - 1; // 30.5
const C = +(2 * Math.PI * R).toFixed(2);

export function FloatingScrollToTop() {
	const [visible, setVisible] = useState(false);
	const ringRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			const progress = Math.min(
				1,
				scrollTop / Math.max(1, scrollHeight - clientHeight),
			);
			if (ringRef.current) {
				ringRef.current.style.strokeDashoffset = String(C * (1 - progress));
			}
			setVisible(scrollTop > 300);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className={`fixed right-6 bottom-28 z-50 transition-all duration-300 ${
				visible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
			}`}
		>
			<div className="relative w-14 h-14">
				<svg
					aria-hidden="true"
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] pointer-events-none"
					width={SVG}
					height={SVG}
					viewBox={`0 0 ${SVG} ${SVG}`}
				>
					<circle
						cx={SVG / 2}
						cy={SVG / 2}
						r={R}
						fill="none"
						stroke="white"
						strokeOpacity="0.15"
						strokeWidth={STROKE}
					/>
					<circle
						ref={ringRef}
						cx={SVG / 2}
						cy={SVG / 2}
						r={R}
						fill="none"
						stroke="white"
						strokeWidth={STROKE}
						strokeLinecap="round"
						strokeDasharray={C}
						strokeDashoffset={C}
						style={{ transition: "stroke-dashoffset 0.12s ease-out" }}
					/>
				</svg>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label="Scroll to top"
					className="absolute inset-0 w-full h-full rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-600/30 transition-colors duration-200 flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2.5"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 15l7-7 7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
