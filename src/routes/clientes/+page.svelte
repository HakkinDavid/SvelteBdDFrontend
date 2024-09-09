<script lang="ts">

	// Imports:
	import { onMount } from 'svelte';
  import Cliente from '$lib/Cliente.svelte';
  export let data;


	// Initializations & Exports:


	onMount(() => {
    console.log("Datos de la base de datos:");
    console.log(data);
	});
	
</script>

<!-- #################################################################################################### -->

<!-- SvelteKit Dynamic Header -->
<svelte:head>
	<title>Clientes</title>
	<meta name="description" content="Página de inicio" />
</svelte:head>

<!-- Page Content -->
<section class="flex flex-col gap-2">
  <h3>Clientes</h3>
	{#each data.cliente as cliente, i}
    <Cliente data={cliente}/>
  {/each}
</section>

<!-- #################################################################################################### -->

<style>

	/* CSS Goes Here */
	
</style>