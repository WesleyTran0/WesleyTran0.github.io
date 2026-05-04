'use client';

import Modal from '../Modal';

interface ContactModalProps {
	open: boolean;
	onClose: () => void;
}

const links = [
	{ label: 'email', href: 'mailto:tran.we@northeastern.edu' },
	{ label: 'github', href: 'https://github.com/WesleyTran0' },
	{ label: 'linkedin', href: 'https://www.linkedin.com/in/wesley-tran/' }
];

export default function ContactModal({ open, onClose }: ContactModalProps) {
	return (
		<Modal open={open} onClose={onClose} labelledBy="contact-heading">
			<h2 id="contact-heading" className="m-0 mb-5 text-[23px] font-medium text-text">
				get in touch
			</h2>
			<ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
				{links.map((link) => (
					<li key={link.label}>
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted transition-colors hover:text-accent"
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</Modal>
	);
}
