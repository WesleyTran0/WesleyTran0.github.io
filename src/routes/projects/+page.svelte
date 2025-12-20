<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Project from '$lib/components/Project.svelte';
	import Rust from '$lib/components/icons/Rust.svelte';
	import Wasm from '$lib/components/icons/Wasm.svelte';

	import shorelarkGif from '$lib/projects/shorelark/shorelark.gif';
	import pngmeGif from '$lib/projects/pngme/pngme.gif';
</script>

<svelte:head>
	<title>Wesley Tran | Projects</title>
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<div class="flex flex-col gap-10">
	<div class="flex flex-col space-y-1">
		<Project
			heading="Shorelark — A Neural Network Simulation"
			title="Shorelark"
			size="large"
			image={shorelarkGif}
		/>
		<div class="flex flow-row gap-2">
			<Rust />
			<Wasm />
		</div>
		<Button icon="github" href="https://github.com/WesleyTran0/shorelark">View on Github</Button>
	</div>
	<div class="flex flex-col space-y-1">
		<Project
			heading="PNGme — Encode Secret Messages in PNGs"
			title="PNGme"
			size="large"
			image={pngmeGif}
		/>
		<div class="flex flow-row gap-2">
			<Rust />
		</div>
		<Button icon="github" href="https://github.com/WesleyTran0/pngme">View on Github</Button>
	</div>
</div>
