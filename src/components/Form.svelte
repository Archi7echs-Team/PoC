<script lang="ts">
	import type { Writable } from 'svelte/store';

	let x = 0;
	let y = 0;
	let z = 0;

	export let data: Writable<{ x: number; y: number; z: number }[]>;

	function inviaDati() {
		if (x === null || y === null || z === null) {
			alert('Inserisci tutti i valori');
			return;
		} else {
			data.update((d) => d.concat({ x, y, z }));
		}
	}
</script>

<form on:submit|preventDefault={inviaDati}>
	<div>
		<label for="x">X:</label>
		<input id="x" type="number" bind:value={x} />
	</div>
	<div>
		<label for="y">Y:</label>
		<input id="y" type="number" bind:value={y} />
	</div>
	<div>
		<label for="z">Z:</label>
		<input id="z" type="number" bind:value={z} />
	</div>
	<button type="submit">Aggiorna grafico</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: #f9f9f9;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 300px;
		margin: auto;
	}

	label {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	input {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.5rem;
		width: 100%;
		box-sizing: border-box;
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.75rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
