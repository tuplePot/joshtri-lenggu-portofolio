// Shared API data shapes. The backend serves bilingual fields as { en, id }
// objects, but older records may still be plain strings — handle both.

export interface I18nString {
	id: string;
	en: string;
}

export interface ApiSkill {
	_id: string;
	name: string;
	icon: string;
	color: string;
}

export interface Skill {
	name: string;
	icon: string;
	color: string;
}

export interface Project {
	_id?: string;
	title: I18nString | string;
	description?: I18nString | string;
	skillIds?: ApiSkill[];
	thumbnailId?: string;
	link?: string;
	screenshots?: string[];
	projectYear?: number;
	type?: "FRONTEND" | "BACKEND" | "FULLSTACK";
	githubRepoUrl?: string;
}

export interface KeyProject {
	title: I18nString | string;
	description: I18nString | string;
}

export interface WorkExperience {
	_id: string;
	role: I18nString | string;
	company: I18nString | string;
	companyUrl?: string;
	startDate: string;
	endDate?: string;
	current?: boolean;
	description: I18nString | string;
	keyProjects?: KeyProject[];
	tags: string[];
}

export interface Education {
	_id: string;
	degree: I18nString | string;
	school: I18nString | string;
	startYear: number;
	endYear?: number;
	gpa?: string;
	description: I18nString | string;
}

/** Resolve a bilingual field to a single language, with graceful fallback. */
export function pickLang(
	text: I18nString | string | undefined,
	lang: "en" | "id",
	fallback = "",
): string {
	if (!text) return fallback;
	if (typeof text === "string") return text;
	return text[lang] || text[lang === "en" ? "id" : "en"] || fallback;
}
