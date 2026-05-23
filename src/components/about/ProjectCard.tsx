interface ProjectCardProps {
	title: string;
	description: string;
	tags: string[];
	href?: string;
}

const tagColor: Record<string, string> = {
	rust: "text-tag-rust",
	typescript: "text-tag-ts",
	infra: "text-cyan",
	proxmox: "text-orange-400",
	Go: "text-[#00ADD8]"
};

export default function ProjectCard({ title, description, tags, href }: ProjectCardProps) {
	return (
		<a
			href={href ?? "#"}
			className="group flex min-h-47.5 cursor-pointer flex-col bg-background px-6 pt-6 pb-5 transition-colors duration-200 hover:bg-surface-alt"
		>
			<h3 className="m-0 mb-2 text-[21px] font-medium tracking-[-0.01em] text-text transition-colors group-hover:text-accent">
				{title}
			</h3>
			<p className="mb-auto text-base leading-[1.55] text-text-soft">{description}</p>
			<div className="mt-1 mb-3 flex items-center justify-between">
				<div className="flex gap-3 font-mono text-[13px] tracking-[0.04em]">
					{tags.map((tag) => (
						<span key={tag} className={tagColor[tag] ?? "text-muted"}>
							{tag}
						</span>
					))}
				</div>
				<span className="items-center font-mono text-lg text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
					↗
				</span>
			</div>
		</a>
	);
}
