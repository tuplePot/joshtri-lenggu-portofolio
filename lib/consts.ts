// Global site data. Import from anywhere via `@/lib/consts`.

export const SITE_URL = "https://portfolio.joshtrilenggu.com";
export const SITE_TITLE = "Joshtri Lenggu";
export const HOME_TITLE =
	"Joshtri Lenggu — Full-Stack Developer & Software Engineer";
export const SITE_DESCRIPTION =
	"Portfolio of Joshtri Lenggu, Full-Stack Developer and Software Engineer in Jakarta, Indonesia. Building web apps with React, Next.js, Node.js, and Laravel. Open to work.";
export const SITE_AUTHOR = "Joshtri Lenggu";
export const ALTERNATE_NAMES = ["Arpakhsad Joshtri Sugiatma Lenggu"];
export const JOB_TITLE = "Full-Stack Developer";
export const CONTACT_EMAIL = "stuffofyos1516@gmail.com";
export const SITE_KEYWORDS =
	"Joshtri Lenggu, Full Stack Developer, Software Engineer, Web Developer, React Developer, Next.js Developer, Node.js Developer, Laravel, TypeScript, Jakarta, Indonesia, Portfolio";

// ── External URLs ──────────────────────────────────────────────
export const URLS = {
	GITHUB: "https://github.com/Joshtri",
	LINKEDIN:
		"https://www.linkedin.com/in/arpakhsad-j-s-lenggu-771242201/",
	INSTAGRAM: "https://www.instagram.com/joshtrilenggu/",
	FACEBOOK: "https://www.facebook.com",
} as const;

export const SOCIAL_LINKS = [
	URLS.LINKEDIN,
	URLS.GITHUB,
	URLS.INSTAGRAM,
];

// ── Social metadata used by Footer & Hero icon bars ────────────
export const SOCIAL_ICONS = [
	{
		href: URLS.LINKEDIN,
		icon: "simple-icons:linkedin",
		label: "LinkedIn",
	},
	{
		href: URLS.GITHUB,
		icon: "simple-icons:github",
		label: "GitHub",
	},
	{
		href: URLS.INSTAGRAM,
		icon: "simple-icons:instagram",
		label: "Instagram",
	},
	{
		href: URLS.FACEBOOK,
		icon: "simple-icons:facebook",
		label: "Facebook",
	},
] as const;

export const EMAIL_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const CV_PATH = "/cv.pdf";

// ── Section anchors ────────────────────────────────────────────
export const SECTION_LINKS = [
	{ href: "#hero", labelEn: "Home", labelId: "Beranda" },
	{ href: "#about", labelEn: "About", labelId: "Tentang" },
	{ href: "#skills", labelEn: "Skills", labelId: "Keahlian" },
	{ href: "#projects", labelEn: "Projects", labelId: "Proyek" },
	{ href: "#experience", labelEn: "Experience", labelId: "Pengalaman" },
	{ href: "#contact", labelEn: "Contact", labelId: "Kontak" },
] as const;

export const WHATSAPP_PHONE = "6285298389192";
