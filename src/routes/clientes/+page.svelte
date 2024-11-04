<script lang="ts">

  import Cliente from '$lib/Cliente.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Clientes</title>
</svelte:head>


<section class="flex flex-col gap-2">
	{#each data.cliente as _, i}
    <Cliente bind:data={data.cliente[i]}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Cliente data={null} bind:editing={adding}/>
  {/if}
</section>