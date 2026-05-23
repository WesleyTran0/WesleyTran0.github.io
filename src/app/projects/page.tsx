import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";

export const metadata: Metadata = {
	title: "projects · wesleytran.me"
};

export default function ProjectsPage() {
	return <ProjectPage />;
}
