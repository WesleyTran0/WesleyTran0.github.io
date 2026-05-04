'use client';

interface FooterProps {
	onHelp: () => void;
}

const social = [
	{ label: 'github', href: 'https://github.com/WesleyTran0' },
	{ label: 'linkedin', href: 'https://www.linkedin.com/in/wesley-tran/' },
	{ label: 'email', href: 'mailto:tran.we@northeastern.edu' }
];

function Kbd({ children }: { children: React.ReactNode }) {
	return (
		<kbd
			style={{ fontFamily: 'inherit' }}
			className="inline-block bg-surface-raised text-accent border border-border rounded-[3px] px-2 py-px text-sm font-medium mx-0.5"
		>
			{children}
		</kbd>
	);
}

export default function Footer({ onHelp }: FooterProps) {
	function handleHelpClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		onHelp();
	}

	return (
		<footer className="bg-surface border-t border-border-soft px-7 py-6 text-[15px] text-muted">
			<div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2.5">
				<div>
					press <Kbd>1</Kbd>
					<Kbd>2</Kbd>
					<Kbd>3</Kbd> to navigate ·{' '}
					<button onClick={handleHelpClick} aria-label="open keyboard help">
						<Kbd>?</Kbd>
					</button>{' '}
					for help
				</div>
				<div className="flex gap-7">
					{social.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted hover:text-accent transition-colors"
						>
							{s.label}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
