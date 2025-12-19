<script lang="ts">
	import Project from '$lib/components/Project.svelte';
	import Rust from '$lib/components/icons/Rust.svelte';
	import Wasm from '$lib/components/icons/Wasm.svelte';
</script>

<div class="flex flex-row">
	<div class="flex flex-col space-y-1">
		<Project title="Shorelark" size="large" image="/src/lib/projects/shorelark/shorelark.gif" />
		<div class="flex flow-row gap-2">
			<Rust />
			<Wasm />
		</div>
	</div>
</div>
