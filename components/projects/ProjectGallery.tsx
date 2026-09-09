"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ProjectGallery({
	images,
	title,
}: {
	images: string[];
	title: string;
}) {
	const [current, setCurrent] = useState(0);
	const multiple = images.length > 1;

	const goTo = useCallback(
		(idx: number) => setCurrent((idx + images.length) % images.length),
		[images.length],
	);

	useEffect(() => {
		if (!multiple) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") goTo(current - 1);
			if (e.key === "ArrowRight") goTo(current + 1);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [current, goTo, multiple]);

	if (images.length === 0) return null;

	return (
		<div className="mb-10 detail-in" style={{ ["--delay" as string]: "0.1s" }}>
			<div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080810] aspect-video">
				<Image
					src={images[current]}
					alt={`${title} — project screenshot`}
					fill
					priority
					sizes="(max-width: 896px) 100vw, 896px"
					className="object-cover object-top"
				/>
				{multiple && (
					<>
						<button
							type="button"
							onClick={() => goTo(current - 1)}
							aria-label="Previous"
							className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white hover:bg-black/80 transition-colors"
						>
							<Icon icon="lucide:chevron-left" className="w-4 h-4" />
						</button>
						<button
							type="button"
							onClick={() => goTo(current + 1)}
							aria-label="Next"
							className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white hover:bg-black/80 transition-colors"
						>
							<Icon icon="lucide:chevron-right" className="w-4 h-4" />
						</button>
					</>
				)}
			</div>

			{multiple && (
				<div className="flex gap-2 mt-3 overflow-x-auto pb-1">
					{images.map((src, i) => (
						<button
							key={src}
							type="button"
							onClick={() => goTo(i)}
							className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
								i === current
									? "border-blue-400 opacity-100"
									: "border-white/10 opacity-60 hover:opacity-100"
							}`}
						>
							<Image
								src={src}
								alt={`${title} — screenshot ${i + 1}`}
								width={80}
								height={56}
								className="w-full h-full object-cover object-top"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
