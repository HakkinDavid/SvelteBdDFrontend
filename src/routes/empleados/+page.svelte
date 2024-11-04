<script lang="ts">
  import Empleado from '$lib/Empleado.svelte';
  export let data;
	
	let adding = false;
</script>


<svelte:head>
	<title>Empleados</title>
	<meta name="description" content="Página de inicio" />
</svelte:head>


<section class="flex flex-col gap-2">
  <h3>Empleados</h3>
	{#each data.empleado as _, i}
    <Empleado bind:data={data.empleado[i]} bind:departamento={data.departamento} bind:puesto={data.puesto} bind:jefe={data.empleado}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Empleado data={null} bind:departamento={data.departamento} bind:puesto={data.puesto} bind:jefe={data.empleado} bind:editing={adding}/>
  {/if}
</section>

<style>

	/* CSS Goes Here */
	
</style>