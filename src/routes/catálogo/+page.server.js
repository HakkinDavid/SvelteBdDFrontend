import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      catálogo: (await mysql_connection.query('SELECT * FROM catálogo'))[0],
    };
  }