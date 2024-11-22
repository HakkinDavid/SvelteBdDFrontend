<script>
  import Panel from '$lib/Panel.svelte';
  import { Promoción } from '$lib/Clases.svelte';
  export let data;

  export let editing = false;

  export const registro = new Promoción(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4">
    <p>{registro.id === 0 ? '~' : registro.id}</p>
    <img src="/images/promoción.png" class="w-12 h-12 rounded-full"/>
  </div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg gap-2">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Descuento" type="number" bind:value={registro.descuento} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Descripción" type="text" bind:value={registro.descripción} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Fecha inicio" type="date" bind:value={registro.fecha_inicio} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Fecha fin" type="date" bind:value={registro.fecha_fin} />
      </div>
    {:else}
      <p class="text-lg">Descuento: ${registro.descuento}</p>
      <p class="text-sm flex flex-row gap-2">
        <span>Descripción: {registro.descripción}</span>
        <span>Fecha inicio: {new Date(registro.fecha_inicio).toDateString()}</span>
        <span>Fecha fin: {new Date(registro.fecha_fin).toDateString()}</span>
      </p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={() => { registro.update() }} _delete={() => { registro.delete() }} insert={() => { registro.insert() }} reset={() => { registro.reset() }} />
</div>
