import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      refacción: (await mysql_connection.query('SELECT * FROM refacción'))[0],
      catálogo: (await mysql_connection.query('SELECT id, nombre FROM catálogo'))[0]
    };
  }