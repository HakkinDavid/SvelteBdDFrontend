<script>
  import {Factura} from '$lib/Clases.svelte';
  export let data;
  export let RFC;
  export let cfdi;
  export let editing = false;
  export const registro = new Factura(data);
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/factura.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full text-md">
    {#if editing}
    <span>RFC:
      <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.RFC}>
      {#each RFC as rfc}
        <option value={rfc.RFC}>{rfc.RFC + ' (' + rfc.nombre + ')'}</option>
      {/each}
      </select>
    </span>
      <input type="date" class="w-min bg-transparent focus:outline-0" placeholder="Fecha" bind:value={registro.fecha} />
      <span>Uso CFDI:
        <select class="w-1/16 focus:outline-0 bg-transparent" bind:value={registro.uso_CFDI}>
        {#each cfdi as uso}
          <option value={uso.id}>{uso.id + ' (' + uso.descripción + ')'}</option>
        {/each}
        </select>
      </span>
      <span>Monto: <input type="number" class="w-1/2 focus:outline-0 bg-transparent" placeholder="Monto" bind:value={registro.monto} /></span>
    {:else}
      <span>RFC: {registro.RFC + ' (' + RFC.find((e) => e.RFC === registro.RFC).nombre + ')'}</span>
      <p>{registro.fecha}</p>
      <span>Uso CFDI: {registro.uso_CFDI + ' (' + cfdi.find((e) => e.id === registro.uso_CFDI).descripción + ')'}</span>
      <p>Monto: {registro.monto}</p>
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