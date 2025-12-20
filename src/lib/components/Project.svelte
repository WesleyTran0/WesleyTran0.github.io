<script lang="ts">
	import { marked } from 'marked';
	import Card from './Card.svelte';

	interface ProjectProps {
		title: string;
		heading?: string;
		image?: string;
		size: 'small' | 'large';
		altText?: string;
	}

	let { title, heading, image, size, altText }: ProjectProps = $props();

	// find all summaries via glob
	const summaries: Record<string, { default: string }> = import.meta.glob(
		'/src/lib/projects/*/*.md',
		{
			query: '?raw',
			eager: true
		}
	);

	// make a renderer so that links in markdown get parsed into <a> that open in new tab
	const renderer = new marked.Renderer();
	renderer.link = ({ href, title, text }) => {
		return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
	};
	marked.setOptions({ renderer });

	const rawSummary = $derived(
		summaries[`/src/lib/projects/${title.toLowerCase()}/${title.toLowerCase()}_summary.md`]
			?.default ?? 'Could not get ' + title + "\'s summary"
	);
	const summaryHtml = $derived(marked.parse(rawSummary));

	const styling = $derived(size === 'large' ? 'flex flex-col' : 'flex flex-row');
</script>

<Card class={styling + ' gap-4'}>
	{#if image}
		<div class="flex items-center justify-center {size === 'large' ? 'order-2' : 'order-first'}">
			<img
				src={image}
				alt={title + ' image failed to load'}
				loading="lazy"
				class="rounded-xl border border-border"
			/>
		</div>
	{/if}
	<div class={size === 'large' ? 'order-1' : ''}>
		<header>{heading ?? title}</header>
		<div class="space-y-4 pt-4">
			{#if altText}
				{altText}
			{:else}
				{@html summaryHtml}
			{/if}
		</div>
	</div>
</Card>
