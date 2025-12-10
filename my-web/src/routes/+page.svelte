<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<div class="flex flex-col max-w-240 mx-auto items-center justify-center px-6 py-5">
	<Card>
		<header class="flex flex-row text-2xl text-accent font-bold pb-4">
			Hi, I'm Wesley <div
				class="font-normal px-2 bg-linear-to-r from-blue-400 via-green-600 to-yellow-400 gradient-animation bg-clip-text text-transparent bg-size-[200%_auto]"
			>
				ᕕ( ᐛ )ᕗ
			</div>
		</header>
		<div class="text-center">
			This is my personal website, a hub I use to store and document my projects, hobbies, and
			processes.
		</div>
		<div class="text-center">
			If you see anything interesting, feel free to reach out! I would love to talk about it.
		</div>
	</Card>
</div>
