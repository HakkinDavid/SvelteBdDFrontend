import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      empleado: (await mysql_connection.query('SELECT * FROM empleado'))[0],
      departamento: (await mysql_connection.query('SELECT id, nombre FROM departamento'))[0],
      puesto: (await mysql_connection.query('SELECT id, nombre FROM puesto'))[0]
    };
  }