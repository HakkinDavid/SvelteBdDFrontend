<script lang="ts">
  import Refacción from '$lib/Refacción.svelte';
  export let data;
	
  let adding = false;
</script>

<svelte:head>
  <title>Refacciones</title>
</svelte:head>

<section class="flex flex-col gap-2">
  {#each data.refacción as _, i}
    <Refacción bind:data={data.refacción[i]} bind:catálogo={data.catálogo} />
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={() => { adding = true; }}>Añadir</button>
  {:else}
    <Refacción data={null} bind:catálogo={data.catálogo} bind:editing={adding} />
  {/if}
</section>
