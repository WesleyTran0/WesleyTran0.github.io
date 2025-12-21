<script lang="ts">
	import type { Snippet } from 'svelte';
	import Github from './stackIcons/Github.svelte';

	interface Props {
		href: string;
		icon?: 'github';
		children: Snippet;
	}

	let { href, icon, children }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-secondary hover:text-primary hover:border-border-hover transition-all w-fit"
>
	{#if icon === 'github'}
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_6_80)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M16 0.393738C7.1625 0.393738 0 7.55624 0 16.3937C0 23.475 4.58125 29.4562 10.9375 31.575C11.7375 31.7125 12.0375 31.2375 12.0375 30.8125C12.0375 30.4312 12.0188 29.175 12.0188 27.8312C8 28.5687 6.95625 26.85 6.6375 25.95C6.45625 25.4875 5.675 24.0687 5 23.6875C4.4375 23.3875 3.6375 22.65 4.98125 22.625C6.24375 22.6062 7.14375 23.7875 7.44375 24.2625C8.88125 26.6812 11.1812 26 12.1062 25.5812C12.2437 24.5437 12.6687 23.8437 13.125 23.4437C9.5625 23.0437 5.84375 21.6625 5.84375 15.5437C5.84375 13.8062 6.4625 12.3625 7.48125 11.2437C7.31875 10.8437 6.7625 9.20624 7.64375 7.00624C7.64375 7.00624 8.98125 6.58749 12.0437 8.64374C13.325 8.28124 14.6813 8.10624 16.0438 8.10624C17.4063 8.10624 18.7625 8.28749 20.0438 8.64374C23.1063 6.56249 24.4438 7.00624 24.4438 7.00624C25.325 9.20624 24.7625 10.8437 24.6063 11.2437C25.625 12.3625 26.2437 13.7812 26.2437 15.5437C26.2437 21.6812 22.5063 23.0437 18.9438 23.4437C19.525 23.9437 20.025 24.9062 20.025 26.4062C20.025 28.5437 20.0063 30.2687 20.0063 30.8062C20.0063 31.225 20.3063 31.725 21.1063 31.5687C27.4188 29.4562 32 23.4562 32 16.3937C32 7.55624 24.8375 0.393738 16 0.393738Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_6_80">
					<rect width="32" height="32" fill="white" />
				</clipPath>
			</defs>
		</svg>
	{/if}
	<span>{@render children()}</span>
	<span class="text-sm text-accent">→</span>
</a>
