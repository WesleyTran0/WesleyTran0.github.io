<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		padding?: boolean;
	}

	let { children, class: className = '', padding = true }: Props = $props();
</script>

<div
	class="bg-surface border border-border rounded-3xl {padding
		? 'p-10'
		: ''} backdrop-blur-md {className}"
>
	{@render children()}
</div>
