import conn from './db.js'
import bc from 'bcrypt'
export class seedDbModel {
  static async create () {
    /* const resultado = await conn.query('SELECT id FROM id=$1', 1)
    console.log(resultado.rows[0].id)

    if(id) */
    // eslint-disable-next-line camelcase
    const input = { firstname: 'gerente', lastname: 'lab', email: 'admin@gmail.com', password: '1234', dni: '123456', mobilephone: '024869541', created: '2020-01-01T04:00:00.000Z', id_role: 1 }

    const passwordHash = await bc.hash(input.password, 10)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows
    console.log(uuid)

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO client( client_id, client_password,client_firstname,client_lastname ,client_email ,client_dni, client_mobilephone, client_created,client_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *;', [uuid, passwordHash, input.firstname, input.lastname, input.email, input.dni, input.mobilephone, input.created, input.id_role])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }
}
