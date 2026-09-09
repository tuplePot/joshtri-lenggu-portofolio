import { blogCategoryUrl, fetchBlogPosts } from "@/utils/blog";
import { LiteratureClient } from "./LiteratureClient";

// Only surface a curated category on the portfolio — "technology".
const CATEGORY = "technology";

export async function Literature() {
	const posts = await fetchBlogPosts(CATEGORY, 6);
	return (
		<LiteratureClient
			posts={posts}
			category={CATEGORY}
			categoryHref={blogCategoryUrl(CATEGORY)}
		/>
	);
}
