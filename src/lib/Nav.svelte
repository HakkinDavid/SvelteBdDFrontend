<script lang="ts">

	// Initializations:
	const links = [
		{ route: '/', name: 'Inicio' },
		{ route: '/about', name: 'Sobre nosotros' },
    { route: '/clientes', name: 'Clientes' },
		{ route: '/empleados', name: 'Empleados' },
		{ route: '/departamentos', name: 'Departamentos' }
	];

</script>

<!-- #################################################################################################### -->

<nav class="w-full flex flex-row bg-slate-500 gap-4 p-6 text-white">

	{#each links as link}
			<a href="{link.route}">{link.name}</a>
	{/each}

</nav>
