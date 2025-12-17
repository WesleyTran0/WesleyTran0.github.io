<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Project from '$lib/components/Project.svelte';
</script>

<div class="flex flex-cols w-full gap-4">
	<div class="flex items-center">
		<img src={'temp'} alt={'image of me failed to load'} loading="lazy" />
	</div>
	<Card class="">
		<header class="flex flex-row text-2xl text-accent font-bold pb-4">
			Hi, I'm Wesley <div
				class="font-normal px-2 bg-linear-to-r from-blue-400 via-green-600 to-yellow-400 gradient-animation bg-clip-text text-transparent bg-size-[200%_auto]"
			>
				ᕕ( ᐛ )ᕗ
			</div>
		</header>
		<div>
			This is my personal website, a hub I use to store and document my projects, hobbies, and
			processes.
		</div>
		<div>
			If you see anything interesting, feel free to reach out! I would love to talk about it.
		</div>
	</Card>
</div>
<div class="grid grid-rows-2 gap-4">
	<Project title="test_featured" heading="Latest Work" />
</div>
