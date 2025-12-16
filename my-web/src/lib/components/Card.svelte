<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div
	class="bg-surface border border-border rounded-3xl p-10 backdrop-blur-md break-all {className}"
>
	{@render children()}
</div>
