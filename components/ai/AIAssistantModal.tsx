"use client";

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "@/lib/i18n";
import { AiError, askAI, getSuggestions } from "@/utils/ai";
import { AI_ASK_EVENT } from "./AskAIButton";

marked.setOptions({ breaks: true, gfm: true });

type ErrorKind = "rate" | "net" | "err";

interface Message {
	role: "user" | "bot";
	/** Plain text (user) or rendered/typing text (bot). */
	text: string;
	/** Rendered markdown HTML once the answer is finalized. */
	html?: string;
	error?: ErrorKind;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ERROR_COPY: Record<ErrorKind, { en: string; id: string }> = {
	rate: {
		en: "I'm getting a lot of questions right now — please try again in a moment.",
		id: "Sedang banyak pertanyaan — coba lagi sebentar lagi ya.",
	},
	net: {
		en: "Couldn't reach the server. Check your connection and try again.",
		id: "Tidak bisa menghubungi server. Periksa koneksi lalu coba lagi.",
	},
	err: {
		en: "Something went wrong. Please try again.",
		id: "Terjadi kesalahan. Silakan coba lagi.",
	},
};

function renderMarkdown(md: string): string {
	const html = marked.parse(md) as string;
	return DOMPurify.sanitize(html);
}

export function AIAssistant() {
	const { lang, pick } = useLang();
	const [revealed, setRevealed] = useState(false);
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [typing, setTyping] = useState(false);
	const [busy, setBusy] = useState(false);
	const [input, setInput] = useState("");
	const [suggestions, setSuggestions] = useState<{
		en: string[];
		id: string[];
	} | null>(null);

	const messagesRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const busyRef = useRef(false);

	const hasUserMessage = messages.some((m) => m.role === "user");

	const scrollToBottom = useCallback(() => {
		const el = messagesRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, []);

	// Reveal launcher after a short delay (mirrors the WhatsApp button).
	useEffect(() => {
		const t = setTimeout(() => setRevealed(true), 900);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	const loadSuggestions = useCallback(async () => {
		setSuggestions((prev) => prev ?? null);
		const s = await getSuggestions();
		setSuggestions(s);
	}, []);

	const openPanel = useCallback(() => {
		setOpen(true);
		if (!suggestions) loadSuggestions();
		setTimeout(() => inputRef.current?.focus(), 300);
	}, [suggestions, loadSuggestions]);

	const closePanel = useCallback(() => setOpen(false), []);

	const submit = useCallback(
		async (prompt: string) => {
			const text = prompt.trim();
			if (!text || busyRef.current) return;
			busyRef.current = true;
			setBusy(true);
			setMessages((prev) => [...prev, { role: "user", text }]);
			setInput("");
			setTyping(true);
			setTimeout(scrollToBottom, 0);

			try {
				const res = await askAI(text);
				setTyping(false);

				// Typewriter on the plain-text form, then swap to rendered Markdown.
				const plain = res.answer
					.replace(/\[(.*?)\]\(.*?\)/g, "$1")
					.replace(/[#*`_>~]/g, "");
				const index = await new Promise<number>((resolve) => {
					setMessages((prev) => {
						resolve(prev.length);
						return [...prev, { role: "bot", text: "" }];
					});
				});

				if (plain.length <= 700) {
					const speed = plain.length > 350 ? 3 : 10;
					for (let i = 0; i < plain.length; i++) {
						const slice = plain.slice(0, i + 1);
						setMessages((prev) => {
							const next = [...prev];
							if (next[index]) next[index] = { role: "bot", text: slice };
							return next;
						});
						if (i % 3 === 0) {
							scrollToBottom();
							await sleep(speed);
						}
					}
				}

				const html = renderMarkdown(res.answer);
				setMessages((prev) => {
					const next = [...prev];
					if (next[index])
						next[index] = { role: "bot", text: res.answer, html };
					return next;
				});
				setTimeout(scrollToBottom, 0);
			} catch (e) {
				setTyping(false);
				let kind: ErrorKind = "err";
				if (e instanceof AiError && e.status === 429) kind = "rate";
				else if (e instanceof AiError && e.status === 0) kind = "net";
				setMessages((prev) => [
					...prev,
					{ role: "bot", text: "", error: kind },
				]);
				setTimeout(scrollToBottom, 0);
			} finally {
				busyRef.current = false;
				setBusy(false);
				inputRef.current?.focus();
			}
		},
		[scrollToBottom],
	);

	// Section triggers: any component can fire this to ask a question.
	useEffect(() => {
		const handler = (e: Event) => {
			const q = (e as CustomEvent<{ question?: string }>).detail?.question;
			if (!q) return;
			openPanel();
			submit(q);
		};
		window.addEventListener(AI_ASK_EVENT, handler);
		return () => window.removeEventListener(AI_ASK_EVENT, handler);
	}, [openPanel, submit]);

	// Escape closes.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && open) closePanel();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, closePanel]);

	// Lock body scroll when panel is open so scrolling stays inside the chat.
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const suggestionList =
		suggestions && !hasUserMessage
			? suggestions[lang]?.length
				? suggestions[lang]
				: suggestions.en
			: [];

	return (
		<>

		
			{/* Launcher — bottom-left so it clears the WhatsApp/scroll stack */}
			<div
				className={`fixed left-6 bottom-10 z-50 transition-all duration-300 ${
					revealed
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-4 pointer-events-none"
				}`}
			>
				<button
					type="button"
					onClick={() => (open ? closePanel() : openPanel())}
					aria-label="Ask Josh AI"
					className="group relative flex items-center gap-2 h-14 pl-4 pr-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white shadow-lg shadow-blue-600/30 transition-all duration-200"
				>
					<span className="relative flex h-6 w-6 items-center justify-center">
						<Icon icon="lucide:sparkles" className="w-5 h-5" />
						<span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-blue-600 group-hover:ring-blue-500" />
					</span>
					<span className="text-sm font-semibold">
						{pick({ en: "Ask AI", id: "Tanya AI" })}
					</span>
				</button>
			</div>

			{/* Backdrop */}
			<div
				onClick={closePanel}
				aria-hidden="true"
				className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
					open ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			/>

			{/* Centered modal */}
			<div
				className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-300 ${
					open ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			>
				<aside
					className={`relative flex flex-col w-full max-w-2xl h-[85vh] max-h-[720px] overflow-hidden rounded-2xl bg-[#0a0a14]/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 ease-out ${
						open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
					}`}
					role="dialog"
					aria-modal="true"
					aria-label="Josh AI assistant"
				>
				<header className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
					<div className="flex-1 min-w-0">
						<p className="text-sm font-semibold text-white leading-tight">
							Josh AI 
						</p>
						<p className="text-[11px] text-emerald-400 leading-tight flex items-center gap-1">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
							{pick({ en: "Portfolio assistant", id: "Asisten portofolio" })}
						</p>
					</div>
					<button
						type="button"
						onClick={closePanel}
						aria-label="Close"
						className="text-white/50 hover:text-white transition-colors p-1"
					>
						<Icon icon="lucide:x" className="w-5 h-5" />
					</button>
				</header>

				<div
					ref={messagesRef}
					className="flex-1 overflow-y-auto px-4 py-5 space-y-4 ai-scroll"
				>
					<div className="flex justify-start">
						<div className="ai-bubble ai-bubble--bot">
							{pick({
								en: "Hi! I'm Josh's portfolio assistant. Ask me about his projects, skills, experience, or architecture.",
								id: "Hai! Saya asisten portofolio Josh. Tanya saya tentang proyek, skill, pengalaman, atau arsitekturnya.",
							})}
						</div>
					</div>

					{messages.map((m, i) => (
						<div
							key={i}
							className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
						>
							{m.error ? (
								<div className="ai-bubble ai-bubble--bot ai-bubble--error">
									{ERROR_COPY[m.error][lang]}
								</div>
							) : m.role === "user" ? (
								<div className="ai-bubble ai-bubble--user">{m.text}</div>
							) : m.html ? (
								<div
									className="ai-bubble ai-bubble--bot"
									dangerouslySetInnerHTML={{ __html: m.html }}
								/>
							) : (
								<div className="ai-bubble ai-bubble--bot">{m.text}</div>
							)}
						</div>
					))}

					{typing && (
						<div className="flex justify-start">
							<div className="ai-bubble ai-bubble--bot">
								<span className="ai-dots">
									<i />
									<i />
									<i />
								</span>
							</div>
						</div>
					)}
				</div>

				{suggestionList.length > 0 && (
					<div className="px-4 pb-2 flex flex-wrap gap-2">
						{suggestionList.slice(0, 4).map((q) => (
							<button
								key={q}
								type="button"
								className="ai-chip"
								onClick={() => submit(q)}
							>
								{q}
							</button>
						))}
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						submit(input);
					}}
					className="px-4 pt-2 pb-4 border-t border-white/10 shrink-0"
				>
					<div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 focus-within:border-blue-400/40 transition-colors px-3 py-2">
						<textarea
							ref={inputRef}
							rows={1}
							maxLength={500}
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									submit(input);
								}
							}}
							placeholder={pick({
								en: "Ask about a project...",
								id: "Tanya tentang proyek...",
							})}
							className="flex-1 resize-none bg-transparent text-sm text-white placeholder-gray-500 outline-none max-h-28 leading-relaxed"
						/>
						<button
							type="submit"
							disabled={busy}
							aria-label="Send"
							className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
						>
							<Icon icon="lucide:arrow-up" className="w-4 h-4" />
						</button>
					</div>
					<p className="mt-2 text-center text-[10px] text-gray-600">
						{pick({
							en: "AI answers only from Josh's portfolio data.",
							id: "AI menjawab hanya dari data portofolio Josh.",
						})}
					</p>
				</form>
				</aside>
			</div>
		</>
	);
}
