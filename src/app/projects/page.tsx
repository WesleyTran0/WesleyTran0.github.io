import type { Metadata } from "next";
import ProjectListCard from "@/components/projects/ProjectListCard";
import ProjectPage from "@/components/ProjectPage";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
	title: "projects · wesleytran.me"
};

export default function ProjectsPage() {
	const projects = getAllProjects();
	return (
		<ProjectPage>
			<main className="mx-auto max-w-3xl px-7 pt-10 pb-16">
				<div className="mb-8 flex items-baseline justify-between">
					<div className="flex items-baseline gap-3">
						<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
						<h1 className="m-0 text-[28px] font-medium tracking-[-0.01em] text-text">projects</h1>
					</div>
					<span className="font-mono text-sm text-muted-dim">
						{projects.length} {projects.length === 1 ? "entry" : "entries"}
					</span>
				</div>
				<div className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft max-sm:grid-cols-1">
					{projects.map((project) => (
						<ProjectListCard key={project.slug} project={project} />
					))}
				</div>
			</main>
		</ProjectPage>
	);
}
