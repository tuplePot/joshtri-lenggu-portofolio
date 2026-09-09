import localFont from "next/font/local";

// Atkinson Hyperlegible — self-hosted via next/font/local. `src` is resolved
// relative to this file.
export const atkinson = localFont({
	src: [
		{
			path: "../assets/fonts/atkinson-regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../assets/fonts/atkinson-bold.woff",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-atkinson",
	display: "swap",
	fallback: ["sans-serif"],
});
