import type { Project, ProjectTag } from '@/data/projects';

const tagColor: Partial<Record<ProjectTag, string>> = {
	rust: 'text-tag-rust',
	typescript: 'text-tag-ts',
	infra: 'text-cyan'
};

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<a
			href={project.href ?? '#'}
			className="group flex flex-col px-6 pt-6 pb-5 min-h-[190px] bg-background hover:bg-surface-alt transition-colors duration-200 cursor-pointer"
		>
			<div className="flex justify-between items-start mb-3.5">
				<span className="font-mono text-[13px] text-muted-dim">{project.number}</span>
				<span className="font-mono text-base text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
					↗
				</span>
			</div>

			<h3 className="text-[21px] font-medium tracking-[-0.01em] text-text group-hover:text-accent transition-colors mb-2 m-0">
				{project.title}
			</h3>

			<p className="text-base leading-[1.55] text-text-soft mb-auto m-0">{project.description}</p>

			<div className="flex gap-3 pt-3.5 font-mono text-[13px] tracking-[0.04em]">
				{project.tags.map((tag, i) => (
					<span key={tag} className={i === 0 ? (tagColor[tag] ?? 'text-muted') : 'text-muted'}>
						{tag}
					</span>
				))}
			</div>
		</a>
	);
}
