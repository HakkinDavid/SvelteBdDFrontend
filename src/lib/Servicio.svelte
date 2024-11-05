<script>
  import Panel from '$lib/Panel.svelte';
  import { Servicio } from '$lib/Clases.svelte';
  export let data;
  export let diagnóstico;
  export let empleado;
  export let garantía;

  export let editing = false;

  export const registro = new Servicio(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4">
    <p>{registro.id === 0 ? '~' : registro.id}</p>
    <img src="/images/servicio.png" class="w-12 h-12 rounded-full"/>
  </div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Descripción" type="text" bind:value={registro.descripción} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Fecha" type="date" bind:value={registro.fecha} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Subtotal" type="number" bind:value={registro.subtotal} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <span>Diagnóstico:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.diagnóstico_id}>
            {#each diagnóstico as d}
              <option value={d.id}>{d.descripción}</option>
            {/each}
          </select>
        </span>
        <span>Mecánico:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.mecánico_id}>
            {#each empleado as m}
              <option value={m.id}>{m.nombre}</option>
            {/each}
          </select>
        </span>
        <span>Garantía:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.garantía_id}>
            {#each garantía as g}
              <option value={g.id}>{g.descripción}</option>
            {/each}
          </select>
        </span>
      </div>
    {:else}
      <p class="text-lg">Descripción: {registro.descripción}</p>
      <p class="text-sm flex flex-row gap-2">
        <span>Fecha: {new Date(registro.fecha).toDateString()}</span>
        <span>Subtotal: ${registro.subtotal}</span>
        <span>Diagnóstico: {diagnóstico.find((e) => e.id === registro.diagnóstico_id)?.descripción}</span>
        <span>Mecánico: {empleado.find((e) => e.id === registro.mecánico_id)?.nombre}</span>
        <span>Garantía: {garantía.find((e) => e.id === registro.garantía_id)?.descripción}</span>
      </p>
    {/if}
  </div>
  <Panel 
    bind:existent={registro.existent} 
    bind:editing 
    update={()=>{registro.update()}} 
    _delete={()=>{registro.delete()}} 
    insert={()=>{registro.insert()}} 
    reset={()=>{registro.reset()}}
  />
</div>
