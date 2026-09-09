import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404 — Page Not Found",
	description: "The page you're looking for doesn't exist.",
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
			{/* Glow blob */}
			<div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

			{/* 404 number */}
			<p className="text-[clamp(7rem,22vw,14rem)] font-bold leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/50 to-white/10 drop-shadow-[0_0_80px_rgba(100,150,255,0.35)]">
				404
			</p>

			<div className="w-16 h-px bg-white/15 mb-6" />

			<h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
				Page Not Found
			</h1>
			<p className="text-gray-400 text-base sm:text-lg max-w-sm mb-10 leading-relaxed">
				Looks like this page drifted off into space. Let&apos;s get you back on
				track.
			</p>

			<a
				href="/"
				className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2.5"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to Home
			</a>

			<p className="absolute bottom-8 text-xs text-white/20">
				© {new Date().getFullYear()} Joshtri Lenggu
			</p>
		</div>
	);
}
