import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      diagnóstico: (await mysql_connection.query('SELECT * FROM diagnóstico'))[0],
      vehículo: (await mysql_connection.query('SELECT id, CONCAT(marca, \' \', modelo, \' \', año, \' \', color) AS nombre_completo FROM vehículo'))[0]
    };
  }