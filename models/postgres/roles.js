import conn from './db.js'

export class RoleModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM role;')
      return res.rows
    } catch (e) {
      console.log('Error DB en consutar ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM role WHERE role_id = $1;', [id])
      return result.rows
    } catch (e) {
      console.log('Error Role DB in request by ID  ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    try {
      const { name } = input
      const resultID = await conn.query('INSERT INTO role( role_name ) VALUES ($1) RETURNING *;', [name])
      return resultID.rows
    } catch (e) {
      console.log('Error Role table created ')
      throw new Error(e)
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    try {
      const { name } = input
      console.log('dentro de DB', name)
      console.log(idupdate)
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE role SET role_name = $1  WHERE role_id = $2 RETURNING *;', [name, idupdate])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log('Error Role table created ')
      throw new Error(error)
    }
  }

  static async delete ({ id }) {
    try {
      console.log(id)
      const result = await conn.query('DELETE FROM role WHERE role_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error Role DB in request by ID  ')
      throw new Error(e)
    }
  }
}
