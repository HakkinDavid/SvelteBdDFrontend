<script>
  export let data;
  
  let other_columns = Object.keys(data);
  other_columns = other_columns.filter((item) => {
    switch (item) {
      case 'nombre':
      case 'apellido1':
      case 'apellido2':
      case 'descripción':
      case 'garantia':
      return false;
      default:
      return true;
    }
  });
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div><img src="/images/resultado.jpeg" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    {#if data.nombre}<p class="text-lg font-bold">{data.nombre + (data.apellido1 != undefined ? ' ' + data.apellido1 : '') + (data.apellido2 != undefined ? ' ' + data.apellido2 : '')}</p>{/if}
    {#if data.garantia}<p class="text-lg" class:font-bold={data.nombre == undefined}>{data.garantia}</p>{/if}
    {#if data.descripción}<p class="text-lg" class:font-bold={data.nombre == undefined}>{data.descripción}</p>{/if}
    <p class="text-sm flex flex-row flex-wrap gap-2">
      {#each other_columns as o}
        <p>{o.toUpperCase() + ': ' + data[o]}</p>
      {/each}
    </p>
  </div>
</div>