import ProjectCard from './ProjectCard';

type ProjectTag =
	| string
	| "typescript"
	| "rust"
	| "Go"
	| "react"
	| "infra"
	| "networks"
	| "protocols"
	| "proxmox"
	| "next.js"
	| "ongoing";

interface Project {
	title: string;
	description: string;
	tags: ProjectTag[];
	href?: string;
}

const projects: Project[] = [
	{
		title: 'Good Dog Licensing',
		description: 'Northeastern\'s free music synchronization platform, connecting musicians and media makers together',
		tags: ['typescript', 'react', 'next.js']
	},
	{
		title: 'Cyber News Web Scraper',
		description: 'Designed and developed a web scraper to learn Go and automate article aggregation',
		tags: ['Go', 'goquery', 'json']
	},
	{
		title: 'homelab',
		description: "Self-hosted infrastructure designed to provide efficient and budget-friendly utility and space for systems tinkering",
		tags: ['infra', 'proxmox', 'ongoing']
	},
	{
		title: 'Falling Sand',
		description: 'A falling sand physics engine built to model how elements interact each other',
		tags: ['rust', 'ongoing']
	},
];

export default function SelectedWork() {
	return (
		<section id="work" className="scroll-mt-28 pt-15 pb-10">
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
				{projects.map((project, index) => (
					<ProjectCard key={index} project={project} />
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
