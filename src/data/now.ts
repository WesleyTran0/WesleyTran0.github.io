export type NowLabel = 'BUILDING' | 'STUDYING' | 'READING' | 'LIFE' | 'WORKING';

export interface NowRow {
	label: NowLabel;
	html: string;
}

export const nowRows: NowRow[] = [
	{
		label: 'BUILDING',
		html: 'final pass on <strong>4700dns</strong>, my recursive resolver. concurrent queries, retries on packet loss.'
	},
	{
		label: 'STUDYING',
		html: 'finals in <strong>algorithms</strong> (network flow, dp) and <strong>networks</strong> (bgp, dns security, tls).'
	},
	{
		label: 'READING',
		html: 'crafting interpreters by bob nystrom, and the rust reference (again).'
	},
	{
		label: 'LIFE',
		html: 'cooking more this semester. on a 3-day p/p/l split working toward front lever.'
	}
];
