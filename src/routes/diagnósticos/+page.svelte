<script lang="ts">
  import Diagnóstico from '$lib/Diagnóstico.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Diagnósticos</title>
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Diagnósticos</h3>
	{#each data.diagnóstico as _, i}
    <Diagnóstico bind:data={data.diagnóstico[i]} bind:vehículo={data.vehículo}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Diagnóstico data={null} bind:vehículo={data.vehículo} bind:editing={adding}/>
  {/if}
</section>