import { mysql_connection } from '$lib/mysql';

export async function load({ params }) {
  return {
    consulta_generada: decodeURIComponent(params.consulta_generada),
    consulta_id: params.consulta_id,
    resultado: (await mysql_connection.query(decodeURIComponent(params.consulta_generada)))[0]
  }
}