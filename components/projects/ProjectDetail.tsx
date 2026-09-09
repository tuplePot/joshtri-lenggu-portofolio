"use client";

import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { T, useLang } from "@/lib/i18n";
import { getFileUrl } from "@/utils/appwrite";
import type { Project } from "@/utils/types";
import { ProjectGallery } from "./ProjectGallery";

const typeConfig: Record<string, { label: string; cls: string }> = {
	FRONTEND: {
		label: "Frontend",
		cls: "text-blue-400 bg-blue-400/10 border-blue-400/30",
	},
	BACKEND: {
		label: "Backend",
		cls: "text-green-400 bg-green-400/10 border-green-400/30",
	},
	FULLSTACK: {
		label: "Full-stack",
		cls: "text-amber-400 bg-amber-400/10 border-amber-400/30",
	},
};

export function ProjectDetail({
	project,
	related,
}: {
	project: Project;
	related: Project[];
}) {
	const { field } = useLang();

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
	const skills = project.skillIds ?? [];

	return (
		<main className="max-w-4xl mx-auto px-6 sm:px-10 pt-28 pb-24">
			{/* Back breadcrumb */}
			<nav className="mb-8 detail-in" style={{ ["--delay" as string]: "0s" }}>
				<a
					href="/#projects"
					className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors"
				>
					<Icon icon="lucide:chevron-left" className="w-3.5 h-3.5" />
					<T en="Back to projects" id="Kembali ke proyek" />
				</a>
			</nav>

			{/* Hero */}
			<div
				className="mb-10 detail-in"
				style={{ ["--delay" as string]: "0.05s" }}
			>
				<div className="flex flex-wrap items-center gap-2 mb-4">
					{typeInfo && (
						<span
							className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${typeInfo.cls}`}
						>
							{typeInfo.label}
						</span>
					)}
					{project.projectYear && (
						<span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 font-mono">
							{project.projectYear}
						</span>
					)}
				</div>

				<h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-2">
					{title}
				</h1>

				{/* Action links */}
				<div className="flex flex-wrap gap-3 mt-5">
					{project.link && project.link !== "#" && (
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/40 bg-blue-400/10 text-sm text-blue-400 hover:bg-blue-400/20 transition-colors"
						>
							<Icon icon="lucide:external-link" className="w-4 h-4" />
							Live Demo
						</a>
					)}
					{project.githubRepoUrl && (
						<a
							href={project.githubRepoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors"
						>
							<Icon icon="simple-icons:github" className="w-4 h-4" />
							Source Code
						</a>
					)}
				</div>
			</div>

			{/* Gallery */}
			<ProjectGallery images={allImages} title={title} />

			{/* Description */}
			{description && (
				<div
					className="mb-10 detail-in"
					style={{ ["--delay" as string]: "0.15s" }}
				>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
						<T en="About" id="Tentang" />
					</h2>
					<p className="text-base text-gray-300 leading-relaxed">
						{description}
					</p>
				</div>
			)}

			{/* Tech stack */}
			{skills.length > 0 && (
				<div
					className="mb-12 detail-in"
					style={{ ["--delay" as string]: "0.2s" }}
				>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
						Tech Stack
					</h2>
					<div className="flex flex-wrap gap-2">
						{skills.map((skill) => (
							<span
								key={skill._id}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
							>
								<Icon
									icon={skill.icon}
									className="w-4 h-4"
									style={{ color: skill.color }}
								/>
								{skill.name}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Related projects */}
			{related.length > 0 && (
				<div className="detail-in" style={{ ["--delay" as string]: "0.25s" }}>
					<div className="border-t border-white/8 pt-10">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
							<T en="Related Projects" id="Proyek Terkait" />
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{related.map((p) => (
								<ProjectCard key={p._id} project={p} />
							))}
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
