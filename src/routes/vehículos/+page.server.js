import { mysql_connection } from '$lib/mysql';

  export async function load() {
    
    return {
      vehículo: (await mysql_connection.query('SELECT * FROM vehículo'))[0],
      cliente: (await mysql_connection.query('SELECT * FROM cliente'))[0]
    };
  }