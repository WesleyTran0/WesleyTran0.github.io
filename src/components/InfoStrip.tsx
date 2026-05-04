import { infoRows } from '@/data/info';

export default function InfoStrip() {
	return (
		<div className="border-t border-border-soft pt-7 font-mono text-[15px] leading-loose">
			{infoRows.map((row) => (
				<div key={row.key} className="flex">
					<span className="w-35 shrink-0 text-muted">
						<span className="text-accent">&gt;</span> {row.key}
					</span>
					<span className="text-text" dangerouslySetInnerHTML={{ __html: row.html }} />
				</div>
			))}
		</div>
	);
}
