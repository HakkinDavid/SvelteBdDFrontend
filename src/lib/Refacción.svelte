<script>
  import Panel from '$lib/Panel.svelte';
  import { Refacción } from '$lib/Clases.svelte';
  export let data;
  export let catálogo;

  export let editing = false;

  export const registro = new Refacción(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4">
    <p>{registro.id === 0 ? '~' : registro.id}</p>
    <img src="/images/refaccion.png" class="w-12 h-12 rounded-full"/>
  </div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Subtotal" type="number" bind:value={registro.subtotal} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Cantidad" type="number" bind:value={registro.cantidad} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <span>Catálogo:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.catálogo_id}>
            {#each catálogo as c}
              <option value={c.id}>{c.nombre}</option>
            {/each}
          </select>
        </span>
      </div>
    {:else}
      <p class="text-lg">Subtotal: ${registro.subtotal}</p>
      <p class="text-sm flex flex-row gap-2">
        <span>Cantidad: {registro.cantidad}</span>
        <span>Catálogo: {catálogo.find((e) => e.id === registro.catálogo_id)?.nombre}</span>
      </p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>
