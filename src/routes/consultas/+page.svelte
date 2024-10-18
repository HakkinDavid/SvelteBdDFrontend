<script>
  import { número_consultas as n} from "$lib/Consulta.svelte";
  import PreviaConsulta from "$lib/PreviaConsulta.svelte";
</script>

<svelte:head>
	<title>Consultas</title>
</svelte:head>

<section class="grid grid-rows-10 grid-flow-col gap-4 p-1">
  {#each {length: n} as _, i}
    <PreviaConsulta index={i}/>
  {/each}
</section>
