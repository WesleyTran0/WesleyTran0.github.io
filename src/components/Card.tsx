import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	padding?: boolean;
}

export default function Card({ children, className = '', padding = true }: Props) {
	return (
		<div
			className={`bg-surface border border-border rounded-3xl ${padding ? 'p-10' : ''} backdrop-blur-md ${className}`}
		>
			{children}
		</div>
	);
}
