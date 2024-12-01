import { mysql_connection } from '$lib/mysql';

export async function load({ params }) {
  try {
    return {
      resultado: {... (await mysql_connection.query(decodeURIComponent(params.ejecutar)))[0]}
    }
  } catch (e) {
    return {
      faulty_query: decodeURIComponent(params.ejecutar),
      error: JSON.parse(JSON.stringify(e))
    }
  }
}