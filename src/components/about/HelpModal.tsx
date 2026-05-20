'use client';

import Modal from '../Modal';

interface HelpModalProps {
	open: boolean;
	onClose: () => void;
}

const shortcuts = [
	{ key: '1', desc: 'go to home' },
	{ key: '2', desc: 'go to projects' },
	{ key: '3', desc: 'open contact' },
	{ key: '?', desc: 'open this help' },
	{ key: 'esc', desc: 'close modal' }
];

export default function HelpModal({ open, onClose }: HelpModalProps) {
	return (
		<Modal open={open} onClose={onClose} labelledBy="help-heading">
			<h2 id="help-heading" className="m-0 mb-5 text-[23px] font-medium text-text">
				keyboard shortcuts
			</h2>
			<ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
				{shortcuts.map((s) => (
					<li key={s.key} className="flex justify-between text-muted">
						<span>{s.desc}</span>
						<kbd
							style={{ fontFamily: 'inherit' }}
							className="inline-block rounded-[3px] border border-border bg-surface-raised px-2 py-px text-sm font-medium text-accent"
						>
							{s.key}
						</kbd>
					</li>
				))}
			</ul>
		</Modal>
	);
}
