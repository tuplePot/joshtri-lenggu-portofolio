import { fetchApi } from "@/utils/api";
import type { Skill } from "@/utils/types";
import { SkillsClient } from "./SkillsClient";

const fallback: Skill[] = [
	{ name: "React", icon: "simple-icons:react", color: "#61DAFB" },
	{ name: "TypeScript", icon: "simple-icons:typescript", color: "#3178C6" },
	{ name: "Next.js", icon: "simple-icons:nextdotjs", color: "#E2E8F0" },
	{ name: "Tailwind", icon: "simple-icons:tailwindcss", color: "#06B6D4" },
	{ name: "Vue.js", icon: "simple-icons:vuedotjs", color: "#42B883" },
	{ name: "Nuxt.js", icon: "simple-icons:nuxtdotjs", color: "#00DC82" },
	{ name: "Node.js", icon: "simple-icons:nodedotjs", color: "#339933" },
	{ name: "Express", icon: "simple-icons:express", color: "#E2E8F0" },
	{ name: "Laravel", icon: "simple-icons:laravel", color: "#FF2D20" },
	{ name: "PHP", icon: "simple-icons:php", color: "#777BB4" },
	{ name: "MongoDB", icon: "simple-icons:mongodb", color: "#47A248" },
	{ name: "PostgreSQL", icon: "simple-icons:postgresql", color: "#4169E1" },
	{ name: "MySQL", icon: "simple-icons:mysql", color: "#4479A1" },
	{ name: "Git", icon: "simple-icons:git", color: "#F05032" },
	{ name: "Docker", icon: "simple-icons:docker", color: "#2496ED" },
	{ name: "Astro", icon: "simple-icons:astro", color: "#FF5D01" },
];

export async function Skills() {
	let skills = (await fetchApi<Skill[]>("/api/skills")) ?? [];
	if (skills.length === 0) skills = fallback;
	return <SkillsClient skills={skills} />;
}
