import type { Metadata } from "next";
import ProjectListCard from "@/components/projects/ProjectListCard";
import PageShell from "@/components/PageShell";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
	title: "projects · wesleytran.me"
};

export default function ProjectsPage() {
	const projects = getAllProjects();
	return (
		<PageShell>
			<main className="mx-auto max-w-4xl px-7 pt-10 pb-16">
				<div className="mb-8 flex items-baseline justify-between">
					<div className="flex items-baseline gap-3">
						<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
						<h1 className="m-0 text-[28px] font-medium tracking-[-0.01em] text-text">projects</h1>
					</div>
				</div>
				<div className="flex flex-col border-t border-border-soft">
					{projects.map((project) => (
						<ProjectListCard key={project.slug} project={project} />
					))}
				</div>
			</main>
		</PageShell>
	);
}
