"use client";

import { Icon } from "@/components/ui/Icon";
import { T } from "@/lib/i18n";

export const AI_ASK_EVENT = "ai-assistant:ask";

/** Fire the assistant with a preset question from anywhere. */
export function askAssistant(question: string) {
	window.dispatchEvent(new CustomEvent(AI_ASK_EVENT, { detail: { question } }));
}

interface Props {
	question: string;
	labelEn?: string;
	labelId?: string;
	className?: string;
	iconOnly?: boolean;
}

// Reusable trigger. Drop into any section to open the assistant pre-filled with
// a context-relevant question.
export function AskAIButton({
	question,
	labelEn = "Ask AI",
	labelId = "Tanya AI",
	className = "",
	iconOnly = false,
}: Props) {
	const handle = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		askAssistant(question);
	};

	if (iconOnly) {
		return (
			<button
				type="button"
				onClick={handle}
				aria-label={labelEn}
				title={labelEn}
				className={`inline-flex items-center justify-center h-7 w-7 rounded-full border border-white/10 bg-white/5 text-blue-300/80 hover:text-white hover:border-blue-400/50 hover:bg-blue-400/15 transition-all duration-200 ${className}`}
			>
				<Icon icon="lucide:sparkles" className="w-3.5 h-3.5" />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={handle}
			className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 text-blue-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-400/20 text-xs font-medium transition-all duration-200 ${className}`}
		>
			<Icon icon="lucide:sparkles" className="w-3.5 h-3.5" />
			<T en={labelEn} id={labelId} />
		</button>
	);
}
