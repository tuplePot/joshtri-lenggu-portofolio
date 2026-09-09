"use client";

import { useLang } from "@/lib/i18n";

// EN/ID toggle. All instances stay in sync via the shared LanguageProvider
// context (no more DOM broadcasting like the old Astro version needed).
export function LanguageSwitcher() {
	const { lang, setLang } = useLang();

	return (
		<div
			className="lang-switch flex items-center gap-0.5 p-0.5 rounded-full border border-white/10 bg-white/5"
			role="group"
			aria-label="Switch language"
		>
			<button
				type="button"
				onClick={() => setLang("en")}
				aria-label="Switch to English"
				className={`px-2 py-1 text-[11px] font-semibold tracking-wide rounded-full transition-all duration-200 ${
					lang === "en"
						? "text-white bg-white/15"
						: "text-white/50 hover:text-white"
				}`}
			>
				EN
			</button>
			<button
				type="button"
				onClick={() => setLang("id")}
				aria-label="Ganti ke Bahasa Indonesia"
				className={`px-2 py-1 text-[11px] font-semibold tracking-wide rounded-full transition-all duration-200 ${
					lang === "id"
						? "text-white bg-white/15"
						: "text-white/50 hover:text-white"
				}`}
			>
				ID
			</button>
		</div>
	);
}
