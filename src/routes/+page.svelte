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
	<Card class="space-y-4 max-w-205">
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
		<div>If you see anything that interests you, I'd love to talk about it!</div>
		<div class="flex flex-row items-center space-x-2">
			<p>Find me on:</p>
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
<Card class="space-y-4">
	<header class="flex text-center w-full">About me</header>
	<div>
		I am a student studying Cybersecurity at Northeastern University with a passion for developing
		secure systems and applications.
	</div>
	<div>
		My current focus is building applications with a focus on creating applications with a focus on
		security, extensibility, and efficiency. To that end, enjoy competing in competitions like
		<a href="https://www.ncaecybergames.org/#">NCAE</a> and
		<a href="https://cyberforce.energy.gov/">CyberForce</a>, and slowly building up my a homelab to
		something I can consistently rely on for things like home utilities, file storages, and any
		other technology based experiments.
	</div>
	<div>
		Outside of all that, I'm busy spending time with friends, finding time to hit the gym, obsessing
		over a new game to obsess for a couple days, or exploring stores and neighborhoods around
		Boston.
	</div>
</Card>
<div class="grid grid-rows-2 gap-4">
	<Project title="Shorelark" heading="Featured: Shorelark" size="small" image={shorelarkGif} />
</div>
