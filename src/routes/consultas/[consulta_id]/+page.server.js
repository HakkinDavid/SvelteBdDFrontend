import { mysql_connection } from '$lib/mysql';
export async function load({ params }) {
  return {
    consulta_id: params.consulta_id,
    options: {
      'd': (await mysql_connection.query('SELECT id, nombre FROM departamento'))[0]
    }
  }
}