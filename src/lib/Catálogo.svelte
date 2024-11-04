<script>
  import {Catálogo} from '$lib/Clases.svelte';
  import Panel from '$lib/Panel.svelte';
  export let data;
  export let editing = false;
  export const registro = new Catálogo(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/pieza.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full text-md">
    {#if editing}
      <input class="w-full focus:outline-0 bg-transparent" placeholder="Nombre" bind:value={registro.nombre} />
      <input class="w-full focus:outline-0 bg-transparent" placeholder="Descripción" bind:value={registro.descripción} />
      <span>Precio unitario: <input type="number" class="w-1/2 focus:outline-0 bg-transparent" placeholder="Precio unitario" bind:value={registro.precio_unitario} /></span>
    {:else}
      <p>{registro.nombre}</p>
      <p>{registro.descripción}</p>
      <p>Precio unitario: {registro.precio_unitario}</p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>