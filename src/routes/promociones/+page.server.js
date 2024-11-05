import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      promoción: (await mysql_connection.query('SELECT * FROM promoción'))[0],
    };
  }