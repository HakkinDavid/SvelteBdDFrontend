import { mysql_connection } from '$lib/mysql';

export async function load({ params }) {
  return {
    resultado: {... (await mysql_connection.query(decodeURIComponent(params.ejecutar)))[0]}
  }
}