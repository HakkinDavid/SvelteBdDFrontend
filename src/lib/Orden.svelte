<script>
  import Panel from '$lib/Panel.svelte';
  import { Orden } from '$lib/Clases.svelte';
  export let data;
  export let cliente;
  export let factura;
  export let servicio;
  export let refacción;
  export let promoción;
  export let departamento;

  export let editing = false;

  export const registro = new Orden(data);
</script>

<div class="bg-cyan-200 w-3/4 border border-blue-900 flex flex-row p-2 gap-2 items-center self-center">
  <div class="flex flex-row items-center gap-2 mr-4">
    <p>{registro.id === 0 ? '~' : registro.id}</p>
    <img src="/images/detalle_orden.png" class="w-12 h-12 rounded-full"/>
  </div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg gap-2">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Total" type="number" bind:value={registro.total} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Fecha de cobro" type="date" bind:value={registro.fecha_cobro} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <span>Cliente:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.cliente_id}>
            {#each cliente as c}
              <option value={c.id}>{c.nombre}</option>
            {/each}
          </select>
        </span>
        <span>Factura:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.factura_id}>
            <option value={null}>Ninguna</option>
            {#each factura as f}
              <option value={f.id}>{f.RFC}</option>
            {/each}
          </select>
        </span>
        <span>Servicio:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.servicio_id}>
            <option value={null}>Ninguno</option>
            {#each servicio as s}
              <option value={s.id}>{s.descripción}</option>
            {/each}
          </select>
        </span>
      </div>
      <div class="flex flex-row text-sm gap-2">
        <span>Refacción:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.refacción_id}>
            <option value={null}>Ninguna</option>
            {#each refacción as r}
              <option value={r.id}>{r.subtotal}</option>
            {/each}
          </select>
        </span>
        <span>Promoción:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.promoción_id}>
            <option value={null}>Ninguna</option>
            {#each promoción as p}
              <option value={p.id}>{p.descuento}</option>
            {/each}
          </select>
        </span>
        <span>Departamento:
          <select class="w-1/4 focus:outline-0 bg-transparent" bind:value={registro.departamento_id}>
            {#each departamento as d}
              <option value={d.id}>{d.nombre}</option>
            {/each}
          </select>
        </span>
      </div>
    {:else}
      <p class="text-lg">Total: ${registro.total}</p>
      <p class="text-sm flex flex-row gap-2">
        <span>Fecha de cobro: {new Date(registro.fecha_cobro).toDateString()}</span>
        <span>Cliente: {cliente.find((e) => e.id === registro.cliente_id)?.nombre}</span>
        <span>Factura: {factura.find((e) => e.id === registro.factura_id)?.RFC || 'Ninguna'}</span>
        <span>Servicio: {servicio.find((e) => e.id === registro.servicio_id)?.descripción || 'Ninguno'}</span>
        <span>Refacción: {refacción.find((e) => e.id === registro.refacción_id)?.subtotal || 'Ninguna'}</span>
        <span>Promoción: {promoción.find((e) => e.id === registro.promoción_id)?.descuento || 'Ninguna'}</span>
        <span>Departamento: {departamento.find((e) => e.id === registro.departamento_id)?.nombre}</span>
      </p>
    {/if}
  </div>
  <Panel bind:existent={registro.existent} bind:editing update={()=>{registro.update()}} _delete={()=>{registro.delete()}} insert={()=>{registro.insert()}} reset={()=>{registro.reset()}}/>
</div>
