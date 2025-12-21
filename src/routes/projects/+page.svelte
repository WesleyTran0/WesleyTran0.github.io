<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Project from '$lib/components/Project.svelte';

	import goodDogImg from '$lib/projects/good-dog-licensing/good-dog-licensing.png';
	import pngmeGif from '$lib/projects/pngme/pngme.gif';
	import searchNEUImg from '$lib/projects/searchneu/searchneu.png';
	import shorelarkGif from '$lib/projects/shorelark/shorelark.gif';

	import Docker from '$lib/components/stackIcons/Docker.svelte';
	import Next from '$lib/components/stackIcons/Next.svelte';
	import Postgres from '$lib/components/stackIcons/Postgres.svelte';
	import Prisma from '$lib/components/stackIcons/Prisma.svelte';
	import React from '$lib/components/stackIcons/React.svelte';
	import Scss from '$lib/components/stackIcons/Scss.svelte';
	import TRPC from '$lib/components/stackIcons/TRPC.svelte';
	import Tailwind from '$lib/components/stackIcons/Tailwind.svelte';
	import TypeScript from '$lib/components/stackIcons/TypeScript.svelte';
	import Rust from '$lib/components/stackIcons/Rust.svelte';
	import Wasm from '$lib/components/stackIcons/Wasm.svelte';
</script>

<svelte:head>
	<title>Wesley Tran | Projects</title>
	<meta name="description" content="Wesley's personal portfolio" />
</svelte:head>

<div class="flex flex-col gap-10">
	<div class="flex flex-col space-y-1">
		<Project
			heading="Good Dog Licensing — Connecting Musicians and Media Makers Alike"
			title="Good-Dog-Licensing"
			size="large"
			image={goodDogImg}
		/>
		<div class="flex flow-row gap-2">
			<Next />
			<React />
			<TypeScript />
			<Tailwind />
			<TRPC />
			<Prisma />
			<Postgres />
			<Docker />
		</div>
		<div class="flex flex-row">
			<Button href="https://good-dog-licensing.vercel.app/">Check it out</Button>
			<Button icon="github" href="https://github.com/sandboxnu/good-dog-licensing"
				>View on Github</Button
			>
		</div>
	</div>
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
	<div class="flex flex-col space-y-1">
		<Project
			heading="SearchNEU — A Course Catalog Made by Students for Students"
			title="searchNEU"
			size="large"
			image={searchNEUImg}
		/>
		<div class="flex flow-row gap-2">
			<Next />
			<React />
			<TypeScript />
			<Scss />
			<Prisma />
			<Postgres />
			<Docker />
		</div>
		<div class="flex flex-row">
			<Button href="https://searchneu.com/">Check it out</Button>
			<Button icon="github" href="https://github.com/sandboxnu/searchneu">View on Github</Button>
		</div>
	</div>
</div>
