import type { Project, ProjectTag } from '@/data/projects';

const tagColor: Partial<Record<ProjectTag, string>> = {
	rust: 'text-tag-rust',
	typescript: 'text-tag-ts',
	infra: 'text-cyan',
	proxmox: 'text-orange-400',
	Go: 'text-[#00ADD8]'
};

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<a
			href={project.href ?? '#'}
			className="group flex flex-col px-6 pt-6 pb-5 min-h-47.5 bg-background hover:bg-surface-alt transition-colors duration-200 cursor-pointer"
		>
			<h3 className="text-[21px] font-medium tracking-[-0.01em] text-text group-hover:text-accent transition-colors mb-2 m-0">
				{project.title}
			</h3>
			<p className="text-base leading-[1.55] text-text-soft mb-auto">{project.description}</p>
			<div className="flex justify-between items-center mt-1 mb-3">
				<div className="flex gap-3 font-mono text-[13px] tracking-[0.04em]">
					{project.tags.map((tag) => (
						<span key={tag} className={tagColor[tag] ?? 'text-muted'}>
							{tag}
						</span>
					))}
				</div>
				<span className="font-mono text-lg items-center text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
					↗
				</span>
			</div>

		</a>
	);
}
