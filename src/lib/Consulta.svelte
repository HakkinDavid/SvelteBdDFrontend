<script context="module">
  export const descripciones = [
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

  export const localización = {
    'f': {
      'i': "Fecha de inicio",
      'f': "Fecha de fin"
    },
    's': {
      'd': "Selecciona un departamento"
    }
  };

  export const parámetros = [
    [{tipo: 'f', subtipo: 'i', dato: ""}, {tipo: 'f', subtipo: 'f', dato: ""}],
    [{tipo: 'f', subtipo: 'i', dato: ""}, {tipo: 'f', subtipo: 'f', dato: ""}],
    [],
    [],
    [{tipo: 'f', subtipo: 'i', dato: ""}, {tipo: 'f', subtipo: 'f', dato: ""}],
    [{tipo: 'f', subtipo: 'i', dato: ""}, {tipo: 'f', subtipo: 'f', dato: ""}, {tipo: 's', subtipo: 'd', dato: ""}],
    [{tipo: 'f', subtipo: 'i', dato: ""}, {tipo: 'f', subtipo: 'f', dato: ""}],
    [{tipo: 's', subtipo: 'd', dato: ""}],
  ];

  export const plantillas = [
    "SELECT cliente_id, nombre, apellido1, apellido2, COUNT(orden_id) AS total_reparaciones FROM vw_cliente_frecuente_reparaciones WHERE fecha BETWEEN '{P1}' AND '{P2}' GROUP BY cliente_id ORDER BY total_reparaciones DESC LIMIT 1",
    "SELECT descripción, descuento, fecha_cobro AS fecha FROM vw_promociones_departamento_mecanico WHERE fecha_cobro BETWEEN '{P1}' AND '{P2}'",
    "SELECT * FROM vw_inventario_refacciones",
    "SELECT * FROM vw_ventas_servicio_diagnosticos",
    "SELECT departamento, COUNT(orden_id) AS num_atenciones FROM vw_atenciones_departamento WHERE fecha_factura BETWEEN '{P1}' AND '{P2}' GROUP BY departamento ORDER BY num_atenciones DESC",
    "SELECT departamento_id, SUM(ganancias) AS total_ganancias FROM vw_ganancias_departamento WHERE fecha_factura BETWEEN '{P1}' AND '{P2}' AND departamento_id = {P3} GROUP BY departamento_id",
    "SELECT empleado_id, nombre_empleado, SUM(subtotal) AS ganancias FROM vw_empleado_mayor_ganancia WHERE fecha BETWEEN '{P1}' AND '{P2}' GROUP BY empleado_id ORDER BY ganancias DESC LIMIT 1",
    "SELECT * FROM vw_supervisores_y_supervisados WHERE departamento = {P1}",
  ];
</script>