import { nowRows, type NowLabel } from '@/data/now';

const labelColor: Record<NowLabel, string> = {
	BUILDING: 'text-tag-rust',
	STUDYING: 'text-green',
	READING: 'text-purple',
	LIFE: 'text-cyan',
	WORKING: 'text-accent'
};

export default function NowList() {
	return (
		<div className="mb-10">
			<p className="text-muted text-base italic mb-5 m-0">a few things on my mind lately:</p>
			<div className="border-t border-border-soft">
				{nowRows.map((row) => (
					<div
						key={row.label}
						className="grid grid-cols-[100px_1fr] gap-5 py-3.5 border-b border-border-soft items-baseline"
					>
						<span
							className={`font-mono text-[13px] tracking-[0.04em] uppercase ${labelColor[row.label]}`}
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
		</div>
	);
}
