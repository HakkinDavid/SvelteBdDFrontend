<script lang="ts">
  import Factura from '$lib/Factura.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Facturas</title>
</svelte:head>


<section class="flex flex-col gap-2">
	{#each data.factura as _, i}
    <Factura bind:data={data.factura[i]} bind:RFC={data.RFC} bind:cfdi={data.cfdi}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Factura data={null} bind:RFC={data.RFC} bind:cfdi={data.cfdi} bind:editing={adding}/>
  {/if}
</section>