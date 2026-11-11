import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/consts";

// Only the root page is listed so Search Console focuses on the homepage.
// Project detail pages (/projects/[id]) are still reachable through links.
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
