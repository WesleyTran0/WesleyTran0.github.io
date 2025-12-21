<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Project from '$lib/components/Project.svelte';

	import shorelarkGif from '$lib/projects/shorelark/shorelark.gif';
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Wesley Tran | Home</title>
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<div class="flex flex-row w-full gap-4">
	<div class="flex items-center">
		<img
			src="https://github.com/WesleyTran0.png"
			alt={'headshot'}
			loading="lazy"
			class="w-60 h-56 rounded-full object-cover"
		/>
	</div>
	<Card class="space-y-4">
		<header class="flex flex-row">
			Hi, I'm Wesley <div
				class="font-normal px-2 bg-linear-to-r from-accent via-fuchsia-500 to-cyan-400 gradient-animation bg-clip-text text-transparent bg-size-[200%_auto]"
			>
				ᕕ( ᐛ )ᕗ
			</div>
		</header>
		<div>
			This is my personal website, a space for me to document my projects, hobbies, and processes.
		</div>
		<div class="">
			If you see anything interesting, feel free to reach out! I would love to talk about it.
		</div>
		<div class="flex flex-row items-center space-x-2">
			<p>Find me on</p>
			<a href="mailto:tran.we@northeastern.edu" target="_blank" rel="noopener noreferrer">
				<Icon icon="material-symbols:mail-outline" class="h-8 w-8" />
			</a>
			<a href="https://www.linkedin.com/in/wesley-tran/" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:linkedin" class="h-8 w-8" />
			</a>
			<a href="https://github.com/WesleyTran0" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:github" class="h-8 w-8" />
			</a>
		</div>
	</Card>
</div>
<div class="grid grid-rows-2 gap-4">
	<Project title="Shorelark" heading="Featured: Shorelark" size="small" image={shorelarkGif} />
</div>
