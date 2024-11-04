import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      vehículo: (await mysql_connection.query('SELECT * FROM vehículo'))[0],
      cliente: (await mysql_connection.query('SELECT id, CONCAT(nombre, \' \', apellido1, \' \', apellido2) AS nombre FROM cliente'))[0]
    };
  }