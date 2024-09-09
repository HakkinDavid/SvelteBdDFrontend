<script>
  export let data;
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div><img src="/images/user.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    <p class="text-lg">{data.nombre + ' ' + data.apellido1 + ' ' + data.apellido2}</p>
    <p class="text-sm flex flex-row gap-2">
      {#if data.RFC}
        <a href="https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf" class="text-blue-500 underline">{'RFC: ' + data.RFC}</a>
      {:else}
        <span>Sin datos fiscales</span>
      {/if}
    </p>
  </div>
</div>