import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

export default function SelectedWork({ projects }: { projects: Project[] }) {
	return (
		<section id="work" className="scroll-mt-28 pb-10">
			<div className="mb-7 flex items-baseline justify-between">
				<div className="flex items-baseline gap-3">
					<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
					<h2 className="m-0 text-[23px] font-medium tracking-[-0.01em] text-text">
						Featured Work
					</h2>
				</div>
				<span className="font-mono text-sm text-muted-dim">as of 05-2026</span>
			</div>

			<div className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft max-sm:grid-cols-1">
				{projects.map((project) => (
					<ProjectCard
						key={project.slug}
						title={project.title}
						description={project.frontPageDescription ?? project.shortDescription}
						tags={project.tags.slice(0, 3)}
						href={`/projects/${project.slug}`}
					/>
				))}
			</div>
			<div className="flex justify-end pt-5">
				<a
					href="/projects"
					className="group text-base text-muted transition-colors hover:text-accent"
				>
					view archive <span className="text-accent group-hover:text-accent">↗</span>
				</a>
			</div>
		</section>
	);
}
