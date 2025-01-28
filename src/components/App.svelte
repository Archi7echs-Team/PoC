<script lang="ts">
	import { Canvas } from '@threlte/core';
	// @ts-ignore
	import { Sky } from '@threlte/extras';
	import Scene from './Scene.svelte';
	import Form from './Form.svelte';
	import Switch from './Switch.svelte';
	import type { Writable } from 'svelte/store';
	import type { Mode } from '../app';

	export let data: Writable<{ x: number; y: number; z: number }[]>;
	export let use: Mode;

	let switchValue: any;
	let ySize: number = -1;
	let formVisible = true; // Stato per mostrare/nascondere il form

	function setYSize(event: any) {
		ySize = event.detail;
	}

	let reset: () => any | undefined;
</script>

<div class="canvas-container">
	<Canvas>
		<Sky elevation={1.5} />
		<Scene {data} {switchValue} bind:reset bind:use on:updateSize={setYSize} />
	</Canvas>
</div>

{#if formVisible}
	<div class="form-widget">
		<Form {data} />
		<div class="controls">
			<Switch bind:value={switchValue} label="Maggiore o Minore" />
		</div>
		<p>
			Visualizzo i valori {switchValue} di {ySize}
		</p>
		<button on:click={reset}>Reset View</button>
		{#if use == 'api'}
			<button on:click={() => (use = 'database')}>Usa database</button>
			<button on:click={() => (use = 'manual')}>Usa dati manuali</button>
		{:else if use == 'database'}
			<button on:click={() => (use = 'api')}>Usa API</button>
			<button on:click={() => (use = 'manual')}>Usa dati manuali</button>
		{:else if use == 'manual'}
			<button on:click={() => (use = 'database')}>Usa database</button>
			<button on:click={() => (use = 'api')}>Usa API</button>
		{/if}
	</div>
{/if}

<button class="toggle-button" on:click={() => (formVisible = !formVisible)}>
	{formVisible ? 'Nascondi' : 'Mostra'} Form
</button>

<style>
	.canvas-container {
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	/* Form widget */
	.form-widget {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 10;
		padding: 20px;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 15px;
		box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.2);
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: #333;
		transition:
			opacity 0.3s ease-in-out,
			transform 0.3s ease-in-out;
	}

	.form-widget.hidden {
		display: none; /* Rimuove il form completamente dal layout */
	}

	.form-widget .controls {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
	}

	.form-widget button {
		padding: 10px 20px;
		background-color: #0078d7;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.form-widget button:hover {
		background-color: #005a9e;
	}

	.form-widget p {
		margin-top: 15px;
		font-size: 1rem;
	}

	.toggle-button {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 20;
		padding: 10px 15px;
		background-color: #333;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.toggle-button:hover {
		background-color: #555;
	}
</style>
