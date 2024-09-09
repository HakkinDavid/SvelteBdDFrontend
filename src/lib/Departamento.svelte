<script>
  export let data;
</script>

<div class="bg-cyan-200 w-full border border-blue-900 flex flex-row p-2 gap-2 items-center">
  <div><img src="/images/departamento.png" class="w-12 h-12 rounded-full"/></div>
  <div class="w-full flex flex-col h-full">
    <p class="text-lg">{data.nombre}</p>
  </div>
</div>