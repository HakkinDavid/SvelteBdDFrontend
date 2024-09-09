import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      departamento: (await mysql_connection.query('SELECT * FROM departamento'))[0],
    };
  }