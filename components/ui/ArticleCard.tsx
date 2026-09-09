"use client";

import { Icon } from "@/components/ui/Icon";
import { T } from "@/lib/i18n";
import { type BlogPost, blogPostUrl } from "@/utils/blog";

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function ArticleCard({
	post,
	typeSlug,
}: {
	post: BlogPost;
	/** Category slug used to build the outbound blog URL, e.g. "technology". */
	typeSlug: string;
}) {
	const href = blogPostUrl(typeSlug, post.slug);
	const labelColor = post.label?.color ?? "#60a5fa";

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-blue-400/35 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] transition-all duration-300"
		>
			<div className="relative h-40 overflow-hidden bg-[#080810]">
				{post.coverImage ? (
					// Blog covers come from arbitrary hosts — a plain <img> avoids
					// remotePattern churn while keeping lazy loading.
					// biome-ignore lint/performance/noImgElement: arbitrary remote host renders via plain img
					<img
						src={post.coverImage}
						alt={`${post.title} — cover`}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center opacity-30">
						<Icon icon="lucide:file-text" className="w-9 h-9 text-gray-500" />
					</div>
				)}

				<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

				{post.label && (
					<span
						className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border text-[10px] font-semibold tracking-wide"
						style={{ color: labelColor, borderColor: `${labelColor}55` }}
					>
						<span
							className="w-1.5 h-1.5 rounded-full"
							style={{ background: labelColor }}
						/>
						{post.label.name}
					</span>
				)}
			</div>

			<div className="flex flex-col flex-1 p-5 gap-3">
				<h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-100 transition-colors">
					{post.title}
				</h3>

				<p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
					{post.excerpt}
				</p>

				<div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-gray-500">
					<span className="flex items-center gap-1.5">
						<Icon icon="lucide:calendar" className="w-3 h-3" />
						<time dateTime={new Date(post.createdAt).toISOString()}>
							{formatDate(post.createdAt)}
						</time>
					</span>
					<span className="flex items-center gap-3">
						<span className="flex items-center gap-1">
							<Icon icon="lucide:eye" className="w-3 h-3" />
							{post.viewsCount}
						</span>
						<span className="flex items-center gap-1 text-blue-400/80 group-hover:text-blue-400 transition-colors">
							<T en="Read" id="Baca" />
							<Icon
								icon="lucide:arrow-up-right"
								className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
							/>
						</span>
					</span>
				</div>
			</div>
		</a>
	);
}
