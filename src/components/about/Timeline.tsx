interface ExperienceEntry {
	date: string; // "MM-YYYY", used for display and sorting
	role: string;
	org: string;
	note?: string;
	href?: string;
}

// TODO: confirm all dates (MM-YYYY) with Wesley — current values are best guesses.
const entries: ExperienceEntry[] = [
	{
		date: "06-2025",
		role: "Security Research Intern",
		org: "Griffiss Institute",
		note: "threat research + tooling"
	},
	{
		date: "09-2024",
		role: "Competitor",
		org: "NUCCDC",
		note: "blue-team cyber defense",
		href: "https://nuccdc.club/"
	},
	{
		date: "01-2024",
		role: "Developer",
		org: "Sandbox",
		note: "SearchNEU course catalog + notifications",
		href: "https://www.sandboxnu.com/"
	},
	{
		date: "09-2023",
		role: "B.S. Cybersecurity",
		org: "Northeastern University",
		note: "expected 2027"
	}
];

function sortKey(date: string): string {
	const [month, year] = date.split("-");
	return `${year}-${month}`;
}

export default function Timeline() {
	const sorted = [...entries].sort((a, b) => (sortKey(a.date) < sortKey(b.date) ? 1 : -1));

	return (
		<section id="experience" className="scroll-mt-28 pb-10">
			<div className="mb-7 flex items-baseline justify-between">
				<div className="flex items-baseline gap-3">
					<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
					<h2 className="m-0 text-[23px] font-medium tracking-[-0.01em] text-text">experience</h2>
				</div>
				<span className="font-mono text-sm text-muted-dim">as of 07-2026</span>
			</div>

			<ol className="m-0 flex list-none flex-col gap-7 border-l border-border py-1 pl-7">
				{sorted.map((entry) => {
					const heading = (
						<>
							<span className="font-medium text-text">{entry.role}</span>
							<span className="text-muted"> · {entry.org}</span>
						</>
					);
					return (
						<li key={`${entry.date}-${entry.org}`} className="relative">
							<span
								aria-hidden="true"
								className="absolute top-1.5 -left-[calc(1.75rem+4.5px)] h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
							/>
							<div className="mb-1 font-mono text-[13px] tracking-[0.04em] text-accent">
								{entry.date}
							</div>
							<div className="text-lg leading-[1.4]">
								{entry.href ? (
									<a
										href={entry.href}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-accent"
									>
										{heading}
									</a>
								) : (
									heading
								)}
							</div>
							{entry.note && (
								<div className="mt-0.5 leading-[1.5] text-text-soft">{entry.note}</div>
							)}
						</li>
					);
				})}
			</ol>
		</section>
	);
}
