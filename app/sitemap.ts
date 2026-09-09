import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/consts";
import { fetchApi } from "@/utils/api";
import type { Project } from "@/utils/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();

	try {
		const projects = (await fetchApi<Project[]>("/api/projects")) ?? [];

		const projectUrls: MetadataRoute.Sitemap = projects
			.filter((p) => !!p._id)
			.map((p) => ({
				url: `${SITE_URL}/projects/${p._id}`,
				lastModified: now,
				changeFrequency: "monthly",
				priority: 0.6,
			}));

		return [
			{
				url: SITE_URL,
				lastModified: now,
				changeFrequency: "weekly",
				priority: 1,
			},
			...projectUrls,
		];
	} catch {
		return [
			{
				url: SITE_URL,
				lastModified: now,
				changeFrequency: "weekly",
				priority: 1,
			},
		];
	}
}
