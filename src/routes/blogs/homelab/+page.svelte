<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { marked } from 'marked';

	// find all blogs via glob
	const summaries: Record<string, { default: string }> = import.meta.glob('/src/lib/blogs/*.md', {
		query: '?raw',
		eager: true
	});

	console.log(summaries);

	// make a renderer so that links in markdown get parsed into <a> that open in new tab
	const renderer = new marked.Renderer();
	renderer.link = ({ href, title, text }) => {
		return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
	};

	renderer.heading = ({ text, depth }) => {
		if (depth === 1) {
			return `<header>${text}</header>`;
		}
		return `<h${depth - 1}>${text}</h${depth - 1}>`;
	};
	marked.setOptions({ renderer });

	const rawSummary = $derived(
		summaries[`/src/lib/blogs/homelab.md`]?.default ?? 'Could not get homelab file'
	);

	const summaryHtml = $derived(marked.parse(rawSummary));
</script>

<svelte:head>
	<title>Wesley Tran | Homelab Blog</title>
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<Card class="max-w-240 mx-auto ">
	<div class="space-y-4">
		{@html summaryHtml}
	</div>
</Card>
