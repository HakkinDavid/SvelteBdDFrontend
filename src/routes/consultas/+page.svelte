<script>
  // Array de consultas
  const consultas = [
    "Mostrar la información del cliente con mayor frecuencia en reparaciones que se le hayan atendido en un periodo de tiempo.",
    "Mostrar la información de las promociones aplicadas en el departamento mecánico en un periodo de fechas específico.",
    "Mostrar la información del inventario de refacciones que tiene cada producto registrado.",
    "Mostrar las ventas obtenidas con respecto al servicio de solo diagnósticos.",
    "Mostrar el número de atenciones para cada departamento del taller en un periodo de fechas determinado.",
    "Mostrar las ganancias obtenidas en un rango de fechas específico en base a un departamento en particular.",
    "Mostrar el empleado que mayor ganancia obtuvo en un rango de fechas específico.",
    "Mostrar el listado de supervisores y sus supervisados en base a un departamento específico.",
    "Mostrar el listado de clientes registrados junto con los automóviles que tienen registrados en el sistema.",
    "Mostrar las reparaciones más concurrentes en base a un departamento específico.",
    "Mostrar el departamento que presenta el mayor consumo de refacciones en un periodo de fecha determinado y el número de refacciones utilizadas.",
    "Mostrar las promociones vigentes por un rango de fechas determinado.",
    "Mostrar las garantías que se han presentado en los servicios y el costo generado en un rango de fechas específico.",
    "Mostrar el departamento con mayor afluencia de reparaciones en un rango de fechas determinado.",
    "Mostrar el departamento con menor afluencia de reparaciones en un rango de fechas determinado.",
    "Mostrar el consumo de refacciones clasificado por departamento.",
    "Mostrar las ganancias obtenidas del taller por un rango de fechas determinado.",
    "Mostrar el listado de empleados clasificado por departamentos.",
    "Mostrar las características de los automóviles registrados en un periodo de tiempo determinado.",
    "Mostrar los clientes que solo realizaron servicios de diagnóstico en un periodo de fecha determinado.",
    "Mostrar el cliente con el mayor gasto en reparaciones realizado.",
    "Mostrar el automóvil con el mayor gasto realizado en un periodo de tiempo determinado.",
    "Mostrar la refacción más vendida del departamento de refacciones y la ganancia generada.",
    "Mostrar el departamento con mayor número de garantías aplicadas y el gasto debido a dichas garantías.",
    "Mostrar el cliente con mayor tiempo de no visitar el taller en un rango de fechas determinado.",
    "Mostrar la promoción más aplicada en un rango de fechas determinado.",
    "Mostrar el número de promociones vencidas en un rango de fechas determinado.",
    "Mostrar los datos del trabajador con mayor número de garantías aplicadas en los servicios que realizó.",
    "Mostrar el nombre de cliente y el nombre del automóvil que presentó el mayor número de servicios en un periodo de fechas determinado.",
    "Mostrar los servicios con menores ganancias obtenidas en un periodo de fechas determinado."
  ];

  // Separar en grupos de 10 para que en cada columna haya 10 consultas
  const consultasCol1 = consultas.slice(0, 10);
  const consultasCol2 = consultas.slice(10, 20);
  const consultasCol3 = consultas.slice(20, 30);
</script>

<!-- Layout de 3 columnas -->
<section class="grid grid-cols-3 gap-4">
  <div>
    <h3>Consultas 1-10</h3>
    {#each consultasCol1 as consulta}
      <div class="consulta-item bg-blue-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-blue-500 text-white px-2 py-1 rounded mt-2">Ver</button>
      </div>
    {/each}
  </div>

  <div>
    <h3>Consultas 11-20</h3>
    {#each consultasCol2 as consulta}
      <div class="consulta-item bg-green-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-green-500 text-white px-2 py-1 rounded mt-2">Ver</button>
      </div>
    {/each}
  </div>

  <div>
    <h3>Consultas 21-30</h3>
    {#each consultasCol3 as consulta}
      <div class="consulta-item bg-yellow-100 p-2 m-1 border rounded">
        <p>{consulta}</p>
        <button class="btn-accion bg-yellow-500 text-white px-2 py-1 rounded mt-2">Ver</button>
      </div>
    {/each}
  </div>
</section>

<!-- Estilos -->
<style>
  section {
    padding: 1rem;
  }
  .consulta-item {
    display: flex;
    flex-direction: column;
  }
  button {
    cursor: pointer;
  }
</style>

