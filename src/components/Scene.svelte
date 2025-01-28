<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls, Gizmo, Text } from '@threlte/extras';
	import Bar from './Bar.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import type { Mode } from '../app';

	let controls: any;

	export let use: Mode;
	export let data: Writable<{ x: number; y: number; z: number }[]>;
	export let selectedYSize: number | null = null;
	export let switchValue: any;
	export const reset = () => controls.reset();

	const dispatch = createEventDispatcher();

	function handleSelectYSize(ySize: number | null) {
		selectedYSize = ySize;
		dispatch('updateSize', selectedYSize);
	}
</script>

<!-- Grid -->
<Grid cellColor="#00ff00" sectionSize={1} gridSize={[100, 100]} />

<T.PerspectiveCamera
	makeDefault
	position={[20, 40, 60]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping bind:ref={controls} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight castShadow position={[10, 20, 5]} />

<Gizmo
	verticalPlacement="bottom"
	horizontalPlacement="left"
	xColor="#ff3653"
	yColor="#8adb00"
	zColor="#2c8fff"
	toneMapped={false}
	size={128}
	paddingX={20}
	paddingY={20}
	zLabel="z"
	yLabel="y"
	xLabel="x"
/>

<Text
	text="POC 3D Data Visualization"
	position={[0, 30, 0]}
	color="#000000"
	fontSize={3}
	rotation.y={Math.PI / 4}
	maxWidth={17}
	lineHeight={1.1}
/>

{#if use == 'api'}
	{#each $page.data.apiCoordinates as d}
		<Bar
			xPos={d.x}
			zPos={d.z}
			ySize={d.y}
			color={`hsl(${((d.x + 360) * 5) % 360}, 80%, 60%)`}
			{selectedYSize}
			on:selectYSize={(e) => handleSelectYSize(e.detail.selectedYSize)}
			bind:value={switchValue}
		/>
	{/each}
{:else if use == 'database'}
	{#each $page.data.coordinates as d}
		<Bar
			xPos={d.x}
			zPos={d.z}
			ySize={d.y}
			color={`hsl(${((d.x + 360) * 5) % 360}, 80%, 60%)`}
			{selectedYSize}
			on:selectYSize={(e) => handleSelectYSize(e.detail.selectedYSize)}
			bind:value={switchValue}
		/>
	{/each}
{:else}
	{#each $data as d}
		<Bar
			xPos={d.x}
			zPos={d.z}
			ySize={d.y}
			color={`hsl(${((d.x + 360) * 5) % 360}, 80%, 60%)`}
			{selectedYSize}
			on:selectYSize={(e) => handleSelectYSize(e.detail.selectedYSize)}
			bind:value={switchValue}
		/>
	{/each}
{/if}
