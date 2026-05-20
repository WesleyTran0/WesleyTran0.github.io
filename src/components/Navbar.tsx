'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

interface NavbarProps {
	onContact: () => void;
}

const links = [
	{ key: '1', label: 'about', target: 'about', kind: 'section' as const },
	{ key: '2', label: 'work', target: 'work', kind: 'section' as const },
	{ key: '3', label: 'contact', target: 'contact', kind: 'modal' as const }
];

export default function Navbar({ onContact }: NavbarProps) {
	const activeId = useScrollSpy(['about', 'work'], 'about');

	function handleSectionClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
		event.preventDefault();
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	return (
		<nav className="sticky top-0 z-30 flex items-center justify-between border-b border-border-soft bg-surface px-7 py-5 text-[16px]">
			<a
				href="#about"
				onClick={(e) => handleSectionClick(e, 'about')}
				className="font-medium text-text"
			>
				wesleytran<span className="text-accent">.me</span>
			</a>
			<ul className="m-0 flex list-none gap-7 p-0">
				{links.map((link) => {
					const isActive = link.kind === 'section' && activeId === link.target;
					const labelClass = isActive
						? 'text-text'
						: 'text-muted hover:text-text transition-colors';
					if (link.kind === 'modal') {
						return (
							<li key={link.key}>
								<button
									onClick={onContact}
									className="flex items-center gap-2"
									aria-label={`open ${link.label}`}
								>
									<span className="font-medium text-accent">[{link.key}]</span>
									<span className={labelClass}>{link.label}</span>
								</button>
							</li>
						);
					}
					return (
						<li key={link.key}>
							<a
								href={`#${link.target}`}
								onClick={(e) => handleSectionClick(e, link.target)}
								className="flex items-center gap-2"
							>
								<span className="font-medium text-accent">[{link.key}]</span>
								<span className={labelClass}>{link.label}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
