"use client";

import { useMemo, useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T, useLang } from "@/lib/i18n";
import type { I18nString, Project } from "@/utils/types";

const filters = [
	{ key: "ALL", labelEn: "All", labelId: "Semua" },
	{ key: "FRONTEND", labelEn: "Frontend", labelId: "Frontend" },
	{ key: "BACKEND", labelEn: "Backend", labelId: "Backend" },
	{ key: "FULLSTACK", labelEn: "Full-stack", labelId: "Full-stack" },
];

const getText = (v: I18nString | string | undefined): string => {
	if (!v) return "";
	if (typeof v === "string") return v;
	return `${v.en} ${v.id}`;
};

export function ProjectsClient({ projects }: { projects: Project[] }) {
	const { lang } = useLang();
	const [activeFilter, setActiveFilter] = useState("ALL");
	const [activeYear, setActiveYear] = useState("ALL");
	const [search, setSearch] = useState("");

	const years = useMemo(
		() =>
			[
				...new Set(
					projects.map((p) => p.projectYear).filter((y): y is number => !!y),
				),
			].sort((a, b) => b - a),
		[projects],
	);

	const searchable = useMemo(
		() =>
			projects.map((p) =>
				`${getText(p.title)} ${getText(p.description)}`.toLowerCase(),
			),
		[projects],
	);

	const visible = useMemo(() => {
		const q = search.trim().toLowerCase();
		return projects.filter((p, i) => {
			const matchesType =
				activeFilter === "ALL" || (p.type ?? "").toUpperCase() === activeFilter;
			const matchesYear =
				activeYear === "ALL" || String(p.projectYear ?? "") === activeYear;
			const matchesSearch = !q || searchable[i].includes(q);
			return matchesType && matchesYear && matchesSearch;
		});
	}, [projects, activeFilter, activeYear, search, searchable]);

	const countText =
		lang === "id"
			? `${visible.length} proyek`
			: `${visible.length} project${visible.length !== 1 ? "s" : ""}`;

	return (
		<section id="projects" className="relative py-24 overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
				{/* Header */}
				<ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
					<div>
						<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">
							<span className="w-4 h-px bg-blue-400/60" />
							<T en="My Work" id="Karya Saya" />
							<span className="w-4 h-px bg-blue-400/60" />
						</span>
						<Heading
							level="h2"
							className="text-white drop-shadow-[0_0_24px_rgba(100,150,255,0.25)]"
						>
							<T en="Selected Projects" id="Proyek Pilihan" />
						</Heading>
						<Paragraph color="muted" className="mt-2 max-w-md">
							<T
								en="A few things I've built — from government platforms to personal experiments."
								id="Beberapa hal yang saya bangun — dari platform pemerintah hingga eksperimen pribadi."
							/>
						</Paragraph>
					</div>

					<a
						href="https://github.com/Joshtri"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-400 hover:text-white hover:border-blue-400/40 hover:bg-white/10 transition-all duration-200 shrink-0"
					>
						<Icon icon="simple-icons:github" className="w-4 h-4" />
						View GitHub
						<Icon
							icon="lucide:arrow-right"
							className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
						/>
					</a>
				</ScrollReveal>

				{/* Search + Filter row */}
				<ScrollReveal
					delay={0.08}
					className="flex flex-col sm:flex-row gap-3 mb-8"
				>
					<div className="relative flex-1 max-w-sm">
						<Icon
							icon="lucide:search"
							className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none"
						/>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={
								lang === "id" ? "Cari proyek..." : "Search projects..."
							}
							autoComplete="off"
							spellCheck={false}
							className="w-full pl-9 pr-9 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white placeholder-gray-500 outline-none focus:border-blue-400/40 focus:bg-white/8 transition-all duration-200"
						/>
						{search && (
							<button
								type="button"
								aria-label="Clear search"
								onClick={() => setSearch("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
							>
								<Icon icon="lucide:x" className="w-3.5 h-3.5" />
							</button>
						)}
					</div>

					<div className="flex flex-wrap gap-2">
						{filters.map(({ key, labelEn, labelId }) => {
							const isActive = key === activeFilter;
							return (
								<button
									key={key}
									type="button"
									onClick={() => setActiveFilter(key)}
									className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
										isActive
											? "border-blue-400/60 text-blue-400 bg-blue-400/10"
											: "border-white/10 text-gray-400 bg-white/4 hover:border-white/20 hover:text-white"
									}`}
								>
									<T en={labelEn} id={labelId} />
								</button>
							);
						})}
					</div>
				</ScrollReveal>

				{/* Year filter */}
				{years.length > 0 && (
					<div className="proj-years-scroll flex items-center gap-5 mb-7 overflow-x-auto">
						<button
							type="button"
							onClick={() => setActiveYear("ALL")}
							className={`shrink-0 text-xs font-mono transition-colors duration-200 ${
								activeYear === "ALL"
									? "text-blue-400"
									: "text-gray-500 hover:text-gray-300"
							}`}
						>
							<T en="All" id="Semua" />
						</button>
						{years.map((y) => (
							<button
								key={y}
								type="button"
								onClick={() => setActiveYear(String(y))}
								className={`shrink-0 text-xs font-mono transition-colors duration-200 ${
									activeYear === String(y)
										? "text-blue-400"
										: "text-gray-500 hover:text-gray-300"
								}`}
							>
								{y}
							</button>
						))}
					</div>
				)}

				{/* Scrollable grid with fade mask */}
				<ScrollReveal delay={0.16}>
					<div className="projects-scroll max-h-192 overflow-y-auto pr-1">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
							{visible.map((project) => (
								<ProjectCard
									key={project._id ?? getText(project.title)}
									project={project}
								/>
							))}
						</div>
					</div>
				</ScrollReveal>

				{/* Empty state */}
				{visible.length === 0 && (
					<div className="text-center py-16">
						<Icon
							icon="lucide:search-x"
							className="w-10 h-10 text-gray-600 mx-auto mb-3"
						/>
						<p className="text-sm text-gray-500">
							<T
								en="No projects match your search."
								id="Tidak ada proyek yang cocok dengan pencarian Anda."
							/>
						</p>
					</div>
				)}

				{/* Count */}
				<p className="text-center text-xs text-gray-600 mt-4">{countText}</p>
			</div>
		</section>
	);
}
