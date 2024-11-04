<script lang="ts">
  import Catálogo from '$lib/Catálogo.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Catálogo</title>
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Catálogo</h3>
	{#each data.catálogo as _, i}
    <Catálogo bind:data={data.catálogo[i]}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Catálogo data={null} bind:editing={adding}/>
  {/if}
</section>