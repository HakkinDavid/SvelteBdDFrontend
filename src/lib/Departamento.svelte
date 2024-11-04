<script>
  import Panel from '$lib/Panel.svelte';
  import {Departamento} from '$lib/Clases.svelte';
  export let data;
  export let editing = false;
  export const registro = new Departamento(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/departamento.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full text-lg">
    {#if editing}
      <input class="w-full focus:outline-0 bg-transparent" placeholder="Nombre" bind:value={registro.nombre} />
    {:else}
      <p>{registro.nombre}</p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>