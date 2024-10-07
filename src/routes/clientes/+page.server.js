import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      cliente: (await mysql_connection.query('SELECT * FROM cliente'))[0],
      /*
      departamento: (await mysql_connection.query('SELECT * FROM departamento'))[0],
      detalle_orden: (await mysql_connection.query('SELECT * FROM detalle_orden'))[0],
      diagnóstico: (await mysql_connection.query('SELECT * FROM diagnóstico'))[0],
      empleado: (await mysql_connection.query('SELECT * FROM empleado'))[0],
      factura: (await mysql_connection.query('SELECT * FROM factura'))[0],
      garantía: (await mysql_connection.query('SELECT * FROM garantía'))[0],
      promoción: (await mysql_connection.query('SELECT * FROM promoción'))[0],
      puesto: (await mysql_connection.query('SELECT * FROM puesto'))[0],
      refacción: (await mysql_connection.query('SELECT * FROM refacción'))[0],
      servicio: (await mysql_connection.query('SELECT * FROM servicio'))[0],
      uso_cfdi: (await mysql_connection.query('SELECT * FROM uso_cfdi'))[0],
      vehículo: (await mysql_connection.query('SELECT * FROM vehículo'))[0],
      */
    };
  }