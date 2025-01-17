<script>
  import { createEventDispatcher } from "svelte";
  let x = "";
  let y = "";
  let z = "";

  const dispatch = createEventDispatcher();
  
  function inviaDati() {
    if (x === "" || y === "" || z === "") {
      alert("Inserisci tutti i valori");
      return;
    }else{
      dispatch("aggiorna", { x, y, z });
      x = y = z = "";
    }
    
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width:30vw;
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
    background-color: #007BFF;
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

<form on:submit|preventDefault="{inviaDati}">
  <div>
      <label for="x">X:</label>
      <input id="x" type="number" bind:value="{x}" />
  </div>
  <div>
      <label for="y">Y:</label>
      <input id="y" type="number" bind:value="{y}" />
  </div>
  <div>
      <label for="z">Z:</label>
      <input id="z" type="number" bind:value="{z}" />
  </div>
  <button type="submit">Genera Grafico</button>
</form>
