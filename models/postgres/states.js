import conn from './db.js'
import bc from 'bcrypt'

export class StateModel {
  static async getAll () {
    try {
      //  console.log(role)
      /*   if (role) {
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT id,name FROM role WHERE LOWER(name) = $1;', [loweCaseRole])
        const roles = result.rows

        if (roles.length === 0) {
          // console.log(roles.length)
          return []
        }
        const [{ id }] = roles

        const resultRoles = await conn.query('SELECT * FROM states INNER JOIN role ON states.states_id_role = role.id WHERE role.id = $1;', [id])
        const statess = resultRoles.rows
        return statess
      } */
      const res = await conn.query('SELECT * FROM states;')
      return res.rows
    } catch (e) {
      console.log('Error DB en consutar statess ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM states WHERE states_id = $1;', [id])
      return result.rows
    } catch (e) {
      console.log('Error DB en consutar ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { type } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO states( states_id,states_dni , states_password,states_firstname,states_lastname ,states_email ,states_address,states_mobilephone,states_created, states_picture_url,states_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *;', [type])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating states')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, states, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE states SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, states=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, states, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    try {
      console.log(id)
      const result = await conn.query('DELETE FROM states WHERE states_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error Role DB in request by ID  ')
      throw new Error(e)
    }
  }
}
