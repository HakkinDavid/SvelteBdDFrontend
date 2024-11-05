<script lang="ts">
  import Promoción from '$lib/Promoción.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Promociones</title>
</svelte:head>


<section class="flex flex-col gap-2">
	{#each data.promoción as _, i}
    <Promoción bind:data={data.promoción[i]}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Promoción data={null} bind:editing={adding}/>
  {/if}
</section>