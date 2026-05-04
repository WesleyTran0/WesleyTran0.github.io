'use client';

import { Icon } from '@iconify/react';
import Card from '../Card';

export default function Scss() {
	return (
		<Card className="flex flex-row items-center h-9 py-6 px-3 w-fit space-x-2" padding={false}>
			<Icon icon="logos:sass" className="w-8 h-8" />
			<span>Sassy CSS</span>
		</Card>
	);
}
