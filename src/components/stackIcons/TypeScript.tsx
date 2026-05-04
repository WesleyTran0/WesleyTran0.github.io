'use client';

import { Icon } from '@iconify/react';
import Card from '../Card';

export default function TypeScript() {
	return (
		<Card className="flex flex-row items-center h-9 py-6 px-3 w-fit space-x-2" padding={false}>
			<Icon icon="logos:typescript-icon" className="h-8 w-8" />
			<span>TypeScript</span>
		</Card>
	);
}
