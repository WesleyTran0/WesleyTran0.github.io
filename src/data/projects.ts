export type ProjectTag =
	| 'rust'
	| 'typescript'
	| 'infra'
	| 'networks'
	| 'protocols'
	| 'proxmox'
	| 'next.js'
	| 'ongoing'
	| '2024'
	| '2025'
	| '2026';

export interface Project {
	number: string;
	title: string;
	description: string;
	tags: ProjectTag[];
	href?: string;
}

export const projects: Project[] = [
	{
		number: '01',
		title: '4700dns',
		description:
			'recursive dns resolver in rust. cname chasing, glue records, bailiwick checking.',
		tags: ['rust', 'networks', '2026']
	},
	{
		number: '02',
		title: 'homelab',
		description: 'proxmox host running nextcloud, minecraft, cloudflare zero trust.',
		tags: ['infra', 'proxmox', 'ongoing']
	},
	{
		number: '03',
		title: 'tcp-from-scratch',
		description: 'reliable transport over udp. reno congestion control, fast retransmit.',
		tags: ['rust', 'protocols', '2025']
	},
	{
		number: '04',
		title: 'good dog licensing',
		description: 'profile pages and submission flow at sandbox. next.js + trpc + prisma.',
		tags: ['typescript', 'next.js', '2025']
	}
];
