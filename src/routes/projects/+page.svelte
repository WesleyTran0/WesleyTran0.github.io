<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Project from '$lib/components/Project.svelte';
	import Rust from '$lib/components/icons/Rust.svelte';
	import Wasm from '$lib/components/icons/Wasm.svelte';

	import shorelarkGif from '$lib/projects/shorelark/shorelark.gif';
	import pngmeGif from '$lib/projects/pngme/pngme.gif';
	import goodDogImg from '$lib/projects/good-dog-licensing/good-dog-licensing.png';
	import searchNEUImg from '$lib/projects/searchneu/searchneu.png';
	import Next from '$lib/components/icons/Next.svelte';
	import React from '$lib/components/icons/React.svelte';
	import TypeScript from '$lib/components/icons/TypeScript.svelte';
	import TRPC from '$lib/components/icons/TRPC.svelte';
	import Prisma from '$lib/components/icons/Prisma.svelte';
	import Postgres from '$lib/components/icons/Postgres.svelte';
	import Docker from '$lib/components/icons/Docker.svelte';
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
