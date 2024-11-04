<script>
  import Panel from '$lib/Panel.svelte';
  import {Empleado} from '$lib/Clases.svelte';
  export let data;
  export let departamento;
  export let puesto;
  export let jefe;
  
  export let editing = false;

  export const registro = new Empleado(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/user.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Nombre" bind:value={registro.nombre} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Apellido 1" bind:value={registro.apellido1} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Apellido 2" bind:value={registro.apellido2} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <input class="w-1/8 focus:outline-0 bg-transparent" placeholder="RFC" bind:value={registro.RFC} />
        <span>Puesto:
          <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.puesto_id}>
          {#each puesto as p}
            <option value={p.id}>{p.nombre}</option>
          {/each}
          </select>
        </span>
        <span>Departamento:
          <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.departamento_id}>
          {#each departamento as d}
            <option value={d.id}>{d.nombre}</option>
          {/each}
          </select>
        </span>
        <span>Jefe:
          <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.jefe_id}>
            <option value={null}>Nadie</option>
          {#each jefe.filter((jefes) => jefes.id !== registro.id) as j}
            <option value={j.id}>{j.nombre + ' ' + j.apellido1 + (j.apellido2 ? ' ' + j.apellido2 : '')}</option>
          {/each}
          </select>
        </span>
      </div>
    {:else}
      <p class="text-lg">{registro.nombre_completo}</p>
      <p class="text-sm flex flex-row gap-2">
        <a href="https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf" class="text-blue-500 underline">{'RFC: ' + registro.RFC}</a>
        <span>Puesto: {puesto.find((e) => e.id === registro.puesto_id).nombre}</span>
        <span>Departamento: {departamento.find((e) => e.id === registro.departamento_id).nombre}</span>
        <span>Jefe: {(() => {let j = jefe.find((e) => e.id === registro.jefe_id); if (j === undefined) return "Nadie"; return j.nombre + ' ' + j.apellido1 + (j.apellido2 ? ' ' + j.apellido2 : '')})()}</span>
      </p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>