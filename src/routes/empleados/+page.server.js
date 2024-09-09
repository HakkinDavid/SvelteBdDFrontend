import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      empleado: (await mysql_connection.query('SELECT * FROM empleado'))[0],
    };
  }