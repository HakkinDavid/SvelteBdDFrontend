<script lang="ts">
  import Orden from '$lib/Orden.svelte';
  export let data;
	
  let adding = false;
</script>

<svelte:head>
  <title>Órdenes</title>
</svelte:head>

<section class="flex flex-col gap-2">
  {#each data.detalle_orden as _, i}
    <Orden bind:data={data.detalle_orden[i]} bind:cliente={data.cliente} bind:factura={data.factura} 
    bind:servicio={data.servicio} bind:refacción={data.refacción} bind:promoción={data.promoción} bind:departamento={data.departamento} />
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={() => { adding = true; }}>Añadir</button>
  {:else}
    <Orden data={null} bind:cliente={data.cliente} bind:factura={data.factura} bind:servicio={data.servicio} 
    bind:refacción={data.refacción} bind:promoción={data.promoción} bind:departamento={data.departamento} bind:editing={adding} />
  {/if}
</section>