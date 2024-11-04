<script lang="ts">
  import Departamento from '$lib/Departamento.svelte';
  export let data;
	let adding = false;
</script>


<svelte:head>
	<title>Departamentos</title>
</svelte:head>


<section class="flex flex-col gap-2">
	{#each data.departamento as _, i}
    <Departamento bind:data={data.departamento[i]}/>
  {/each}
  {#if !adding}
    <button class="h-12 w-1/2 mx-auto px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{adding = true;}}>Añadir</button>
  {:else}
    <Departamento data={null} bind:editing={adding}/>
  {/if}
</section>