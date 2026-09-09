import { fetchApi } from "@/utils/api";
import type { Project } from "@/utils/types";
import { ProjectsClient } from "./ProjectsClient";

export async function Projects() {
	const projects = (await fetchApi<Project[]>("/api/projects")) ?? [];
	return <ProjectsClient projects={projects} />;
}
