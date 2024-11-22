<script lang="ts">
  import Servicio from '$lib/Servicio.svelte';
  export let data;
	
  let adding = false;
</script>

<svelte:head>
  <title>Servicios</title>
</svelte:head>

<section class="flex flex-col gap-2">
  {#each data.servicio as _, i}
    <Servicio bind:data={data.servicio[i]} bind:diagnóstico={data.diagnóstico} bind:empleado={data.empleado} bind:garantía={data.garantía} />
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={() => { adding = true; }}>Añadir</button>
  {:else}
    <Servicio data={null} bind:diagnóstico={data.diagnóstico} bind:empleado={data.empleado} bind:garantía={data.garantía} bind:editing={adding} />
  {/if}
</section>