<script>
  import { goto } from '$app/navigation';
  export let data;
  import { descripciones, parámetros, plantillas, localización } from '$lib/Consulta.svelte';
  import { onMount } from 'svelte';

  let P = parámetros[data.consulta_id-1] || [];
  let consulta_generada = plantillas[data.consulta_id-1];

  onMount (() => {
    console.log("Plantilla de consulta: \n\n" + consulta_generada);
  });

  function generarConsulta () {
    for (let i = 0; i < P.length; i++) {
      consulta_generada = consulta_generada.replaceAll('{P' + (i+1) + '}', P[i].dato);
    }
  }
</script>

<svelte:head>
	<title>Consulta {data.consulta_id}</title>
</svelte:head>

<div class="p-8">
  <h1>{descripciones[data.consulta_id-1]}</h1>
  <h2 hidden={P.length == 0}>Parámetros</h2>
  <div class="w-full flex flex-row gap-2 mb-2">
    {#each P as p, i}
      <div class="rounded-lg flex flex-col text-center bg-cyan-400 p-2 place-items-center">
        <p>{localización[p.tipo][p.subtipo]}</p>
        {#if p.tipo == 'f'}
          <input type="date" class="rounded-lg" bind:value={P[i].dato}/>
        {:else if p.tipo == 's'}
          <select bind:value={P[i].dato}>
            {#each data.options[p.subtipo] as o}
              <option value={o.id}>{o.nombre}</option>
            {/each}
          </select>
        {:else if p.tipo == 'n'}
          <input type="number" step="{p.subtipo == 'i' ? '1' : '0.01'}" bind:value={P[i].dato}/>
        {/if}
      </div>
    {/each}
  </div>
  <button class="h-12 enabled:bg-green-200 rounded-lg px-2 disabled:bg-gray-200"
    on:click={() => {
      generarConsulta();
      console.log("Consulta generada: \n\n" + consulta_generada);
      goto ('/consultas/' + data.consulta_id + '/' + encodeURIComponent(consulta_generada));
    }}
  >Generar</button>
</div>