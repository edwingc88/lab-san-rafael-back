import conn from './db.js'
import bc from 'bcrypt'
export class ClientModel {
  static async getAll (role) {
    try {
      if (role) {
        console.log(role)
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT role_id,role_name FROM role WHERE LOWER(role_name) = $1;', [loweCaseRole])
        const roles = result.rows[0]
        console.log(roles)
        if (roles.length === 0) return false
        const idRole = roles.role_id
        const resultRoles = await conn.query('SELECT * FROM client INNER JOIN role ON client.client_id_role = role.role_id WHERE role.role_id = $1;', [idRole])
        // const clients = resultRoles.rows
        return resultRoles.rows
      }
      const res = await conn.query('SELECT * FROM client;')
      return res.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM client WHERE client_id = $1;', [id])
      // const [clients] = result.rows
      // if (clients.length === 0) return null
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    try {
    // eslint-disable-next-line camelcase
      const { dni, email, username, password, firstname, lastname, id_gender, address, firstphone, secondphone, birthdate, bloodtyping, id_relationship, name_relationship, created, abatar, id_role } = input

      // const passwordHash = await bc.hash(password, 10)

      // const result = await conn.query('SELECT uuid_generate_v4() uuid;')
      // const [{ uuid }] = result.rows

      const passwordHash = password
      // eslint-disable-next-line camelcase
      const result = await conn.query('INSERT INTO client( client_id,client_dni , client_password,client_firstname,client_lastname ,client_email ,client_address,client_mobilephone,client_created, client_picture_url,client_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *;', [dni, email, username, passwordHash, firstname, lastname, id_gender, address, firstphone, secondphone, birthdate, bloodtyping, id_relationship, name_relationship, created, abatar, id_role])
      return (result.rows)
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE client SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM client WHERE id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }
}
