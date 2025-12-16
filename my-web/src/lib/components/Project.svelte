<script lang="ts">
	import Card from './Card.svelte';

	interface ProjectProps {
		title: string;
		heading?: string;
		image?: string;
	}

	let { title, heading, image }: ProjectProps = $props();

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

	// NOTE: markdown to html exploration maybe ?
	// let summaryHtml = $derived(marked(rawSummary));
	// <div>{@html summaryHtml}</div>
</script>

<Card>
	<h1>{heading ?? title}</h1>
	<img src={image} alt={title + ' iamge failed to load'} loading="lazy" />
	<p>{summary}</p>
</Card>
