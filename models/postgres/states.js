import conn from './db.js'
// import bc from 'bcrypt'

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
    const { name, description } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO states(states_name,states_description) VALUES ($1, $2) RETURNING *;', [name, description])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating states')
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name, description } = input
      // const passwordHash = await bc.hash(password, 10)
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE states SET states_name = $1, states_description = $2  WHERE states_id = $3 RETURNING *;', [name, description, id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      throw new Error('Errro creating states')
    }
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
