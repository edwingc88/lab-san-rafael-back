import conn from './db.js'
// import bc from 'bcrypt'

export class SubCategoryModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM sub_category;')
      console.log(res.rows)
      return res.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM sub_category WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO sub_category( id,name ) VALUES ($1, $2 ) RETURNING *;', [id, name])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE sub_category SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM sub_category WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
