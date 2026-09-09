"use client";

import { useEffect, useState } from "react";

// Full-screen loader that fades out once the page has loaded — the React
// equivalent of the old inline loader script.
export function PageLoader() {
	const [hidden, setHidden] = useState(false);
	const [removed, setRemoved] = useState(false);

	useEffect(() => {
		const hide = () => {
			setTimeout(() => {
				setHidden(true);
				setTimeout(() => setRemoved(true), 650);
			}, 500);
		};
		if (document.readyState === "complete") {
			hide();
		} else {
			window.addEventListener("load", hide, { once: true });
			return () => window.removeEventListener("load", hide);
		}
	}, []);

	if (removed) return null;

	return (
		<div
			className="fixed inset-0 z-300 bg-[#050512] flex items-center justify-center pointer-events-none"
			style={{ transition: "opacity 0.6s ease", opacity: hidden ? 0 : 1 }}
		>
			<div className="flex gap-2.5">
				<span className="loader-dot w-2.5 h-2.5 rounded-full bg-blue-400" />
				<span
					className="loader-dot w-2.5 h-2.5 rounded-full bg-blue-400"
					style={{ animationDelay: "0.2s" }}
				/>
				<span
					className="loader-dot w-2.5 h-2.5 rounded-full bg-blue-400"
					style={{ animationDelay: "0.4s" }}
				/>
			</div>
		</div>
	);
}
