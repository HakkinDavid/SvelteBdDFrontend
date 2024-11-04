<script>
  import {Departamento} from '$lib/Clases.svelte';
  export let data;
  export let editing = false;
  export const registro = new Departamento(data);
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/departamento.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full text-lg">
    {#if editing}
      <input class="w-full focus:outline-0 bg-transparent" placeholder="Nombre" bind:value={registro.nombre} />
    {:else}
      <p>{registro.nombre}</p>
    {/if}
  </div>
  <div class="flex flex-col gap-2">
    {#if editing}
      {#if registro.existent}
        <button class="h-6 px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{editing = false; registro.update();}}>Actualizar</button>
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