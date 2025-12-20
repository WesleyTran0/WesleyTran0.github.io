<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<div
	class="min-h-screen bg-background text-secondary font-sans antialiased leading-relaxed text-lg"
>
	<Navbar />
	<div class="flex flex-col justify-center max-w-280 mx-auto items-center px-6 py-5 gap-4">
		{@render children()}
	</div>
</div>
