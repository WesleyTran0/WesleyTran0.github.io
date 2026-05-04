export interface InfoRow {
	key: string;
	html: string;
}

export const infoRows: InfoRow[] = [
	{ key: 'location', html: 'boston, ma' },
	{
		key: 'studying',
		html: 'cs <span class="text-accent">+</span> cybersecurity, neu &lsquo;27'
	},
	{ key: 'working', html: 'sandbox @ northeastern' },
	{ key: 'tools', html: 'arch · astronvim · rust' }
];
