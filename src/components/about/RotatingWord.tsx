'use client';

import { useEffect, useState } from 'react';

type Props = {
	words: string[];
	intervalMs?: number;
};

const article = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

type Phase = 'in' | 'out' | 'prep';

export default function RotatingWord({ words, intervalMs = 2000 }: Props) {
	const [index, setIndex] = useState(0);
	const [phase, setPhase] = useState<Phase>('in');
	const [articleVisible, setArticleVisible] = useState(true);

	useEffect(() => {
		if (words.length <= 1) return;
		const slideMs = 430;
		const id = setInterval(() => {
			const nextIndex = (index + 1) % words.length;
			const articleChanges = article(words[index]) !== article(words[nextIndex]);

			setPhase('out');
			if (articleChanges) setArticleVisible(false);

			setTimeout(() => {
				setIndex(nextIndex);
				setPhase('prep');
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setPhase('in');
						if (articleChanges) setArticleVisible(true);
					});
				});
			}, slideMs);
		}, intervalMs);
		return () => clearInterval(id);
	}, [words, intervalMs, index]);

	const current = words[index];
	const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

	const phaseClasses: Record<Phase, string> = {
		in: 'translate-y-0 opacity-100 transition-all duration-[280ms] ease-out',
		out: 'translate-y-full opacity-0 transition-all duration-[280ms] ease-out',
		prep: '-translate-y-full opacity-0',
	};

	return (
		<span className="inline-flex items-baseline gap-[0.3em] text-accent">
			<span
				className={`transition-opacity duration-200 ease-out ${articleVisible ? 'opacity-100' : 'opacity-0'
					}`}
			>
				{article(current)}
			</span>
			<span className="relative inline-block overflow-hidden align-baseline">
				<span aria-hidden className="invisible whitespace-pre">
					{longest}
				</span>
				<span
					aria-live="polite"
					className={`absolute inset-0 whitespace-pre ${phaseClasses[phase]}`}
				>
					{current}
				</span>
			</span>
		</span>
	);
}
