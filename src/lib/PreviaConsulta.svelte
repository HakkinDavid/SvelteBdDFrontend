<script>
  import { descripciones as consultas} from "$lib/Consulta.svelte";
  import { goto } from "$app/navigation";

  export let index = 0;
</script>

<div class="flex flex-col bg-blue-100 p-2 m-1 border rounded content-between">
  <p class="flex flex-grow">{index + 1 + '. ' + consultas[index]}</p>
  <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" on:click={()=>{goto('/consultas/' + (index + 1))}}>Ver</button>
</div>