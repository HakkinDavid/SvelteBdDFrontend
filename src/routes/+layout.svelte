<script lang="ts">

	
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	
</script>


<Nav />


<main class="mb-8"><slot /></main>


<Footer />