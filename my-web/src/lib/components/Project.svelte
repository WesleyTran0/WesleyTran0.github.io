<script lang="ts">
	import { marked } from 'marked';
	import Card from './Card.svelte';

	interface ProjectProps {
		title: string;
		heading?: string;
		image?: string;
		size: 'small' | 'large';
	}

	let { title, heading, image, size }: ProjectProps = $props();

	const summaries: Record<string, { default: string }> = import.meta.glob(
		'/src/lib/projects/*/*.md',
		{
			query: '?raw',
			eager: true
		}
	);

	let summary = $derived(
		summaries[`/src/lib/projects/${title}/${title}_summary.md`]?.default ??
			'Could not get ' + title + "\'s summary"
	);

	let summaryHtml = $derived(marked.parse(summary));

	const styling = $derived(size === 'large' ? 'flex flex-col' : 'flex flex-row');
</script>

<Card class={styling + ' gap-4'}>
	{#if image}
		<div class="flex items-center justify-center {size === 'large' ? 'order-2' : 'order-first'}">
			<img src={image} alt={title + ' image failed to load'} loading="lazy" />
		</div>
	{/if}
	<div class={size === 'large' ? 'order-1' : ''}>
		<header>{heading ?? title}</header>
		<div class="space-y-4">
			{@html summaryHtml}
		</div>
	</div>
</Card>
