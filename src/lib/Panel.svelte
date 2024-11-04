<script>
  export let update = () => {};
  export let insert = () => {};
  export let reset = () => {};
  export let _delete = () => {};
  export let existent;
  export let editing;
</script>

<div class="flex flex-col gap-2">
  {#if editing}
    {#if existent}
      <button class="h-6 px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{update();}}>Actualizar</button>
    {:else}
      <button class="h-6 px-2 rounded-full bg-green-400 text-sm" on:click={()=>{insert();}}>Guardar</button>
    {/if}
    <button class="h-6 px-2 rounded-full bg-red-400 text-sm" on:click={()=>{reset(); editing = false;}}>Cancelar</button>
  {:else}
    <button class="h-6 px-2 rounded-full bg-gray-400 text-sm" on:click={()=>{editing = true;}}>Editar</button>
    <button class="h-6 px-2 rounded-full bg-red-700 text-sm" on:click={()=>{_delete();}}>Eliminar</button>
  {/if}
</div>