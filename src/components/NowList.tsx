type NowLabel = 'BUILDING' | 'STUDYING' | 'READING' | 'LIFE' | 'WORKING';

interface NowRow {
	label: NowLabel;
	html: string;
}

const nowRows: NowRow[] = [
	{
		label: 'BUILDING',
		html: 'Working on projects like this website a cyber news scraper to freshen up my programming skills'
	},
	{
		label: 'STUDYING',
		html: 'Application security fundamentals through PortSwigger and EC-Council certifications'
	},
	{
		label: 'WORKING',
		html: 'Tinkering with new tools and technologies, finding new ways to enjoy the work I do'
	},
	{
		label: 'LIFE',
		html: 'Learning to cook more, hitting the gym, and interested in trying new hobbies like guitar or climbing'
	},
];

const labelColor: Record<NowLabel, string> = {
	BUILDING: 'text-tag-rust',
	STUDYING: 'text-green',
	READING: 'text-purple',
	LIFE: 'text-cyan',
	WORKING: 'text-accent'
};

export default function NowList() {
	return (
		<div className="border-t border-border-soft">
			{nowRows.map((row) => (
				<div
					key={row.label}
					className="grid grid-cols-[100px_1fr] gap-5 py-3.5 border-b border-border-soft items-baseline"
				>
					<span
						className={`font-mono text-[13px] tracking-[0.04em] uppercase font-medium ${labelColor[row.label]}`}
					>
						{row.label}
					</span>
					<span
						className="text-lg leading-[1.55] text-text-soft [&_strong]:text-text [&_strong]:font-medium"
						dangerouslySetInnerHTML={{ __html: row.html }}
					/>
				</div>
			))}
		</div>
	);
}
