<script>
  import Panel from '$lib/Panel.svelte';
  import {Diagnóstico} from '$lib/Clases.svelte';
  export let data;
  export let vehículo;
  export let editing = false;
  export const registro = new Diagnóstico(data);
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/diagnóstico.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full text-md">
    {#if editing}
      <span>Vehículo:
        <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.vehículo_id}>
        {#each vehículo as v}
          <option value={v.id}>{'ID: ' + v.id + ' (' + v.nombre_completo + ')'}</option>
        {/each}
        </select>
      </span>
      <input type="date" class="w-min bg-transparent focus:outline-0" placeholder="Fecha" bind:value={registro.fecha} />
      <span>Descripción: <input class="w-1/2 focus:outline-0 bg-transparent" placeholder="Descripción" bind:value={registro.descripción} /></span>
    {:else}
      <span>Vehículo: {'ID: ' + registro.vehículo_id + ' (' + vehículo.find((e) => e.id === registro.vehículo_id).nombre_completo + ')'}</span>
      <p>{registro.fecha}</p>
      <p>Descripción: {registro.descripción}</p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>