<script lang="ts">

  import Cliente from '$lib/Cliente.svelte';
  export let data;
	
</script>


<svelte:head>
	<title>Clientes</title>
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Clientes</h3>
	{#each data.cliente as cliente}
    <Cliente data={cliente}/>
  {/each}
</section>

<style>

	/* CSS Goes Here */
	
</style>