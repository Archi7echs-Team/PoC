<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, Text } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { createEventDispatcher } from 'svelte';

	interactivity();

	export let xPos;
	export let zPos;
	// @ts-ignore
	export let ySize;
	export let color;
	// @ts-ignore
	export let selectedYSize; // Valore selezionato passato dal genitore
	export let value;

	let isSelected;
	let opacity: number;

	const dispatch = createEventDispatcher();

	const height = spring(ySize);
	const hover = spring(0);

	// @ts-ignore
	$: {
		if (value == 'maggiori') {
			isSelected = selectedYSize === null || selectedYSize <= ySize;
		} else {
			isSelected = selectedYSize === null || selectedYSize >= ySize;
		}
		opacity = isSelected ? 1 : 0.3;
	}

	function handleClick(e: any) {
		// @ts-ignore
		dispatch('selectYSize', { selectedYSize: selectedYSize === ySize ? null : ySize });
		e.stopPropagation();
	}
</script>

<T.Mesh
	position.x={xPos}
	position.y={$height / 2 + $hover}
	position.z={zPos}
	scale.x={4}
	scale.z={4}
	scale.y={ySize}
	castShadow
	on:pointerenter={(e) => {
		hover.set(1);
		e.stopPropagation();
	}}
	on:pointerleave={(e) => {
		hover.set(0);
		e.stopPropagation();
	}}
	on:click={handleClick}
>
	<T.BoxGeometry />
	<T.MeshStandardMaterial {color} {opacity} transparent={true} depthTest={true} />
</T.Mesh>

<Text
	text={$height}
	position.x={xPos}
	position.y={$height + $hover + 1.8}
	position.z={zPos}
	color="#230612"
	fontSize={0.8}
	fillOpacity={$hover}
/>
