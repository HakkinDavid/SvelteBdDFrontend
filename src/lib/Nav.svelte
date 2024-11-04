<script lang="ts">

	
	const links = [
		{ route: '/', name: 'Inicio' },
		{ route: '/about', name: 'Sobre nosotros' },
    { route: '/clientes', name: 'Clientes' },
		{ route: '/empleados', name: 'Empleados' },
		{ route: '/departamentos', name: 'Departamentos' },
		{ route: '/vehículos', name: 'Vehículos' },
		{ route: '/consultas', name: 'Consultas' }
	];

</script>

<nav class="w-full sticky top-0 flex flex-row bg-slate-500 gap-4 p-6 text-white place-items-center">
  <img src="/icon.png" class="w-12"/>

	{#each links as link}
			<a href="{link.route}">{link.name}</a>
	{/each}

</nav>
