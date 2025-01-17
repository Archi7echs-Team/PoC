<script lang="ts">
    import { T } from '@threlte/core';
    import { Grid, OrbitControls, Gizmo, Text } from '@threlte/extras';
    import Bar from './Bar.svelte';
	import { createEventDispatcher } from 'svelte';

    let changed = false;
    let controls : any;
    let data = [
        { x: -48, y: 10, z: 0 },
        { x: -48, y: 15, z: 5 },
        { x: -43, y: 4, z: 0 },
        { x: -43, y: 10, z: 5 },
        { x: -38, y: 8, z: 0 },
        { x: -38, y: 9, z: 5 },
        { x: -33, y: 12, z: 0 },
        { x: -33, y: 17, z: 5 },
        { x: -28, y: 8, z: 0 },
        { x: -28, y: 16, z: 5 },
        { x: -23, y: 6, z: 0 },
        { x: -23, y: 12, z: 5 },
        { x: -18, y: 10, z: 0 },
        { x: -18, y: 15, z: 5 },
        { x: -13, y: 8, z: 0 },
        { x: -13, y: 9, z: 5 },
        { x: -8, y: 12, z: 0 },
        { x: -8, y: 17, z: 5 },
        { x: -3, y: 8, z: 0 },
        { x: -3, y: 16, z: 5 },
        { x: 2, y: 6, z: 0 },
        { x: 2, y: 12, z: 5 },
        { x: 7, y: 10, z: 0 },
        { x: 7, y: 15, z: 5 },
        { x: 12, y: 8, z: 0 },
        { x: 12, y: 9, z: 5 },
        { x: 17, y: 12, z: 0 },
        { x: 17, y: 17, z: 5 },
        { x: 22, y: 8, z: 0 },
        { x: 22, y: 16, z: 5 },
        { x: 27, y: 6, z: 0 },
        { x: 27, y: 12, z: 5 },
        { x: 32, y: 10, z: 0 },
        { x: 32, y: 15, z: 5 },
        { x: 37, y: 8, z: 0 },
        { x: 37, y: 9, z: 5 },
        { x: 42, y: 12, z: 0 },
        { x: 42, y: 17, z: 5 },
        { x: 47, y: 8, z: 0 },
    ]

    export let selectedYSize: number | null = null;
    export let dati;
    export let switchValue : any;
    export const reset = () => controls.reset()

    const dispatch = createEventDispatcher()

    $: {
        data = [...data, dati];
        changed = true;
    }

    function handleSelectYSize(ySize: number | null) {
        selectedYSize = ySize; 
        dispatch('updateSize', selectedYSize)
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
    <OrbitControls 
        enableDamping
        bind:ref={controls}
     />
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
{#each data as d, index}
    <Bar
        xPos={d.x}
        zPos={d.z}
        ySize={d.y}
        color={`hsl(${(index * 40) % 360}, 100%, 50%)`}
        selectedYSize={selectedYSize}
        on:selectYSize={(e) => handleSelectYSize(e.detail.selectedYSize)}
        bind:value={switchValue}
    />
{/each}

