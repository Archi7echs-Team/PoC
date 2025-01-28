<script lang="ts">
	import type { Mode } from '../app';
	import App from '../components/App.svelte';
	import { writable, type Writable } from 'svelte/store';

	let use: Mode = 'manual';
	export const data2: Writable<{ x: number; y: number; z: number }[]> = writable([]);
</script>

<div>
	<App data={data2} bind:use />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		width: 100vw;
		height: 100vh;
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
