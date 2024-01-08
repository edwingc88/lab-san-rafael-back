import conn from './db.js'
// import bc from 'bcrypt'
export class AuthModel {
  static async createClient ({ input }) {
    // eslint-disable-next-line camelcase
    const { firstname, lastname, username, password, email, firstphone, created, birthdate, id_role, id_gender, id_relationship } = input

    const passwordHash = password
    console.log('Abajo en inuto dentro del Modelo')
    console.log(input)
    // const passwordHash = await bc.hash(password, 10)
    // const result = await conn.query('SELECT uuid_generate_v4() uuid;')
    // const [{ uuid }] = result.rows
    // console.log(uuid)
    // Agregar el uudi en la Query

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO client( client_username,client_password,client_firstname, client_lastname, client_email,client_firstphone, client_created, client_birthdate, client_id_role, client_id_gender, client_id_relationship) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;', [username, passwordHash, firstname, lastname, email, firstphone, created, birthdate, id_role, id_gender, id_relationship])
      return (resultID.rows)
    } catch (e) {
      console.log(e)
      throw new Error('Errro creating client')
    }
  }

  static async findByUsername (username) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT * FROM client WHERE client_username = $1 ;', [username])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find')
    }
  }

  static async findRol ({ idrole }) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT id FROM role WHERE id = $1 ;', [idrole])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find')
    }
  }

  static async getByID (id) {
    // eslint-disable-next-line camelcase
    // console.log(id)
    try {
      const result = await conn.query('SELECT id FROM client WHERE id = $1 ;', [id])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find ID')
    }
  }

  static async getRolByID (id) {
    try {
      console.log(id)
      const result = await conn.query('SELECT role_id FROM client WHERE id = $1 ;', [id])
      console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find Role')
    }
  }
}
