"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type Lang = "en" | "id";

interface LanguageContextValue {
	lang: Lang;
	setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Anti-flash: this runs in <head> before first paint, mirroring the old Astro
// inline script. It sets data-lang/lang on <html> from localStorage so the
// document attribute is correct immediately. React text still resolves on the
// client (see useLang), so SSR always renders EN and hydration stays stable.
export const languageInitScript = `(function(){try{var l=localStorage.getItem('lang')||'en';if(l!=='en'&&l!=='id')l='en';document.documentElement.setAttribute('data-lang',l);document.documentElement.setAttribute('lang',l);}catch(e){}})();`;

export function LanguageProvider({ children }: { children: ReactNode }) {
	// Always start from "en" so the client's first render matches the server.
	const [lang, setLangState] = useState<Lang>("en");

	useEffect(() => {
		let stored: Lang = "en";
		try {
			const raw = localStorage.getItem("lang");
			if (raw === "en" || raw === "id") stored = raw;
		} catch {}
		setLangState(stored);
	}, []);

	const setLang = useCallback((next: Lang) => {
		setLangState(next);
		try {
			localStorage.setItem("lang", next);
		} catch {}
		document.documentElement.setAttribute("data-lang", next);
		document.documentElement.setAttribute("lang", next);
	}, []);

	const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLang() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
	const { lang, setLang } = ctx;

	/** Pick a value by language. `pick({ en, id })`. */
	const pick = useCallback(
		<T,>(opts: { en: T; id: T }): T => (lang === "id" ? opts.id : opts.en),
		[lang],
	);

	/** Resolve a bilingual API field ({ en, id } object or plain string). */
	const field = useCallback(
		(
			text: { en: string; id: string } | string | undefined,
			fallback = "",
		): string => {
			if (!text) return fallback;
			if (typeof text === "string") return text;
			return text[lang] || text[lang === "en" ? "id" : "en"] || fallback;
		},
		[lang],
	);

	return { lang, setLang, pick, field };
}

/** Inline text switcher: `<T en="Home" id="Beranda" />`. */
export function T({ en, id }: { en: ReactNode; id: ReactNode }) {
	const { lang } = useLang();
	return <>{lang === "id" ? id : en}</>;
}
