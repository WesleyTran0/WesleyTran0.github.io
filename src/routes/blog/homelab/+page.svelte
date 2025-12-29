<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { marked } from 'marked';

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
		summaries[`/src/lib/blog/homelab.md`]?.default ?? 'Could not get homelab file'
	);

	const summaryHtml = $derived(marked.parse(rawSummary));
</script>

<svelte:head>
	<title>Wesley Tran | Homelab Blog</title>
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<Card>
	<div>{@html summaryHtml}</div>
</Card>
