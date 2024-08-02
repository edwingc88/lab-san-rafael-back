import conn from './db.js'
// import bc from 'bcrypt'
export class AuthModel {
  static async createUser ({ input }) {
    try {
    // eslint-disable-next-line camelcase
      const { firstname, lastname, username, password, dni, email, firstphone, created, birthdate } = input
      const passwordHash = password
      const idRolePatient = 4
      // const passwordHash = await bc.hash(password, 10)
      // const result = await conn.query('SELECT uuid_generate_v4() uuid;')
      // const [{ uuid }] = result.rows
      // console.log(uuid)
      // Agregar el uudi en la
      const abatarDefault = 'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg'
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO users( users_username,users_password,users_firstname, users_lastname,users_dni , users_email,users_firstphone, users_created, users_birthdate, users_id_role,users_abatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *;', [username, passwordHash, firstname, lastname, dni, email, firstphone, created, birthdate, idRolePatient, abatarDefault])
      return (resultID.rows)
    } catch (e) {
      console.log(e)
      throw new Error('Errro creating users')
    }
  }

  static async findUserByName (username) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT * FROM users WHERE users_username = $1 ;', [username])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find')
    }
  }

  static async findRol ({ idrole }) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT id FROM role WHERE role_id = $1 ;', [idrole])
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
      const result = await conn.query('SELECT id FROM users WHERE id = $1 ;', [id])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find ID')
    }
  }

  static async getRolByID (id) {
    try {
      console.log(id)
      const result = await conn.query('SELECT role_id FROM users WHERE id = $1 ;', [id])
      console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find Role')
    }
  }
}
