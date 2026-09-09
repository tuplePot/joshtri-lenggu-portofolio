"use client";

import { Icon } from "@/components/ui/Icon";
import { T } from "@/lib/i18n";
import { SOCIAL_ICONS, SECTION_LINKS } from "@/lib/consts";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative z-10 pb-8 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-5">
						<p className="text-sm font-semibold text-white/80 shrink-0">
							Joshtri Lenggu
						</p>

						<nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
							{SECTION_LINKS.map(({ href, labelEn, labelId }) => (
								<a
									key={href}
									href={href}
									className="text-xs text-gray-500 hover:text-white/90 transition-colors duration-150"
								>
									<T en={labelEn} id={labelId} />
								</a>
							))}
						</nav>

						<div className="flex items-center gap-3 shrink-0">
							{SOCIAL_ICONS.map(({ href, icon, label }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="text-gray-600 hover:text-white transition-colors duration-150"
								>
									<Icon icon={icon} className="w-3.5 h-3.5" />
								</a>
							))}
						</div>
					</div>

					<div className="mt-4 pt-4 border-t border-white/8 text-center">
						<p className="text-xs text-gray-600">
							&copy; {year} Arpakhsad Joshtri Sugiatma Lenggu &mdash;{" "}
							<T en="Built with Next.js" id="Dibangun dengan Next.js" />
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
