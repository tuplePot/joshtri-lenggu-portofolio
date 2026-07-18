// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === SITE_URL + '/') {
          return { ...item, changefreq: 'weekly', priority: 1.0 };
        }
        // Section pages (about, skills, projects, etc.)
        const sectionPages = ['/about', '/skills', '/projects', '/experience', '/literature', '/contact'];
        if (sectionPages.some(s => item.url === SITE_URL + s)) {
          return { ...item, changefreq: 'weekly', priority: 0.8 };
        }
        // Individual project pages
        if (item.url.includes('/projects/')) {
          return { ...item, changefreq: 'monthly', priority: 0.6 };
        }
        return item;
      },
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Atkinson",
      cssVariable: "--font-atkinson",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/atkinson-regular.woff"],
            weight: 400,
            style: "normal",
            display: "swap",
          },
          {
            src: ["./src/assets/fonts/atkinson-bold.woff"],
            weight: 700,
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],
});
