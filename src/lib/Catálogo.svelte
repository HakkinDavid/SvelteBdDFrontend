<script>
  import {Catálogo} from '$lib/Clases.svelte';
  export let data;
  export let editing = false;
  export const registro = new Catálogo(data);
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
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
  <div class="flex flex-col gap-2">
    {#if editing}
      {#if registro.existent}
        <button class="h-6 px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{registro.update();}}>Actualizar</button>
      {:else}
        <button class="h-6 px-2 rounded-full bg-green-400 text-sm" on:click={()=>{registro.insert();}}>Guardar</button>
      {/if}
      <button class="h-6 px-2 rounded-full bg-red-400 text-sm" on:click={()=>{registro.reset(); editing = false;}}>Cancelar</button>
    {:else}
      <button class="h-6 px-2 rounded-full bg-gray-400 text-sm" on:click={()=>{editing = true;}}>Editar</button>
      <button class="h-6 px-2 rounded-full bg-red-700 text-sm" on:click={()=>{registro.delete();}}>Eliminar</button>
    {/if}
  </div>
</div>