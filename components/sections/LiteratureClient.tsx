"use client";

import { ArticleCard } from "@/components/ui/ArticleCard";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T } from "@/lib/i18n";
import type { BlogPost } from "@/utils/blog";

export function LiteratureClient({
	posts,
	category,
	categoryHref,
}: {
	posts: BlogPost[];
	category: string;
	categoryHref: string;
}) {
	return (
		<section id="literature" className="relative py-24 overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
				{/* Header */}
				<ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
					<div>
						<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">
							<span className="w-4 h-px bg-blue-400/60" />
							<T en="Writing & Sharing" id="Menulis & Berbagi" />
							<span className="w-4 h-px bg-blue-400/60" />
						</span>
						<Heading
							level="h2"
							className="text-white drop-shadow-[0_0_24px_rgba(100,150,255,0.25)]"
						>
							<T en="Literature" id="Literatur" />
						</Heading>
						<Paragraph color="muted" className="mt-2 max-w-md">
							<T
								en="Notes and insights I write to share what I learn — a selection from the technology category on my blog."
								id="Catatan dan wawasan yang saya tulis untuk berbagi apa yang saya pelajari — pilihan dari kategori teknologi di blog saya."
							/>
						</Paragraph>
					</div>

					<a
						href={categoryHref}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-400 hover:text-white hover:border-blue-400/40 hover:bg-white/10 transition-all duration-200 shrink-0"
					>
						<Icon icon="lucide:book-open" className="w-4 h-4" />
						<T en="Read the blog" id="Kunjungi blog" />
						<Icon
							icon="lucide:arrow-right"
							className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
						/>
					</a>
				</ScrollReveal>

				{posts.length > 0 ? (
					<ScrollReveal
						delay={0.08}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
					>
						{posts.map((post) => (
							<ArticleCard key={post.id} post={post} typeSlug={category} />
						))}
					</ScrollReveal>
				) : (
					<ScrollReveal
						delay={0.08}
						className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/2"
					>
						<Icon
							icon="lucide:book-dashed"
							className="w-10 h-10 text-gray-600 mx-auto mb-3"
						/>
						<p className="text-sm text-gray-500">
							<T
								en="No writings to show right now — check back soon."
								id="Belum ada tulisan untuk ditampilkan — nantikan segera."
							/>
						</p>
						<a
							href={categoryHref}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
						>
							<T en="Visit the blog" id="Kunjungi blog" />
							<Icon icon="lucide:arrow-up-right" className="w-3.5 h-3.5" />
						</a>
					</ScrollReveal>
				)}
			</div>
		</section>
	);
}
