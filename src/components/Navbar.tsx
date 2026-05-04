'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Projects', href: '/projects' }
];

export default function Navbar() {
	const pathname = usePathname();
	const normalized = pathname.replace(/\/$/, '') || '/';
	return (
		<div className="flex w-full h-16 items-center justify-center border-b border-border">
			<nav className="flex flex-row px-6">
				<div className="flex gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`transition-colors ${
								normalized === link.href
									? 'text-primary underline underline-offset-8! decoration-accent decoration-2'
									: 'text-secondary no-underline'
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
