"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AskAIButton } from "@/components/ai/AskAIButton";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "@/lib/i18n";
import { getFileUrl } from "@/utils/appwrite";
import type { Project } from "@/utils/types";

const typeConfig: Record<string, { label: string; cls: string }> = {
	FRONTEND: {
		label: "Frontend",
		cls: "text-blue-400 bg-blue-400/10 border-blue-400/25",
	},
	BACKEND: {
		label: "Backend",
		cls: "text-green-400 bg-green-400/10 border-green-400/25",
	},
	FULLSTACK: {
		label: "Full-stack",
		cls: "text-amber-400 bg-amber-400/10 border-amber-400/25",
	},
};

export function ProjectCard({ project }: { project: Project }) {
	const router = useRouter();
	const { field } = useLang();
	const skills = project.skillIds ?? [];

	const titleEn =
		typeof project.title === "string" ? project.title : project.title.en;
	const title = field(project.title, "Untitled Project");
	const description = field(project.description, "");

	const thumbnailUrl = project.thumbnailId
		? getFileUrl(project.thumbnailId)
		: null;
	const screenshotUrls = (project.screenshots ?? []).map((id) =>
		getFileUrl(id),
	);
	const allImages = [thumbnailUrl, ...screenshotUrls].filter(
		(u): u is string => !!u,
	);

	const typeInfo = project.type ? typeConfig[project.type] : null;
	const href = project._id ? `/projects/${project._id}` : undefined;

	const [current, setCurrent] = useState(0);

	// Auto-cycle the thumbnail gallery.
	useEffect(() => {
		if (allImages.length <= 1) return;
		const id = setInterval(
			() => setCurrent((c) => (c + 1) % allImages.length),
			3500,
		);
		return () => clearInterval(id);
	}, [allImages.length]);

	const onCardClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("a, button")) return;
		if (href) router.push(href);
	};

	return (
		<article
			onClick={onCardClick}
			className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-blue-400/35 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-pointer"
		>
			<div className="relative h-44 overflow-hidden bg-[#080810]">
				{allImages.length > 0 ? (
					<Image
						src={allImages[current]}
						alt={`${titleEn} — project thumbnail`}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<div className="flex flex-col items-center gap-2 opacity-30">
							<Icon icon="lucide:image" className="w-10 h-10 text-gray-500" />
						</div>
						<div
							className="absolute inset-0 opacity-10"
							style={{
								backgroundImage:
									"linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
								backgroundSize: "28px 28px",
							}}
						/>
					</div>
				)}

				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

				<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
					{typeInfo && (
						<span
							className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide ${typeInfo.cls}`}
						>
							{typeInfo.label}
						</span>
					)}
					<div className="flex gap-1.5 ml-auto">
						{project.githubRepoUrl && (
							<a
								href={project.githubRepoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white hover:border-white/40 text-[10px] transition-colors"
							>
								<Icon icon="simple-icons:github" className="w-3 h-3" />
								Code
							</a>
						)}
						{project.link && project.link !== "#" && (
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white hover:border-blue-400/50 text-[10px] transition-colors"
							>
								<Icon icon="lucide:external-link" className="w-3 h-3" />
								Live
							</a>
						)}
					</div>
				</div>

				<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
					{project.projectYear && (
						<span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white/60 text-[10px] font-mono">
							{project.projectYear}
						</span>
					)}
					{allImages.length > 1 && (
						<div className="flex items-center gap-1 ml-auto">
							{allImages.map((img, i) => (
								<button
									key={img}
									type="button"
									aria-label={`Screenshot ${i + 1}`}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setCurrent(i);
									}}
									className={`h-1.5 rounded-full transition-all duration-300 ${
										i === current ? "w-3 bg-white" : "w-1.5 bg-white/40"
									}`}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col flex-1 p-5 gap-3">
				<div className="flex items-start justify-between gap-2">
					<h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-100 transition-colors">
						{title}
					</h3>
					<AskAIButton
						iconOnly
						className="shrink-0 -mt-0.5"
						question={`Explain the project "${titleEn}" — what is it and what technologies does it use?`}
						labelEn={`Ask AI about ${titleEn}`}
						labelId="Tanya AI soal proyek ini"
					/>
				</div>

				<p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
					{description || "—"}
				</p>

				{skills.length > 0 && (
					<div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
						{skills.slice(0, 4).map((skill) => (
							<span
								key={skill._id}
								className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:border-white/20 transition-colors"
							>
								<Icon
									icon={skill.icon}
									className="w-3 h-3"
									style={{ color: skill.color }}
								/>
								{skill.name}
							</span>
						))}
						{skills.length > 4 && (
							<span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-500">
								+{skills.length - 4}
							</span>
						)}
					</div>
				)}
			</div>
		</article>
	);
}
