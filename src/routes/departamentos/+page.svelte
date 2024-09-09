<script lang="ts">

	// Imports:
	import { onMount } from 'svelte';
  import Departamento from '$lib/Departamento.svelte';
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
	<title>Departamento</title>
	<meta name="description" content="Página de inicio" />
</svelte:head>

<!-- Page Content -->
<section class="flex flex-col gap-2">
  <h3>Departamento</h3>
	{#each data.departamento as departamento, i}
    <Departamento data={departamento}/>
  {/each}
</section>

<!-- #################################################################################################### -->

<style>

	/* CSS Goes Here */
	
</style>