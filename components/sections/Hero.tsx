"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AskAIButton } from "@/components/ai/AskAIButton";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { T, useLang } from "@/lib/i18n";
import { SOCIAL_ICONS, EMAIL_MAILTO, CV_PATH } from "@/lib/consts";

const rolesEn = [
	"Full-Stack Developer",
	"Frontend Engineer",
	"Backend Engineer",
];
const rolesId = [
	"Developer Full-Stack",
	"Frontend Engineer",
	"Backend Engineer",
];
const images = ["/profile-2.jpg", "/profile-1.jpg"];

export function Hero() {
	const { lang } = useLang();
	const [imgIndex, setImgIndex] = useState(0);
	const [roleIndex, setRoleIndex] = useState(0);
	const [roleVisible, setRoleVisible] = useState(true);

	const roles = lang === "id" ? rolesId : rolesEn;

	// Role cycling with a short fade between changes.
	useEffect(() => {
		const id = setInterval(() => {
			setRoleVisible(false);
			setTimeout(() => {
				setRoleIndex((i) => (i + 1) % rolesEn.length);
				setRoleVisible(true);
			}, 300);
		}, 2500);
		return () => clearInterval(id);
	}, []);

	return (
		<section id="hero" className="relative w-full min-h-screen overflow-hidden">
			<div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 sm:px-12 lg:px-24 py-24 text-white gap-12 lg:gap-20">
				{/* Profile Image */}
				<div className="flex flex-col items-center gap-3">
					<div className="rounded-full overflow-hidden w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 ring-2 ring-white/20 relative">
						<Image
							src={images[imgIndex]}
							alt="Joshtri Lenggu — Full-Stack Developer and Software Engineer based in Jakarta"
							width={480}
							height={480}
							priority
							className="object-cover w-full h-full transition-opacity duration-200"
						/>
					</div>
					<div className="flex gap-2">
						{images.map((img, i) => (
							<button
								key={img}
								type="button"
								aria-label={`Photo ${i + 1}`}
								onClick={() => setImgIndex(i)}
								className={`h-2 rounded-full transition-all duration-300 ${
									i === imgIndex ? "w-5 bg-blue-400" : "w-2 bg-white/30"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Text */}
				<div className="text-center lg:text-left max-w-lg">
					<Paragraph size="sm" color="muted" className="mb-2">
						<T
							en="Based in Jakarta, Indonesia"
							id="Berbasis di Jakarta, Indonesia"
						/>
					</Paragraph>

					<Heading level="h1" className="mb-3">
						Hi, I&apos;m <span className="text-blue-400">Joshtri Lenggu</span>
					</Heading>

					<Paragraph size="lg" color="subtle" className="mb-2">
						<span
							className="inline-block transition-opacity duration-300"
							style={{ opacity: roleVisible ? 1 : 0 }}
						>
							{roles[roleIndex]}
						</span>
					</Paragraph>

					<Paragraph color="muted" className="mb-8">
						<T
							en="I build web applications — from UI to API. I like writing code that's clean, works well, and doesn't break at 3am."
							id="Saya membangun aplikasi web — dari UI hingga API. Saya suka menulis kode yang bersih, bekerja dengan baik, dan tidak rusak jam 3 pagi."
						/>
					</Paragraph>

					{/* Social links */}
					<div className="flex justify-center lg:justify-start gap-3 mb-8">
						{SOCIAL_ICONS.map(({ href, icon, label }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="text-white/50 hover:text-white transition-colors"
							>
								<Icon icon={icon} className="w-5 h-5" />
							</a>
						))}
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
						<Button href={EMAIL_MAILTO} variant="primary">
							<Icon icon="lucide:mail" className="w-4 h-4" />
							<T en="Contact Me" id="Hubungi Saya" />
						</Button>
						<Button href={CV_PATH} variant="outline" download>
							<Icon icon="lucide:download" className="w-4 h-4" />
							<T en="Download CV" id="Unduh CV" />
						</Button>
						<a
							href="#projects"
							className="flex items-center justify-center gap-2 px-6 py-2.5 text-white/60 hover:text-white text-sm font-medium transition-colors"
						>
							<T en="View My Work" id="Lihat Karya Saya" />
							<Icon icon="lucide:arrow-down" className="w-4 h-4" />
						</a>
					</div>

					{/* AI assistant entry point */}
					<div className="mt-5 flex justify-center lg:justify-start">
						<AskAIButton
							question="Tell me about Josh."
							labelEn="Ask AI about Josh"
							labelId="Tanya AI tentang Josh"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
