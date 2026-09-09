"use client";

import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T } from "@/lib/i18n";

const contactLinks = [
	{
		labelEn: "Send Email",
		labelId: "Kirim Email",
		href: "mailto:stuffofyos1516@gmail.com",
		icon: "lucide:mail",
		description: "stuffofyos1516@gmail.com",
		color: "hover:border-blue-500/40 hover:bg-blue-500/5",
		iconColor: "text-blue-400",
	},
	{
		labelEn: "WhatsApp",
		labelId: "WhatsApp",
		href: "https://wa.me/6285298389192",
		icon: "simple-icons:whatsapp",
		description: "+62 852-9838-9192",
		color: "hover:border-green-500/40 hover:bg-green-500/5",
		iconColor: "text-green-400",
		external: true,
	},
	{
		labelEn: "LinkedIn",
		labelId: "LinkedIn",
		href: "https://www.linkedin.com/in/arpakhsad-j-s-lenggu-771242201/",
		icon: "simple-icons:linkedin",
		description: "Arpakhsad Joshtri S. Lenggu",
		color: "hover:border-blue-400/40 hover:bg-blue-400/5",
		iconColor: "text-blue-300",
		external: true,
	},
	{
		labelEn: "GitHub",
		labelId: "GitHub",
		href: "https://github.com/Joshtri",
		icon: "simple-icons:github",
		description: "@Joshtri",
		color: "hover:border-white/30 hover:bg-white/5",
		iconColor: "text-white",
		external: true,
	},
];

export function Contact() {
	return (
		<section id="contact" className="relative overflow-hidden py-24">
			<div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 text-center">
				{/* Header */}
				<ScrollReveal>
					<span className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3 block">
						<T en="Get In Touch" id="Hubungi Saya" />
					</span>
					<Heading level="h2" className="text-white mb-4">
						<T en="Let's Work Together" id="Mari Bekerja Sama" />
					</Heading>
					<Paragraph color="muted" className="mb-12 max-w-md mx-auto">
						<T
							en="Have a project in mind or just want to say hi? My inbox is always open."
							id="Punya proyek di benak Anda atau sekadar ingin menyapa? Kotak masuk saya selalu terbuka."
						/>
					</Paragraph>
				</ScrollReveal>

				{/* Profile photo */}
				<ScrollReveal delay={0.12} className="flex justify-center mb-10">
					<div className="relative">
						<div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10">
							<Image
								src="/profile-1.jpg"
								alt="Joshtri Lenggu, Full-Stack Developer — profile photo"
								width={160}
								height={160}
								loading="lazy"
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-black flex items-center justify-center">
							<span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
						</span>
					</div>
				</ScrollReveal>

				{/* Contact cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
					{contactLinks.map(
						(
							{
								labelEn,
								labelId,
								href,
								icon,
								description,
								color,
								iconColor,
								external,
							},
							i,
						) => (
							<ScrollReveal key={href} delay={0.24 + i * 0.08}>
								<a
									href={href}
									target={external ? "_blank" : undefined}
									rel={external ? "noopener noreferrer" : undefined}
									className={`flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 transition-all duration-200 group ${color}`}
								>
									<div
										className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${iconColor}`}
									>
										<Icon icon={icon} className="w-5 h-5" />
									</div>
									<div className="min-w-0">
										<p className="text-sm font-medium text-white">
											<T en={labelEn} id={labelId} />
										</p>
										<p className="text-xs text-gray-500 truncate">
											{description}
										</p>
									</div>
									<Icon
										icon="lucide:arrow-up-right"
										className="w-4 h-4 text-white/20 group-hover:text-white/60 ml-auto shrink-0 transition-colors"
									/>
								</a>
							</ScrollReveal>
						),
					)}
				</div>
			</div>
		</section>
	);
}
