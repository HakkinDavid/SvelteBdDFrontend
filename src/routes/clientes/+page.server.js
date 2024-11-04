import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      cliente: (await mysql_connection.query('SELECT * FROM cliente'))[0]
    };
  }