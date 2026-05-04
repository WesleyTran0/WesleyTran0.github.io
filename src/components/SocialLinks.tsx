'use client';

import { Icon } from '@iconify/react';

export default function SocialLinks() {
	return (
		<div className="flex flex-row items-center space-x-2">
			<p>Find me on:</p>
			<a href="mailto:tran.we@northeastern.edu" target="_blank" rel="noopener noreferrer">
				<Icon icon="material-symbols:mail-outline" className="h-8 w-8" />
			</a>
			<a href="https://www.linkedin.com/in/wesley-tran/" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:linkedin" className="h-8 w-8" />
			</a>
			<a href="https://github.com/WesleyTran0" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:github" className="h-8 w-8" />
			</a>
		</div>
	);
}
