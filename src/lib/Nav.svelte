<script lang="ts">
	import { page } from "$app/stores";

	
	const links = [
		{ route: '/', name: 'Inicio' },
    { route: '/clientes', name: 'Clientes' },
		{ route: '/empleados', name: 'Empleados' },
		{ route: '/departamentos', name: 'Departamentos' },
		{ route: '/vehículos', name: 'Vehículos' },
		{ route: '/catálogo', name: 'Catálogo' },
		{ route: '/facturas', name: 'Facturas' },
		{ route: '/diagnósticos', name: 'Diagnósticos' },
		{ route: '/refacciones', name: 'Refacciones' },
		{ route: '/servicios', name: 'Servicios' },
		{ route: '/órdenes', name: 'Órdenes' },
		{ route: '/promociones', name: 'Promociones' },
		{ route: '/consultas', name: 'Consultas' }
	];

</script>

<nav class="w-full sticky top-0 flex flex-row bg-slate-500 gap-4 p-6 text-white place-items-center">
  <img src="/icon.png" class="w-12"/>

	{#each links as link}
			<a class="{$page.route.id === link.route ? 'bg-green-900 px-2 rounded-lg' : ''}" href="{link.route}">{link.name}</a>
	{/each}

</nav>
