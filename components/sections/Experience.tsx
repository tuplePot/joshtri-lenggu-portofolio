import { fetchApi } from "@/utils/api";
import type { Education, WorkExperience } from "@/utils/types";
import { ExperienceClient } from "./ExperienceClient";

export async function Experience() {
	const [workData, eduData] = await Promise.all([
		fetchApi<WorkExperience[]>("/api/work-experiences"),
		fetchApi<Education[]>("/api/educations"),
	]);
	return (
		<ExperienceClient
			workExperience={workData ?? []}
			education={eduData ?? []}
		/>
	);
}
