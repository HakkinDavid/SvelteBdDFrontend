import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      factura: (await mysql_connection.query('SELECT * FROM factura'))[0],
      RFC: (await mysql_connection.query('SELECT RFC, CONCAT(nombre, \' \', apellido1, \' \', apellido2) AS nombre FROM cliente WHERE RFC IS NOT NULL'))[0],
      cfdi: (await mysql_connection.query('SELECT id, descripción FROM uso_cfdi'))[0]
    };
  }