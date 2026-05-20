import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

const tagColor: Record<string, string> = {
	rust: 'text-tag-rust',
	typescript: 'text-tag-ts',
	infra: 'text-cyan',
	proxmox: 'text-orange-400',
	Go: 'text-[#00ADD8]'
};

export default function ProjectListCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group flex flex-col bg-background hover:bg-surface-alt transition-colors duration-200"
		>
			<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-raised border-b border-border-soft">
				{project.thumbnail ? (
					<Image
						src={project.thumbnail}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center font-mono text-sm text-muted-dim">
						no preview
					</div>
				)}
			</div>
			<div className="flex flex-col px-6 pt-5 pb-5 flex-1">
				<div className="flex items-baseline justify-between mb-2">
					<h3 className="m-0 text-[21px] font-medium tracking-[-0.01em] text-text group-hover:text-accent transition-colors">
						{project.title}
					</h3>
					<span className="font-mono text-sm text-muted-dim">{project.date}</span>
				</div>
				<p className="text-base leading-[1.55] text-text-soft mb-auto">
					{project.shortDescription}
				</p>
				<div className="flex justify-between items-center mt-4">
					<div className="flex gap-3 font-mono text-[13px] tracking-[0.04em] flex-wrap">
						{project.tags.map((tag) => (
							<span key={tag} className={tagColor[tag] ?? 'text-muted'}>
								{tag}
							</span>
						))}
					</div>
					<span className="font-mono text-lg text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
						↗
					</span>
				</div>
			</div>
		</Link>
	);
}
