import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { Icon } from "@/components/ui/Icon";
import { SITE_TITLE, SITE_URL } from "@/lib/consts";
import { breadcrumbSchema } from "@/lib/schema";
import { fetchApi } from "@/utils/api";
import { getFileUrl } from "@/utils/appwrite";
import { type Project, pickLang } from "@/utils/types";

export const revalidate = 3600;

// Fetch the full project list once per request (memoized across
// generateStaticParams, generateMetadata, and the page).
const getProjects = cache(
	async () => (await fetchApi<Project[]>("/api/projects")) ?? [],
);

function findProject(projects: Project[], id: string) {
	return projects.find((p) => p._id === id) ?? null;
}

/** Projects sharing the most skills with the given one (top 3). */
function relatedProjects(projects: Project[], project: Project): Project[] {
	const currentSkillIds = new Set((project.skillIds ?? []).map((s) => s._id));
	return projects
		.filter((p) => p._id !== project._id)
		.map((p) => ({
			project: p,
			score: (p.skillIds ?? []).filter((s) => currentSkillIds.has(s._id))
				.length,
		}))
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 3)
		.map(({ project: p }) => p);
}

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.filter((p) => !!p._id).map((p) => ({ id: p._id as string }));
}

export async function generateMetadata({
	params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
	const { id } = await params;
	const projects = await getProjects();
	const project = findProject(projects, id);
	if (!project) return {};

	const titleEn = pickLang(project.title, "en", "Untitled Project");
	const descEn = pickLang(project.description, "en");
	const thumbnailUrl = project.thumbnailId
		? getFileUrl(project.thumbnailId)
		: undefined;

	return {
		title: titleEn,
		description: descEn || `${titleEn} project by Joshtri Lenggu`,
		alternates: { canonical: `/projects/${id}` },
		openGraph: {
			title: `${titleEn} — ${SITE_TITLE}`,
			description: descEn || `${titleEn} project by Joshtri Lenggu`,
			url: `${SITE_URL}/projects/${id}`,
			images: thumbnailUrl ? [{ url: thumbnailUrl }] : undefined,
		},
	};
}

export default async function ProjectPage({
	params,
}: PageProps<"/projects/[id]">) {
	const { id } = await params;
	const projects = await getProjects();
	const project = findProject(projects, id);
	if (!project) notFound();

	const related = relatedProjects(projects, project);
	const titleEn = pickLang(project.title, "en", "Untitled Project");

	const breadcrumbs = breadcrumbSchema([
		{ name: "Home", url: SITE_URL },
		{ name: "Projects", url: `${SITE_URL}/#projects` },
		{ name: titleEn },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
			/>

			{/* Simple header */}
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 h-16 border-b border-white/6 bg-black/40 backdrop-blur-md">
				<a
					href="/"
					className="text-sm font-bold tracking-tight text-white hover:opacity-70 transition-opacity"
				>
					{SITE_TITLE}
				</a>
				<a
					href="/#projects"
					className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
				>
					<Icon icon="lucide:arrow-left" className="w-3.5 h-3.5" />
					All projects
				</a>
			</header>

			<ProjectDetail project={project} related={related} />

			<Footer />
		</>
	);
}
