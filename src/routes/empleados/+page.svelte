<script lang="ts">
  import Empleado from '$lib/Empleado.svelte';
  export let data;
	
</script>


<svelte:head>
	<title>Empleados</title>
	<meta name="description" content="Página de inicio" />
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Empleados</h3>
	{#each data.empleado as empleado, i}
    <Empleado data={empleado}/>
  {/each}
</section>

<style>

	/* CSS Goes Here */
	
</style>