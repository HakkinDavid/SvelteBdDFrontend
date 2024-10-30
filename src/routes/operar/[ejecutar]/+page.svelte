<script>
    import { onMount } from 'svelte';

  export let data;
  
  onMount(() => {
    history.back();
  });
</script>

<h1>
  Cambios efectuados.
</h1>