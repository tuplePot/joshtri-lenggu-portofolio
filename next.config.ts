import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// Appwrite Storage (project thumbnails & screenshots)
			{ protocol: "https", hostname: "sgp.cloud.appwrite.io" },
			{ protocol: "https", hostname: "cloud.appwrite.io" },
			// Firebase Storage (legacy image host)
			{ protocol: "https", hostname: "firebasestorage.googleapis.com" },
			// Simple Icons CDN
			{ protocol: "https", hostname: "cdn.simpleicons.org" },
			// Blog cover images
			{ protocol: "https", hostname: "blog.joshtrilenggu.com" },
		],
	},
};

export default nextConfig;
