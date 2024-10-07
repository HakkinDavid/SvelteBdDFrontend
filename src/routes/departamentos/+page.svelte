<script lang="ts">
  import Departamento from '$lib/Departamento.svelte';
  export let data;
</script>


<svelte:head>
	<title>Departamentos</title>
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Departamento</h3>
	{#each data.departamento as departamento, i}
    <Departamento data={departamento}/>
  {/each}
</section>

<style>

	/* CSS Goes Here */
	
</style>