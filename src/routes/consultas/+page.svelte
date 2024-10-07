<script>
  import { goto } from "$app/navigation";
  import { descripciones as consultas} from "$lib/Consulta.svelte";
  
  const consultasCol1 = consultas.slice(0, 10);
  const consultasCol2 = consultas.slice(10, 20);
  const consultasCol3 = consultas.slice(20, 30);
</script>

<svelte:head>
	<title>Consultas</title>
</svelte:head>

<section class="grid grid-cols-3 gap-4">
  <div>
    <h3>Consultas 1-10</h3>
    {#each consultasCol1 as consulta, i}
      <div class="consulta-item bg-blue-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-blue-500 text-white px-2 py-1 rounded mt-2" on:click={()=>{goto('/consultas/' + (i + 1))}}>Ver</button>
      </div>
    {/each}
  </div>

  <div>
    <h3>Consultas 11-20</h3>
    {#each consultasCol2 as consulta, i}
      <div class="consulta-item bg-green-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-green-500 text-white px-2 py-1 rounded mt-2" on:click={()=>{goto('/consultas/' + (i + 11))}}>Ver</button>
      </div>
    {/each}
  </div>

  <div>
    <h3>Consultas 21-30</h3>
    {#each consultasCol3 as consulta, i}
      <div class="consulta-item bg-yellow-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-yellow-500 text-white px-2 py-1 rounded mt-2" on:click={()=>{goto('/consultas/' + (i + 21))}}>Ver</button>
      </div>
    {/each}
  </div>
</section>


<style>
  section {
    padding: 1rem;
  }
  .consulta-item {
    display: flex;
    flex-direction: column;
  }
  button {
    cursor: pointer;
  }
</style>

