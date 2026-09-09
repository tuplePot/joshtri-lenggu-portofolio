"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SITE_TITLE } from "@/lib/consts";
import { T } from "@/lib/i18n";

const navLinks = [
	{ href: "#hero", labelEn: "Home", labelId: "Beranda" },
	{ href: "#about", labelEn: "About", labelId: "Tentang" },
	{ href: "#skills", labelEn: "Skills", labelId: "Keahlian" },
	{ href: "#projects", labelEn: "Projects", labelId: "Proyek" },
	{ href: "#experience", labelEn: "Experience", labelId: "Pengalaman" },
	{ href: "#literature", labelEn: "Literature", labelId: "Literatur" },
	{ href: "#contact", labelEn: "Contact", labelId: "Kontak" },
];

const socialLinks = [
	{
		href: "https://github.com/Joshtri",
		icon: "simple-icons:github",
		label: "GitHub",
	},
	{
		href: "https://www.linkedin.com/in/arpakhsad-j-s-lenggu-771242201/",
		icon: "simple-icons:linkedin",
		label: "LinkedIn",
	},
];

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [active, setActive] = useState("hero");

	// Scroll-spy: mark the section nearest the top third of the viewport active.
	useEffect(() => {
		const onScroll = () => {
			const sections = Array.from(
				document.querySelectorAll<HTMLElement>("section[id]"),
			);
			const threshold = window.scrollY + window.innerHeight * 0.35;
			let current = sections[0]?.id ?? "";
			for (const s of sections) {
				if (s.offsetTop <= threshold) current = s.id;
			}
			setActive(current);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll while the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	// Escape closes the mobile menu.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	return (
		<>
			<header className="fixed top-10 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
				<a
					href="#hero"
					className="text-sm md:text-base font-bold tracking-tight text-white whitespace-nowrap hover:opacity-80 transition-opacity z-10"
				>
					{SITE_TITLE}
				</a>

				<div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
					<nav className="flex items-center gap-2 md:gap-6 px-3 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-lg">
						<ul className="hidden md:flex items-center gap-1">
							{navLinks.map(({ href, labelEn, labelId }) => {
								const id = href.slice(1);
								const isActive = active === id;
								return (
									<li key={href}>
										<a
											href={href}
											className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
												isActive
													? "text-white bg-white/15"
													: "text-white/70 hover:text-white"
											}`}
										>
											<T en={labelEn} id={labelId} />
										</a>
									</li>
								);
							})}
						</ul>

						<span className="hidden md:block h-4 w-px bg-white/20" />

						<div className="flex items-center gap-1">
							{socialLinks.map(({ href, icon, label }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
								>
									<Icon icon={icon} className="w-4 h-4" />
								</a>
							))}
						</div>

						<span className="hidden md:block h-4 w-px bg-white/20" />

						<div className="hidden md:block">
							<LanguageSwitcher />
						</div>

						<span className="md:hidden h-4 w-px bg-white/20" />

						<button
							type="button"
							onClick={() => setMenuOpen(true)}
							aria-label="Open navigation menu"
							aria-expanded={menuOpen}
							className="md:hidden p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
						>
							<Icon icon="lucide:menu" className="w-5 h-5" />
						</button>
					</nav>
				</div>
			</header>

			{/* Mobile menu overlay */}
			<div
				className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
					menuOpen
						? "visible opacity-100"
						: "invisible opacity-0 pointer-events-none"
				}`}
			>
				<div
					onClick={() => setMenuOpen(false)}
					aria-hidden="true"
					className="absolute inset-0 bg-black/70 backdrop-blur-sm"
				/>

				<div
					className="absolute top-0 right-0 h-full w-72 border-l border-white/10 flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
					style={{
						background: "rgba(5,5,18,0.97)",
						backdropFilter: "blur(24px)",
						transform: menuOpen ? "translateX(0)" : "translateX(100%)",
					}}
				>
					<div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
						<span className="text-sm font-bold text-white">{SITE_TITLE}</span>
						<button
							type="button"
							onClick={() => setMenuOpen(false)}
							aria-label="Close navigation menu"
							className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all"
						>
							<Icon icon="lucide:x" className="w-5 h-5" />
						</button>
					</div>

					<nav className="flex-1 overflow-y-auto px-4 py-6">
						<ul className="space-y-1">
							{navLinks.map(({ href, labelEn, labelId }) => {
								const isActive = active === href.slice(1);
								return (
									<li key={href}>
										<a
											href={href}
											onClick={() => setMenuOpen(false)}
											className={`flex items-center px-4 py-3 text-base rounded-xl transition-all duration-200 ${
												isActive
													? "text-white bg-white/8"
													: "text-white/70 hover:text-white hover:bg-white/5"
											}`}
										>
											<T en={labelEn} id={labelId} />
										</a>
									</li>
								);
							})}
						</ul>
					</nav>

					<div className="px-6 py-5 border-t border-white/8">
						<div className="flex items-center justify-between mb-4">
							<p className="text-[10px] text-gray-600 uppercase tracking-widest">
								<T en="Language" id="Bahasa" />
							</p>
							<LanguageSwitcher />
						</div>
						<p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">
							<T en="Connect" id="Terhubung" />
						</p>
						<div className="flex items-center gap-2">
							{socialLinks.map(({ href, icon, label }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all"
								>
									<Icon icon={icon} className="w-4 h-4" />
									{label}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
