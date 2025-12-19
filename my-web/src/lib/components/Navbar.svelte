<script lang="ts">
	import { page } from '$app/state';

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' }
	];
</script>

<div class="flex w-full h-16 items-center justify-center border-b border-border">
	<nav class="flex flex-row px-6">
		<div class="flex gap-6">
			{#each navLinks as link}
				<a
					href={link.href}
					class="transition-colors {page.url.pathname === link.href
						? 'text-primary underline underline-offset-8! decoration-accent decoration-2'
						: 'text-secondary no-underline'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</nav>
</div>
