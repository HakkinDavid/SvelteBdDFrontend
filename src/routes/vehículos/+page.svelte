<script lang="ts">
  import Vehículo from '$lib/Vehículo.svelte';
  export let data;
	
	let adding = false;
</script>


<svelte:head>
	<title>Vehículo</title>
	<meta name="description" content="Página de inicio" />
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Vehículo</h3>
	{#each data.vehículo as _, i}
    <Vehículo bind:data={data.vehículo[i]} bind:dueño={data.cliente}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Vehículo data={null} bind:dueño={data.cliente} bind:editing={adding}/>
  {/if}
</section>