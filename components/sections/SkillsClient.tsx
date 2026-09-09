"use client";

import { useEffect, useRef } from "react";
import { AskAIButton } from "@/components/ai/AskAIButton";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T } from "@/lib/i18n";
import type { Skill } from "@/utils/types";

function SkillOrb({ skill }: { skill: Skill }) {
	return (
		<div className="group flex flex-col items-center w-[112px] h-28 shrink-0 cursor-default">
			<div className="flex flex-1 items-center justify-center w-full">
				<div
					className="skill-orb relative w-16 h-16 rounded-full bg-white/3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
					style={{ ["--gc" as string]: skill.color }}
				>
					<Icon
						icon={skill.icon}
						className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
						style={{ color: skill.color }}
					/>
				</div>
			</div>
			<div className="h-6 w-full flex items-center justify-center shrink-0">
				<span className="text-xs text-gray-500 group-hover:text-gray-200 text-center leading-none transition-colors duration-200 w-full truncate px-1">
					{skill.name}
				</span>
			</div>
		</div>
	);
}

export function SkillsClient({ skills }: { skills: Skill[] }) {
	const sectionRef = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const half = Math.ceil(skills.length / 2);
	const row1 = skills.slice(0, half);
	const row2 = skills.slice(half);

	// Subtle parallax drift on the sticky text panel.
	useEffect(() => {
		const section = sectionRef.current;
		const textEl = textRef.current;
		if (!section || !textEl) return;
		const onScroll = () => {
			const rect = section.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) return;
			const center = rect.top + rect.height / 2;
			const vCenter = window.innerHeight / 2;
			const drift = (center - vCenter) * 0.12;
			textEl.style.transform = `translateY(${drift}px)`;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<section id="skills" ref={sectionRef} className="relative">
			<div className="max-w-7xl mx-auto px-6 sm:px-10">
				<div className="flex flex-col md:grid md:grid-cols-[380px_1fr] md:items-start">
					{/* LEFT — sticky text panel */}
					<div className="md:sticky md:top-[28vh] py-24 md:pt-[23vh] md:pb-40 shrink-0 z-10">
						<div ref={textRef}>
							<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">
								<span className="w-4 h-px bg-blue-400/60" />
								<T en="Tech Stack" id="Teknologi" />
								<span className="w-4 h-px bg-blue-400/60" />
							</span>

							<Heading
								level="h2"
								className="text-white mb-3 leading-snug drop-shadow-[0_0_24px_rgba(100,150,255,0.25)]"
							>
								<T
									en={
										<>
											Technologies
											<br />I Work With
										</>
									}
									id={
										<>
											Teknologi
											<br />
											yang Saya Gunakan
										</>
									}
								/>
							</Heading>

							<Paragraph color="muted" className="max-w-xs">
								<T
									en="From frontend to backend — these are the tools I use to build reliable, production-ready web applications."
									id="Dari frontend hingga backend — ini alat yang saya gunakan untuk membangun aplikasi web yang andal dan siap produksi."
								/>
							</Paragraph>

							<div className="flex flex-wrap gap-3 mt-6">
								<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-400">
									<span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
									{skills.length}+ <T en="Technologies" id="Teknologi" />
								</div>
								<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-400">
									<span className="w-1.5 h-1.5 rounded-full bg-green-400" />
									Full-Stack
								</div>
							</div>

							<div className="mt-6">
								<AskAIButton
									question="Which technologies does Josh use the most, and which does he recommend learning?"
									labelEn="Ask AI about the stack"
									labelId="Tanya AI soal teknologi"
								/>
							</div>
						</div>
					</div>

					{/* RIGHT — marquee rows */}
					<div
						className="overflow-hidden -mr-6 sm:-mr-10 py-24 md:pt-[23vh] md:pb-40 flex flex-col gap-6"
						style={{
							maskImage:
								"linear-gradient(to right, transparent 0%, black 8%, black 100%)",
							WebkitMaskImage:
								"linear-gradient(to right, transparent 0%, black 8%, black 100%)",
						}}
					>
						<ScrollReveal threshold={0.12}>
							<div className="marquee-left flex gap-5 w-max">
								{[...row1, ...row1].map((skill, i) => (
									<SkillOrb key={`r1-${skill.name}-${i}`} skill={skill} />
								))}
							</div>
						</ScrollReveal>

						<ScrollReveal threshold={0.12} delay={0.18}>
							<div className="marquee-right flex gap-5 w-max">
								{[...row2, ...row2].map((skill, i) => (
									<SkillOrb key={`r2-${skill.name}-${i}`} skill={skill} />
								))}
							</div>
						</ScrollReveal>
					</div>
				</div>
			</div>
		</section>
	);
}
