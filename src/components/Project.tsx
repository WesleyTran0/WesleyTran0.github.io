import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import Card from './Card';

interface ProjectProps {
	title: string;
	heading?: string;
	image?: string;
	size: 'small' | 'large';
	altText?: string;
}

const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
	return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};
marked.setOptions({ renderer });

function loadSummary(title: string): string {
	const folder = title.toLowerCase();
	const path = join(process.cwd(), 'src/lib/projects', folder, `${folder}_summary.md`);
	try {
		return readFileSync(path, 'utf-8');
	} catch {
		return `Could not get ${title}'s summary`;
	}
}

export default function Project({ title, heading, image, size, altText }: ProjectProps) {
	const summaryHtml = altText ? '' : (marked.parse(loadSummary(title)) as string);
	const styling = size === 'large' ? 'flex flex-col' : 'flex flex-row';

	return (
		<Card className={styling + ' gap-4'}>
			{image && (
				<div
					className={`flex items-center justify-center ${size === 'large' ? 'order-2' : 'order-first'}`}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={image}
						alt={title + ' image failed to load'}
						loading="lazy"
						className="rounded-xl border border-border"
					/>
				</div>
			)}
			<div className={size === 'large' ? 'order-1' : ''}>
				<header>{heading ?? title}</header>
				<div className="space-y-4 pt-4">
					{altText ? altText : <div dangerouslySetInnerHTML={{ __html: summaryHtml }} />}
				</div>
			</div>
		</Card>
	);
}
