import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      servicio: (await mysql_connection.query('SELECT * FROM servicio'))[0],
      diagnóstico: (await mysql_connection.query('SELECT id, descripción FROM diagnóstico'))[0],
      empleado: (await mysql_connection.query('SELECT id, CONCAT(nombre, \' \', apellido1, \' \', apellido2) AS nombre FROM empleado'))[0],
      garantía: (await mysql_connection.query('SELECT id, descripción FROM garantía'))[0]
    };
  }