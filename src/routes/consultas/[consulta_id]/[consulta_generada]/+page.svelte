<script>
  export let data;
  import { descripciones } from '$lib/Consulta.svelte';
  import Resultado from '$lib/Resultado.svelte';
</script>

<svelte:head>
	<title>Consulta {data.consulta_id}</title>
</svelte:head>


<div class="p-8">
  <h1 class="w-full text-center font-bold text-xl pb-2">{descripciones[data.consulta_id-1]}</h1>
  {#each data.resultado as r}
    <Resultado data={r}/>
  {/each}
  {#if data.resultado == undefined || data.resultado.length == 0}
    <h2 class="text-center w-full text-lg pb-2">Sin resultados.</h2>
  {/if}
</div>