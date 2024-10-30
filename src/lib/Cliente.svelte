<script>
  import {Cliente} from '$lib/Clases.svelte';
  import { onMount } from 'svelte';
  export let data;
  
  export let editing = false;

  export const registro = new Cliente(data);
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div class="flex flex-row items-center gap-2 mr-4"><p>{registro.ID === 0 ? '~' : registro.ID}</p><img src="/images/user.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    {#if editing}
      <div class="flex flex-row text-lg">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Nombre" bind:value={registro.nombre} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Apellido 1" bind:value={registro.apellido1} />
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Apellido 2" bind:value={registro.apellido2} />
      </div>
      <div class="flex flex-row text-sm gap-2">
        <input class="w-1/4 focus:outline-0 bg-transparent" placeholder="Correo" bind:value={registro.correo} />
        <input class="w-1/8 focus:outline-0 bg-transparent" placeholder="Teléfono" bind:value={registro.teléfono} />
        <input class="w-1/8 focus:outline-0 bg-transparent" placeholder="RFC" bind:value={registro.RFC} />
      </div>
    {:else}
      <p class="text-lg">{registro.nombre_completo}</p>
      <p class="text-sm flex flex-row gap-2">
        {#if registro.correo !== null}<a href="mailto:{registro.correo}" class="text-blue-500 underline">{registro.correo}</a>{/if}
        {#if registro.teléfono !== null}<a href="tel:+52{registro.teléfono}" class="text-blue-500 underline">{registro.teléfono}</a>{/if}
        {#if registro.RFC}
          <a href="https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf" class="text-blue-500 underline">{'RFC: ' + registro.RFC}</a>
        {:else}
          <span>Sin datos fiscales</span>
        {/if}
      </p>
    {/if}
  </div>
  <div class="flex flex-col gap-2">
    {#if editing}
      {#if registro.existent}
        <button class="h-6 px-2 rounded-full bg-blue-400 text-sm" on:click={()=>{editing = false; registro.update();}}>Actualizar</button>
      {:else}
        <button class="h-6 px-2 rounded-full bg-green-400 text-sm" on:click={()=>{registro.insert();}}>Guardar</button>
      {/if}
      <button class="h-6 px-2 rounded-full bg-red-400 text-sm" on:click={()=>{editing = false;}}>Cancelar</button>
    {:else}
      <button class="h-6 px-2 rounded-full bg-gray-400 text-sm" on:click={()=>{editing = true;}}>Editar</button>
      <button class="h-6 px-2 rounded-full bg-red-700 text-sm" on:click={()=>{registro.delete();}}>Eliminar</button>
    {/if}
  </div>
</div>