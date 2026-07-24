import Link from "next/link";
import type { Project } from "@/lib/projects";
import { tagClass } from "@/lib/tagColors";
import ProjectThumbnail from "./ProjectThumbnail";

export default function ProjectListCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group flex gap-6 border-b border-border-soft py-7 transition-colors duration-200 max-sm:flex-col max-sm:gap-4"
		>
			<div className="relative aspect-video w-56 shrink-0 overflow-hidden max-sm:aspect-video max-sm:w-full">
				<ProjectThumbnail
					project={project}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="mb-2 flex items-baseline justify-between gap-4">
					<h3 className="m-0 text-[21px] font-medium tracking-[-0.01em] text-text transition-colors group-hover:text-accent">
						{project.title}
					</h3>
					<span className="shrink-0 font-mono text-sm text-muted-dim">{project.date}</span>
				</div>
				<p className="mb-auto text-base leading-[1.55] text-text-soft">
					{project.shortDescription}
				</p>
				<div className="mt-4 flex items-center justify-between">
					<div className="flex flex-wrap gap-3 font-mono text-[13px] tracking-[0.04em]">
						{project.tags.map((tag) => (
							<span key={tag} className={tagClass(tag)}>
								{tag}
							</span>
						))}
					</div>
					<span className="font-mono text-lg text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
						↗
					</span>
				</div>
			</div>
		</Link>
	);
}
