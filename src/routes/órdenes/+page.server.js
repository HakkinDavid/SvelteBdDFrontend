import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      detalle_orden: (await mysql_connection.query('SELECT * FROM detalle_orden'))[0],
      cliente: (await mysql_connection.query('SELECT id, CONCAT(nombre, \' \', apellido1, \' \', apellido2) AS nombre FROM cliente'))[0],
      factura: (await mysql_connection.query('SELECT id, RFC FROM factura'))[0],
      servicio: (await mysql_connection.query('SELECT id, descripción FROM servicio'))[0],
      refacción: (await mysql_connection.query('SELECT id, subtotal FROM refacción'))[0],
      promoción: (await mysql_connection.query('SELECT id, descuento FROM promoción'))[0],
      departamento: (await mysql_connection.query('SELECT id, nombre FROM departamento'))[0]
    };
  }