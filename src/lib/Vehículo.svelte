<script>
  import Panel from '$lib/Panel.svelte';
  import {Vehículo} from '$lib/Clases.svelte';
  export let data;
  export let dueño;
  
  export let editing = false;

  export const registro = new Vehículo(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/carro.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Marca" bind:value={registro.marca} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Modelo" bind:value={registro.modelo} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Año" type="number" bind:value={registro.año} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Color" bind:value={registro.color} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <span>Dueño:
          <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.cliente_id}>
          {#each dueño as d}
            <option value={d.id}>{d.nombre}</option>
          {/each}
          </select>
        </span>
      </div>
    {:else}
      <p class="text-lg">{registro.nombre_completo}</p>
      <p class="text-sm flex flex-row gap-2">
        <span>Dueño: {dueño.find((e) => e.id === registro.cliente_id).nombre}</span>
      </p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>