import type { Metadata } from "next";
import { GalaxyCanvas } from "@/components/ui/GalaxyCanvas";
import { PageLoader } from "@/components/ui/PageLoader";
import {
	HOME_TITLE,
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_TITLE,
	SITE_URL,
} from "@/lib/consts";
import { atkinson } from "@/lib/fonts";
import { LanguageProvider, languageInitScript } from "@/lib/i18n";
import { personSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: HOME_TITLE,
		template: `%s — ${SITE_TITLE}`,
	},
	description: SITE_DESCRIPTION,
	authors: [{ name: SITE_AUTHOR }],
	keywords: SITE_KEYWORDS,
	alternates: { canonical: "/" },
	robots: { index: true, follow: true },
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon-192.png", type: "image/png", sizes: "192x192" },
		],
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		type: "website",
		url: SITE_URL,
		title: HOME_TITLE,
		description: SITE_DESCRIPTION,
		siteName: SITE_TITLE,
		locale: "en_US",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: `${SITE_AUTHOR} — portfolio preview`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: HOME_TITLE,
		description: SITE_DESCRIPTION,
		images: ["/og-image.jpg"],
		creator: "@joshtri",
	},
};

export const viewport = {
	themeColor: "#050512",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${atkinson.variable} h-full antialiased`}
		>
			<head>
				{/* Anti-flash: apply saved language before first paint. */}
				<script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
			</head>
			<body className="min-h-full flex flex-col bg-black text-white">
				<LanguageProvider>
					<PageLoader />
					{/* Single galaxy canvas fixed behind all sections */}
					<div className="fixed inset-0 -z-10 w-full h-full">
						<GalaxyCanvas />
					</div>
					{children}
				</LanguageProvider>
			</body>
		</html>
	);
}
