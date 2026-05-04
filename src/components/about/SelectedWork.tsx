import { projects } from '@/data/projects';
import ProjectCard from '../ProjectCard';

export default function SelectedWork() {
	return (
		<section id="work" className="scroll-mt-28 pt-15 pb-10">
			<div className="mb-7 flex items-baseline justify-between">
				<div className="flex items-baseline gap-3">
					<span className="block h-px w-[23px] translate-y-[-5px] bg-accent" aria-hidden="true" />
					<h2 className="m-0 text-[23px] font-medium tracking-[-0.01em] text-text">
						selected work
					</h2>
				</div>
				<span className="font-mono text-sm text-muted-dim">004 · 2024–26</span>
			</div>

			<div className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft max-sm:grid-cols-1">
				{projects.map((project) => (
					<ProjectCard key={project.number} project={project} />
				))}
			</div>

			<div className="flex justify-end pt-5">
				<a href="#" className="group text-base text-muted transition-colors hover:text-accent">
					view archive <span className="text-accent group-hover:text-accent">↗</span>
				</a>
			</div>
		</section>
	);
}
