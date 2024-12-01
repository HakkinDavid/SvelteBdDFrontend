<script>
    import { onMount } from 'svelte';

  export let data;
  
  onMount(() => {
    if (data.error) {
      alert(data.error.sqlMessage);
    }
    history.back();
  });
</script>

<h1>
  {#if data && !data.error} Cambios efectuados. {:else if data.error} Revisa tu solicitud. <br> Consulta ejecutada: {data.faulty_query} {:else} Ejecutando... {/if}
</h1>