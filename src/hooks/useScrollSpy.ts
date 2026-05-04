'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], defaultId: string): string {
	const [activeId, setActiveId] = useState(defaultId);

	useEffect(() => {
		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					setActiveId(visible[0].target.id);
				}
			},
			{
				rootMargin: '-80px 0px -50% 0px',
				threshold: 0
			}
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [sectionIds]);

	return activeId;
}
